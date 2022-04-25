/**
 * Returns a cubic bezier curve that is equivalent to the given linear or
 * quadratic bezier curve. Cubics are just returned unaltered. Simply uses
 * `lineToCubic` or `quadraticToCubic` internally.
 *
 * @param ps an order 0,1,2 or 3 bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 *
 * @doc mdx
 */
declare function toCubic(ps: number[][]): number[][];
export { toCubic };
