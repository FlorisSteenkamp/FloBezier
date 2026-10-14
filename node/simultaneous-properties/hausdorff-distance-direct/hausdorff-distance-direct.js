import { toPowerBasis } from '../../to-power-basis/to-power-basis/double/to-power-basis.js';
import { evalDeCasteljau } from '../../local-properties-at-t/evaluate/double/eval-de-casteljau.js';
import { getFootpointPoly } from '../closest-and-furthest-point-on-bezier/get-coeffs/double/get-footpoint-poly.js';
import { getImplicitForm1 } from '../../implicit-form/double/get-implicit-form1.js';
import { getImplicitForm2 } from '../../implicit-form/double/get-implicit-form2.js';
import { getImplicitForm3 } from '../../implicit-form/double/get-implicit-form3.js';
import { hausdorffDistanceOneSidedExtra } from '../hausdorff-distance/hausdorff-distance-one-sided-extra.js';
import { maxAbsCoordinate } from '../../error-analysis/max-abs-coordinate.js';
import { bernsteinRoots01 } from './bernstein-roots.js';
import { resI, resMAEI, maiG, maF_B3, maN_B3, maN_B2 } from './generated/index.js';
/** @internal */
const { abs, max, min, sqrt } = Math;
/** Power basis coefficients in *ascending* order. */
function asc(ps) {
    const [x, y] = toPowerBasis(ps);
    return [x.slice().reverse(), y.slice().reverse()];
}
/**
 * `S[Q](s) = ((Q(s) - Q(0))/s - Q′(s))/s`, i.e. `Σ (1-k)·qₖ·s^(k-2)` (`k ≥ 2`)
 */
function sOp(q) {
    const r = [];
    for (let k = 2; k < q.length; k++) {
        r.push((1 - k) * q[k]);
    }
    return r.length ? r : [0];
}
/**
 * Returns `A` and `B` mapped by the similarity transform taking `B(0)` to the
 * origin and `B′(0)` to `(1,0)` (as assumed by the precomputed resultants);
 * the candidate `t` values are invariant under it.
 */
function normalize(A, B) {
    const [bx, by] = asc(B);
    const [wx, wy] = [bx[1], by[1]]; // B′(0)
    const d = wx * wx + wy * wy;
    const [ox, oy] = B[0];
    // complex division (p - B(0)) / B′(0)
    const f = ([x, y]) => {
        const X = x - ox, Y = y - oy;
        return [(X * wx + Y * wy) / d, (Y * wx - X * wy) / d];
    };
    return { An: A.map(f), Bn: B.map(f) };
}
/**
 * Returns the implicit form coefficients of `A` in the order used by the
 * generated resultants.
 */
