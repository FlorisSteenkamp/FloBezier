/**
 * Returns the intersection of 2 given axis-aligned rectangular boxes (or
 * `undefined` if they don't intersect).
 *
 * * **exact** - not susceptible to floating point round-off
 * * **closed** - interpret boxes as being closed (i.e. they contain their border).
 *
 * @param a an axis-aligned rectangular box (given by an array of two [[Point]]s,
 * e.g. `[[1,2], [3,4]]` )
 * @param b another box
 *
 * @doc mdx
 */
declare function intersectBoxes(a: number[][], b: number[][]): number[][] | undefined;
export { intersectBoxes };
