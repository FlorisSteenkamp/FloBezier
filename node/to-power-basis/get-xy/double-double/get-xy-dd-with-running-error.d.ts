/**
 * Returns the power basis representation of a bezier curve of order cubic or
 * less (with intermediate calculations done in double-double precision)
 * including a coefficient-wise absolute error bound that need to be multiplied
 * by `γγ(3)`
 *
 * * returns the power basis x and y coordinate polynomials from highest power
 * to lowest, e.g. if `x(t) = at^3 + bt^2 + ct + d`
 * and `y(t) = et^3 + ft^2 + gt + h` then the result is returned
 * as `[[a,b,c,d],[e,f,g,h]]`, where the `a,b,c,...` are in double-double
 * precision
 *
 * @param ps an order 0,1,2 or 3 bezier curve given by an ordered array of its
 * control points, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 *
 * @doc
 */
declare function getXYDdWithRunningError(ps: number[][]): {
    coeffs: number[][][];
    errorBound: number[][];
};
/** @internal */
declare function getXY3DdWithRunningError(ps: number[][]): {
    coeffs: [[number[], number[], number[], number[]], [number[], number[], number[], number[]]];
    errorBound: [[number, number, number, 0], [number, number, number, 0]];
};
/** @internal */
declare function getXY2DdWithRunningError(ps: number[][]): {
    coeffs: [[number[], number[], number[]], [number[], number[], number[]]];
    errorBound: [[number, 0, 0], [number, 0, 0]];
};
/** @internal */
declare function getXY1DdWithRunningError(ps: number[][]): [[number[], number[]], [number[], number[]]];
export { getXYDdWithRunningError, getXY1DdWithRunningError, getXY2DdWithRunningError, getXY3DdWithRunningError };
