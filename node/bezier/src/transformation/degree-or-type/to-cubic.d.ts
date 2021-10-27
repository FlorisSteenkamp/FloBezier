/**
 * Returns a cubic bezier curve that is equivalent to the given linear or
 * quadratic bezier curve. Cubics are just returned unaltered.
 *
 * @param ps An order 1, 2 or 3 bezier curve
 *
 * @doc mdx
 */
declare function toCubic(ps: number[][]): number[][];
export { toCubic };
