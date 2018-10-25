
import { memoize } from 'flo-memoize';


/**
 * Returns the power basis representation of the bezier's y-coordinates.
 * This function is memoized on its points parameter by object reference.
 * @param ps - A bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 */
let getY = memoize(function(ps: number[][]): number[] {
	let [[,y0], [,y1], [,y2], [,y3]] = ps;
	return [
	    y3 - 3*y2 + 3*y1 - y0, // t^3
	    3*y2 - 6*y1 + 3*y0,    // t^2
	    3*y1 - 3*y0,           // t^1
	    y0,                    // t^0
	];
});


export { getY }
