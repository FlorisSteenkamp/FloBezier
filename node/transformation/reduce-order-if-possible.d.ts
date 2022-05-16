/**
 * Returns a reduced order version of the given bezier curve *if* it can be
 * represented as such without loss.
 *
 * Crucially, the reduced order bezier will have exactly the same `t` values
 * at specific `x` and `y` coordinates as the original.
 *
 * @param ps an order 0,1,2 or 3 bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 *
 * @doc mdx
 */
declare function reduceOrderIfPossible(ps: number[][]): number[][];
export { reduceOrderIfPossible };
