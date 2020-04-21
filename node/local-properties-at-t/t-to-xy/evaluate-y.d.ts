/**
 * Returns the y value of the given order 1, 2 or 3 bezier when evaluated at t.
 * This function is curried.
 * @param ps A line segment, quadratic or cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param t The t parameter
 */
declare function evaluateY(ps: number[][]): (t: number) => number;
declare function evaluateY(ps: number[][], t: number): number;
export { evaluateY };
