/**
 * Returns a quadratic closest to the given cubic bezier by taking the midpoint
 * of the moving line of the hybrid quadratic version of the cubic as the
 * new quadratics middle control point.
 * * the resulting quadratic will be exactly the cubic if the cubic is really
 * a quadratic in disguise and the bit-aligned bitlength of the coordinates of
 * the control points <= 52.
 *
 * @param ps a cubic bezier curve.
 *
 * @doc
 */
declare function toQuadraticFromCubic(ps: number[][]): number[][];
export { toQuadraticFromCubic };
