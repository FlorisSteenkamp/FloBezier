/**
 * Returns a **non-certified**, **rotated**, **tight** bounding box of the given
 * order 1, 2 or 3 bezier curve as four ordered points of a rotated rectangle.
 */
declare let getBoundingBoxTight: (a: number[][]) => number[][];
export { getBoundingBoxTight };
