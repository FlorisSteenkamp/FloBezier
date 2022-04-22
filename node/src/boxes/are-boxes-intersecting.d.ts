/**
 * Returns true if the 2 given axis-aligned rectangular boxes intersect.
 *
 * * **exact** not susceptible to floating point round-off
 *
 * @param closed If true, interpret boxes as being closed (i.e. they contain
 * their border) or open.
 * @param a an axis-aligned rectangular box (given by an array of two [[Point]]s,
 * e.g. `[[1,2], [3,4]]` )
 * @param b another axis-aligned rectangular box
 *
 * @doc mdx curry
 */
declare function areBoxesIntersecting(closed: boolean): (a: number[][], b: number[][]) => boolean;
export { areBoxesIntersecting };
