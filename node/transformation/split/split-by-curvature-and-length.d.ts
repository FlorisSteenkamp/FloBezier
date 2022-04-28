/**
 * Split the given bezier curve into pieces (given as an array of parameter
 * `t` values) such that each piece is flat within a given tolerance (where
 * curvature is measured by the `curviness` function).
 *
 * @param ps an order 0,1,2 or 3 bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 * @param maxCurviness optional; defaults to `0.4 radians`; maximum curviness
 * (must be > 0) as calculated using
 * the `curviness` function (that measures the total angle in radians formed
 * by the vectors formed by the ordered control points)
 * @param maxLength maximum allowed length of any returned piece
 * @param minTSpan optional; defaults to `2**-16`; the minimum `t` span that can
 * be returned for a bezier piece; necessary for cubics otherwise a curve with a
 * cusp would cause an infinite loop
 *
 * @doc
 */
declare function splitByCurvatureAndLength(ps: number[][], maxCurviness?: number, maxLength?: number, minTSpan?: number): number[];
export { splitByCurvatureAndLength };
