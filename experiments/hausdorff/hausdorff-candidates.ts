import { roots } from 'flo-poly';
import {
    toPowerBasis, evalDeCasteljau, closestPointOnBezier, reverse, getFootpointPoly,
    getImplicitForm1, getImplicitForm2, getImplicitForm3
} from '../../src/index.js';
import {
    type TPoly, univariate, constant, add, sub, scale, mul, derivative, zero, strides, evaluate
} from './tensor-poly.js';
import { solveSystem, polisher } from './solve-system.js';
import { bernsteinRoots01 } from './bernstein-roots.js';
import { adaptiveRoots } from './adaptive-roots.js';
import { resI, resMAEI, maiAB, maiG, maF_B3, maN_B3, maN_B2 } from './generated/index.js';


/** @internal */
const { abs, max, min, sqrt } = Math;


/**
 * The candidate types (see Kim & McLean, "Computing the Hausdorff distance
 * between two sets of parametric curves"):
 *
 * * `EA` - an endpoint of `A`
 * * `EB` - the closest point on `B` is an endpoint of `B`
 * * `I` - interior closest point; `A(t) - B(s)` is normal to both curves
 * * `MA-ends` - `A(t)` is equidistant to both endpoints of `B`
 * * `MA-end-interior` - equidistant to an endpoint and an interior footpoint
 * * `MA-interiors` - equidistant to two interior footpoints
 */
type Kind = 'EA' | 'EB' | 'I' | 'MA-ends' | 'MA-end-interior' | 'MA-interiors';

interface HausdorffCandidates {
    /** the one-sided Hausdorff distance `h(A,B)` */
    readonly d: number;
    readonly tA: number;
    readonly pA: number[];
    readonly tB: number;
    readonly pB: number[];
    /** the candidate type that attained the maximum */
    readonly kind: Kind;
    /** the number of candidate `t` values evaluated */
    readonly candidates: number;
    /** `true` if a subdivision solve hit its box cap (degenerate input) */
    readonly capped: boolean;
    /** the highest (precomputed) resultant degree used (`method === 'resultant'`) */
    readonly maxDeg: number;
}

/**
 * How the 2-variable candidate systems (`I` and `MA-end-interior`) are solved:
 * via resultants precomputed by `gen-resultants.py` (`'resultant'`) or by
 * subdivision; `MA-interiors` (3 variables) always uses subdivision.
 */
type Method = 'resultant' | 'subdivision';

type Vec = [TPoly, TPoly];


/** Accumulated time (ms) per candidate type plus `evaluate` (for profiling). */
const timing: Partial<Record<Kind | 'evaluate', number>> = {};


/** Power basis coefficients in *ascending* order. */
function asc(ps: number[][]): [number[], number[]] {
    const [x, y] = toPowerBasis(ps);
    return [x.slice().reverse(), y.slice().reverse()];
}

const curve = (ps: number[][], v: number, nv: number): Vec => {
    const [x, y] = asc(ps);
    return [univariate(x, v, nv), univariate(y, v, nv)];
};
const point = (p: number[], nv: number): Vec => [constant(p[0], nv), constant(p[1], nv)];
const dot = (a: Vec, b: Vec) => add(mul(a[0], b[0]), mul(a[1], b[1]));
const cross = (a: Vec, b: Vec) => sub(mul(a[0], b[1]), mul(a[1], b[0]));
const vsub = (a: Vec, b: Vec): Vec => [sub(a[0], b[0]), sub(a[1], b[1])];
const deriv = (a: Vec, v: number): Vec => [derivative(a[0], v), derivative(a[1], v)];


/** `(A(t) - B(s))·B′(s) = A·V′ - (V·V)′/2` (`s` is variable `sv`) */
function footpointEq(A: Vec, V: Vec, sv: number): TPoly {
    return sub(dot(A, deriv(V, sv)), scale(derivative(dot(V, V), sv), 0.5));
}


/** Ascending coefficients of `|B(s)|²` (univariate). */
function squaredNormCoeffs(ps: number[][]): number[] {
    const [x, y] = asc(ps);
    const r = new Array<number>(2*x.length - 1).fill(0);
    for (let i=0; i<x.length; i++) {
        for (let j=0; j<x.length; j++) { r[i+j] += x[i]*x[j] + y[i]*y[j]; }
    }
    return r;
}


/**
 * `S[Q](s) = ((Q(s) - Q(0))/s - Q′(s))/s`, i.e. `Σ (1-k)·qₖ·s^(k-2)` (`k ≥ 2`)
 */
function sOp(q: number[]): number[] {
    const r: number[] = [];
    for (let k=2; k<q.length; k++) { r.push((1 - k)*q[k]); }
    return r.length ? r : [0];
}


/** Divides `N(s1,s2)` (`N[i][j]` the coefficient of `s1^i s2^j`) by `(s1 - s2)`. */
function divideByDiff(N: number[][]): number[][] {
    const m = N.length - 1;
    const W = N[0].length + m;
    const pad = (r: number[]) => [...r, ...new Array<number>(W - r.length).fill(0)];
    const shift = (r: number[]) => [0, ...r.slice(0, W - 1)];
    const q: number[][] = new Array(m);
    q[m-1] = pad(N[m]);
    for (let i=m-1; i>=1; i--) {
        const c = pad(N[i]);
        q[i-1] = c.map((x, j) => x + shift(q[i])[j]);
    }
    return q;
}


/**
 * `U[s^k](s1,s2) = ( (s1^k - s2^k)/(s1 - s2) - k(s1^(k-1) + s2^(k-1))/2 ) / (s1 - s2)²`
 */
function uMonomial(k: number): number[][] {
    if (k < 3) { return [[0]]; }
    const N = Array.from({ length: k + 1 }, () => new Array<number>(k + 1).fill(0));
    for (let j=0; j<k; j++) { N[j][k-1-j] += 2; }   // numerator scaled by 2
    N[k-1][0] -= k;
    N[0][k-1] -= k;
    return divideByDiff(divideByDiff(N)).map(r => r.map(x => x/2));
}


/**
 * `U[Q]` as a polynomial in variables `v1` (`s1`) and `v2` (`s2`) of `nv`
 * variables.
 */
function uOp(q: number[], nv = 3, v1 = 1, v2 = 2): TPoly {
    let r = zero(new Array<number>(nv).fill(0));
    for (let k=3; k<q.length; k++) {
        const U = uMonomial(k);
        const deg = new Array<number>(nv).fill(0);
        deg[v1] = U.length - 1; deg[v2] = U[0].length - 1;
        const p = zero(deg);
        const st = strides(p.deg);
        U.forEach((row, i) => row.forEach((x, j) => { p.c[i*st[v1] + j*st[v2]] = x; }));
        r = add(r, scale(p, q[k]));
    }
    return r;
}


/** Divides `p(s1,s2)` (2 variables) by `(s1 - s2)` (exactly, if divisible). */
function divideByDiff2(p: TPoly): TPoly {
    const [d1, d2] = p.deg;
    if (d1 === 0) { return zero([0, max(0, d2 - 1)]); }
    const N = Array.from({ length: d1 + 1 }, (_, i) =>
        Array.from({ length: d2 + 1 }, (_, j) => p.c[i*(d2 + 1) + j]));
    const Q = divideByDiff(N);
    const r = zero([Q.length - 1, Q[0].length - 1]);
    Q.forEach((row, i) => row.forEach((x, j) => { r.c[i*Q[0].length + j] = x; }));
    return r;
}


