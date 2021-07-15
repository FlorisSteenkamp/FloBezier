/**
 * Returns the derivative of the power basis representation of a line, quadratic
 * or cubic bezier's. 
 * 
 * **bitlength**: If the coordinates of the control points are bit-aligned then
 * * max bitlength increase === max shift === 5 (for cubics)
 * * max bitlength increase === max shift === 3 (for quadratics)
 * * max bitlength increase === max shift === 1 (for lines)
 * 
 * @param ps An order 1,2 or 3 bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * 
 * @doc
 */
function getDxy(ps: number[][]): number[][] {
	if (ps.length === 4) {
		const [[x0,y0], [x1,y1], [x2,y2], [x3,y3]] = ps;
		return [[
			3*((x3 - x0) + 3*(x1 - x2)), // t^2 - max bitlength increase 5
			6*((x2 + x0) - 2*x1),        // t^1 - max bitlength increase 5
			3*(x1 - x0)                // t^0 - max bitlength increase 3
		], [
			3*((y3 - y0) + 3*(y1 - y2)), // t^2 - max bitlength increase 5
			6*((y2 + y0) - 2*y1),        // t^1 - max bitlength increase 5
			3*(y1 - y0)                // t^0 - max bitlength increase 3
		]];
	} 
	
	if (ps.length === 3) {
		const [[x0,y0], [x1,y1], [x2,y2]] = ps;
		return [[
			2*((x2 + x0) - 2*x1), // t^1 - max bitlength increase 3
			2*(x1 - x0),        // t^0 - max bitlength increase 2
		], [
			2*((y2 + y0) - 2*y1), // t^1 - max bitlength increase 3
			2*(y1 - y0),        // t^0 - max bitlength increase 2
		]];
	} 
	
	if (ps.length === 2) {
		const [[x0,y0], [x1,y1]] = ps;
		return [[
			x1 - x0,  // t^0 - max bitlength increase 1
		], [
			y1 - y0,  // t^0 - max bitlength increase 1
		]];
	}

	throw new Error('The bezier curve must be of order 1, 2 or 3.');
}


export { getDxy }
