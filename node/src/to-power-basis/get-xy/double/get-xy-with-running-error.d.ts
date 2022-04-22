/**
 * Returns the power basis representation of a bezier curve of order cubic or
 * less (with intermediate calculations done in double precision) including a
 * coefficient-wise absolute error bound that need to be multiplied by `γ(1)`
 *
 * * returns the resulting power basis x and y coordinate polynomials from
 * highest power to lowest, e.g. if `x(t) = at^2 + bt + c`
 * and `y(t) = dt^2 + et + f` then  the result is returned
 * as `[[a,b,c],[d,e,f]]`
 *
 * @param ps an order 0,1,2 or 3 bezier curve given by an ordered array of its
 * control points, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 *
 * @doc
 */
declare function getXYWithRunningError(ps: number[][]): {
    coeffs: [[number, number, number, number], [number, number, number, number]];
    errorBound: [[number, number, number, 0], [number, number, number, 0]];
} | {
    coeffs: [[number, number, number], [number, number, number]];
    errorBound: [[number, number, 0], [number, number, 0]];
} | {
    coeffs: [[number, number], [number, number]];
    errorBound: [[number, 0], [number, 0]];
} | {
    coeffs: [[number], [number]];
    errorBound: [[0], [0]];
};
/** @internal */
declare function getXY3WithRunningError(ps: number[][]): {
    coeffs: [[number, number, number, number], [number, number, number, number]];
    errorBound: [[number, number, number, 0], [number, number, number, 0]];
};
/** @internal */
declare function getXY2WithRunningError(ps: number[][]): {
    coeffs: [[number, number, number], [number, number, number]];
    errorBound: [[number, number, 0], [number, number, 0]];
};
/** @internal */
declare function getXY1WithRunningError(ps: number[][]): {
    coeffs: [[number, number], [number, number]];
    errorBound: [[number, 0], [number, 0]];
};
export { getXYWithRunningError, getXY1WithRunningError, getXY2WithRunningError, getXY3WithRunningError };