/**
 * Returns the implicit form `f(x,y)` of the bezier curve `A`, homogenized and
 * evaluated at `(X/W, Y/W)`, i.e. `W^n f(X/W, Y/W)` for polynomials `X`, `Y`, `W`.
 */
function implicitAt(A: number[][], X: TPoly, Y: TPoly, W: TPoly): TPoly {
    const k = (c: number, ...fs: TPoly[]) => scale(fs.reduce(mul), c);
    if (A.length === 4) {
        const { vₓₓₓ, vₓₓᵧ, vₓᵧᵧ, vᵧᵧᵧ, vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v } = getImplicitForm3(A);
        return [
            k(vₓₓₓ, X, X, X), k(vₓₓᵧ, X, X, Y), k(vₓᵧᵧ, X, Y, Y), k(vᵧᵧᵧ, Y, Y, Y),
            k(vₓₓ, X, X, W), k(vₓᵧ, X, Y, W), k(vᵧᵧ, Y, Y, W),
            k(vₓ, X, W, W), k(vᵧ, Y, W, W), k(v, W, W, W)
        ].reduce(add);
    }
    if (A.length === 3) {
        const { vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v } = getImplicitForm2(A);
        return [
            k(vₓₓ, X, X), k(vₓᵧ, X, Y), k(vᵧᵧ, Y, Y), k(vₓ, X, W), k(vᵧ, Y, W), k(v, W, W)
        ].reduce(add);
    }
    const { vₓ, vᵧ, v } = getImplicitForm1(A);
    return [k(vₓ, X), k(vᵧ, Y), k(v, W)].reduce(add);
}


/**
 * Returns `A` and `B` mapped by the similarity transform taking `B(0)` to the
 * origin and `B′(0)` to `(1,0)` (as assumed by the precomputed resultants);
 * the candidate `t` values are invariant under it.
 */
function normalize(A: number[][], B: number[][]): { An: number[][]; Bn: number[][] } {
    const [bx, by] = asc(B);
    const [wx, wy] = [bx[1], by[1]];   // B′(0)
    const d = wx*wx + wy*wy;
    const [ox, oy] = B[0];
    // complex division (p - B(0)) / B′(0)
    const f = ([x, y]: number[]) => {
        const X = x - ox, Y = y - oy;
        return [(X*wx + Y*wy)/d, (Y*wx - X*wy)/d];
    };
    return { An: A.map(f), Bn: B.map(f) };
}


/**
 * Returns the coefficients (descending) of `p(t,s)` as a polynomial in `t`
 * (variable 0) for a fixed `s` (variable 1).
 */
function coeffsInTAt(p: TPoly, s: number): number[] {
    const [dt, ds] = p.deg;
    const out: number[] = [];
    for (let i=dt; i>=0; i--) {
        let c = 0;
        for (let j=ds; j>=0; j--) { c = c*s + p.c[i*(ds + 1) + j]; }
        out.push(c);
    }
    return out;
}


/**
 * Returns `p(s1, c - s1)` (ascending coefficients in `s1`) for a polynomial
 * `p` in the 2 variables `s1`, `s2`.
 */
function substituteSum(p: TPoly, c: number): number[] {
    const [d1, d2] = p.deg;
    const r = new Array<number>(d1 + d2 + 1).fill(0);
    // (c - s1)^j, ascending
    let pow = [1];
    for (let j=0; j<=d2; j++) {
        for (let i=0; i<=d1; i++) {
            const a = p.c[i*(d2 + 1) + j];
            if (a === 0) { continue; }
            pow.forEach((x, k) => { r[i + k] += a*x; });
        }
        pow = [...pow.map(x => c*x), 0].map((x, k) => x - (k > 0 ? pow[k-1] : 0));
    }
    return r;
}


/**
 * Returns the implicit form coefficients of `A` in the order used by the
 * generated resultants.
 */
function implicitCoeffs(A: number[][]): number[] {
    if (A.length === 4) {
        const { vₓₓₓ, vₓₓᵧ, vₓᵧᵧ, vᵧᵧᵧ, vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v } = getImplicitForm3(A);
        return [vₓₓₓ, vₓₓᵧ, vₓᵧᵧ, vᵧᵧᵧ, vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v];
    }
    if (A.length === 3) {
        const { vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v } = getImplicitForm2(A);
        return [vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v];
    }
    const { vₓ, vᵧ, v } = getImplicitForm1(A);
    return [vₓ, vᵧ, v];
}


/** Univariate polynomial helpers (ascending coefficients). */
const padd = (p: number[], q: number[]) =>
    Array.from({ length: max(p.length, q.length) }, (_, i) => (p[i] ?? 0) + (q[i] ?? 0));
const pscale = (p: number[], c: number) => p.map(x => x*c);
function pmul(p: number[], q: number[]): number[] {
    const r = new Array<number>(p.length + q.length - 1).fill(0);
    for (let i=0; i<p.length; i++) {
        for (let j=0; j<q.length; j++) { r[i+j] += p[i]*q[j]; }
    }
    return r;
}


/** Horner evaluation of ascending coefficients `p` at `x`. */
function horner(p: number[], x: number): number {
    let r = 0;
    for (let i=p.length-1; i>=0; i--) { r = r*x + p[i]; }
    return r;
}


/**
 * Candidate roots in `[lb,ub]` of the continuous function `f`: sign changes on
 * a grid of `n` intervals (refined by bisection) plus local minima of `|f|`
 * (refined by golden section search) to catch (near) double roots, which have
 * no sign change. Spurious candidates are harmless for our purposes and the
 * results are polished afterwards, so only moderate refinement is done.
 */
function signChangeRoots(
        f: (x: number) => number, lb: number, ub: number, n: number,
        fsGrid?: Float64Array): number[] {

    const h = (ub - lb)/n;
    let fs = fsGrid;
    if (fs === undefined) {
        fs = new Float64Array(n + 1);
        for (let i=0; i<=n; i++) { fs[i] = f(lb + h*i); }
    }
    // first a tight scan collecting grid indices only (refining inside this
    // loop made V8 run it ~20x slower)
    const { exact, changes, minima } = scanGrid(fs, n);
    const roots: number[] = exact.map(i => lb + h*i);
    for (const i of changes) { roots.push(bisect(f, lb + h*(i-1), lb + h*i, fs[i-1])); }
    // (filtering these by how close to zero they get rejects genuine
    // near-double roots, whose minima are blurred by round-off)
    for (const i of minima) { roots.push(goldenMinAbs(f, lb + h*(i-1), lb + h*(i+1))); }
    return roots;
}


/**
 * Grid indices `i` with `f(xᵢ) = 0` (`exact`), with a sign change on
 * `[xᵢ₋₁,xᵢ]` (`changes`) and with a local minimum of `|f|` at `xᵢ` without a
 * sign change (`minima`).
 */
function scanGrid(fs: Float64Array, n: number) {
    const exact: number[] = [], changes: number[] = [], minima: number[] = [];
    for (let i=0; i<=n; i++) {
        const f1 = fs[i];
        if (f1 === 0) { exact.push(i); continue; }
        if (i === 0) { continue; }
        const f0 = fs[i-1];
        if (f0*f1 < 0) { changes.push(i); continue; }
        if (i < n) {
            const f2 = fs[i+1];
            const a1 = abs(f1);
            if (a1 < abs(f0) && a1 <= abs(f2) && f1*f2 > 0) { minima.push(i); }
        }
    }
    return { exact, changes, minima };
}


