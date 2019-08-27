
import { differentiate } from 'flo-poly';
import { memoize } from 'flo-memoize';

import { getY } from './get-y';


/**
 * Returns the derivative of the power basis representation of a line, quadratic
 * or cubic bezier y-coordinates. This function is memoized on its points 
 * parameter by object reference.
 * Returns differentiated power basis polynomial from highest
 * power to lowest, e.g. at^2 + bt + c is returned as [a,b,c].
 * @param ps An order 1,2 or 3 bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 */
//let getDy = /*memoize*/((ps: number[][]) => differentiate(getY(ps)));

/**
 * Returns the derivative of the power basis representation of a line, quadratic
 * or cubic bezier's y-coordinates. 
 * 
 * Bitlength: If the coordinates of the control points are grid-aligned then
 * max bitlength increase === max shift === 5 (for cubics)
 * max bitlength increase === max shift === 3 (for quadratics)
 * max bitlength increase === max shift === 1 (for lines)
 * 
 * @param ps An order 1,2 or 3 bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 */
function getDy(ps: number[][]): number[] {
	if (ps.length === 4) {
		let [[,y0], [,y1], [,y2], [,y3]] = ps;
		return [
			3*y3 - 9*y2 + 9*y1 - 3*y0, // t^2 - max bitlength increase 5
			6*y2 - 12*y1 + 6*y0,       // t^1 - max bitlength increase 5
			3*y1 - 3*y0                // t^0 - max bitlength increase 3
		];
	} else if (ps.length === 3) {
		let [[,y0], [,y1], [,y2]] = ps;
		return [
			2*y2 - 4*y1 + 2*y0, // t^1 - max bitlength increase 3
			2*y1 - 2*y0,        // t^0 - max bitlength increase 2
		];
	} else if (ps.length === 2) {
		let [[,y0], [,y1]] = ps;
		return [
			y1 - y0,  // t^0 - max bitlength increase 1
		];
	}
}


export { getDy }
