/**
 * Returns the x value of the twice differentiated (with respect to t) cubic
 * bezier when evaluated at t. This function is curried.
 * @param ps a cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param t the t parameter
 * @returns
 */
declare function evaluateDdxy(ps: number[][], t: number): number[];
declare function evaluateDdxy(ps: number[][]): (t: number) => number[];
export { evaluateDdxy };