/** Bisection on `[a,b]` given a sign change (`fa = f(a)`). */
function bisect(f: (x: number) => number, a: number, b: number, fa: number): number {
    for (let k=0; k<16; k++) {
        const m = (a + b)/2;
        const fm = f(m);
        if (fm === 0) { return m; }
        if (fa*fm < 0) { b = m; } else { a = m; fa = fm; }
    }
    return (a + b)/2;
}


/** Golden section search for a minimum of `|f|` on `[a,b]`. */
function goldenMinAbs(f: (x: number) => number, a: number, b: number): number {
    for (let k=0; k<16; k++) {
        const m1 = a + (b - a)*0.381966, m2 = a + (b - a)*0.618034;
        if (abs(f(m1)) < abs(f(m2))) { b = m2; } else { a = m1; }
    }
    return (a + b)/2;
}


/**
 * `Res_π(F, G)(σ)` from the coefficients of `G` in `π` (`c`, modified in
 * place) and `F = f₂π² + f₁π + f₀` at a single `σ`: `G` is reduced modulo the
 * monic `π² + pπ + q` to `απ + β`, then
 * `Res = f₂^m·(β² - pαβ + qα²)` (`m` the degree of `G` in `π`) - all plain
 * numbers, so no cancellation from expanding polynomial products.
 */
function resultantAt(c: Float64Array, F0: number, F1: number, F2: number): number {
    const m = c.length - 1;
    const p = F1/F2, q = F0/F2;
    for (let j=m; j>=2; j--) {
        const cj = c[j];
        c[j-1] -= p*cj;
        c[j-2] -= q*cj;
    }
    const α = c[1], β = c[0];
    let s = 1;
    for (let k=0; k<m; k++) { s *= F2; }
    return s*(β*β - p*α*β + q*α*α);
}


/**
 * `resultantAt` (`S = Res_π(F,G) = f₂^m·R`) together with its derivative
 * w.r.t. `σ`: `c`, `d` are `G`'s coefficients in `π` and their
 * `σ`-derivatives (both modified in place), `F*` and `D*` the coefficients of
 * `F` and their `σ`-derivatives (forward mode through the same reduction).
 * Returns `S` into `out[0]` and `S′` into `out[1]`.
 */
function resultantAtD(
        c: Float64Array, d: Float64Array,
        F0: number, F1: number, F2: number,
        D0: number, D1: number, D2: number,
        out: Float64Array) {

    const m = c.length - 1;
    const p = F1/F2, q = F0/F2;
    const pd = (D1*F2 - F1*D2)/(F2*F2), qd = (D0*F2 - F0*D2)/(F2*F2);
    for (let j=m; j>=2; j--) {
        const cj = c[j], dj = d[j];
        c[j-1] -= p*cj; d[j-1] -= pd*cj + p*dj;
        c[j-2] -= q*cj; d[j-2] -= qd*cj + q*dj;
    }
    const α = c[1], β = c[0], αd = d[1], βd = d[0];
    const R = β*β - p*α*β + q*α*α;
    const Rd = 2*β*βd - (pd*α*β + p*αd*β + p*α*βd) + (qd*α*α + 2*q*α*αd);
    let s = 1;
    for (let k=0; k<m-1; k++) { s *= F2; }
    // S = F2^m·R, S′ = m·F2^(m-1)·F2′·R + F2^m·R′
    out[0] = s*F2*R;
    out[1] = m*s*D2*R + s*F2*Rd;
}



/**
 * Roots of the continuous `f` on a grid of `n` intervals of `[lb,ub]` given
 * the values `fs` and derivatives `ds` at the grid points: on each cell the
 * extrema of the cubic Hermite interpolant split the cell (where `f` is then
 * evaluated exactly); sign changes are bisected, and extrema where `|f|` dips
 * below both cell ends without a sign change are returned as test points
 * (near double roots - polished and checked by the caller). A close pair of
 * roots inside one cell is found as long as `f` is roughly quadratic there,
 * however close the two roots are.
 */
function hermiteRoots(
        f: (x: number) => number,
        lb: number, ub: number, n: number,
        fs: Float64Array, ds: Float64Array): number[] {

    const h = (ub - lb)/n;
    const roots: number[] = [];
    const xs: number[] = [], vs: number[] = [];
    for (let i=0; i<n; i++) {
        const x0 = lb + h*i, x1 = x0 + h;
        const f0 = fs[i], f1 = fs[i+1];
        if (!(f0 === f0) || !(f1 === f1)) { continue; }   // NaN (a pole on the grid)
        if (f0 === 0) { roots.push(x0); }
        const m0 = ds[i]*h, m1 = ds[i+1]*h;
        // H′(u) = a u² + b u + c on u ∈ [0,1]
        const a = 6*f0 + 3*m0 - 6*f1 + 3*m1;
        const b = -6*f0 - 4*m0 + 6*f1 - 2*m1;
        const c = m0;
        xs.length = 0; vs.length = 0;
        xs.push(x0); vs.push(f0);
        const us: number[] = [];
        if (a === 0) {
            if (b !== 0) { us.push(-c/b); }
        } else {
            const D = b*b - 4*a*c;
            if (D >= 0) {
                const qq = -(b + (b >= 0 ? 1 : -1)*sqrt(D))/2;
                us.push(qq/a);
                if (qq !== 0) { us.push(c/qq); }
            }
        }
        us.sort((u, v) => u - v);
        for (const u of us) {
            if (u > 0 && u < 1) { const x = x0 + u*h; xs.push(x); vs.push(f(x)); }
        }
        xs.push(x1); vs.push(f1);
        for (let k=1; k<xs.length; k++) {
            const va = vs[k-1], vb = vs[k];
            if (va*vb < 0) { roots.push(bisectF(f, xs[k-1], xs[k], va)); }
        }
        // interior extrema dipping towards zero without a sign change
        for (let k=1; k<xs.length-1; k++) {
            const v = vs[k];
            if (v === 0) { roots.push(xs[k]); continue; }
            if (abs(v) < abs(f0) && abs(v) < abs(f1) && v*vs[k-1] > 0 && v*vs[k+1] > 0) {
                roots.push(xs[k]);
            }
        }
    }
    if (fs[n] === 0) { roots.push(ub); }
    return roots;
}


function bisectF(f: (x: number) => number, a: number, b: number, fa: number): number {
    for (let k=0; k<40; k++) {
        const m = (a + b)/2, fm = f(m);
        if (fm === 0) { return m; }
        if ((fa < 0) !== (fm < 0)) { b = m; } else { a = m; fa = fm; }
    }
    return (a + b)/2;
}


/**
 * The MA-interiors candidate `t` values for a cubic `B`, entirely from
 * precomputed pieces in `σ = s1 + s2`, `π = s1·s2`: the resultant w.r.t. `π`
 * of `F` and `G` (`maiG`) is evaluated pointwise in `σ` (`resultantAt`), with
 * its derivative (`resultantAtD`), on a grid; its roots on `[0,2]` are found
 * per cell with the help of the Hermite cubic (`hermiteRoots`: close pairs of
 * roots and near double roots inside a cell are caught too), each `σ`
 * back-substituted into `F(σ,π) = 0` (quadratic in `π`). Test points are
 * added at the singular points of the σ-projection (roots of `f₂` and folds
 * `f₁² - 4f₂f₀ = 0`, depending on `B` only), where the resultant is flattened
 * into round-off. Each pair is polished with Newton and mapped to the medial
 * axis point `(Nx,Ny)/D` (`maN_B3`) whose closest point on `A` gives `t`
 * (exact double roots need no candidate: the distance has no kink there).
 */
