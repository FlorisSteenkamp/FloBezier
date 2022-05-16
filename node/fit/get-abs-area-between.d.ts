/**
 * Returns the *absolute* area between the two given curves.
 *
 * * **precondition**: the first and last control points of each curve must be equal
 * * **precondition**: neither curve should have self-intersections else the results
 * are ambiguous
 * * can be used as an excellent error measure of the similarity between the two curves
 *
 * @doc mdx
 */
declare function getAbsAreaBetween(ps1: number[][], ps2: number[][]): number;
export { getAbsAreaBetween };
