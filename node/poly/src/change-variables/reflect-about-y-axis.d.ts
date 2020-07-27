/**
 * Returns the result of reflecting the given polynomial about the Y-axis, i.e.
 * perform the change of variables: p(x) <- p(-x).
 * @param p a polynomial to reflect
 * @example
 * reflectAboutYAxis([5,4,3,2,1]); //=> [5, -4, 3, -2, 1]
 */
declare function reflectAboutYAxis(p: number[]): number[];
/**
 * Returns the result of reflecting the given polynomial about the Y-axis, i.e.
 * perform the change of variables: p(x) <- p(-x).
 * @param p a polynomial to reflect
 * @example
 * expReflectAboutYAxis([[5],[4],[3],[2],[1]]); //=> [[5], [-4], [3], [-2], [1]]
 */
declare function expReflectAboutYAxis(p: number[][]): number[][];
export { reflectAboutYAxis, expReflectAboutYAxis };