function maiTs(A: number[][], B: number[][]): number[] {
    const { An, nbx: bx, nby: by } = prep(A, B);
    const g = maiG[`${A.length - 1}3`](implicitCoeffs(An), bx, by);   // g[j]: σ-coefficients of π^j
    const Fc = maF_B3(bx, by);   // Fc[i][j]: coefficient of σ^i π^j
    const [f0, f1, f2] = [0, 1, 2].map(j => Fc.map(row => row[j] ?? 0));
    const m = g.length - 1;

    const c = new Float64Array(m + 1);
    const res = (σ: number) => {
        for (let j=0; j<=m; j++) { c[j] = horner(g[j], σ); }
        return resultantAt(c, horner(f0, σ), horner(f1, σ), horner(f2, σ));
    };
    let σs: number[];
    if (MAI_ROOTS === 'adaptive') {
        // cells discarded only when interval bounds prove them root free
        σs = adaptiveRoots(g, [f0, f1, f2], 0, 2);
    } else {
        // on the grid: each polynomial evaluated at all points first
        const Gs = g.map(onGrid);
        const F0 = onGrid(f0), F1 = onGrid(f1), F2 = onGrid(f2);
        const grid = new Float64Array(GRID + 1);
        if (MAI_ROOTS === 'hermite') {
            // values and derivatives: the Hermite cubic per cell reveals close
            // pairs of roots (and near double roots) inside a cell
            const Gd = g.map(p => onGrid(pder(p)));
            const D0 = onGrid(pder(f0)), D1 = onGrid(pder(f1)), D2 = onGrid(pder(f2));
            const gridD = new Float64Array(GRID + 1);
            const d = new Float64Array(m + 1), out = new Float64Array(2);
            for (let i=0; i<=GRID; i++) {
                for (let j=0; j<=m; j++) { c[j] = Gs[j][i]; d[j] = Gd[j][i]; }
                resultantAtD(c, d, F0[i], F1[i], F2[i], D0[i], D1[i], D2[i], out);
                grid[i] = out[0]; gridD[i] = out[1];
            }
            σs = hermiteRoots(res, 0, 2, GRID, grid, gridD);
        } else {
            for (let i=0; i<=GRID; i++) {
                for (let j=0; j<=m; j++) { c[j] = Gs[j][i]; }
                grid[i] = resultantAt(c, F0[i], F1[i], F2[i]);
            }
            // a fine grid: close clusters of roots must not cancel each other's sign changes
            σs = signChangeRoots(res, 0, 2, GRID, grid);
        }
    }
    const pairs: number[][] = [];
    for (const σ of σs) {
        // F(σ,π) as a polynomial in π (descending)
        const pc = [2, 1, 0].map(j => Fc.reduceRight((acc, row) => acc*σ + (row[j] ?? 0), 0));
        if (pc.every(x => x === 0)) { continue; }
        // both s1, s2 real and in [0,1]: σ - 1 ≤ π ≤ σ²/4
        for (const π of rootsSmallDesc(pc, max(0, σ - 1), σ*σ/4)) { pairs.push([σ, π]); }
    }

    // test points at the singular points of the σ-projection (depending on
    // `B` only): at a root of `f₂` (a pole: one branch of `F = 0` escapes to
    // infinity) `F` is linear in `π`; at a fold (`f₁² - 4f₂f₀ = 0`) the two
    // branches meet. Solutions close to these are flattened into round-off in
    // the resultant, so Newton (below) is simply started from them as well
    if (MAI_ROOTS === 'hermite') {
        for (const σ of roots01asc(f2, 0, 2)) {
            const F1 = horner(f1, σ);
            if (F1 !== 0) { pairs.push([σ, -horner(f0, σ)/F1]); }
            // if `f₁` and `f₀` (nearly) vanish here too, `F = 0` (nearly)
            // contains the line `σ = const` (`s1 + s2` constant along the
            // medial axis, as for a parabola): the solutions there come from
            // `G(σ,π) = 0` alone, univariate in `π`
            const gp = g.map(row => horner(row, σ)).reverse();   // descending in π
            for (const π of rootsSmallDesc(gp, max(0, σ - 1), σ*σ/4)) { pairs.push([σ, π]); }
        }
        const disc = padd(pmul(f1, f1), pscale(pmul(f2, f0), -4));
        for (const σ of roots01asc(disc, 0, 2)) {
            const F2 = horner(f2, σ);
            if (F2 !== 0) { pairs.push([σ, -horner(f1, σ)/(2*F2)]); }
        }
    }

    // the resultant's roots are only accurate to its precision and
    // `(X,Y) = (Nx,Ny)/D` can be sensitive to that, so polish with Newton on
    // `F(σ,π) = G(σ,π) = 0` (coefficient arrays `[σ power][π power]`)
    const Gm = Array.from({ length: g[0].length }, (_, i) => g.map(row => row[i]));
    const [Nx, Ny, D] = maN_B3(bx, by);
    const ts: number[] = [];
    for (let [σ, π] of pairs) {
        // (near-double roots make the Jacobian nearly singular and Newton
        // converge only linearly, hence the generous iteration count)
        for (let k=0; k<40; k++) {
            const [fv, fσ, fπ] = eval2(Fc, σ, π);
            const [gv, gσ, gπ] = eval2(Gm, σ, π);
            const det = fσ*gπ - fπ*gσ;
            if (det === 0) { break; }
            const dσ = (fv*gπ - fπ*gv)/det, dπ = (fσ*gv - fv*gσ)/det;
            σ -= dσ; π -= dπ;
            if (abs(dσ) <= 1e-16 && abs(dπ) <= 1e-16) { break; }
        }
        const w = eval2(D, σ, π)[0];
        if (w === 0) { continue; }
        // the point on the medial axis (in the normalized frame, so use `An`)
        const C = [eval2(Nx, σ, π)[0]/w, eval2(Ny, σ, π)[0]/w];
        ts.push(fastClosest(An, C).t);
    }
    return ts;
}


/**
 * Value and partial derivatives of `Σ M[i][j] x^i y^j` at `(x,y)`.
 */
function eval2(M: number[][], x: number, y: number): [number, number, number] {
    let v = 0, vx = 0, vy = 0;
    for (let i=M.length-1; i>=0; i--) {
        const row = M[i];
        let r = 0, ry = 0;
        for (let j=row.length-1; j>=0; j--) { ry = ry*y + r; r = r*y + row[j]; }
        vx = vx*x + v;
        v = v*x + r;
        vy = vy*x + ry;
    }
    return [v, vx, vy];
}


/**
 * The MA-interiors candidate `t` values for a quadratic `B` from precomputed
 * pieces in `σ = s1 + s2`, `π = s1·s2`: the footpoints are symmetric about the
 * vertex, i.e. `F = 0` is `σ = c = -p₃/(2p₄)` (`pᵢ` the coefficients of `|B|²`),
 * so `G(c,π)` (`maiG`) is univariate in `π`; each root gives the medial axis
 * point `(Nx,Ny)/D` (`maN_B2`) whose closest point on `A` gives `t`.
 */
