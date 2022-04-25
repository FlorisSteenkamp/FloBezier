/**
 * Returns a quadratic approximation to the given cubic bezier curve.
 *
 * * the initial and final control points of the resulting bezier coincide with
 * that of the curve being approximated
 *
 * * if `preserveTangents` is `true` and the cubic's initial and final tangents
 * are parallel (and not coincident) then `undefined` is returned
 *
 * @param ps a cubic bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 * @param preserveTangents defaults to `false`; if `true` then the approximation
 * must also preserve the tangents of the cubic at the initial and final control
 * points
 *
 * @doc mdx
 */
declare function cubicToQuadratic(ps: number[][], preserveTangents?: boolean): number[][] | undefined;
export { cubicToQuadratic };
