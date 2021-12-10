import { twoDiff, twoSum, ddMultDouble2, ddAddDd, ddAddDouble } from 'double-double';

// TODO - add ... is too slow for bundlers, e.g. Webpack
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const td =  twoDiff;        // error -> 0
const qmd = ddMultDouble2;  // error -> 3*u²
const qaq = ddAddDd;
const qad = ddAddDouble;    // error -> 2*u²
const ts = twoSum;


/**
 * Returns the power basis representation of a bezier curve of order cubic or 
 * less (with intermediate calculations done in double-double precision).
 * 
 * * returns the power basis x and y coordinate polynomials from highest power 
 * to lowest, e.g. if `x(t) = at^3 + bt^2 + ct + d` 
 * and `y(t) = et^3 + ft^2 + gt + h` then the result is returned 
 * as `[[a,b,c,d],[e,f,g,h]]`, where the `a,b,c,...` are in double-double 
 * precision
 * 
 * @param ps an order 0,1,2 or 3 bezier curve given by an ordered array of its
 * control points, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * 
 * @doc
 */
function getXYDd(ps: number[][]): number[][][] {
	if (ps.length === 4) {
		const r = getXY3Dd(ps);
		(r[0][3] as unknown as number[]) = [0,r[0][3]];
		(r[1][3] as unknown as number[]) = [0,r[1][3]];
		return r as number[][][];
	} 
	
	if (ps.length === 3) {
		const r = getXY2Dd(ps);
		(r[0][2] as unknown as number[]) = [0,r[0][2]];
		(r[1][2] as unknown as number[]) = [0,r[1][2]];
		return r as number[][][];
	} 
	
	if (ps.length === 2) {
		const r = getXY1Dd(ps);
		(r[0][1] as unknown as number[]) = [0,r[0][1]];
		(r[1][1] as unknown as number[]) = [0,r[1][1]];
		return r as number[][][];
	}

	if (ps.length === 1) {
		const r = getXY0Dd(ps);
		(r[0][0] as unknown as number[]) = [0,r[0][0]];
		(r[1][0] as unknown as number[]) = [0,r[1][0]];
		return r as unknown as number[][][];
	}

	throw new Error('The given bezier curve must be of order <= cubic.');
}


/** @internal */
function getXY3Dd(
		ps: number[][]): [
			[number[], number[], number[], number], 
			[number[], number[], number[], number]
		] {

	const [[x0,y0], [x1,y1], [x2,y2], [x3,y3]] = ps;
	
	// ----------------------------
	// xx3 = (x3 - x0) + 3*(x1 - x2)
	// ----------------------------
	const xx3 = qaq(td(x3,x0), qmd(3, td(x1,x2)));
	
	// ----------------------------
	// xx2 = 3*((x2 + x0) - 2*x1)
	// ----------------------------
	const xx2 = qmd(3, qad(ts(x2,x0), -2*x1));

	// ----------------------------
	// xx1 = 3*(x1 - x0)
	// ----------------------------
	const xx1 = qmd(3,td(x1,x0));


	// ----------------------------
	// yy3 = (y3 - y0) + 3*(y1 - y2)
	// ----------------------------
	const yy3 = qaq(td(y3,y0), qmd(3, td(y1,y2)));
	
	// ----------------------------
	// yy2 = 3*((y2 + y0) - 2*y1)
	// ----------------------------
	const yy2 = qmd(3, qad(ts(y2,y0), -2*y1));

	// ----------------------------
	// yy1 = 3*(y1 - y0)
	// ----------------------------
	const yy1 = qmd(3,td(y1,y0));
	

	return [[xx3, xx2, xx1, x0], [yy3, yy2, yy1, y0]];
}



/**
 * Only the quadratic monomial coefficient has an error, the others are exact.
 * 
 * @internal
 */
function getXY2Dd(
		ps: number[][]): [
			[number[], number[], number], 
			[number[], number[], number]
		] {

	const [[x0,y0], [x1,y1], [x2,y2]] = ps;

	// ---------------------
	// xx2 = x2 + x0 - 2*x1
	// ---------------------
	const xx2 = qad(ts(x2,x0),-2*x1);

	// ---------------------
	// xx1 = 2*(x1 - x0)
	// ---------------------
	const xx1 = td(2*x1,2*x0);  // error free

	// ---------------------
	// yy2 = y2 + y0 - 2*y1
	// ---------------------
	const yy2 = qad(ts(y2,y0),-2*y1);

	// ---------------------
	// yy1 = 2*(y1 - y0)
	// ---------------------
	const yy1 = td(2*y1,2*y0);  // error free


	return [[xx2, xx1, x0], [yy2, yy1, y0]];
}


/**
 * Exact for any bitlength.
 * 
 * @internal
 */
function getXY1Dd(
		ps: number[][]): [[number[], number], [number[], number]] {

	const [[x0,y0], [x1,y1]] = ps;

	return [[
		td(x1,x0),
		x0,     
	], [
		td(y1,y0),
		y0,     
	]];
}


/**
 * Exact for any bitlength.
 * 
 * @internal
 */
function getXY0Dd(
		ps: number[][]): [[number],[number]] {

	const [[x0,y0]] = ps;
	
	return [[x0], [y0]];
}


export { 
	getXYDd,
	getXY0Dd,
	getXY1Dd,
	getXY2Dd,
	getXY3Dd
}