function maiTsQuad(A: number[][], B: number[][]): number[] {
    const { An, nbx: bx, nby: by } = prep(A, B);
    const p = padd(pmul(bx, bx), pmul(by, by));
    if (p[4] === 0) { return []; }
    const c = -p[3]/(2*p[4]);
    if (!(c >= 0 && c <= 2)) { return []; }
    const g = maiG[`${A.length - 1}2`](implicitCoeffs(An), bx, by);   // g[j][i]: σ^i π^j
    const πPoly = g.map(row => horner(row, c));
    const [Nx, Ny, D] = maN_B2(bx, by);
    const ts: number[] = [];
    // both s1, s2 real and in [0,1]: c - 1 ≤ π ≤ c²/4
    for (const π of roots01asc(πPoly, max(0, c - 1), c*c/4)) {
        const w = eval2(D, c, π)[0];
        if (w === 0) { continue; }
        const C = [eval2(Nx, c, π)[0]/w, eval2(Ny, c, π)[0]/w];
        ts.push(fastClosest(An, C).t);
    }
    return ts;
}


/** The number of sample points (minus 1) of `B` used for upper bounds when scoring candidates. */
const SAMPLES = 16;


/**
 * How the MA-interiors resultant's roots (cubic `B`) are found: `'hermite'`
 * (values and derivatives on a grid, see `hermiteRoots`), `'grid'` (sign
 * changes and local minima of the values on a fixed grid of `GRID` intervals)
 * or `'adaptive'` (interval bounds, see adaptive-roots.ts - it does not pay
 * off).
 */
const MAI_ROOTS = 'hermite' as 'hermite' | 'grid' | 'adaptive';


/**
 * The number of grid intervals on `σ ∈ [0,2]` for the MA-interiors roots: 500
 * for `'hermite'` (no misses in 10800 random cubic-B tests at 250 or 500, a
 * few at 100), 2000 for `'grid'`.
 */
const GRID = MAI_ROOTS === 'hermite' ? 500 : 2000;
const gridXs = Float64Array.from({ length: GRID + 1 }, (_, i) => 2*i/GRID);


/** `p` (ascending coefficients) evaluated at all grid points (`gridXs`). */
function onGrid(p: number[]): Float64Array {
    const out = new Float64Array(GRID + 1);
    const n = p.length - 1;
    for (let g=0; g<=GRID; g++) {
        const x = gridXs[g];
        let r = 0;
        for (let i=n; i>=0; i--) { r = r*x + p[i]; }
        out[g] = r;
    }
    return out;
}


/** `(f₂b² - f₁ab + f₀a²)/f₂^e` at all grid points (see `maiRoots`). */
function resOnGrid(
        a: number[], b: number[],
        f0: number[], f1: number[], f2: number[],
        e: number): Float64Array {

    const A = onGrid(a), B = onGrid(b);
    const F0 = onGrid(f0), F1 = onGrid(f1), F2 = onGrid(f2);
    const out = new Float64Array(GRID + 1);
    for (let g=0; g<=GRID; g++) {
        let p = 1;
        for (let k=0; k<e; k++) { p *= F2[g]; }
        out[g] = (F2[g]*B[g]*B[g] - F1[g]*A[g]*B[g] + F0[g]*A[g]*A[g])/p;
    }
    return out;
}


/**
 * The `[s1,s2]` (`s1 ≤ s2`) solutions of the MA-interiors system for a cubic
 * `B`, from the resultant in `σ = s1 + s2` and back-substitution into
 * `F(σ,π) = 0` (quadratic in `π = s1·s2`).
 *
 * The resultant is assembled from precomputed pieces: with
 * `F = f₂π² + f₁π + f₀` and `f₂^eₖ·Gₖ ≡ aₖπ + bₖ (mod F)` (`maiAB`),
 * `a = Σ vₖf₂^(e-eₖ)aₖ`, `b = Σ vₖf₂^(e-eₖ)bₖ` (`vₖ` the implicit form
 * coefficients of `A`) `f₂b² - f₁ab + f₀a² = f₂^e·Res_π(F,G)`. It is
 * evaluated pointwise (never expanded into coefficients) and its roots in
 * `σ ∈ [0,2]` found as sign changes.
 */
function maiRootsAB(A: number[][], B: number[][]): number[][] {
    const { An, Bn } = normalize(A, B);
    const [bx, by] = asc(Bn);
    const [as, bs, es] = maiAB[`${A.length - 1}3`](bx, by);
    const v = implicitCoeffs(An);
    const Fc = maF_B3(bx, by);   // Fc[i][j]: coefficient of σ^i π^j
    const [f0, f1, f2] = [0, 1, 2].map(j => Fc.map(row => row[j] ?? 0));
    const e = max(...es);

    // `a(σ)` and `b(σ)` as coefficients (accurate enough), but the resultant
    // itself evaluated pointwise: expanding `f₂b² - f₁ab + f₀a²` into power
    // basis coefficients loses all precision (catastrophic cancellation)
    const f2pow = [[1]];
    for (let k=1; k<=e; k++) { f2pow.push(pmul(f2pow[k-1], f2)); }
    let a = [0], b = [0];
    for (let k=0; k<v.length; k++) {
        const w = pscale(f2pow[e - es[k]], v[k]);
        a = padd(a, pmul(w, as[k]));
        b = padd(b, pmul(w, bs[k]));
    }
    // divided by `f₂^e` pointwise: without it the values near roots of `f₂`
    // are flattened into round-off noise, hiding (double) roots there
    const res = (σ: number) => {
        const A_ = horner(a, σ), B_ = horner(b, σ);
        const F2 = horner(f2, σ);
        return (F2*B_*B_ - horner(f1, σ)*A_*B_ + horner(f0, σ)*A_*A_)/F2**e;
    };

    // a fine grid: close clusters of roots must not cancel each other's sign changes
    const grid = resOnGrid(a, b, f0, f1, f2, e);
    const σs = signChangeRoots(res, 0, 2, GRID, grid);
    const roots: number[][] = [];
    for (const σ of σs) {
        // F(σ,π) as a polynomial in π (descending)
        const pc = [2, 1, 0].map(j => Fc.reduceRight((acc, row) => acc*σ + (row[j] ?? 0), 0));
        if (pc.every(c => c === 0)) { continue; }
        // both s1, s2 real and in [0,1]: σ - 1 ≤ π ≤ σ²/4
        for (const π of rootsIn(pc, max(0, σ - 1), σ*σ/4)) {
            const r = sqrt(max(0, σ*σ - 4*π));
            roots.push([(σ - r)/2, (σ + r)/2]);
        }
    }
    return roots;
}


/** Per (`A`, `B`) data shared by the candidate stages (normalized forms etc.). */
interface Prep {
    readonly An: number[][]; readonly Bn: number[][];
    readonly nax: number[]; readonly nay: number[]; readonly nbx: number[]; readonly nby: number[];
    readonly ax: number[]; readonly ay: number[]; readonly bx: number[]; readonly by: number[];
}

const prepCache = new WeakMap<number[][], WeakMap<number[][], Prep>>();

/** `Prep` for the curves (memoized by array identity) */
function prep(A: number[][], B: number[][]): Prep {
    let m = prepCache.get(A);
    if (m === undefined) { m = new WeakMap(); prepCache.set(A, m); }
    let r = m.get(B);
    if (r === undefined) {
        const { An, Bn } = normalize(A, B);
        const [nax, nay] = asc(An), [nbx, nby] = asc(Bn);
        const [ax, ay] = asc(A), [bx, by] = asc(B);
        r = { An, Bn, nax, nay, nbx, nby, ax, ay, bx, by };
        m.set(B, r);
    }
    return r;
}


