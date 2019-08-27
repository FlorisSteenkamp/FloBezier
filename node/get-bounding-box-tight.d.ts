/**
 * Returns the tight bounding box of the given cubic bezier.
 * @returns The tight bounding box of the bezier as four ordered
 * points of a rotated rectangle.
 * TODO - test case of baseLength === 0
 */
declare let getBoundingBoxTight: (a: number[][]) => number[][];
export { getBoundingBoxTight };
