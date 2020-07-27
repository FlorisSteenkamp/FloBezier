/**
 * Returns the intersection of 2 given axis-aligned rectangular boxes.
 *
 * * **exact**
 * * **closed**:  interpret boxes as being closed (i.e. they contain their border).
 *
 * @param a an axis-aligned rectangular box
 * @param a another axis-aligned rectangular box
 */
declare function intersectBoxes(a: number[][], b: number[][]): number[][];
export { intersectBoxes };
