
/**
 * Returns the 2nd derivative of the power basis representation of a line, 
 * quadratic or cubic bezier's x and y-coordinates when evaluated at 1.
 * 
 * This is a seperate function because it allows us to make stronger bitlength
 * guarantees.
 * 
 * Bitlength: If the coordinates of the control points are grid-aligned then
 * * max bitlength increase === max shift === 5 (for cubics)
 * * max bitlength increase === max shift === 3 (for quadratics)
 * * max bitlength increase === max shift === 0 (for lines)
 * 
 * @param ps An order 1,2 or 3 bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 */
function getDdxyAt1(ps: number[][]): number[] {
	if (ps.length === 4) {
		let [, [x1,y1], [x2,y2], [x3,y3]] = ps;
		return [
			6*x3 - 12*x2 + 6*x1,
            6*y3 - 12*y2 + 6*y1,
		]; // max bitlength increase 5
	} else if (ps.length === 3) {
		let [[x0,y0], [x1,y1], [x2,y2]] = ps;
		return [
            2*x2 - 4*x1 + 2*x0, // t^0
            2*y2 - 4*y1 + 2*y0, // t^0
		]; // max bitlength increase 3
	} else if (ps.length === 2) {
		return [0, 0]; // max bitlength increase 0
	}
}


export { getDdxyAt1 }