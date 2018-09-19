
import Memoize from 'flo-memoize';


const memoize = Memoize.m1;


/**
 * Returns the power basis representation of the bezier's x-coordinates.
 * This function is memoized on its points parameter by object reference.
 * @param ps - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @returns The power basis polynomial from highest power to lowest, 
 * e.g. at^3 + bt^2 + ct + d is returned as [a,b,c,d]
 */
let getX = memoize(function(ps: number[][]): number[] {
	let [[x0,], [x1,], [x2,], [x3,]] = ps;
	return [
	    x3 - 3*x2 + 3*x1 - x0, // t^3
	    3*x2 - 6*x1 + 3*x0,    // t^2
	    3*x1 - 3*x0,           // t^1
	    x0,                    // t^0
	];
});


export { getX }
