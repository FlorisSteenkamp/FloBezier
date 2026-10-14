

/** @internal */
const { max } = Math;

/**
 * A dense multivariate (tensor product) polynomial.
 *
 * * `deg[k]` is the maximum degree in variable `k`
 * * coefficients are stored in ascending powers with the last variable
 * varying fastest, i.e. the coefficient of `x₀^i₀ x₁^i₁ ... ` is at flat index
 * `Σ iₖ·stride[k]`
 * * the same structure is used for power basis and Bernstein (over `[0,1]ⁿ`)
 * coefficients
 */
interface TPoly {
    readonly deg: number[];
    readonly c: Float64Array;
}


function strides(deg: number[]): number[] {
    const n = deg.length;
    const s = new Array<number>(n);
    let acc = 1;
    for (let k=n-1; k>=0; k--) { s[k] = acc; acc *= deg[k] + 1; }
    return s;
}


function size(deg: number[]): number {
    return deg.reduce((a, d) => a*(d + 1), 1);
}


function zero(deg: number[]): TPoly {
    return { deg: deg.slice(), c: new Float64Array(size(deg)) };
}


/**
 * Calls `f` for every multi-index (in flat index order). The `idx` array is
 * reused, so copy it if it must be kept.
 */
function forEachIndex(
        deg: number[],
        f: (idx: number[], flat: number) => void) {

    const n = deg.length;
    const idx = new Array<number>(n).fill(0);
    const N = size(deg);
    for (let flat=0; flat<N; flat++) {
        f(idx, flat);
        for (let k=n-1; k>=0; k--) {
            if (idx[k] < deg[k]) { idx[k]++; break; }
            idx[k] = 0;
        }
    }
}


/**
 * Returns the polynomial in `nv` variables that depends only on variable `v`.
 *
 * @param asc the coefficients in ascending powers
 */
function univariate(asc: number[], v: number, nv: number): TPoly {
    const deg = new Array<number>(nv).fill(0);
    deg[v] = asc.length - 1;
    const p = zero(deg);
    const st = strides(deg);
    asc.forEach((a, i) => { p.c[i*st[v]] = a; });
    return p;
}


function constant(a: number, nv: number): TPoly {
    const p = zero(new Array<number>(nv).fill(0));
    p.c[0] = a;
    return p;
}


function add(a: TPoly, b: TPoly): TPoly {
    const deg = a.deg.map((d, k) => max(d, b.deg[k]));
    const r = zero(deg);
    const st = strides(deg);
    for (const p of [a, b]) {
        forEachIndex(p.deg, (idx, flat) => {
            let f = 0;
            for (let k=0; k<idx.length; k++) { f += idx[k]*st[k]; }
            r.c[f] += p.c[flat];
        });
    }
    return r;
}


function scale(a: TPoly, s: number): TPoly {
    return { deg: a.deg.slice(), c: a.c.map(x => x*s) };
}


function sub(a: TPoly, b: TPoly): TPoly {
    return add(a, scale(b, -1));
}


function mul(a: TPoly, b: TPoly): TPoly {
    if (a.deg.length === 2) { return mul2(a, b); }
    const deg = a.deg.map((d, k) => d + b.deg[k]);
    const r = zero(deg);
    const st = strides(deg);
    const n = deg.length;
    forEachIndex(a.deg, (ia, fa) => {
        const ca = a.c[fa];
        if (ca === 0) { return; }
        let base = 0;
        for (let k=0; k<n; k++) { base += ia[k]*st[k]; }
        forEachIndex(b.deg, (ib, fb) => {
            let f = base;
            for (let k=0; k<n; k++) { f += ib[k]*st[k]; }
            r.c[f] += ca*b.c[fb];
        });
    });
    return r;
}


/** `mul` for 2 variables (plain loops; the general version is slow). */
function mul2(a: TPoly, b: TPoly): TPoly {
    const [a0, a1] = a.deg, [b0, b1] = b.deg;
    const r0 = a0 + b0, r1 = a1 + b1;
    const r = zero([r0, r1]);
    const ac = a.c, bc = b.c, rc = r.c;
    const as = a1 + 1, bs = b1 + 1, rs = r1 + 1;
    for (let i=0; i<=a0; i++) {
        for (let j=0; j<=a1; j++) {
            const x = ac[i*as + j];
            if (x === 0) { continue; }
            for (let k=0; k<=b0; k++) {
                const base = (i + k)*rs + j;
                const bo = k*bs;
                for (let l=0; l<=b1; l++) { rc[base + l] += x*bc[bo + l]; }
            }
        }
    }
    return r;
}


