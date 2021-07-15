/**
 * Returns the 2nd derivative of the power basis representation of a line, 
 * quadratic or cubic bezier's x-coordinates. 
 * 
 * @param ps An order 1,2 or 3 bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * 
 * @doc
 */
/*
function getDdxyExact(ps: number[][]): number[][] {
	if (ps.length === 4) {
		const [[x0,y0], [x1,y1], [x2,y2], [x3,y3]] = ps;
		return [[
			6*(x3 + 3*(x1 - x2) - x0), // t^1 - max bitlength increase 6
			6*(x2 - 2*x1 + x0)         // t^0 - max bitlength increase 5
		], [
			6*(y3 + 3*(y1 - y2) - y0), // t^1 - max bitlength increase 6
			6*(y2 - 2*y1 + y0)         // t^0 - max bitlength increase 5
		]]
	} else if (ps.length === 3) {
		const [[x0,y0], [x1,y1], [x2,y2]] = ps;
		return [[
			2*(x2 - 2*x1 + x0) // t^0 - max bitlength increase 3
		], [
			2*(y2 - 2*y1 + y0) // t^0 - max bitlength increase 3
		]];
	} else if (ps.length === 2) {
		return [[0],[0]];
	}
}


export { getDdxyExact }
*/