function implicitCoeffs(A) {
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
const padd = (p, q) => Array.from({ length: max(p.length, q.length) }, (_, i) => (p[i] ?? 0) + (q[i] ?? 0));
const pscale = (p, c) => p.map(x => x * c);
function pmul(p, q) {
    const r = new Array(p.length + q.length - 1).fill(0);
    for (let i = 0; i < p.length; i++) {
        for (let j = 0; j < q.length; j++) {
            r[i + j] += p[i] * q[j];
        }
    }
    return r;
}
/** Horner evaluation of ascending coefficients `p` at `x`. */
function horner(p, x) {
    let r = 0;
    for (let i = p.length - 1; i >= 0; i--) {
        r = r * x + p[i];
    }
    return r;
}
/**
 * `Res_π(F, G)(σ)` from the coefficients of `G` in `π` (`c`, modified in
 * place) and `F = f₂π² + f₁π + f₀` at a single `σ`: `G` is reduced modulo the
 * monic `π² + pπ + q` to `απ + β`, then
 * `Res = f₂^m·(β² - pαβ + qα²)` (`m` the degree of `G` in `π`) - all plain
 * numbers, so no cancellation from expanding polynomial products.
 */
function resultantAt(c, F0, F1, F2) {
    const m = c.length - 1;
    const p = F1 / F2, q = F0 / F2;
    for (let j = m; j >= 2; j--) {
        const cj = c[j];
        c[j - 1] -= p * cj;
        c[j - 2] -= q * cj;
    }
    const α = c[1], β = c[0];
    let s = 1;
    for (let k = 0; k < m; k++) {
        s *= F2;
    }
    return s * (β * β - p * α * β + q * α * α);
}
/**
 * `resultantAt` (`S = Res_π(F,G) = f₂^m·R`) together with its derivative
 * w.r.t. `σ`: `c`, `d` are `G`'s coefficients in `π` and their
 * `σ`-derivatives (both modified in place), `F*` and `D*` the coefficients of
 * `F` and their `σ`-derivatives (forward mode through the same reduction).
 * Returns `S` into `out[0]` and `S′` into `out[1]`.
 */
function resultantAtD(c, d, F0, F1, F2, D0, D1, D2, out) {
    const m = c.length - 1;
    const p = F1 / F2, q = F0 / F2;
    const pd = (D1 * F2 - F1 * D2) / (F2 * F2), qd = (D0 * F2 - F0 * D2) / (F2 * F2);
    for (let j = m; j >= 2; j--) {
        const cj = c[j], dj = d[j];
        c[j - 1] -= p * cj;
        d[j - 1] -= pd * cj + p * dj;
        c[j - 2] -= q * cj;
        d[j - 2] -= qd * cj + q * dj;
    }
    const α = c[1], β = c[0], αd = d[1], βd = d[0];
    const R = β * β - p * α * β + q * α * α;
    const Rd = 2 * β * βd - (pd * α * β + p * αd * β + p * α * βd) + (qd * α * α + 2 * q * α * αd);
    let s = 1;
    for (let k = 0; k < m - 1; k++) {
        s *= F2;
    }
    // S = F2^m·R, S′ = m·F2^(m-1)·F2′·R + F2^m·R′
    out[0] = s * F2 * R;
    out[1] = m * s * D2 * R + s * F2 * Rd;
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
function hermiteRoots(f, lb, ub, n, fs, ds) {
    const h = (ub - lb) / n;
    const roots = [];
    const xs = [], vs = [];
    for (let i = 0; i < n; i++) {
        const x0 = lb + h * i, x1 = x0 + h;
        const f0 = fs[i], f1 = fs[i + 1];
        if (!(f0 === f0) || !(f1 === f1)) {
            continue;
        } // NaN (a pole on the grid)
        if (f0 === 0) {
            roots.push(x0);
        }
        const m0 = ds[i] * h, m1 = ds[i + 1] * h;
        // H′(u) = a u² + b u + c on u ∈ [0,1]
        const a = 6 * f0 + 3 * m0 - 6 * f1 + 3 * m1;
        const b = -6 * f0 - 4 * m0 + 6 * f1 - 2 * m1;
        const c = m0;
        xs.length = 0;
        vs.length = 0;
        xs.push(x0);
        vs.push(f0);
        const us = [];
        if (a === 0) {
            if (b !== 0) {
                us.push(-c / b);
            }
        }
        else {
            const D = b * b - 4 * a * c;
            if (D >= 0) {
                const qq = -(b + (b >= 0 ? 1 : -1) * sqrt(D)) / 2;
                us.push(qq / a);
                if (qq !== 0) {
                    us.push(c / qq);
                }
            }
        }
        us.sort((u, v) => u - v);
        for (const u of us) {
            if (u > 0 && u < 1) {
                const x = x0 + u * h;
                xs.push(x);
                vs.push(f(x));
            }
        }
        xs.push(x1);
        vs.push(f1);
        for (let k = 1; k < xs.length; k++) {
            const va = vs[k - 1], vb = vs[k];
            if (va * vb < 0) {
                roots.push(bisectF(f, xs[k - 1], xs[k], va));
            }
        }
        // interior extrema dipping towards zero without a sign change
        for (let k = 1; k < xs.length - 1; k++) {
            const v = vs[k];
            if (v === 0) {
                roots.push(xs[k]);
                continue;
            }
            if (abs(v) < abs(f0) && abs(v) < abs(f1) && v * vs[k - 1] > 0 && v * vs[k + 1] > 0) {
                roots.push(xs[k]);
            }
        }
    }
    if (fs[n] === 0) {
        roots.push(ub);
    }
    return roots;
}
function bisectF(f, a, b, fa) {
    for (let k = 0; k < 40; k++) {
        const m = (a + b) / 2, fm = f(m);
        if (fm === 0) {
            return m;
        }
        if ((fa < 0) !== (fm < 0)) {
            b = m;
        }
        else {
            a = m;
            fa = fm;
        }
    }
    return (a + b) / 2;
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
function maiTs(A, B) {
    const { An, nbx: bx, nby: by } = prep(A, B);
    const g = maiG[`${A.length - 1}3`](implicitCoeffs(An), bx, by); // g[j]: σ-coefficients of π^j
    const Fc = maF_B3(bx, by); // Fc[i][j]: coefficient of σ^i π^j
    const [f0, f1, f2] = [0, 1, 2].map(j => Fc.map(row => row[j] ?? 0));
    const m = g.length - 1;
    const c = new Float64Array(m + 1);
    const res = (σ) => {
        for (let j = 0; j <= m; j++) {
            c[j] = horner(g[j], σ);
        }
        return resultantAt(c, horner(f0, σ), horner(f1, σ), horner(f2, σ));
    };
    // values and derivatives on the grid (each polynomial evaluated at all
    // points first): the Hermite cubic per cell reveals close pairs of roots
    // (and near double roots) inside a cell
    const Gs = g.map(onGrid), Gd = g.map(p => onGrid(pder(p)));
    const F0 = onGrid(f0), F1 = onGrid(f1), F2 = onGrid(f2);
    const D0 = onGrid(pder(f0)), D1 = onGrid(pder(f1)), D2 = onGrid(pder(f2));
    const grid = new Float64Array(GRID + 1), gridD = new Float64Array(GRID + 1);
    const d = new Float64Array(m + 1), out = new Float64Array(2);
    for (let i = 0; i <= GRID; i++) {
        for (let j = 0; j <= m; j++) {
            c[j] = Gs[j][i];
            d[j] = Gd[j][i];
        }
        resultantAtD(c, d, F0[i], F1[i], F2[i], D0[i], D1[i], D2[i], out);
        grid[i] = out[0];
        gridD[i] = out[1];
    }
    const σs = hermiteRoots(res, 0, 2, GRID, grid, gridD);
    const pairs = [];
    for (const σ of σs) {
        // F(σ,π) as a polynomial in π (descending)
        const pc = [2, 1, 0].map(j => Fc.reduceRight((acc, row) => acc * σ + (row[j] ?? 0), 0));
        if (pc.every(x => x === 0)) {
            continue;
        }
        // both s1, s2 real and in [0,1]: σ - 1 ≤ π ≤ σ²/4
        for (const π of rootsSmallDesc(pc, max(0, σ - 1), σ * σ / 4)) {
            pairs.push([σ, π]);
        }
    }
    // test points at the singular points of the σ-projection (depending on
    // `B` only): at a root of `f₂` (a pole: one branch of `F = 0` escapes to
    // infinity) `F` is linear in `π`; at a fold (`f₁² - 4f₂f₀ = 0`) the two
    // branches meet. Solutions close to these are flattened into round-off in
    // the resultant, so Newton (below) is simply started from them as well
    {
        for (const σ of roots01asc(f2, 0, 2)) {
            const F1 = horner(f1, σ);
            if (F1 !== 0) {
                pairs.push([σ, -horner(f0, σ) / F1]);
            }
            // if `f₁` and `f₀` (nearly) vanish here too, `F = 0` (nearly)
            // contains the line `σ = const` (`s1 + s2` constant along the
            // medial axis, as for a parabola): the solutions there come from
            // `G(σ,π) = 0` alone, univariate in `π`
            const gp = g.map(row => horner(row, σ)).reverse(); // descending in π
            for (const π of rootsSmallDesc(gp, max(0, σ - 1), σ * σ / 4)) {
                pairs.push([σ, π]);
            }
        }
        const disc = padd(pmul(f1, f1), pscale(pmul(f2, f0), -4));
        for (const σ of roots01asc(disc, 0, 2)) {
            const F2 = horner(f2, σ);
            if (F2 !== 0) {
                pairs.push([σ, -horner(f1, σ) / (2 * F2)]);
            }
        }
    }
    // the resultant's roots are only accurate to its precision and
    // `(X,Y) = (Nx,Ny)/D` can be sensitive to that, so polish with Newton on
    // `F(σ,π) = G(σ,π) = 0` (coefficient arrays `[σ power][π power]`)
    const Gm = Array.from({ length: g[0].length }, (_, i) => g.map(row => row[i]));
    const [Nx, Ny, D] = maN_B3(bx, by);
    const ts = [];
    for (let [σ, π] of pairs) {
        // (near-double roots make the Jacobian nearly singular and Newton
        // converge only linearly, hence the generous iteration count)
        for (let k = 0; k < 40; k++) {
            const [fv, fσ, fπ] = eval2(Fc, σ, π);
            const [gv, gσ, gπ] = eval2(Gm, σ, π);
            const det = fσ * gπ - fπ * gσ;
            if (det === 0) {
                break;
            }
            const dσ = (fv * gπ - fπ * gv) / det, dπ = (fσ * gv - fv * gσ) / det;
            σ -= dσ;
            π -= dπ;
            if (abs(dσ) <= 1e-16 && abs(dπ) <= 1e-16) {
                break;
            }
        }
        const w = eval2(D, σ, π)[0];
        if (w === 0) {
            continue;
        }
        // the point on the medial axis (in the normalized frame, so use `An`)
        const C = [eval2(Nx, σ, π)[0] / w, eval2(Ny, σ, π)[0] / w];
        ts.push(fastClosest(An, C).t);
    }
    return ts;
}
/**
 * Value and partial derivatives of `Σ M[i][j] x^i y^j` at `(x,y)`.
 */
function eval2(M, x, y) {
    let v = 0, vx = 0, vy = 0;
    for (let i = M.length - 1; i >= 0; i--) {
        const row = M[i];
        let r = 0, ry = 0;
        for (let j = row.length - 1; j >= 0; j--) {
            ry = ry * y + r;
            r = r * y + row[j];
        }
        vx = vx * x + v;
        v = v * x + r;
        vy = vy * x + ry;
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
function maiTsQuad(A, B) {
    const { An, nbx: bx, nby: by } = prep(A, B);
    const p = padd(pmul(bx, bx), pmul(by, by));
    if (p[4] === 0) {
        return [];
    }
    const c = -p[3] / (2 * p[4]);
    if (!(c >= 0 && c <= 2)) {
        return [];
    }
    const g = maiG[`${A.length - 1}2`](implicitCoeffs(An), bx, by); // g[j][i]: σ^i π^j
    const πPoly = g.map(row => horner(row, c));
    const [Nx, Ny, D] = maN_B2(bx, by);
    const ts = [];
    // both s1, s2 real and in [0,1]: c - 1 ≤ π ≤ c²/4
    for (const π of roots01asc(πPoly, max(0, c - 1), c * c / 4)) {
        const w = eval2(D, c, π)[0];
        if (w === 0) {
            continue;
        }
        const C = [eval2(Nx, c, π)[0] / w, eval2(Ny, c, π)[0] / w];
        ts.push(fastClosest(An, C).t);
    }
    return ts;
}
/** The number of sample points (minus 1) of `B` used for upper bounds when scoring candidates. */
const SAMPLES = 16;
/**
 * The number of grid intervals on `σ ∈ [0,2]` for the MA-interiors roots
 * (cubic `B`): no misses in 10800 random tests at 250 or 500, a few at 100.
 */
const GRID = 500;
const gridXs = Float64Array.from({ length: GRID + 1 }, (_, i) => 2 * i / GRID);
/**
 * The tolerance (relative to the curves' size) and maximum number of
 * iterations of the iterative fallback (`hausdorffDistanceOneSidedExtra`) for
 * a cubic `B` with a zero derivative at an end point.
 */
const FALLBACK_TOL = 1e-12;
const FALLBACK_ITERATIONS = 200;
/** `p` (ascending coefficients) evaluated at all grid points (`gridXs`). */
function onGrid(p) {
    const out = new Float64Array(GRID + 1);
    const n = p.length - 1;
    for (let g = 0; g <= GRID; g++) {
        const x = gridXs[g];
        let r = 0;
        for (let i = n; i >= 0; i--) {
            r = r * x + p[i];
        }
        out[g] = r;
    }
    return out;
}
const prepCache = new WeakMap();
/** `Prep` for the curves (memoized by array identity) */
function prep(A, B) {
    let m = prepCache.get(A);
    if (m === undefined) {
        m = new WeakMap();
        prepCache.set(A, m);
    }
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
const derivsCache = new WeakMap();
/** derivative arrays etc. used by `twoVarTs` (memoized per curve pair) */
function derivs(A, B, ax, ay, bx, by, withS) {
    let m = derivsCache.get(A);
    if (m === undefined) {
        m = new WeakMap();
        derivsCache.set(A, m);
    }
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
            r.svx = sOp(bx);
            r.svy = sOp(by);
            r.sp = sOp(padd(pmul(bx, bx), pmul(by, by)));
            r.svdx = pder(r.svx);
            r.svdy = pder(r.svy);
            r.spd = pder(r.sp);
        }
        m.set(B, r);
    }
    return r;
}
const pder = (p) => p.length > 1 ? p.slice(1).map((c, i) => (i + 1) * c) : [0];
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
function twoVarTs(kind, A, B) {
    const table = kind === 'I' ? resI : resMAEI;
    const { nax, nay, nbx, nby, ax, ay, bx, by } = prep(A, B);
    const coeffs = table[`${A.length - 1}${B.length - 1}`](nax, nay, nbx, nby);
    const deg = coeffs.length - 1;
    // (`coeffs` descending; strip leading zeros)
    let lead = 0;
    while (lead < deg && coeffs[lead] === 0) {
        lead++;
    }
    if (coeffs.every(c => c === 0)) {
        return [];
    }
    const sRoots = bernsteinRoots01(coeffs.slice(lead));
    if (sRoots.length === 0) {
        return [];
    }
    const d = derivs(A, B, ax, ay, bx, by, kind === 'MAEI');
    const { adx, ady, addx, addy, bdx, bdy, bddx, bddy, h, hd, svx, svy, sp, svdx, svdy, spd } = d;
    const ts = [];
    for (const s0 of sRoots) {
        const Vdx0 = horner(bdx, s0), Vdy0 = horner(bdy, s0);
        // back-substitution (ascending coefficients in `t`): into `e2 = A′ × B′`
        // for 'I' unless `A` is a line, else into `e1 = A·B′ - h`
        const tPoly = kind === 'I' && A.length > 2
            ? adx.map((c, i) => c * Vdy0 - ady[i] * Vdx0)
            : ax.map((c, i) => c * Vdx0 + ay[i] * Vdy0 - (i === 0 ? horner(h, s0) : 0));
        for (const t0 of roots01asc(tPoly)) {
            // polish with Newton on (f, g) (the resultant's roots are only as
            // accurate as its values); no allocations in the loop
            let t = t0, s = s0;
            for (let k = 0; k < 12; k++) {
                const Ax = horner(ax, t), Ay = horner(ay, t);
                const Adx = horner(adx, t), Ady = horner(ady, t);
                const Vdx = horner(bdx, s), Vdy = horner(bdy, s);
                const Vddx = horner(bddx, s), Vddy = horner(bddy, s);
                const f = Ax * Vdx + Ay * Vdy - horner(h, s);
                const ft = Adx * Vdx + Ady * Vdy;
                const fs = Ax * Vddx + Ay * Vddy - horner(hd, s);
                let g, gt, gs;
                if (kind === 'I') {
                    g = Adx * Vdy - Ady * Vdx;
                    gt = horner(addx, t) * Vdy - horner(addy, t) * Vdx;
                    gs = Adx * Vddy - Ady * Vddx;
                }
                else {
                    const SVx = horner(svx, s), SVy = horner(svy, s);
                    g = -2 * (Ax * SVx + Ay * SVy) + horner(sp, s);
                    gt = -2 * (Adx * SVx + Ady * SVy);
                    gs = -2 * (Ax * horner(svdx, s) + Ay * horner(svdy, s)) + horner(spd, s);
                }
                const det = ft * gs - fs * gt;
                if (det === 0) {
                    break;
                }
                const dt = (f * gs - fs * g) / det, ds = (ft * g - f * gt) / det;
                t -= dt;
                s -= ds;
                if (abs(dt) <= 1e-15 && abs(ds) <= 1e-15) {
                    break;
                }
            }
            ts.push(t >= -1e-9 && t <= 1 + 1e-9 && s >= -1e-9 && s <= 1 + 1e-9
                ? min(1, max(0, t)) : t0);
        }
    }
    return ts;
}
/**
 * `rootsSmall` for descending coefficients that may have leading zeros (and
 * may be the zero polynomial).
 */
function rootsSmallDesc(p, lb, ub) {
    let i = 0;
    while (i < p.length - 1 && p[i] === 0) {
        i++;
    }
    return p.length - i < 2 || !(lb <= ub) ? [] : rootsSmall(p.slice(i), lb, ub);
}
/** Roots in `[lb,ub]` (default `[0,1]`) of a univariate polynomial (ascending coefficients). */
function roots01asc(p, lb = 0, ub = 1) {
    let n = p.length - 1;
    while (n >= 0 && p[n] === 0) {
        n--;
    }
    if (n < 1 || !(lb <= ub)) {
        return [];
    }
    return rootsSmall(p.slice(0, n + 1).reverse(), lb, ub);
}
/**
 * Roots in `[lb,ub]` of a polynomial (descending coefficients, nonzero
 * leading coefficient): closed form for degree ≤ 2 (numerically stable
 * quadratic formula), else Bernstein subdivision (`bernsteinRoots01` on the
 * interval mapped to `[0,1]`). Plain double precision.
 */
function rootsSmall(p, lb, ub) {
    const n = p.length - 1;
    if (n === 1) {
        const x = -p[1] / p[0];
        return x >= lb && x <= ub ? [x] : [];
    }
    if (n === 2) {
        const [a, b, c] = p;
        const D = b * b - 4 * a * c;
        if (D < 0) {
            return [];
        }
        const q = -(b + (b >= 0 ? 1 : -1) * sqrt(D)) / 2;
        const xs = q === 0 ? [0] : [q / a, c / q];
        return xs.filter(x => x >= lb && x <= ub).sort((x, y) => x - y);
    }
    if (lb === 0 && ub === 1) {
        return bernsteinRoots01(p);
    }
    // x = lb + (ub - lb)·u: Taylor shift and scale, then [0,1]
    const w = ub - lb;
    const a = p.slice().reverse(); // ascending
    // shift to lb (synthetic division repeated)
    for (let k = 0; k < n; k++) {
        for (let i = n - 1; i >= k; i--) {
            a[i] += lb * a[i + 1];
        }
    }
    let s = 1;
    for (let i = 0; i <= n; i++) {
        a[i] *= s;
        s *= w;
    }
    return bernsteinRoots01(a.reverse()).map(u => lb + w * u);
}
/**
 * The closest point on `B` to `p` (distance, parameter and point) from the
 * footpoint polynomial with plain (uncertified) root finding - the distance
 * is insensitive to small errors in the parameter (it is stationary there).
 */
function fastClosest(B, p) {
    const poly = B.length === 1 ? [0] : getFootpointPoly(B, p);
    let n0 = 0;
    while (n0 < poly.length - 1 && poly[n0] === 0) {
        n0++;
    }
    const ts = poly.length - n0 > 1 ? rootsSmall(poly.slice(n0), 0, 1) : [];
    ts.push(0, 1);
    let best = Infinity, bt = 0, bp = B[0];
    for (const t of ts) {
        const q = evalDeCasteljau(B, t);
        const dx = q[0] - p[0], dy = q[1] - p[1];
        const d2 = dx * dx + dy * dy;
        if (d2 < best) {
            best = d2;
            bt = t;
            bp = q;
        }
    }
    return { d: sqrt(best), t: bt, p: bp };
}
/**
 * `best` refined by a golden-section search maximizing the true distance
 * `min_s |A(t) - B(s)|` in the window `best.tA ± w` (`steps` steps); `best`
 * itself unless the search finds a larger distance.
 */
function refineMax(A, B, best, w, steps) {
    const g = (t) => fastClosest(B, evalDeCasteljau(A, t)).d;
    const r = 0.6180339887498949;
    let a = max(0, best.tA - w), b = min(1, best.tA + w);
    let m1 = b - r * (b - a), m2 = a + r * (b - a);
    let g1 = g(m1), g2 = g(m2);
    for (let k = 0; k < steps; k++) {
        if (g1 > g2) {
            b = m2;
            m2 = m1;
            g2 = g1;
            m1 = b - r * (b - a);
            g1 = g(m1);
        }
        else {
            a = m1;
            m1 = m2;
            g1 = g2;
            m2 = a + r * (b - a);
            g2 = g(m2);
        }
    }
    const t = (a + b) / 2;
    const pA = evalDeCasteljau(A, t);
    const cp = fastClosest(B, pA);
    return cp.d > best.d
        ? { ...best, d: cp.d, tA: t, pA, tB: cp.t, pB: cp.p }
        : best;
}
/**
 * Returns the one-sided Hausdorff distance `h(A,B) = max_t min_s |A(t) - B(s)|`
 * (and where it is attained) directly, i.e. by evaluating `min_s |A(t) - B(s)|`
 * at a (small) superset of the parameter values `t` where the maximum can be
 * attained, as opposed to the iterative bounding approach of `hausdorffDistance`.
 *
 * Implementation details:
 * * curves of order 0 to 3 (points, lines, quadratics and cubics)
 * * the candidate `t` values are of the following kinds (Kim & McLean):
 *   * `EA`: the endpoints of `A`
 *   * `EB`: points on `A` closest to an endpoint of `B`
 *   * `I`: intersections of `A` and `B`
 *   * `MA-ends`: points on `A` equidistant from both endpoints of `B`
 *   * `MA-end-interior`: points on `A` equidistant from an endpoint of `B` and
 *     a footpoint in the interior of `B`
 *   * `MA-interiors`: points on `A` equidistant from two footpoints in the
 *     interior of `B` (points of the medial axis of `B`)
 * * `B` is first normalized by a similarity transform (`B(0) = 0`,
 *   `B'(0) = (1,0)`) so that the systems' coefficients are polynomials in few
 *   variables; if `B′` is zero at an end point a line or quadratic `B` is
 *   replaced by the lower order curve with the same points, and for a cubic
 *   `B` the iterative `hausdorffDistanceOneSidedExtra` is used instead (with
 *   `kind` `'iterative'`)
 * * the resultants eliminating `s` (for `I` and `MA-end-interior`) are
 *   precomputed exactly (sympy, fraction-free Bareiss) by
 *   `experiments/hausdorff/gen-resultants.py` and evaluated as generated
 *   straight-line code (with common subexpressions eliminated) or as compact
 *   data programs for the larger ones
 * * univariate roots are found in the Bernstein basis on `[0,1]` and polished
 *   by Newton's method
 * * `MA-interiors` for cubic `B` is solved in the symmetric variables
 *   `σ = s1 + s2`, `π = s1*s2` (removing the trivial solutions `s1 = s2`):
 *   `π` is eliminated pointwise (no global resultant), the resulting function
 *   of `σ` (and its derivative) is evaluated on a grid of `GRID` cells and its
 *   roots are found via Hermite cubics per cell (revealing close pairs of
 *   roots); test points are added at the roots of the leading coefficient and
 *   at folds of the projection where the `σ` projection degenerates; each
 *   solution is Newton-polished in `(σ,π)` and the medial axis point is then
 *   mapped to its closest point on `A`
 * * `MA-interiors` for quadratic `B` is solved directly since then `σ` is a
 *   constant
 * * candidates are scored by an upper bound (distance to 17 samples of `B`)
 *   first so that most need no exact closest point; closest points are found
 *   by the roots of the footpoint polynomial
 * * since `min_s |A(t) - B(s)|` has a kink at a medial axis maximum, a winning
 *   medial axis candidate is refined by a golden-section search in
 *   `t ± 1e-4`
 * * plain double precision; no error bounds; in tests the error is typically
 *   around `1e-15` and at worst around `1e-12` (relative to the curves' size)
 * * a few times faster than `hausdorffDistance` (e.g. about `45μs` for two
 *   quadratics and under `1ms` for two cubics)
 *
 * @param A the curve from which the distance is measured, given as an array
 * of its control points, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param B the curve to which the distance is measured
 */
function hausdorffDistanceOneSidedDirect(A, B) {
    // `B′ = 0` at an end point, where the precomputed resultants assume
    // `B′(0) = (1,0)` after normalization (`MA-end-interior` also normalizes
    // `B` reversed, so either end): degenerate lines and quadratics are the
    // same point set as a lower order curve (only `tB` is reparametrized);
    // cubics fall back to the iterative method
    const eq = (p, q) => p[0] === q[0] && p[1] === q[1];
    if (B.length === 2 && eq(B[0], B[1])) {
        return hausdorffDistanceOneSidedDirect(A, [B[0]]);
    }
    if (B.length === 3 && (eq(B[0], B[1]) || eq(B[1], B[2]))) {
        // `B(s) = B₀ + s²(B₂ - B₀)` or `B₂ + (1-s)²(B₀ - B₂)`
        const r = hausdorffDistanceOneSidedDirect(A, [B[0], B[2]]);
        const tB = eq(B[0], B[1]) ? sqrt(r.tB) : 1 - sqrt(1 - r.tB);
        return { ...r, tB };
    }
    if (B.length === 4 && (eq(B[0], B[1]) || eq(B[2], B[3]))) {
        const l = max(maxAbsCoordinate(A), maxAbsCoordinate(B));
        const r = hausdorffDistanceOneSidedExtra(A, B, l * FALLBACK_TOL, FALLBACK_ITERATIONS);
        // (its `d` is a lower bound and `tA` only roughly accurate (~1e-3);
        // 45 steps bring a window of ±1e-3 down to ~1e-12)
        return refineMax(A, B, { ...r, kind: 'iterative' }, 1e-3, 45);
    }
    const cands = [];
    const push = (ts, kind) => {
        for (const t of ts) {
            cands.push({ t, kind });
        }
    };
    push([0, 1], 'EA');
    if (A.length > 1) {
        // (univariate, so plain coefficient arrays - ascending)
        const [ax, ay] = asc(A);
        const dax = ax.slice(1).map((c, i) => (i + 1) * c);
        const day = ay.slice(1).map((c, i) => (i + 1) * c);
        // EB: stationary distance from an endpoint E of B, (A - E)·A′ = 0
        for (const E of [B[0], B[B.length - 1]]) {
            const ex = ax.slice(), ey = ay.slice();
            ex[0] -= E[0];
            ey[0] -= E[1];
            push(roots01asc(padd(pmul(ex, dax), pmul(ey, day))), 'EB');
        }
        if (B.length > 1) {
            // MA-ends: |A - B₀|² = |A - B₁|², i.e. -2A·(B₀ - B₁) + |B₀|² - |B₁|² = 0
            const [b0x, b0y] = B[0];
            const [b1x, b1y] = B[B.length - 1];
            const wx = b0x - b1x, wy = b0y - b1y;
            const e = ax.map((c, i) => -2 * (c * wx + ay[i] * wy));
            e[0] += b0x * b0x + b0y * b0y - b1x * b1x - b1y * b1y;
            push(roots01asc(e), 'MA-ends');
        }
        if (B.length > 1 && !(A.length === 2 && B.length === 2)) {
            // I: (A - B)·B′ = 0 and A′ × B′ = 0
            push(twoVarTs('I', A, B), 'I');
        }
        if (B.length > 2) {
            // MA-end-interior: |A - B(s)|² = |A - E|² and (A - B)·B′ = 0, with
            // the trivial solution `s = 0` divided out (E = B(0); repeat with
            // `B` reversed for `E = B(1)`)
            for (const Bs of [B, B.slice().reverse()]) {
                push(twoVarTs('MAEI', A, Bs), 'MA-end-interior');
            }
            // MA-interiors: two interior footpoints s1 ≠ s2 at equal distance.
            // All three equations are linear in the point `A(t) = (X,Y)`:
            // the two footpoint equations (normal lines of `B` at `s1` and
            // `s2`) give `(X,Y) = (Nx,Ny)/D`; substituting into the third
            // (equal distance, `s1 = s2` divided out) leaves `F(s1,s2) = 0`,
            // and `t` is eliminated by requiring `(X,Y)` to lie on `A`
            // (its implicit form). A 2-variable system in `(s1,s2)` remains.
            if (B.length === 4) {
                // cubic: everything precomputed in `σ = s1 + s2`, `π = s1·s2`
                push(maiTs(A, B), 'MA-interiors');
            }
            else {
                // quadratic: likewise; `F = 0` fixes `σ`, leaving `G` univariate in `π`
                push(maiTsQuad(A, B), 'MA-interiors');
            }
        }
    }
    let best;
    // cheap upper bounds first: the distance from `A(t)` to the nearest of a
    // few sample points of `B` can only exceed the true distance, so the
    // candidates are scored in order of decreasing bound until no remaining
    // bound can beat the best exact distance found
    const samples = Array.from({ length: SAMPLES + 1 }, (_, i) => evalDeCasteljau(B, i / SAMPLES));
    const bounded = cands.map(({ t, kind }) => {
        const pA = evalDeCasteljau(A, t);
        let ub = Infinity;
        for (const q of samples) {
            const dx = pA[0] - q[0], dy = pA[1] - q[1];
            const d2 = dx * dx + dy * dy;
            if (d2 < ub) {
                ub = d2;
            }
        }
        return { t, kind, pA, ub: sqrt(ub) };
    }).sort((a, b) => b.ub - a.ub);
    for (const { t, kind, pA, ub } of bounded) {
        if (best !== undefined && ub <= best.d) {
            break;
        }
        const cp = fastClosest(B, pA);
        if (best === undefined || cp.d > best.d) {
            best = { d: cp.d, tA: t, pA, tB: cp.t, pB: cp.p, kind };
        }
    }
    // final local refinement of a winner at a kink (MA types) by maximizing the
    // true distance: some are ill-conditioned (e.g. near-double roots) with `t`
    // only roughly accurate, and at a kink that error shows linearly in the
    // distance; at smooth maxima (I, EB) it shows only quadratically
    // (a window of ±1e-4: a candidate from a near-double root can be that far
    // off; 35 steps bring it down to ~1e-11)
    if (best.kind.startsWith('MA')) {
        best = refineMax(A, B, best, 1e-4, 35);
    }
    return best;
}
/**
 * Returns the (two-sided) Hausdorff distance `max(h(A,B), h(B,A))` between the
 * given bezier curves directly, together with the parameter values and points
 * on both curves where it is attained (see `hausdorffDistanceOneSidedDirect`
 * for the one-sided version and its implementation details).
 *
 * Implementation details:
 * * curves of order 0 to 3 (points, lines, quadratics and cubics)
 * * two calls to `hausdorffDistanceOneSidedDirect` (candidate enumeration
 *   with precomputed resultants and medial-axis root finding)
 * * plain double precision; no error bounds; in tests the error is typically
 *   around `1e-15` and at worst around `1e-12` (relative to the curves' size)
 *
 * @param A a bezier curve given as an array of its control points, e.g.
 * `[[0,0],[1,1],[2,1],[2,0]]`
 * @param B another bezier curve
 */
function hausdorffDistanceDirect(A, B) {
    const ab = hausdorffDistanceOneSidedDirect(A, B);
    const ba = hausdorffDistanceOneSidedDirect(B, A);
    if (ab.d >= ba.d) {
        return { ...ab, side: 'ab' };
    }
    // `ba` was computed as h(B,A), so its `tA`/`pA` lie on `B` and `tB`/`pB` on `A`
    return { d: ba.d, side: 'ba', tA: ba.tB, pA: ba.pB, tB: ba.tA, pB: ba.pA, kind: ba.kind };
}
export { hausdorffDistanceOneSidedDirect, hausdorffDistanceDirect };
//# sourceMappingURL=hausdorff-distance-direct.js.map