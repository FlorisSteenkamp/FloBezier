

/**
 * Returns the 2nd derivative of the power basis representation of a line, 
 * quadratic or cubic bezier's x-coordinates. 
 * 
 * Bitlength: If the coordinates of the control points are grid-aligned then
 * max bitlength increase === max shift === 6 (for cubics)
 * max bitlength increase === max shift === 3 (for quadratics)
 * max bitlength increase === max shift === 0 (for lines)
 * 
 * @param ps An order 1,2 or 3 bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 */
function getDdx(ps: number[][]): number[] {
	if (ps.length === 4) {
		let [[x0,], [x1,], [x2,], [x3,]] = ps;
		return [
			6*x3 - 18*x2 + 18*x1 - 6*x0, // t^1 - max bitlength increase 6
			6*x2 - 12*x1 + 6*x0          // t^0 - max bitlength increase 5
		];
	} else if (ps.length === 3) {
		let [[x0,], [x1,], [x2,]] = ps;
		return [
			2*x2 - 4*x1 + 2*x0 // t^0 - max bitlength increase 3
		];
	} else if (ps.length === 2) {
		return [0];
	}
}


export { getDdx }