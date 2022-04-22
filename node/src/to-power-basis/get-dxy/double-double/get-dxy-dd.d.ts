/**
 * Returns the derivative of the power basis representation of a bezier
 * curve of order cubic or less (with intermediate calculations done in
 * double-double precision).
 *
 * * returns the resulting power basis x and y coordinate polynomials from
 * highest power to lowest, e.g. if `x(t) = at^2 + bt + c`
 * and `y(t) = dt^2 + et + f` then  the result is returned
 * as `[[a,b,c],[d,e,f]]`, where the `a,b,c,...` are in double-double precision
 *
 * @param ps an order 0,1,2 or 3 bezier curve given by an ordered array of its
 * control points, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 *
 * @doc
 */
declare function getDxyDd(ps: number[][]): number[][][];
/** @internal */
declare function getDxy3Dd(ps: number[][]): number[][][];
/** @internal */
declare function getDxy2Dd(ps: number[][]): number[][][];
/** @internal */
declare function getDxy1Dd(ps: number[][]): number[][][];
export { getDxyDd, getDxy1Dd, getDxy2Dd, getDxy3Dd };
