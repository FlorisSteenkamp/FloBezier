/**
 * Returns a function that returns the signed distance to the given line from
 * the given point.
 *
 * @param pS a point on the line
 * @param pE a different point on the line; if `pS` is the same as `pE` then
 * the distance to the point `pS` (or `pE`) will be returned.
 */
declare function getDistanceToLineFunction(pS: number[], pE: number[]): (p: number[]) => number;
export { getDistanceToLineFunction };
