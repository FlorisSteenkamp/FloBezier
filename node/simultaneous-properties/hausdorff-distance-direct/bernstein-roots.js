/** power → Bernstein conversion matrices (row-major, `(n+1)²`), cached per degree */
const conv = [];
function convMatrix(n) {
    let M = conv[n];
    if (M !== undefined) {
        return M;
    }
    M = new Float64Array((n + 1) * (n + 1));
    // b_i = Σ_{j≤i} C(i,j)/C(n,j) a_j
    for (let i = 0; i <= n; i++) {
        let cij = 1, cnj = 1;
        for (let j = 0; j <= i; j++) {
            M[i * (n + 1) + j] = cij / cnj;
            cij = cij * (i - j) / (j + 1);
            cnj = cnj * (n - j) / (j + 1);
        }
    }
    conv[n] = M;
    return M;
}
/**
 * Real roots in `[0,1]` of a univariate polynomial (power basis, coefficients
 * in *descending* order, as `flo-poly`'s `roots`) by Bernstein subdivision
 * with Descartes' rule of signs: the number of sign changes of the Bernstein
 * coefficients on an interval bounds the number of roots there (with the
 * same parity); `0` - no root, `1` - exactly one root (refined by bisection on
 * the power form), else the interval is halved (de Casteljau).
 *
 * * intervals narrower than `tol` with more than one sign change (clusters or
 * multiple roots) report their midpoint
 * * plain double precision; no error bounds
 */
function bernsteinRoots01(p, tol = 1e-12) {
    const n = p.length - 1;
    if (n < 1) {
        return [];
    }
    // ascending power coefficients
    const a = new Float64Array(n + 1);
    for (let i = 0; i <= n; i++) {
        a[i] = p[n - i];
    }
    const M = convMatrix(n);
    const b = new Float64Array(n + 1);
    for (let i = 0; i <= n; i++) {
        let s = 0;
        const o = i * (n + 1);
        for (let j = 0; j <= i; j++) {
            s += M[o + j] * a[j];
        }
        b[i] = s;
    }
    const roots = [];
    rec(a, n, b, 0, 1, tol, roots);
    return roots;
}
function hornerF(a, n, x) {
    let r = 0;
    for (let i = n; i >= 0; i--) {
        r = r * x + a[i];
    }
    return r;
}
/**
 * The single root in `[x0,x1]` (a sign change is assumed, endpoints may be
 * roots) by the Illinois variant of regula falsi (bracketing, superlinear),
 * falling back to bisection steps if it stalls.
 */
function illinois(a, n, x0, x1) {
    let f0 = hornerF(a, n, x0), f1 = hornerF(a, n, x1);
    if (f0 === 0) {
        return x0;
    }
    if (f1 === 0) {
        return x1;
    }
    let side = 0;
    for (let k = 0; k < 100; k++) {
        let x = (x0 * f1 - x1 * f0) / (f1 - f0);
        // keep strictly inside (and bisect if the secant point is unusable)
        if (!(x > x0 && x < x1)) {
            x = (x0 + x1) / 2;
        }
        const fx = hornerF(a, n, x);
        if (fx === 0 || x1 - x0 <= 2e-16 * (1 + abs(x))) {
            return x;
        }
        if ((fx < 0) === (f1 < 0)) {
            x1 = x;
            f1 = fx;
            if (side === -1) {
                f0 /= 2;
            }
            side = -1;
        }
        else {
            x0 = x;
            f0 = fx;
            if (side === 1) {
                f1 /= 2;
            }
            side = 1;
        }
    }
    return (x0 + x1) / 2;
}
const { abs } = Math;
function rec(a, n, c, lo, hi, tol, roots) {
    // sign changes (ignoring zeros)
    let v = 0, prev = 0;
    for (let i = 0; i <= n; i++) {
        const x = c[i];
        const s = x > 0 ? 1 : x < 0 ? -1 : 0;
        if (s !== 0) {
            if (prev !== 0 && s !== prev) {
                v++;
            }
            prev = s;
        }
    }
    if (v === 0) {
        // an exact zero at an end point
        if (c[0] === 0 && lo === 0) {
            roots.push(0);
        }
        if (c[n] === 0) {
            roots.push(hi);
        }
        return;
    }
    if (v === 1) {
        roots.push(illinois(a, n, lo, hi));
        return;
    }
    if (hi - lo < tol) {
        roots.push((lo + hi) / 2);
        return;
    }
    // de Casteljau at 1/2
    const L = new Float64Array(n + 1), R = new Float64Array(n + 1);
    const t = c.slice();
    L[0] = t[0];
    R[n] = t[n];
    for (let r = 1; r <= n; r++) {
        for (let i = 0; i <= n - r; i++) {
            t[i] = (t[i] + t[i + 1]) / 2;
        }
        L[r] = t[0];
        R[n - r] = t[n - r];
    }
    const mid = (lo + hi) / 2;
    rec(a, n, L, lo, mid, tol, roots);
    rec(a, n, R, mid, hi, tol, roots);
}
export { bernsteinRoots01 };
//# sourceMappingURL=bernstein-roots.js.map