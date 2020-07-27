
import { eSum, twoSum, twoDiff } from 'big-float-ts';

const sum = eSum;
const ts = twoSum;
const td = twoDiff;


/**
 * Returns the approximate power basis representation of a line, quadratic or 
 * cubic bezier's y-coordinates. 
 * 
 * If certain preconditions are met (see below) it returns the exact result.
 * 
 * This function is memoized on its points parameter by object reference.
 * 
 * Returns the power basis polynomial from highest power to lowest, 
 * e.g. at^3 + bt^2 + ct + d is returned as [a,b,c,d]
 * 
 * Bitlength: If the coordinates of the control points are grid-aligned then
 * * max bitlength increase === max shift === 4 (for cubics)
 * (due to 'multiplication' by 9 (3x 6x 3x)
 * * max bitlength increase === max shift === 2 (for quadratics)
 * (due to 'multiplication' by 4 (1x 2x 1x)
 * * max bitlength increase === max shift === 1 (for lines)
 * (due to 'multiplication' by 4 (1x 1x)
 * 
 * @param ps An order 1, 2 or 3 bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 */
function getY(ps: number[][]): number[] {
	if (ps.length === 4) {
		let [[,y0], [,y1], [,y2], [,y3]] = ps;
		return [
			y3 + 3*(y1 - y2) - y0, // t^3
			3*(y2 - 2*y1 + y0),    // t^2
			3*(y1 - y0),           // t^1
			y0,                    // t^0
		];
	} else if (ps.length === 3) {
		let [[,y0], [,y1], [,y2]] = ps;
		return [
			y2 - 2*y1 + y0,  // t^2
			2*(y1 - y0),     // t^1
			y0,              // t^0
		];
	} else if (ps.length === 2) {
		let [[,y0], [,y1]] = ps;
		return [
			y1 - y0,  // t^1
			y0,       // t^0
		];
	}
}


function getYExact (ps: number[][]): number[][] {
	if (ps.length === 4) {
		let [[,y0], [,y1], [,y2], [,y3]] = ps;
		return [
			//y3 - 3*y2 + 3*y1 - y0,
			sum([
				[y3], 
				ts(-2*y2, -y2), 
				ts(2*y1, y1),
				[-y0]
			]),
			//3*y2 - 6*y1 + 3*y0,
			sum([
				ts(2*y2, y2),
				ts(-4*y1, -2*y1),
				ts(2*y0, y0),
			]),
			//3*y1 - 3*y0,
			sum([
				ts(2*y1, y1),
				ts(-2*y0, -y0),
			]),
			//y0
			[y0]
		];
	} 
	
	if (ps.length === 3) {
		let [[,y0], [,y1], [,y2]] = ps;
		return [
			//y2 - 2*y1 + y0,
			sum([ [y2], [-2*y1], [y0] ]),
			//2*y1 - 2*y0,
			td(2*y1, 2*y0),
			//y0
			[y0]
		];
	} 
	
	if (ps.length === 2) {
		let [[,y0], [,y1]] = ps;
		return [
			//y1 - y0,
			td(y1, y0),
			//y0
			[y0]
		];
	}
}


export { getY, getYExact }
