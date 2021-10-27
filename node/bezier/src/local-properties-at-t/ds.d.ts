/**
 * Returns `ds` (the length differential) for a linear, quadratic or cubic
 * bezier curve. This function is curried.
 *
 * @param ps an order 1, 2 or 3 bezier, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param t the parameter value
 *
 * @internal
 */
declare function ds(ps: number[][], t: number): number;
declare function ds(ps: number[][]): (t: number) => number;
export { ds };
