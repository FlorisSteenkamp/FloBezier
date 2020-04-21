/**
 * Returns the intersection of 2 given axis-aligned rectangular boxes.
 * @param a An axis-aligned rectangular box
 * @param a Another axis-aligned rectangular box
 * * **closed**:  interpret boxes as being closed (i.e. they contain their border).
 */
declare function intersectBoxes(a: number[][], b: number[][]): number[][];
export { intersectBoxes };
