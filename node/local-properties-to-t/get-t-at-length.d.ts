/**
 * Returns the t parameter value where the given cubic bezier reaches the given
 * length, s, starting from t = 0. This function is curried.
 * @param ps - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param s - The length
 */
declare function getTAtLength(ps: number[][], s: number): number;
declare function getTAtLength(ps: number[][]): (s: number) => number;
export { getTAtLength };