interface Derivs {
    adx: number[]; ady: number[]; addx: number[]; addy: number[];
    bdx: number[]; bdy: number[]; bddx: number[]; bddy: number[]; h: number[]; hd: number[];
    svx: number[]; svy: number[]; sp: number[]; svdx: number[]; svdy: number[]; spd: number[];
}

const derivsCache = new WeakMap<number[][], WeakMap<number[][], Derivs>>();

/** derivative arrays etc. used by `twoVarTs` (memoized per curve pair) */
function derivs(
        A: number[][], B: number[][],
        ax: number[], ay: number[], bx: number[], by: number[],
        withS: boolean): Derivs {

    let m = derivsCache.get(A);
    if (m === undefined) { m = new WeakMap(); derivsCache.set(A, m); }
    let r = m.get(B);
    if (r === undefined || (withS && r.svx.length === 0)) {
        const adx = pder(ax), ady = pder(ay);
        const bdx = pder(bx), bdy = pder(by);
        const h = padd(pmul(bx, bdx), pmul(by, bdy));
        r = {
            adx, ady, addx: pder(adx), addy: pder(ady),
            bdx, bdy, bddx: pder(bdx), bddy: pder(bdy), h, hd: pder(h),
            svx: [], svy: [], sp: [], svdx: [], svdy: [], spd: []
        };
        if (withS) {
            r.svx = sOp(bx); r.svy = sOp(by); r.sp = sOp(padd(pmul(bx, bx), pmul(by, by)));
            r.svdx = pder(r.svx); r.svdy = pder(r.svy); r.spd = pder(r.sp);
        }
        m.set(B, r);
    }
    return r;
}


const pder = (p: number[]) => p.length > 1 ? p.slice(1).map((c, i) => (i + 1)*c) : [0];


/**
 * The candidate `t` values of the 2-variable systems in `(t,s)` from their
 * precomputed resultants (w.r.t. `t`, polynomials in `s`), without building any
 * multivariate polynomials: for fixed `s` both equations are univariate in `t`
 * with coefficients that are dot/cross products of `A`'s coefficients with
 * `B′(s)` etc., and so are all the partial derivatives needed for Newton.
 *
 * * `'I'`: `e1 = (A - B)·B′ = A·B′ - h` (`h = B·B′`) and `e2 = A′ × B′`
 * * `'MAEI'`: `e1` and `G = -2A·S[B] + S[|B|²]` (endpoint `B(0)`)
 */
function twoVarTs(kind: 'I' | 'MAEI', A: number[][], B: number[][]): number[] {
    const table = kind === 'I' ? resI : resMAEI;
    const { nax, nay, nbx, nby, ax, ay, bx, by } = prep(A, B);
    const coeffs = table[`${A.length - 1}${B.length - 1}`](nax, nay, nbx, nby);
    let deg = coeffs.length - 1;
    // (`coeffs` descending; strip leading zeros)
    let lead = 0;
    while (lead < deg && coeffs[lead] === 0) { lead++; }
    if (coeffs.every(c => c === 0)) { return []; }
    const sRoots = bernsteinRoots01(coeffs.slice(lead));
    if (sRoots.length === 0) { return []; }

    const d = derivs(A, B, ax, ay, bx, by, kind === 'MAEI');
    const { adx, ady, addx, addy, bdx, bdy, bddx, bddy, h, hd, svx, svy, sp, svdx, svdy, spd } = d;

    const ts: number[] = [];
    for (const s0 of sRoots) {
        const Vdx0 = horner(bdx, s0), Vdy0 = horner(bdy, s0);
        // back-substitution (ascending coefficients in `t`): into `e2 = A′ × B′`
        // for 'I' unless `A` is a line, else into `e1 = A·B′ - h`
        const tPoly = kind === 'I' && A.length > 2
            ? adx.map((c, i) => c*Vdy0 - ady[i]*Vdx0)
            : ax.map((c, i) => c*Vdx0 + ay[i]*Vdy0 - (i === 0 ? horner(h, s0) : 0));
        for (const t0 of roots01asc(tPoly)) {
            // polish with Newton on (f, g) (the resultant's roots are only as
            // accurate as its values); no allocations in the loop
            let t = t0, s = s0;
            for (let k=0; k<12; k++) {
                const Ax = horner(ax, t), Ay = horner(ay, t);
                const Adx = horner(adx, t), Ady = horner(ady, t);
                const Vdx = horner(bdx, s), Vdy = horner(bdy, s);
                const Vddx = horner(bddx, s), Vddy = horner(bddy, s);
                const f = Ax*Vdx + Ay*Vdy - horner(h, s);
                const ft = Adx*Vdx + Ady*Vdy;
                const fs = Ax*Vddx + Ay*Vddy - horner(hd, s);
                let g: number, gt: number, gs: number;
                if (kind === 'I') {
                    g = Adx*Vdy - Ady*Vdx;
                    gt = horner(addx, t)*Vdy - horner(addy, t)*Vdx;
                    gs = Adx*Vddy - Ady*Vddx;
                } else {
                    const SVx = horner(svx, s), SVy = horner(svy, s);
                    g = -2*(Ax*SVx + Ay*SVy) + horner(sp, s);
                    gt = -2*(Adx*SVx + Ady*SVy);
                    gs = -2*(Ax*horner(svdx, s) + Ay*horner(svdy, s)) + horner(spd, s);
                }
                const det = ft*gs - fs*gt;
                if (det === 0) { break; }
                const dt = (f*gs - fs*g)/det, ds = (ft*g - f*gt)/det;
                t -= dt; s -= ds;
                if (abs(dt) <= 1e-15 && abs(ds) <= 1e-15) { break; }
            }
            ts.push(t >= -1e-9 && t <= 1 + 1e-9 && s >= -1e-9 && s <= 1 + 1e-9
                ? min(1, max(0, t)) : t0);
        }
    }
    void deg;
    return ts;
}


/**
 * The roots in `[lb,ub]` of a polynomial (descending coefficients) by
 * `flo-poly`'s (certified) `roots`, as plain numbers.
 */
function rootsIn(p: number[], lb: number, ub: number): number[] {
    return (roots(p, lb, ub) ?? []).map(r => r.t);
}


/**
 * `rootsSmall` for descending coefficients that may have leading zeros (and
 * may be the zero polynomial).
 */
function rootsSmallDesc(p: number[], lb: number, ub: number): number[] {
    let i = 0;
    while (i < p.length - 1 && p[i] === 0) { i++; }
    return p.length - i < 2 || !(lb <= ub) ? [] : rootsSmall(p.slice(i), lb, ub);
}


/** Roots in `[lb,ub]` (default `[0,1]`) of a univariate polynomial (ascending coefficients). */
function roots01asc(p: number[], lb = 0, ub = 1): number[] {
    let n = p.length - 1;
    while (n >= 0 && p[n] === 0) { n--; }
    if (n < 1 || !(lb <= ub)) { return []; }
    return rootsSmall(p.slice(0, n + 1).reverse(), lb, ub);
}


/**
 * Roots in `[lb,ub]` of a polynomial (descending coefficients, nonzero
 * leading coefficient): closed form for degree ≤ 2 (numerically stable
 * quadratic formula), else Bernstein subdivision (`bernsteinRoots01` on the
 * interval mapped to `[0,1]`). Plain double precision.
 */
