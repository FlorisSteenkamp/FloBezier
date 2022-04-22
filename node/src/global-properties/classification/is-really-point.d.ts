/**
 * Returns `true` if the given bezier curve has all control points coincident,
 * `false` otherwise.
 *
 * @param ps an order 0,1,2 or 3 bezier curve given as an array of its control
 * points, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 */
declare function isReallyPoint(ps: number[][]): boolean;
export { isReallyPoint };
