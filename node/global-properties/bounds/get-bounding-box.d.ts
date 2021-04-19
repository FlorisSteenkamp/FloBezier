/**
 * Returns an axis-aligned bounding box of the given order 2,
 * 3 or 4 bezier.
 * * **certified**
 * @param ps A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @returns the axis-aligned bounding box in the form
 * [[minx, miny], [maxx,maxy]
 */
declare const getBoundingBox: (a: number[][]) => number[][];
export { getBoundingBox };