function rootsSmall(p: number[], lb: number, ub: number): number[] {
    const n = p.length - 1;
    if (n === 1) {
        const x = -p[1]/p[0];
        return x >= lb && x <= ub ? [x] : [];
    }
    if (n === 2) {
        const [a, b, c] = p;
        const D = b*b - 4*a*c;
        if (D < 0) { return []; }
        const q = -(b + (b >= 0 ? 1 : -1)*sqrt(D))/2;
        const xs = q === 0 ? [0] : [q/a, c/q];
        return xs.filter(x => x >= lb && x <= ub).sort((x, y) => x - y);
    }
    if (lb === 0 && ub === 1) { return bernsteinRoots01(p); }
    // x = lb + (ub - lb)·u: Taylor shift and scale, then [0,1]
    const w = ub - lb;
    const a = p.slice().reverse();   // ascending
    // shift to lb (synthetic division repeated)
    for (let k=0; k<n; k++) {
        for (let i=n-1; i>=k; i--) { a[i] += lb*a[i+1]; }
    }
    let s = 1;
    for (let i=0; i<=n; i++) { a[i] *= s; s *= w; }
    return bernsteinRoots01(a.reverse()).map(u => lb + w*u);
}


/**
 * The closest point on `B` to `p` (distance, parameter and point) from the
 * footpoint polynomial with plain (uncertified) root finding - the distance
 * is insensitive to small errors in the parameter (it is stationary there).
 */
function fastClosest(B: number[][], p: number[]): { d: number; t: number; p: number[]; } {
    const poly = B.length === 1 ? [0] : getFootpointPoly(B, p);
    let n0 = 0;
    while (n0 < poly.length - 1 && poly[n0] === 0) { n0++; }
    const ts = poly.length - n0 > 1 ? rootsSmall(poly.slice(n0), 0, 1) : [];
    ts.push(0, 1);
    let best = Infinity, bt = 0, bp = B[0];
    for (const t of ts) {
        const q = evalDeCasteljau(B, t);
        const dx = q[0] - p[0], dy = q[1] - p[1];
        const d2 = dx*dx + dy*dy;
        if (d2 < best) { best = d2; bt = t; bp = q; }
    }
    return { d: sqrt(best), t: bt, p: bp };
}


/** Roots in `[0,1]` of a univariate (`nv = 1`) polynomial. */
function roots01(p: TPoly): number[] {
    const desc = Array.from(p.c).reverse();
    if (desc.every(x => x === 0)) { return []; }
    return rootsIn(desc, 0, 1);
}


/**
 * Returns the one-sided Hausdorff distance `h(A,B) = max_t min_s |A(t) - B(s)|`
 * by evaluating `min_s |A(t) - B(s)|` at a superset of the parameter values
 * where the maximum can be attained.
 *
 * * curves of order 0 to 3
 * * plain double precision; no error bounds
 *
 * @param method optional; defaults to `'resultant'`; see [[Method]]
 */
