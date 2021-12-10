/**
 * Returns the cubic bezier curve with given starting, 2nd and 3rd control
 * points such that there is a self-intersection.
 *
 * **in-exact:** the result may not be exact due to floating point round-off
 *
 * @param ts the 2 t values where the self-intersection should occur
 * @param p0 the bezier's initial control point
 * @param p1 the bezier's 2nd control point
 * @param p2 the bezier's 3rd control point
  *
 * @doc mdx
 */
declare function generateSelfIntersecting(p0: number[], p1: number[], p2: number[], ts: number[]): number[][];
export { generateSelfIntersecting };
