/**
 * * this function deprecated due to being the same as JavaScript's
 *   new Array.toReversed() function.
 *
 * Returns the given points (e.g. bezier curve) in reverse order.
 *
 * Implementation details:
 * ```
 * const reverse = ps => ps.slice().reverse()
 * ```
 *
 * @param ps a bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 *
 * @deprecated
 */
declare function reverse(ps: number[][]): number[][];
export { reverse };