function hausdorffDistanceOneSidedCandidates(
        A: number[][],
        B: number[][],
        method: Method = 'resultant'): HausdorffCandidates {

    /**
     * The `t` values of the solutions of a 2x2 system `f = g = 0` in `(t,s)`,
     * either via the precomputed resultant (w.r.t. `t`) from `table` - whose
     * roots `s` are back-substituted into `back(t,s) = 0` - or by subdivision.
     *
     * @param Bs the curve `B` as used in the system (possibly reversed)
     */
    const solve2 = (
            f: TPoly, g: TPoly,
            table: typeof resI, Bs: number[][], back: TPoly): number[] => {

        if (method === 'resultant') {
            const { An, Bn } = normalize(A, Bs);
            const [ax, ay] = asc(An);
            const [bx, by] = asc(Bn);
            const coeffs = table[`${A.length - 1}${Bs.length - 1}`](ax, ay, bx, by);
            maxDeg = max(maxDeg, coeffs.length - 1);
            if (coeffs.every(c => c === 0)) { return []; }
            const ts: number[] = [];
            const polish = polisher([f, g]);
            for (const s of rootsIn(coeffs, 0, 1)) {
                const tPoly = coeffsInTAt(back, s);
                if (tPoly.every(c => c === 0)) { continue; }
                for (const t of rootsIn(tPoly, 0, 1)) {
                    // polish (the resultant's roots are only as accurate as its values)
                    ts.push(polish([t, s])[0]);
                }
            }
            return ts;
        }
        const r = solveSystem([f, g]);
        capped ||= r.capped;
        return r.roots.map(x => x[0]);
    };
    let maxDeg = 0;

    const cands: { t: number; kind: Kind; }[] = [];
    let capped = false;
    let tLast = performance.now();
    const push = (ts: number[], kind: Kind) => {
        for (const t of ts) { cands.push({ t, kind }); }
        const now = performance.now();
        timing[kind] = (timing[kind] ?? 0) + now - tLast;
        tLast = now;
    };

    push([0, 1], 'EA');

    if (A.length > 1) {
        // (univariate, so plain coefficient arrays - ascending)
        const [ax, ay] = asc(A);
        const dax = ax.slice(1).map((c, i) => (i + 1)*c);
        const day = ay.slice(1).map((c, i) => (i + 1)*c);

        // EB: stationary distance from an endpoint E of B, (A - E)·A′ = 0
        for (const E of [B[0], B[B.length-1]]) {
            const ex = ax.slice(), ey = ay.slice();
            ex[0] -= E[0]; ey[0] -= E[1];
            push(roots01asc(padd(pmul(ex, dax), pmul(ey, day))), 'EB');
        }

        if (B.length > 1) {
            // MA-ends: |A - B₀|² = |A - B₁|², i.e. -2A·(B₀ - B₁) + |B₀|² - |B₁|² = 0
            const [b0x, b0y] = B[0];
            const [b1x, b1y] = B[B.length-1];
            const wx = b0x - b1x, wy = b0y - b1y;
            const e = ax.map((c, i) => -2*(c*wx + ay[i]*wy));
            e[0] += b0x*b0x + b0y*b0y - b1x*b1x - b1y*b1y;
            push(roots01asc(e), 'MA-ends');
        }

        if (B.length > 1 && !(A.length === 2 && B.length === 2) && method === 'resultant') {
            // I: (A - B)·B′ = 0 and A′ × B′ = 0
            push(twoVarTs('I', A, B), 'I');
        } else if (B.length > 1 && !(A.length === 2 && B.length === 2)) {
            // I: (A - B)·B′ = 0 and A′ × B′ = 0 (`t` = var 0, `s` = var 1)
            const A2 = curve(A, 0, 2);
            const V = curve(B, 1, 2);
            const e1 = footpointEq(A2, V, 1);
            const e2 = cross(deriv(A2, 0), deriv(V, 1));
            // back-substitute into `e2` unless it does not depend on `t` (`A` a line)
            push(solve2(e1, e2, resI, B, A.length > 2 ? e2 : e1), 'I');
        }

        if (B.length > 2) {
            // MA-end-interior: |A - B(s)|² = |A - E|² and (A - B)·B′ = 0, with
            // the trivial solution `s = 0` divided out (E = B(0); repeat with
            // `B` reversed for `E = B(1)`)
            for (const Bs of [B, reverse(B)]) {
                if (method === 'resultant') {
                    push(twoVarTs('MAEI', A, Bs), 'MA-end-interior');
                    continue;
                }
                const A2 = curve(A, 0, 2);
                const V = curve(Bs, 1, 2);
                const [x, y] = asc(Bs);
                const SV: Vec = [univariate(sOp(x), 1, 2), univariate(sOp(y), 1, 2)];
                const SP = univariate(sOp(squaredNormCoeffs(Bs)), 1, 2);
                const G = add(scale(dot(A2, SV), -2), SP);
                const e1 = footpointEq(A2, V, 1);
                push(solve2(e1, G, resMAEI, Bs, e1), 'MA-end-interior');
            }

            // MA-interiors: two interior footpoints s1 ≠ s2 at equal distance.
            // All three equations are linear in the point `A(t) = (X,Y)`:
            // the two footpoint equations (normal lines of `B` at `s1` and
            // `s2`) give `(X,Y) = (Nx,Ny)/D`; substituting into the third
            // (equal distance, `s1 = s2` divided out) leaves `F(s1,s2) = 0`,
            // and `t` is eliminated by requiring `(X,Y)` to lie on `A`
            // (its implicit form). A 2-variable system in `(s1,s2)` remains.
            if (B.length === 4 && method === 'resultant' && maiG[`${A.length - 1}3`]) {
                // cubic: everything precomputed in `σ = s1 + s2`, `π = s1·s2`
                push(maiTs(A, B), 'MA-interiors');
            } else if (B.length === 3 && method === 'resultant' && maiG[`${A.length - 1}2`]) {
                // quadratic: likewise; `F = 0` fixes `σ`, leaving `G` univariate in `π`
                push(maiTsQuad(A, B), 'MA-interiors');
            } else {
                const V1 = curve(B, 0, 2);
                const V2 = curve(B, 1, 2);
                const d1 = deriv(V1, 0);
                const d2 = deriv(V2, 1);
                const h1 = dot(V1, d1);
                const h2 = dot(V2, d2);
                // all antisymmetric in (s1,s2), so (s1 - s2) is divided out
                const D = divideByDiff2(cross(d1, d2));
                const Nx = divideByDiff2(sub(mul(h1, d2[1]), mul(h2, d1[1])));
                const Ny = divideByDiff2(sub(mul(d1[0], h2), mul(d2[0], h1)));
                const [x, y] = asc(B);
                const UV: Vec = [uOp(x, 2, 0, 1), uOp(y, 2, 0, 1)];
                const UP = uOp(squaredNormCoeffs(B), 2, 0, 1);
                // `D·(-2 (X,Y)·U[B] + U[|B|²])`; for a quadratic `U[B] = 0` and `D` drops out
                const F = UV.every(p => p.c.every(c => c === 0))
                    ? UP
                    : add(scale(add(mul(Nx, UV[0]), mul(Ny, UV[1])), -2), mul(D, UP));
                const G = implicitAt(A, Nx, Ny, D);
                let roots: number[][];
                if (B.length === 3) {
                    // quadratic: `F = U[|B|²] = -p₃/2 - p₄(s1 + s2)`, i.e. the line
                    // `s1 + s2 = c` (footpoints symmetric about the vertex), so
                    // substituting `s2 = c - s1` leaves a univariate polynomial
                    const p = squaredNormCoeffs(B);
                    const c = -p[3]/(2*p[4]);
                    const g = substituteSum(G, c);
                    const lb = max(0, c - 1);
                    const ub = min(1, c/2);   // `s1 ≤ s2` by symmetry
                    roots = lb <= ub && g.some(x => x !== 0)
                        ? rootsIn(g.slice().reverse(), lb, ub).map(s1 => [s1, c - s1])
                        : [];
                } else {
                    // the system is symmetric in `s1` and `s2`, so only `s1 ≤ s2` is searched
                    const r = solveSystem([F, G], (lo, hi) => lo[0] <= hi[1]);
                    capped ||= r.capped;
                    roots = r.roots;
                }
                const ts: number[] = [];
                for (const s of roots) {
                    const w = evaluate(D, s);
                    if (w === 0) { continue; }
                    const C = [evaluate(Nx, s)/w, evaluate(Ny, s)/w];
                    ts.push(fastClosest(A, C).t);
                }
                push(ts, 'MA-interiors');
            }
        }
    }

    let best: HausdorffCandidates | undefined;
    const tEval = performance.now();
    // cheap upper bounds first: the distance from `A(t)` to the nearest of a
    // few sample points of `B` can only exceed the true distance, so the
    // candidates are scored in order of decreasing bound until no remaining
    // bound can beat the best exact distance found
    const samples = Array.from({ length: SAMPLES + 1 }, (_, i) => evalDeCasteljau(B, i/SAMPLES));
    const bounded = cands.map(({ t, kind }) => {
        const pA = evalDeCasteljau(A, t);
        let ub = Infinity;
        for (const q of samples) {
            const dx = pA[0] - q[0], dy = pA[1] - q[1];
            const d2 = dx*dx + dy*dy;
            if (d2 < ub) { ub = d2; }
        }
        return { t, kind, pA, ub: sqrt(ub) };
    }).sort((a, b) => b.ub - a.ub);
    for (const { t, kind, pA, ub } of bounded) {
        if (best !== undefined && ub <= best.d) { break; }
        const cp = fastClosest(B, pA);
        if (best === undefined || cp.d > best.d) {
            best = { d: cp.d, tA: t, pA, tB: cp.t, pB: cp.p, kind, candidates: 0, capped, maxDeg: 0 };
        }
    }

    // final local refinement of a winner at a kink (MA types) by maximizing the
    // true distance: some are ill-conditioned (e.g. near-double roots) with `t`
    // only roughly accurate, and at a kink that error shows linearly in the
    // distance; at smooth maxima (I, EB) it shows only quadratically
    if (best!.kind.startsWith('MA')) {
        const g = (t: number) => fastClosest(B, evalDeCasteljau(A, t)).d;
        const r = 0.6180339887498949;
        // (a window of ±1e-4: a candidate from a near-double root can be
        // that far off; 35 steps bring it down to ~1e-11)
        let a = max(0, best!.tA - 1e-4), b = min(1, best!.tA + 1e-4);
        let m1 = b - r*(b - a), m2 = a + r*(b - a);
        let g1 = g(m1), g2 = g(m2);
        for (let k=0; k<35; k++) {
            if (g1 > g2) { b = m2; m2 = m1; g2 = g1; m1 = b - r*(b - a); g1 = g(m1); }
            else { a = m1; m1 = m2; g1 = g2; m2 = a + r*(b - a); g2 = g(m2); }
        }
        const t = (a + b)/2;
        const pA = evalDeCasteljau(A, t);
        const cp = fastClosest(B, pA);
        if (cp.d > best!.d) {
            best = { ...best!, d: cp.d, tA: t, pA, tB: cp.t, pB: cp.p };
        }
    }

    timing['evaluate'] = (timing['evaluate'] ?? 0) + performance.now() - tEval;

    return { ...best!, candidates: cands.length, capped, maxDeg };
}


/** The (two-sided) Hausdorff distance `max(h(A,B), h(B,A))`. */
function hausdorffDistanceCandidates(
        A: number[][],
        B: number[][],
        method: Method = 'resultant'): number {

    return max(
        hausdorffDistanceOneSidedCandidates(A, B, method).d,
        hausdorffDistanceOneSidedCandidates(B, A, method).d
    );
}


export { hausdorffDistanceOneSidedCandidates, hausdorffDistanceCandidates, uOp, sOp, timing, signChangeRoots }
export type { HausdorffCandidates, Kind, Method }
