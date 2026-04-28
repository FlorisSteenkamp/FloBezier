/**
 * Calculates and returns the point (as the `t` value) of intersection of the
 * offset curves of a quadratic bezier curve (if any).
 *
 * * returns `undefined` if no such point exist
 * * offset is in normal direction of curve as `t` goes from `0` to `1`
 * * offset can be negative
 *
 * * see [this Desmos graph (zoom out)](https://www.desmos.com/calculator/eynkl9vzwb)
  *
 * @param ps an order 1,2 or 3 bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 * @param D distance of offset curve (can be negative)
 *
 * @doc mdx
 */
declare function calcQuadOffsetCurveXPoint(ps: number[][], D: number): number[] | undefined;
export { calcQuadOffsetCurveXPoint };
