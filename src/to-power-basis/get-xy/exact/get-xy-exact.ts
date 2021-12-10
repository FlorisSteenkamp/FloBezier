import { twoDiff, scaleExpansion2, growExpansion, twoSum, eAdd as _eAdd } from 'big-float-ts';

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const td = twoDiff;
const ts = twoSum;
const sce = scaleExpansion2;
const ge = growExpansion;
const eAdd = _eAdd;


/**
 * Returns the exact power basis representation of a bezier curve of order 
 * cubic or less.
 * 
 * * returns the resulting power basis x and y coordinate polynomials from 
 * highest power to lowest, e.g. if `x(t) = at^2 + bt + c` 
 * and `y(t) = dt^2 + et + f` then  the result is returned 
 * as `[[a,b,c],[d,e,f]]`, where the `a,b,c,...` are Shewchuk floating point
 * expansions
 * 
 * @param ps an order 0,1,2 or 3 bezier curve given by an ordered array of its
 * control points, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * 
 * @doc
 */
function getXYExact(
		ps: number[][]): number[][][] {

	if (ps.length === 4) {
		const r = getXY3Exact(ps);
		(r[0][3] as unknown as number[]) = [r[0][3]];
		(r[1][3] as unknown as number[]) = [r[1][3]];
		return r as number[][][];
	}

	if (ps.length === 3) {
		const r = getXY2Exact(ps);
		(r[0][2] as unknown as number[]) = [r[0][2]];
		(r[1][2] as unknown as number[]) = [r[1][2]];
		return r as number[][][];
	}

	if (ps.length === 2) {
		const r = getXY1Exact(ps);
		(r[0][1] as unknown as number[]) = [r[0][1]];
		(r[1][1] as unknown as number[]) = [r[1][1]];
		return r as number[][][];
	}

	if (ps.length === 1) {
		const r = getXY0Exact(ps);
		(r[0][0] as unknown as number[]) = [r[0][0]];
		(r[1][0] as unknown as number[]) = [r[1][0]];
		return r as unknown as number[][][];
	}

	throw new Error('The given bezier curve must be of order <= cubic.');
}


/** @internal */
function getXY3Exact(
	 	ps: number[][]): [
			 	[number[],number[],number[],number],
			 	[number[],number[],number[],number]
		  	] {

	const [[x0,y0], [x1,y1], [x2,y2], [x3,y3]] = ps;

	return [[
		// (x3 - x0) + 3*(x1 - x2)
		eAdd(td(x3, x0), sce(3, td(x1, x2)))

		// OR
		// (x3 - x0) - (2*x2 + x2) + (2*x1 + x1)
		//eAdd(eAdd(td(x3,x0), ts(-2*x2, -x2)), ts(2*x1, x1))
		,

		// 3*((x2 + x0) - 2*x1)
		sce(3, ge(ts(x2, x0), -2*x1)),

		// 3*(x1 - x0)
		sce(3, td(x1, x0)),
		
		// x0
		x0
	], [
		//ge(ge(sce(3, td(y1, y2)), y3), -y0),
		eAdd(td(y3, y0), sce(3, td(y1, y2))),
		//sce(3, ge(td(y2, 2*y1), y0)),
		sce(3, ge(ts(y2, y0), -2*y1)),
		sce(3, td(y1, y0)),
		y0
	]];
}


/** @internal */
function getXY2Exact(
	 	ps: number[][]): [
			[number[],number[],number],
			[number[],number[],number]
		] {

	const [[x0,y0], [x1,y1], [x2,y2]] = ps;
	return [[
		// x2 - 2*x1 + x0
		ge(ts(x2, x0), -2*x1),
		// 2*(x1 - x0)
		td(2*x1, 2*x0),
		//x0
		x0
	], [
		ge(ts(y2, y0), -2*y1),
		td(2*y1, 2*y0),
		y0
	]];
}


/** @internal */
function getXY1Exact(
	 	ps: number[][]): [
			[number[],number],
			[number[],number]
		] {

	const [[x0,y0], [x1,y1]] = ps;

	return [[
		//x1 - x0,
		td(x1, x0),
		//x0
		x0
	], [
		td(y1, y0),
		y0
	]];
}


/** @internal */
function getXY0Exact(
		ps: number[][]): [[number],[number]] {

	const [[x0,y0]] = ps;

	return [[x0], [y0]];
}


export { 
	getXY0Exact, getXY1Exact, getXY2Exact, getXY3Exact,
	getXYExact
}


