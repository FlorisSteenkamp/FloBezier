
// NOTE (experiment result): this does NOT pay off for the MA-interiors
// resultant. Its values are tiny results of large cancelling terms, and with
// the dependency problem of interval arithmetic the bounds on `R′` are far too
// loose (even on coarse cells) to discard cells - a median of 1800-5800
// cell/grid evaluations versus 2001 for the plain fixed grid. Kept for
// reference; tighter enclosures (Taylor models, affine or double-double
// interval arithmetic) would be needed for a cheap guarantee.


/** @internal */
const { abs, max, min } = Math;


/**
 * Adaptive root isolation for the MA-interiors resultant
 * `R(σ) = β² - pαβ + qα²` where, at each `σ`, `G(π) = Σ cⱼ(σ)πʲ` is reduced
 * modulo the monic `π² + pπ + q` (`p = f₁/f₂`, `q = f₀/f₂`) to `απ + β`
 * (`R` has the roots of `Res_π(F,G)` plus poles at the roots of `f₂`).
 *
 * Cells of `[lb,ub]` are discarded only when an interval bound proves they hold
 * no root (up to rounding): with the mean value form
 * `R(cell) ⊆ R(mid) + R′(cell)·[-r,r]` (`R′(cell)` by interval arithmetic on
 * value/derivative pairs through the reduction). A cell where `R′` keeps its
 * sign holds at most one root (found by bisection if `R` changes sign);
 * other cells are halved down to `tol` and then reported (clusters, near
 * double roots, poles) - the caller polishes / verifies candidates.
 *
 * @param cs the polynomials `cⱼ` (ascending coefficients in `σ`)
 * @param f the polynomials `[f₀, f₁, f₂]`
 */
function adaptiveRoots(
        cs: number[][],
        f: number[][],
        lb: number, ub: number,
        n0 = 32, levels = 6): number[] {

    const m = cs.length - 1;
    const polys = [...cs, ...f];
    const derivs = polys.map(p => p.length > 1 ? p.slice(1).map((c, i) => (i + 1)*c) : [0]);
    const np = polys.length;

    // ---- point evaluation of R
    const c = new Float64Array(m + 1);
    const R = (x: number): number => {
        for (let j=0; j<=m; j++) { c[j] = horner(cs[j], x); }
        const F2 = horner(f[2], x);
        const p = horner(f[1], x)/F2, q = horner(f[0], x)/F2;
        for (let j=m; j>=2; j--) { const cj = c[j]; c[j-1] -= p*cj; c[j-2] -= q*cj; }
        const α = c[1], β = c[0];
        return β*β - p*α*β + q*α*α;
    };

    // ---- interval enclosure of R′ on [a,b] (0 ≤ a ≤ b): value/derivative
    // interval pairs, stored as [vlo, vhi, dlo, dhi] in flat scratch arrays
    const V = new Float64Array(4*np);   // per polynomial
    const C = new Float64Array(4*(m + 1));
    const Rp = (a: number, b: number): [number, number] => {
        for (let k=0; k<np; k++) {
            hornerIv(polys[k], a, b, V, 4*k);
            hornerIv(derivs[k], a, b, V, 4*k + 2);
        }
        for (let j=0; j<=m; j++) {
            C[4*j] = V[4*j]; C[4*j+1] = V[4*j+1]; C[4*j+2] = V[4*j+2]; C[4*j+3] = V[4*j+3];
        }
        const o0 = 4*(m + 1), o1 = o0 + 4, o2 = o1 + 4;   // f₀, f₁, f₂
        // p = f₁/f₂, q = f₀/f₂ (with derivatives); f₂ ∋ 0 → unbounded
        if (V[o2] <= 0 && V[o2+1] >= 0) { return [-Infinity, Infinity]; }
        const P = divAD(V, o1, V, o2), Q = divAD(V, o0, V, o2);
        for (let j=m; j>=2; j--) {
            // c[j-1] -= p c[j]; c[j-2] -= q c[j]
            const pc = mulAD(P, 0, C, 4*j), qc = mulAD(Q, 0, C, 4*j);
            subInto(C, 4*(j-1), pc); subInto(C, 4*(j-2), qc);
        }
        // R = β² - pαβ + qα² with α = C[1], β = C[0]
        const ββ = mulAD(C, 0, C, 0);
        const αβ = mulAD(C, 4, C, 0);
        const αα = mulAD(C, 4, C, 4);
        const t1 = mulAD(P, 0, αβ, 0), t2 = mulAD(Q, 0, αα, 0);
        // derivative interval only
        const dlo = ββ[2] - t1[3] + t2[2], dhi = ββ[3] - t1[2] + t2[3];
        return [dlo, dhi];
    };

    const roots: number[] = [];
    // cells (as grid indices at spacing `h`) that could not be resolved
    const unresolved: number[] = [];
    const h = (ub - lb)/(n0*2**levels);
    const stack: number[] = [];
    const h0 = (ub - lb)/n0;
    for (let i=n0-1; i>=0; i--) { stack.push(lb + h0*i, lb + h0*(i + 1)); }
    while (stack.length) {
        const b = stack.pop()!, a = stack.pop()!;
        const mid = (a + b)/2, r = (b - a)/2;
        const [dlo, dhi] = Rp(a, b);
        if (Number.isFinite(dlo) && Number.isFinite(dhi)) {
            const Rm = R(mid);
            // no root: R(cell) ⊆ R(mid) + R′(cell)·[-r,r] excludes 0
            if (abs(Rm) > max(abs(dlo), abs(dhi))*r) { continue; }
            if (dlo > 0 || dhi < 0) {
                // monotone: at most one root
                const Ra = R(a), Rb = R(b);
                if (Ra === 0) { roots.push(a); continue; }
                if (Ra*Rb > 0) { continue; }
                roots.push(bisect(R, a, b, Ra));
                continue;
            }
        }
        if (b - a <= h*1.5) { unresolved.push(Math.round((a - lb)/h)); continue; }
        stack.push(mid, b, a, mid);
    }

    // unresolved cells: the fine grid treatment (sign changes and local minima
    // of |R|) on each run of consecutive cells
    unresolved.sort((x, y) => x - y);
    for (let i=0; i<unresolved.length; ) {
        let j = i;
        while (j + 1 < unresolved.length && unresolved[j + 1] === unresolved[j] + 1) { j++; }
        // grid points unresolved[i] .. unresolved[j] + 1, padded by one on each side
        const i0 = max(0, unresolved[i] - 1), i1 = min(n0*2**levels, unresolved[j] + 2);
        const n = i1 - i0;
        const fs = new Float64Array(n + 1);
        for (let k=0; k<=n; k++) { fs[k] = R(lb + h*(i0 + k)); }
        roots.push(...gridRoots(R, lb + h*i0, h, fs));
        i = j + 1;
    }
    return roots;
}


