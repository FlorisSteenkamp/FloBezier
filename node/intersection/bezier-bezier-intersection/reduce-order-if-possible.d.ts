/**
 * Returns a reduced order version of the given bezier curve if it can be
 * represented as such without loss.
 *
 * Crucially, the reduced order bezier will have exactly the same `t` values
 * at specific `x` and `y` coordinates as the originals.
 *
 * @param ps1
 * @param ps2
 *
 * @internal
 */
declare function reduceOrderIfPossible(ps: number[][]): number[][];
export { reduceOrderIfPossible };
