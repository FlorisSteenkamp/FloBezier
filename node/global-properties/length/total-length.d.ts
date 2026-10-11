/**
 * Returns the total curve length (for a linear, quadratic or cubic bezier
 * curve), i.e. the length in the interval `[0,1]`.
 *
 * * see [[length]] for details
 *
 * @param ps an order 0,1,2 or 3 bezier curve given as an array of its control
 * points, e.g. `[[1,2],[3,4],[5,6],[7,8]]`
 * @param tolerance optional; defaults to `2**-44`; the (approximate) relative
 * error tolerance (only relevant for cubic bezier curves); note that the error
 * estimate used internally is conservative so that the actual error is
 * typically much smaller; values below `2**-45` are clamped to `2**-45`
 *
 * @doc mdx
 */
declare function totalLength(ps: number[][], tolerance?: number): number;
export { totalLength };
