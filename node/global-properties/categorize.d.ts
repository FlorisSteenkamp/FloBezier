/**
 * Categorizes the given cubic bezier curve according to whether it has a loop,
 * a cusp, or zero, one or two inflection points all of which are mutually
 * exclusive.
 *
 * See <a href="http://graphics.pixar.com/people/derose/publications/CubicClassification/paper.pdf">
 * this</a> paper.
 * @param ps A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @returns A value of 'L', 'C', '0', '1', or '2' depending on whether
 * the curve has a loop, a cusp, or zero, one or two inflection points.
 */
declare function categorize(ps: number[][]): void;
