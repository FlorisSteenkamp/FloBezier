/**
 * Returns a polynomial whose roots are the `y` coordinates given the `x`
 * coordinate of the given bezier curve.
 *
 * * the coefficient-wise error bound returned still needs to be scaled by
 * `γ1 === u/(1 - u)` to get the actual error bound
 * * an error is thrown if the given curve is not of order 1, 2 or 3
 *
 * @param ps an order 1, 2 or 3 bezier curve given as an ordered array of its
 * control points, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param x the `x` coordinate
 *
 * @doc
 */
declare function getCoeffsYFromX_WithRunningErr(ps: number[][], x: number): {
    coeffs: number[];
    errorBound: number[];
};
export { getCoeffsYFromX_WithRunningErr };
