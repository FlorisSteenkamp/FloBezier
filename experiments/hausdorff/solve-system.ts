import { type TPoly, toBernstein, subdivide, evaluate, derivative } from './tensor-poly.js';


/** @internal */
const { abs, max, min } = Math;


/** Below this box width Newton's method is tried from the box center. */
const NEWTON_W = 1e-3;
/** Subdivision is stopped when a box is narrower than this in every variable. */
const BOX_TOL = 1e-7;
/** Safety cap on the number of boxes examined (guards against non-isolated solutions). */
const MAX_BOXES = 50_000;


interface SolveResult {
    /** the solutions found in `[0,1]ⁿ` */
    readonly roots: number[][];
    /** `true` if the box cap was hit, i.e. some solutions may be missing */
    readonly capped: boolean;
    /** the number of boxes examined */
    readonly boxes: number;
}


/**
 * Returns the solutions in `[0,1]ⁿ` of the square polynomial system
 * `polys[i] = 0` (given in power basis) using Bernstein subdivision, switching
 * to Newton's method once a box is small.
 *
 * * a box is discarded when the Bernstein coefficients of some equation are all
 * of one sign (convex hull property)
 * * no error bounds - plain double precision throughout
 *
 * @param polys the equations (power basis, all in the same number of variables)
 * @param keep optional; boxes for which this returns `false` are discarded
 * (used to restrict the domain, e.g. to `s1 ≤ s2`)
 */
function solveSystem(
        polys: TPoly[],
        keep: (lo: number[], hi: number[]) => boolean = () => true): SolveResult {
    const nv = polys[0].deg.length;
    const jac = polys.map(p => Array.from({ length: nv }, (_, v) => derivative(p, v)));

    type Box = { bs: TPoly[]; lo: number[]; hi: number[]; };
    const stack: Box[] = [{
        bs: polys.map(toBernstein),
        lo: new Array<number>(nv).fill(0),
        hi: new Array<number>(nv).fill(1)
    }];

    const found: number[][] = [];
    let boxes = 0;
    let capped = false;

    while (stack.length) {
        if (++boxes > MAX_BOXES) { capped = true; break; }
        const { bs, lo, hi } = stack.pop()!;
        if (!keep(lo, hi)) { continue; }

        let prune = false;
        for (const b of bs) {
            let min = Infinity, max = -Infinity;
            for (const x of b.c) { if (x < min) { min = x; } if (x > max) { max = x; } }
            if (min > 0 || max < 0) { prune = true; break; }
        }
        if (prune) { continue; }

        let axis = 0, w = 0;
        for (let v=0; v<nv; v++) {
            if (hi[v] - lo[v] > w) { w = hi[v] - lo[v]; axis = v; }
        }
        if (w < NEWTON_W) {
            // accept Newton's result only if it converges inside this box
            const x = newton(polys, jac, lo.map((l, v) => (l + hi[v])/2));
            if (x !== undefined && x.every((xi, v) => xi >= lo[v] && xi <= hi[v])) {
                found.push(x);
                continue;
            }
        }
        if (w < BOX_TOL) {
            found.push(lo.map((l, v) => (l + hi[v])/2));
            continue;
        }

        const halves = bs.map(b => subdivide(b, axis));
        const mid = (lo[axis] + hi[axis])/2;
        const hiL = hi.slice(); hiL[axis] = mid;
        const loR = lo.slice(); loR[axis] = mid;
        stack.push({ bs: halves.map(h => h[0]), lo, hi: hiL });
        stack.push({ bs: halves.map(h => h[1]), lo: loR, hi });
    }

    // de-duplicate (a root on a box boundary can be found from both sides)
    const roots: number[][] = [];
    for (const x of found) {
        if (!roots.some(r => r.every((ri, v) => abs(ri - x[v]) < 1e-7))) {
            roots.push(x);
        }
    }

    return { roots, capped, boxes };
}


/**
 * Newton's method for a square system; returns `undefined` if the Jacobian
 * becomes singular or the result is outside `[0,1]ⁿ`.
 */
function newton(
        polys: TPoly[],
        jac: TPoly[][],
        x0: number[]): number[] | undefined {

    let x = x0.slice();
    for (let iter=0; iter<12; iter++) {
        const F = polys.map(p => evaluate(p, x));
        const J = jac.map(row => row.map(p => evaluate(p, x)));
        const dx = solveLinear(J, F);
        if (dx === undefined) { return undefined; }
        x = x.map((xi, i) => xi - dx[i]);
        // converged (quadratic convergence: one more step gains nothing)
        if (dx.every((d, i) => abs(d) <= 1e-13*(1 + abs(x[i])))) { break; }
    }
    if (x.some(xi => !(xi >= -1e-9 && xi <= 1 + 1e-9))) { return undefined; }
    return x.map(xi => min(1, max(0, xi)));
}


/** Gaussian elimination with partial pivoting; `undefined` if singular. */
function solveLinear(A: number[][], b: number[]): number[] | undefined {
    const n = b.length;
    const M = A.map((row, i) => [...row, b[i]]);
    for (let k=0; k<n; k++) {
        let p = k;
        for (let i=k+1; i<n; i++) { if (abs(M[i][k]) > abs(M[p][k])) { p = i; } }
        if (M[p][k] === 0) { return undefined; }
        [M[k], M[p]] = [M[p], M[k]];
        for (let i=k+1; i<n; i++) {
            const f = M[i][k]/M[k][k];
            for (let j=k; j<=n; j++) { M[i][j] -= f*M[k][j]; }
        }
    }
    const x = new Array<number>(n);
    for (let i=n-1; i>=0; i--) {
        let s = M[i][n];
        for (let j=i+1; j<n; j++) { s -= M[i][j]*x[j]; }
        x[i] = s/M[i][i];
    }
    return x;
}


/**
 * Returns a function that polishes an approximate solution `x` of the square
 * system `polys = 0` (power basis) with Newton's method (returning `x`
 * unchanged if Newton fails); the Jacobian is built once.
 */
function polisher(polys: TPoly[]): (x: number[]) => number[] {
    const nv = polys[0].deg.length;
    const jac = polys.map(p => Array.from({ length: nv }, (_, v) => derivative(p, v)));
    return x => newton(polys, jac, x) ?? x;
}


export { solveSystem, polisher }
export type { SolveResult }
