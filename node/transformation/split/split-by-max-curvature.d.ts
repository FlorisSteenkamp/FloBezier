/**
 * Split the order 0,1,2 or 3 bezier curve into pieces (given as an array of
 * parameter `t` values) such that each piece is flat within a given tolerance
 * given by the `flatness` function.
 *
 * @param ps
 * @param tolerance maximum tolerance (must be > 1) for the flatness measure;
 * defaults to `1.01`
 * @param minTSpan the minimum `t` span that can be returned for a bezier piece;
 * necessary for cubics otherwise a curve with a cusp would cause an infinite
 * loop; defaults to `2**-20`
 *
 * @doc
 */
declare function splitByMaxCurvature(ps: number[][], tolerance?: number, minTSpan?: number): number[];
export { splitByMaxCurvature };
