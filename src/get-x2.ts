
import Memoize from 'flo-memoize';


const memoize = Memoize.m1;


/**
 * Returns the power basis representation of the bezier's x-coordinates.
 * This function is memoized on its points parameter by object reference.
 * @param ps - A quadratic bezier, e.g. [[0,0],[1,1],[2,1]]
 * @returns The power basis polynomial from highest power to lowest, 
 * e.g. at^2 + bt + c is returned as [a,b,c]
 */
let getX2 = memoize(function(ps: number[][]): number[] {
	let [[x0,], [x1,], [x2,]] = ps;
	return [
	    x2 - 2*x1 + x0,  // t^2
	    2*x1 - 2*x0,     // t^1
	    x0,              // t^0
	];
});


export { getX2 }
