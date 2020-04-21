/**
 * Returns a flatness measure of the given curve - calculated as the total
 * distance between consecutive control points divided by the distance between
 * the endpoints.
 * @param ps An order 1,2 or 3 bezier curve.
 */
declare function flatness(ps: number[][]): number;
export { flatness };
