/**
 * Returns the curve (linear, quadratic or cubic bezier) length in the specified
 * interval. This function is curried.
 * @param ps - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param interval - The paramter interval over which the length is
 * to be calculated (often === [0,1]).
 */
declare function length(interval: number[], ps: number[][]): number;
declare function length(interval: number[]): (ps: number[][]) => number;
export { length };
