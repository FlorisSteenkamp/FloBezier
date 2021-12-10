/**
 * Returns a quadratic approximation to the given cubic bezier curve.
 *
 * * the initial and final control points of the resulting bezier coincide with
 * that of the curve being approximated
 *
 * * if `preserveTangents` is `true` and the cubic's initial and final tangents
 * are parallel then `undefined` is returned
 *
 * @param psCubic a cubic bezier curve.
 * @param preserveTangents defaults to `false`; if `true` then the approximation
 * must also preserve the tangents of the cubic at the initial and final control
 * points
 *
 * @doc
 */
declare function toQuadraticFromCubic(psCubic: number[][], preserveTangents?: boolean): number[][] | undefined;
export { toQuadraticFromCubic };
