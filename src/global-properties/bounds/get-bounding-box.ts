
import { memoize } from "flo-memoize";
import { getXBoundsTight, getYBoundsTight } from "./get-bounds";


/**
 * Returns an axis-aligned bounding box of the given order 2, 
 * 3 or 4 bezier.
 * * **certified**
 * @param ps A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @returns the axis-aligned bounding box in the form
 * [[minx, miny], [maxx,maxy]
 */
let getBoundingBox = memoize(function(ps: number[][]) {
	let xBounds = getXBoundsTight(ps);
	let yBounds = getYBoundsTight(ps);

	return [
		[xBounds.minX.box[0][0], yBounds.minY.box[0][1]],
		[xBounds.maxX.box[1][0], yBounds.maxY.box[1][1]]
	];
});


export { getBoundingBox }
