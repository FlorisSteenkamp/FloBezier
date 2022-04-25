/**
 * Returns the derivative of the power basis representation of a
 * bezier curve of order cubic or less (with intermediate calculations done in
 * double precision).
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
declare function toPowerBasis_1stDerivative(ps: number[][]): number[][];
export { toPowerBasis_1stDerivative };
