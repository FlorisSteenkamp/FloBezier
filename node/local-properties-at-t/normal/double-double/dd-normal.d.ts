/**
 * * Returns a normal vector (not necessarily of unit length) of a bezier curve
 * at a specific given parameter value `t` by simply taking the `tangent` at
 * that point and rotating it by 90 degrees.
 *
 * @param ps a linear, quadratic or cubic bezier, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param t the `t` parameter
 *
 * @doc mdx
 */
declare function ddNormal(ps: number[][], t: number): number[][];
export { ddNormal };
