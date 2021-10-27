/**
 * Returns a normal vector (not necessarily of unit length) of an order 1, 2
 * or 3 bezier curve at a specific given parameter value `t`.
 * This function is curried.
 *
 * @param ps a linear, quadratic or cubic bezier given by its control points, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param t the parameter value where the normal should be evaluated
 *
 * @doc mdx
 */
declare function normal(ps: number[][], t: number): number[];
declare function normal(ps: number[][]): (t: number) => number[];
export { normal };
