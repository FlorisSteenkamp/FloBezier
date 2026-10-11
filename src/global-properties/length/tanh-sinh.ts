const { abs, sinh, cosh, exp, PI: π } = Math;


/**
 * Numerically integrates the given function over the given interval using
 * tanh-sinh (double exponential) quadrature and additionally returns an
 * estimate of the absolute error.
 *
 * * particularly suited to integrands with (near) singularities at the
 * endpoints of the integration interval (such as the speed of a bezier curve
 * near a cusp) since the abscissae cluster double exponentially towards the
 * endpoints
 * * the integrand is never evaluated exactly at the endpoints
 * * the number of abscissae is (roughly) doubled with each level until the
 * difference between successive levels is below the given tolerance (or the
 * maximum level is reached)
 * * see e.g. [Bailey, Jeyabalan, Li - A comparison of three high-precision quadrature schemes](https://www.davidhbailey.com/dhbpapers/quadrature.pdf)
 *
 * @param f the function to integrate
 * @param a the lower integration limit
 * @param b the upper integration limit
 * @param tolerance the absolute error tolerance
 * @param maxLevel defaults to 8; the maximum level (with roughly `12*2**level`
 * integrand evaluations at the last level)
 *
 * @internal
 */
function tanhSinh(
        f: (t: number) => number,
        a: number,
        b: number,
        tolerance: number,
        maxLevel = 8): { value: number; error: number } {

    const w = b - a;
    const c = (a + b)/2;

    // `S` is the running weighted sum of the integrand at all abscissae at
    // the current level (with spacing `h`), i.e. the integral ≈ `h*S*w/2`.
    let h = 1;
    let S = (π/2)*f(c);  // the center abscissa (k === 0)

    /** adds the terms for `k = start, start + step, ...` to `S` */
    const addTerms = (start: number, step: number) => {
        for (let k=start; ; k+=step) {
            const u = k*h;
            const sh = (π/2)*sinh(u);
            const ch = cosh(sh);
            const wk = (π/2)*cosh(u)/(ch*ch);  // the weight
            // The distance from the endpoints of the abscissae pair -
            // calculated so as to retain full relative precision near the
            // endpoints, i.e. `d = w*(1 - tanh(sh))/2`.
            const d = w/(exp(2*sh) + 1);
            if (!(wk > 1e-30) || d === 0) { return; }  // remaining terms are negligible
            S += wk*(f(a + d) + f(b - d));
        }
    }

    addTerms(1, 1);
    let value = h*S*w/2;
    let error = Infinity;

    for (let level=1; level<=maxLevel; level++) {
        h /= 2;
        addTerms(1, 2);  // only the new (odd) abscissae
        const value_ = h*S*w/2;
        error = abs(value_ - value);
        value = value_;
        if (error <= tolerance) { break; }
    }

    return { value, error };
}


export { tanhSinh }
