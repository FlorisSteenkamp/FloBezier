/**
 * Returns the given bezier curve translated (moved) by the given vector.
 *
 * * uses double precision calculations internally
 *
 * @param ps an order 0,1,2 or 3 bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 * @param v the translation vector, e.g. `[3,-2]`
 *
 * @doc mdx
 */
declare function translate(ps: number[][], v: number[]): number[][];
export { translate };
