/**
 * Returns a polynomial whose roots are the `y` coordinates given the `x`
 * coordinate of the given bezier curve.
 *
 * * the coefficients are returned in double-double precision
 * * an error is thrown if the given curve is not of order 1, 2 or 3
 * * **precondition**: the given curve must really be of its stated order (e.g.
 * use [[reduceOrderIfPossible]] first); for a degenerate curve (e.g. a cubic
 * that is really a quadratic) all returned coefficients are zero (or, due to
 * round-off, very nearly zero); use [[eGetCoeffsYFromX]] instead which
 * correctly handles degenerate curves
 *
 * @param ps an order 1, 2 or 3 bezier curve given as an ordered array of its
 * control points, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param x the `x` coordinate
 *
 * @doc
 */
declare function ddGetCoeffsYFromX(ps: number[][], x: number): number[][];
export { ddGetCoeffsYFromX };
