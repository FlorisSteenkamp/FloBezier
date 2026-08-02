/**
 * Returns a polynomial whose roots are the `y` coordinates given the `x`
 * coordinate of the given bezier curve.
 *
 * @param ps
 */
declare function getCoeffsYFromX_WithRunningErr(ps: number[][], x: number): {
    coeffs: number[];
    errorBound: number[];
} | undefined;
export { getCoeffsYFromX_WithRunningErr };
