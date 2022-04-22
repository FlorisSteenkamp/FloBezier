/**
 * * **precondition**: the given value must be a perfect cube
 *
 * @param a the rational value for which the square root is sought given as
 * `[N,D]` to represent the value `N/D` where `N` and `D` are Shewchuk
 * expansions
 *
 * @internal
 */
declare function calcExactCubeRoot(a: number[][]): number[][];
export { calcExactCubeRoot };
