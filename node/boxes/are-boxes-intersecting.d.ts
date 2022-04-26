/**
 * Returns `true` if the 2 given axis-aligned rectangular boxes intersect.
 *
 * * **exact**: not susceptible to floating point round-off
 *
 * @param closed if `true`, interpret boxes as being closed (i.e. they contain
 * their border), otherwise open.
 * @param a an axis-aligned rectangular box (given by an array of two points,
 * e.g. `[[1,2], [3,4]]`)
 * @param b another axis-aligned rectangular box
 *
 * @doc mdx
 */
declare function areBoxesIntersecting(closed: boolean, a: number[][], b: number[][]): boolean;
export { areBoxesIntersecting };
