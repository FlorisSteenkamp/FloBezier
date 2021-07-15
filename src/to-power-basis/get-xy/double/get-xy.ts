
/**
 * Returns the power basis representation of a linear, quadratic or cubic bezier curve.
 * 
 * * **non-exact:** if certain preconditions are met (see below) it returns the 
 * exact result, else round-off may have occured during intermediate calculation.
 * * returns the power basis polynomial from highest power to lowest, 
 * e.g. `at^3 + bt^2 + ct + d` is returned as `[a,b,c,d]`
 * 
 * * **bitlength:** If the coordinates of the control points are bit-aligned then:
 *  * max bitlength increase = 4 (for cubics)
 * (due to 'multiplication' by 9 (3x 6x 3x)
 *  * max bitlength increase = 2 (for quadratics)
 * (due to 'multiplication' by 4 (1x 2x 1x)
 *  * max bitlength increase = 1 (for lines)
 * (due to 'multiplication' by 4 (1x 1x)
 * 
 * @param ps an order 1, 2 or 3 bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * 
 * @doc
 */
function getXY(ps: number[][]): number[][] {
	if (ps.length === 4) {
		return getXY3(ps);
	} else if (ps.length === 3) {
		return getXY2(ps);
	} else if (ps.length === 2) {
		return getXY1(ps);
	}
}


function getXY3(ps: number[][]): number[][] {
	const [[x0,y0], [x1,y1], [x2,y2], [x3,y3]] = ps;

	return [[
		(x3 - x0) + 3*(x1 - x2), // t^3 - max bitlength increase 3
		3*((x2 + x0) - 2*x1),    // t^2 - max bitlength increase 4
		3*(x1 - x0),             // t^1 - max bitlength increase 3
		x0,                      // t^0 - max bitlength increase 0
	], [
		(y3 - y0) + 3*(y1 - y2), // t^3 - max bitlength increase 3
		3*((y2 + y0) - 2*y1),    // t^2 - max bitlength increase 4
		3*(y1 - y0),             // t^1 - max bitlength increase 3
		y0,                      // t^0 - max bitlength increase 0
	]];
}


function getXY2(ps: number[][]): number[][] {
	const [[x0,y0], [x1,y1], [x2,y2]] = ps;
	
	return [[
		(x2 + x0) - 2*x1,  // t^2 - max bitlength increase 2
		2*(x1 - x0),     // t^1 - max bitlength increase 2
		x0,              // t^0 - max bitlength increase 0
	], [
		(y2 + y0) - 2*y1,  // t^2 - max bitlength increase 2
		2*(y1 - y0),     // t^1 - max bitlength increase 2
		y0,              // t^0 - max bitlength increase 0            
	]];
}


function getXY1(ps: number[][]): number[][] {
	const [[x0,y0], [x1,y1]] = ps;
	
	return [[
		x1 - x0,  // t^1 - max bitlength increase 1
		x0,       // t^0 - max bitlength increase 0
	], [
		y1 - y0,  // t^1 - max bitlength increase 1
		y0,       // t^0 - max bitlength increase 0
	]];
}


export { getXY, getXY3, getXY2, getXY1 }
