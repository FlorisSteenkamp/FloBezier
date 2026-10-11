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
declare function tanhSinh(f: (t: number) => number, a: number, b: number, tolerance: number, maxLevel?: number): {
    value: number;
    error: number;
};
export { tanhSinh };
