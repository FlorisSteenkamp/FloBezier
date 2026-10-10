/**
 * Returns a polynomial whose roots are the `y` coordinates given the `x`
 * coordinate of the given bezier curve.
 *
 * * the coefficients are returned *exactly* as [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 * expansions
 * * if the given curve is degenerate (i.e. its order is really lower than
 * suggested by the number of control points, e.g. a cubic that is really a
 * quadratic) the higher order coefficients of the returned polynomial will
 * simply be zero
 * * if the given curve degenerates to a point the zero polynomial (all
 * coefficients zero) is returned
 *
 * @param ps an order 1, 2 or 3 bezier curve given as an ordered array of its
 * control points, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param x the `x` coordinate
 */
declare function eGetCoeffsYFromX(ps: number[][], x: number): number[][];
export { eGetCoeffsYFromX };
