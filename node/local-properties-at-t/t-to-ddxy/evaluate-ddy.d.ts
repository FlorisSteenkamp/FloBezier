/**
 * Returns the y value of the twice differentiated (with respect to t) cubic
 * bezier when evaluated at t. This function is curried.
 * @param ps - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param t - The t parameter
 * @returns
 */
declare function evaluateDdy(ps: number[][], t: number): number;
declare function evaluateDdy(ps: number[][]): (t: number) => number;
export { evaluateDdy };
