
/**
 * Returns the power basis representation of a bezier curve of order cubic or 
 * less.
 * 
 * * intermediate calculations are done in double precision
 * * returns the resulting power basis x and y coordinate polynomials from 
 * highest power to lowest, e.g. if `x(t) = at^2 + bt + c` 
 * and `y(t) = dt^2 + et + f` then  the result is returned 
 * as `[[a,b,c],[d,e,f]]`
 * 
 * @param ps an order 0,1,2 or 3 bezier curve given by an ordered array of its
 * control points, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * 
 * @doc
 */
function toPowerBasis(ps: number[][]): number[][] {
	if (ps.length === 4) {
		return toPowerBasis3(ps);
	} 
	
	if (ps.length === 3) {
		return toPowerBasis2(ps);
	} 
	
	if (ps.length === 2) {
		return toPowerBasis1(ps);
	}

	if (ps.length === 1) {
		return toPowerBasis0(ps);
	}

	throw new Error('The given bezier curve must be of order <= 3.');
}


/** @internal */
function toPowerBasis3(ps: number[][]): number[][] {
	const [[x0,y0], [x1,y1], [x2,y2], [x3,y3]] = ps;

	return [[
		(x3 - x0) + 3*(x1 - x2),
		3*((x2 + x0) - 2*x1),
		3*(x1 - x0),
		x0
	], [
		(y3 - y0) + 3*(y1 - y2),
		3*((y2 + y0) - 2*y1),
		3*(y1 - y0),
		y0
	]];
}


/** @internal */
function toPowerBasis2(ps: number[][]): number[][] {
	const [[x0,y0], [x1,y1], [x2,y2]] = ps;
	
	return [[
		(x2 + x0) - 2*x1,
		2*(x1 - x0),
		x0
	], [
		(y2 + y0) - 2*y1,
		2*(y1 - y0),
		y0
	]];
}


/** @internal */
function toPowerBasis1(ps: number[][]): number[][] {
	const [[x0,y0], [x1,y1]] = ps;
	
	return [[
		x1 - x0,
		x0,
	], [
		y1 - y0,
		y0,
	]];
}


/** @internal */
function toPowerBasis0(ps: number[][]): number[][] {
	const [[x0,y0]] = ps;
	
	return [[x0], [y0]];
}


export { 
	toPowerBasis, 
	toPowerBasis3, 
	toPowerBasis2, 
	toPowerBasis1, 
	toPowerBasis0 
}
