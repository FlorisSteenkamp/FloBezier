import { getXBoundsTight } from "./get-x-bounds-tight.js";
import { getYBoundsTight } from "./get-y-bounds-tight.js";


/**
 * Returns a tight axis-aligned bounding box of the given order bezier curve.
 * 
 * * **certified:** the box is guaranteed to engulf the given bezier curve.
 * 
 * * returns the box in the form `[[minX, minY], [maxX, maxY]`
 * 
 * @param ps an order 1, 2 or 3 bezier curve given as an array of its control 
 * points, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 * 
 * @doc mdx
 */
function getBoundingBox(ps: number[][]): number[][] {
	const xBounds = getXBoundsTight(ps);
	const yBounds = getYBoundsTight(ps);

	return [
		[xBounds.minX.box[0][0], yBounds.minY.box[0][1]],
		[xBounds.maxX.box[1][0], yBounds.maxY.box[1][1]]
	];
}


export { getBoundingBox }
