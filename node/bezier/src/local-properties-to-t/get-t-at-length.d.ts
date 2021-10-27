/**
 * Returns the `t` parameter value where the given bezier curve reaches the
 * given length `s` starting from `t = 0` and clipping at `t = 1.125`.
 * This function is curried.
 *
 * @param ps a linear, quadratic or cubic bezier curve, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param s the length
 *
 * @doc mdx
 */
declare function getTAtLength(ps: number[][], s: number): number;
declare function getTAtLength(ps: number[][]): (s: number) => number;
export { getTAtLength };