/** Returns the partial derivative with respect to variable `v`. */
function derivative(a: TPoly, v: number): TPoly {
    const deg = a.deg.slice();
    if (deg[v] === 0) { return zero(deg); }
    deg[v]--;
    const r = zero(deg);
    const st = strides(deg);
    forEachIndex(a.deg, (idx, flat) => {
        const i = idx[v];
        if (i === 0) { return; }
        let f = 0;
        for (let k=0; k<idx.length; k++) {
            f += (k === v ? i - 1 : idx[k])*st[k];
        }
        r.c[f] += i*a.c[flat];
    });
    return r;
}


/** Evaluates a power basis polynomial at `x`. */
function evaluate(a: TPoly, x: number[]): number {
    if (a.deg.length === 2) {
        // nested Horner with plain loops (the general version is slow)
        const [d0, d1] = a.deg;
        const c = a.c, s = d1 + 1, x0 = x[0], x1 = x[1];
        let r = 0;
        for (let i=d0; i>=0; i--) {
            let q = 0;
            const o = i*s;
            for (let j=d1; j>=0; j--) { q = q*x1 + c[o + j]; }
            r = r*x0 + q;
        }
        return r;
    }
    // nested Horner, last variable innermost
    const n = a.deg.length;
    const st = strides(a.deg);
    const rec = (k: number, base: number): number => {
        if (k === n) { return a.c[base]; }
        let r = 0;
        for (let i=a.deg[k]; i>=0; i--) {
            r = r*x[k] + rec(k + 1, base + i*st[k]);
        }
        return r;
    };
    return rec(0, 0);
}


/** Returns the binomial coefficient `n choose k`. */
function binom(n: number, k: number): number {
    let r = 1;
    for (let i=1; i<=k; i++) { r = r*(n - k + i)/i; }
    return r;
}


/** Applies `f` to every fiber of `a` along axis `v` (in place). */
function forEachFiber(
        a: TPoly,
        v: number,
        f: (vals: number[]) => number[]): TPoly {

    const r = { deg: a.deg.slice(), c: a.c.slice() };
    const st = strides(a.deg);
    const n = a.deg[v];
    forEachIndex(a.deg, (idx, flat) => {
        if (idx[v] !== 0) { return; }
        const vals: number[] = [];
        for (let i=0; i<=n; i++) { vals.push(a.c[flat + i*st[v]]); }
        const out = f(vals);
        for (let i=0; i<=n; i++) { r.c[flat + i*st[v]] = out[i]; }
    });
    return r;
}


/** Converts power basis coefficients to Bernstein coefficients over `[0,1]ⁿ`. */
function toBernstein(a: TPoly): TPoly {
    let r = a;
    for (let v=0; v<a.deg.length; v++) {
        const n = a.deg[v];
        if (n === 0) { continue; }
        r = forEachFiber(r, v, vals => {
            const out: number[] = [];
            for (let i=0; i<=n; i++) {
                let s = 0;
                for (let j=0; j<=i; j++) { s += binom(i, j)/binom(n, j)*vals[j]; }
                out.push(s);
            }
            return out;
        });
    }
    return r;
}


/**
 * Splits Bernstein coefficients at the midpoint of axis `v` (de Casteljau).
 */
function subdivide(b: TPoly, v: number): [TPoly, TPoly] {
    const n = b.deg[v];
    if (n === 0) { return [b, b]; }
    const right: number[][] = [];
    const left = forEachFiber(b, v, vals => {
        const tmp = vals.slice();
        const L = new Array<number>(n + 1);
        const R = new Array<number>(n + 1);
        L[0] = tmp[0]; R[n] = tmp[n];
        for (let r=1; r<=n; r++) {
            for (let i=0; i<=n-r; i++) { tmp[i] = (tmp[i] + tmp[i+1])/2; }
            L[r] = tmp[0];
            R[n-r] = tmp[n-r];
        }
        right.push(R);
        return L;
    });
    let i = 0;
    const rightP = forEachFiber(b, v, () => right[i++]);
    return [left, rightP];
}


export type { TPoly }
export {
    strides, zero, forEachIndex, univariate, constant, add, sub, scale, mul,
    derivative, evaluate, toBernstein, subdivide
}
