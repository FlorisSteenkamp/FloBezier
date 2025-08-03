/**
 * Returns the tangent vector (not necessarily of unit length) of an 
 * order 0,1,2 or 3 bezier curve at `t === 0`, i.e.
 * returns the result, `[x,y]`, of evaluating the derivative of a linear,
 * quadratic or cubic bezier curve's power basis at `t === 0`. 
 * 
 * * uses double precision calculations internally
 * 
 * @param ps An order 1,2 or 3 bezier, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * 
 * @doc
 */
function tangentAt0(ps: number[][]): number[] {
	// Bitlength: If the coordinates of the control points are grid-aligned then
	// * max bitlength (incl bit shift) increase === 3 (for cubics)
	// * max bitlength (incl bit shift) increase === 2 (for quadratics)
	// * max bitlength (incl bit shift) increase === 1 (for lines)
	if (ps.length === 4) {
		const [[x0,y0], [x1,y1]] = ps;
		return [
            3*(x1 - x0),
            3*(y1 - y0)
		]; // max bitlength increase 3
	} 
	
	if (ps.length === 3) {
		const [[x0,y0], [x1,y1]] = ps;
		return [
            2*(x1 - x0),
            2*(y1 - y0),
		]; // max bitlength increase 2
	} 
	
	if (ps.length === 2) {
		const [[x0,y0], [x1,y1]] = ps;
		return [
            x1 - x0,
            y1 - y0,
		]; // max bitlength increase 1
	}

	if (ps.length === 1) {
		return [0,0];
	}

	throw new Error('The given bezier curve must be of order <= 3.');
}


export { tangentAt0 }


// Quokka tests
// tangentAt0([[0,0],[0,0],[2,1]]); //?