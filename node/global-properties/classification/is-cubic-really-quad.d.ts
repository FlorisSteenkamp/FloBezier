/**
 * Returns `true` if the given cubic bezier curve is really a quadratic (or
 * lower order) curve in disguise, i.e. it can be represent by a quadratic
 * bezier curve, `false` otherwise.
 *
 * * **exact**: not susceptible to floating point round-off
 *
 * @param ps a cubic bezier curve given as an array of its control points,
 * e.g. `[[1,2],[3,4],[5,6],[7,8]]`
 *
 * @doc mdx
 */
declare function isCubicReallyQuad(ps: number[][]): boolean;
export { isCubicReallyQuad };
