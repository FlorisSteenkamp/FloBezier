
import { memoize } from "flo-memoize";
import { getBounds } from "./get-bounds";


/**
 * Returns the axis-aligned bounding box of a given bezier.
 * @param ps - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @returns the axis-aligned bounding box in the form
 * [[minx, miny], [maxx,maxy]
 */
let getBoundingBox = memoize(function(ps: number[][]) {
	return getBounds(ps).box;
});


export { getBoundingBox }
