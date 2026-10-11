/**
 * Returns a polynomial whose roots are the `y` coordinates given the `x`
 * coordinate of the given bezier curve.
 *
 * * the coefficients are returned in double-double precision
 * * the coefficient-wise error bound returned still needs to be scaled by
 * `γγ3 === 3*u*u/(1 - 3*u*u)` to get the actual error bound
 * * an error is thrown if the given curve is not of order 1, 2 or 3
 *
 * @param ps an order 1, 2 or 3 bezier curve given as an ordered array of its
 * control points, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param x the `x` coordinate
 *
 * @doc
 */
declare function ddGetCoeffsYFromX_WithRunningErr(ps: number[][], x: number): {
    coeffs: number[][];
    errorBound: number[];
};
export { ddGetCoeffsYFromX_WithRunningErr };
