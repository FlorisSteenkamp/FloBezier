/**
 * Calculates and returns the parameter values `[tS, tE]` (with `tS < tE`) at
 * which the offset curve of the given *quadratic* bezier curve intersects
 * itself (if at all), i.e. the offset curve point at `tS` coincides with the
 * offset curve point at `tE`.
 *
 * * returns `undefined` if no such self-intersection exists (e.g. if `|D|` is
 * smaller than the minimum radius of curvature of the curve) or if the
 * self-intersection is not within the (slightly extended) parameter range
 * `[-0.125, 1.125]`
 * * offset is in the normal direction of the curve as `t` goes from `0` to `1`
 * * offset can be negative
 * * an error is thrown if the given curve is not quadratic
 *
 * * see [this Desmos graph (zoom out)](https://www.desmos.com/calculator/eynkl9vzwb)
 *
 * @param ps a quadratic bezier curve given as an ordered array of its
 * control points, e.g. `[[0,0],[1,1],[2,0]]`
 * @param D distance of offset curve (can be negative)
 *
 * @doc mdx
 */
declare function calcQuadOffsetCurveXPoint(ps: number[][], D: number): number[] | undefined;
export { calcQuadOffsetCurveXPoint };