/**
 * Sign changes (bisection) and local minima of `|f|` without a sign change
 * (golden section; (near) double roots) on grid values `fs` at `x0 + h·i`.
 */
function gridRoots(f: (x: number) => number, x0: number, h: number, fs: Float64Array): number[] {
    const roots: number[] = [];
    const n = fs.length - 1;
    for (let i=0; i<=n; i++) {
        const f1 = fs[i];
        if (f1 === 0) { roots.push(x0 + h*i); continue; }
        if (i === 0) { continue; }
        const f0 = fs[i-1];
        if (f0*f1 < 0) { roots.push(bisect(f, x0 + h*(i-1), x0 + h*i, f0)); continue; }
        if (i < n) {
            const a1 = abs(f1);
            if (a1 < abs(f0) && a1 <= abs(fs[i+1]) && f1*fs[i+1] > 0) {
                let a = x0 + h*(i-1), b = x0 + h*(i+1);
                for (let k=0; k<16; k++) {
                    const m1 = a + (b - a)*0.381966, m2 = a + (b - a)*0.618034;
                    if (abs(f(m1)) < abs(f(m2))) { b = m2; } else { a = m1; }
                }
                roots.push((a + b)/2);
            }
        }
    }
    return roots;
}


function horner(p: number[], x: number): number {
    let r = 0;
    for (let i=p.length-1; i>=0; i--) { r = r*x + p[i]; }
    return r;
}


/** interval Horner of `p` on `[a,b]` (`0 ≤ a ≤ b`) into `out[o]`, `out[o+1]` */
function hornerIv(p: number[], a: number, b: number, out: Float64Array, o: number) {
    let lo = 0, hi = 0;
    for (let i=p.length-1; i>=0; i--) {
        // [lo,hi]·[a,b] with a ≥ 0
        let l: number, h: number;
        if (lo >= 0) { l = lo*a; h = hi*b; }
        else if (hi <= 0) { l = lo*b; h = hi*a; }
        else { l = lo*b; h = hi*b; }
        lo = l + p[i]; hi = h + p[i];
    }
    out[o] = lo; out[o+1] = hi;
}


/** interval product `[a,b]·[c,d]` */
function imul(a: number, b: number, c: number, d: number): [number, number] {
    const p1 = a*c, p2 = a*d, p3 = b*c, p4 = b*d;
    return [min(p1, p2, p3, p4), max(p1, p2, p3, p4)];
}


/** `(u·w, u′w + uw′)` for value/derivative interval pairs */
function mulAD(U: ArrayLike<number>, ou: number, W: ArrayLike<number>, ow: number): number[] {
    const [vl, vh] = imul(U[ou], U[ou+1], W[ow], W[ow+1]);
    const [d1l, d1h] = imul(U[ou+2], U[ou+3], W[ow], W[ow+1]);
    const [d2l, d2h] = imul(U[ou], U[ou+1], W[ow+2], W[ow+3]);
    return [vl, vh, d1l + d2l, d1h + d2h];
}


/** `(u/w, (u′w - uw′)/w²)` for value/derivative interval pairs (`0 ∉ w`) */
function divAD(U: ArrayLike<number>, ou: number, W: ArrayLike<number>, ow: number): number[] {
    const wl = W[ow], wh = W[ow+1];
    const [vl, vh] = imul(U[ou], U[ou+1], 1/wh, 1/wl);
    const [n1l, n1h] = imul(U[ou+2], U[ou+3], wl, wh);
    const [n2l, n2h] = imul(U[ou], U[ou+1], W[ow+2], W[ow+3]);
    const [w2l, w2h] = imul(wl, wh, wl, wh);
    const [dl, dh] = imul(n1l - n2h, n1h - n2l, 1/max(w2h, 0), 1/max(w2l, 0));
    return [vl, vh, dl, dh];
}


function subInto(C: Float64Array, o: number, x: number[]) {
    C[o] -= x[1]; C[o+1] -= x[0]; C[o+2] -= x[3]; C[o+3] -= x[2];
}


function bisect(f: (x: number) => number, a: number, b: number, fa: number): number {
    for (let k=0; k<52; k++) {
        const m = (a + b)/2, fm = f(m);
        if (fm === 0) { return m; }
        if ((fa < 0) !== (fm < 0)) { b = m; } else { a = m; fa = fm; }
    }
    return (a + b)/2;
}


export { adaptiveRoots }
