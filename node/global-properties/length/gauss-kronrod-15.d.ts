/**
 * Numerically integrates the given function over the given interval using
 * the 15-point Gauss-Kronrod rule (G7K15) and additionally returns an
 * estimate of the absolute error (which is typically a conservative
 * over-estimate).
 *
 * * the error estimate is calculated exactly as in QUADPACK's `qk15`
 * * the 7-point Gauss rule is exact for polynomials up to degree 13 and the
 * 15-point Kronrod rule for polynomials up to degree 22
 *
 * @param f the function to integrate
 * @param a the lower integration limit
 * @param b the upper integration limit
 *
 * @internal
 */
declare function gaussKronrod15(f: (t: number) => number, a: number, b: number): {
    value: number;
    error: number;
};
export { gaussKronrod15 };
