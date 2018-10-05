
import Memoize from 'flo-memoize';


const memoize = Memoize.m1;


/**
 * Returns the power basis representation of the bezier's y-coordinates.
 * This function is memoized on its points parameter by object reference.
 * @param ps - A quadratic bezier, e.g. [[0,0],[1,1],[2,1]]
 */
let getY2 = memoize(function(ps: number[][]): number[] {
	let [[,y0], [,y1], [,y2]] = ps;
	return [
	    y2 - 2*y1 + y0,  // t^2
	    2*y1 - 2*y0,     // t^1
	    y0,              // t^0
	];
});


export { getY2 }
