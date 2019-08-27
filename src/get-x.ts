
import { memoize } from 'flo-memoize';


/**
 * Returns the approximate power basis representation of a line, quadratic or 
 * cubic bezier's x-coordinates. 
 * 
 * If certain preconditions are met (see below) it returns the exact result.
 * 
 * This function is memoized on its points parameter by object reference.
 * 
 * Returns the power basis polynomial from highest power to lowest, 
 * e.g. at^3 + bt^2 + ct + d is returned as [a,b,c,d]
 * 
 * Bitlength: If the coordinates of the control points are grid-aligned then
 * max bitlength increase === max shift === 4 (for cubics)
 * (due to 'multiplication' by 9 (3x 6x 3x)
 * max bitlength increase === max shift === 2 (for quadratics)
 * (due to 'multiplication' by 4 (1x 2x 1x)
 * max bitlength increase === max shift === 1 (for lines)
 * (due to 'multiplication' by 4 (1x 1x)
 * 
 * @param ps An order 1, 2 or 3 bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 */
function getX(ps: number[][]): number[] {
	if (ps.length === 4) {
		let [[x0,], [x1,], [x2,], [x3,]] = ps;
		return [
			x3 - 3*x2 + 3*x1 - x0, // t^3 - max bitlength increase 3
			3*x2 - 6*x1 + 3*x0,    // t^2 - max bitlength increase 4
			3*x1 - 3*x0,           // t^1 - max bitlength increase 3
			x0,                    // t^0 - max bitlength increase 0
		];
	} else if (ps.length === 3) {
		let [[x0,], [x1,], [x2,]] = ps;
		return [
			x2 - 2*x1 + x0,  // t^2 - max bitlength increase 2
			2*x1 - 2*x0,     // t^1 - max bitlength increase 2
			x0,              // t^0 - max bitlength increase 0
		];
	} else if (ps.length === 2) {
		let [[x0,], [x1,]] = ps;
		return [
			x1 - x0,  // t^1 - max bitlength increase 1
			x0,       // t^0 - max bitlength increase 0
		];
	}
}


export { getX }
