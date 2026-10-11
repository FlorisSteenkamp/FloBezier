/**
 * Returns the *exact* normal vector (not necessarily of unit length) of an
 * order 0,1,2 or 3 bezier curve at a specific parameter `t`, i.e.
 * returns the tangent (the derivative of the bezier curve's power basis
 * evaluated at `t`) rotated by 90 degrees.
 *
 * @param ps a linear, quadratic or cubic bezier, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param t the t parameter
 *
 * @doc
 */
declare function eNormal(ps: number[][], t: number): number[][];
export { eNormal };
