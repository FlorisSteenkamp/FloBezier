/**
 * Returns `true` if the two given bezier curves are exactly equal when compared
 * by value (deep equality)
 *
 * @param ps1 an order 0,1,2 or 3 bezier curve given as an ordered array of its
 * control points, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param ps2 another bezier curve
 *
 * @doc
 */
declare function equal(ps1: number[][], ps2: number[][]): boolean;
export { equal };
