import { twoDiff, ddMultDouble2, ddAddDd, ddAddDouble } from 'double-double';

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const td =  twoDiff;        // error -> 0
const qmd = ddMultDouble2;  // error -> 3*u²
const qaq = ddAddDd;
const qad = ddAddDouble;    // error -> 2*u²

const abs = Math.abs;


// TODO - modify docs (the doc below is from `getXY`)
/**
 * Returns the power basis representation of a line, quadratic or cubic bezier. 
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
function getXY3DdWithRunningError(
		ps: number[][]): {
			coeffs: [[number[], number[], number[], number], [number[], number[], number[], number]];
			errorBound: [[number,number,number,0],[number,number,number,0]];
		} {

	const [[x0,y0], [x1,y1], [x2,y2], [x3,y3]] = ps;
	
	// ----------------------------
	// xx3 = (x3 - x0) + 3*(x1 - x2)
	// ----------------------------
	const xa = td(x3,x0);  // error free
	const xb = td(x1,x2);  // error free
	const $xc = 3*(x1 - x2);
	const xc = qmd(3, xb);
	const _xc_ = abs($xc);
	const xx3 = qaq(xa, xc);
	const xx3_ = _xc_ + abs(x3 - x0 + $xc);
	
	// ----------------------------
	// xx2 = 3*(x2 - 2*x1 + x0)
	// ----------------------------
	const xd = td(x2,2*x1);  // error free
	const xe = qad(xd,x0);
	const _xe_ = abs(x2 - 2*x1 + x0);
	const xx2 = qmd(3,xe);
	//const xx2_ = 3*_xe_ + 3*_xe_;
	const xx2_ = 6*_xe_;

	// ----------------------------
	// xx1 = 3*(x1 - x0)
	// ----------------------------
	const xg = td(x1,x0);  // error free
	const xx1 = qmd(3,xg);
	const xx1_ = abs(3*(x1 - x0));


	// ----------------------------
	// yy3 = y3 + 3*(y1 - y2) - y0
	// ----------------------------
	const ya = td(y3,y0);  // error free
	const yb = td(y1,y2);  // error free
	const $yc = 3*(y1 - y2);
	const yc = qmd(3, yb);
	const _yc_ = abs($yc);
	const yy3 = qaq(ya, yc);
	const yy3_ = _yc_ + abs(y3 - y0 + $yc);
	
	// ----------------------------
	// yy2 = 3*(y2 - 2*y1 + y0)
	// ----------------------------
	const yd = td(y2,2*y1);  // error free
	const ye = qad(yd,y0);
	const _ye_ = abs(y2 - 2*y1 + y0);
	const yy2 = qmd(3,ye);
	//const yy2_ = 3*_ye_ + 3*_ye_;
	const yy2_ = 6*_ye_;

	// ----------------------------
	// yy1 = 3*(y1 - y0)
	// ----------------------------
	const yg = td(y1,y0);  // error free
	const yy1 = qmd(3,yg);
	const yy1_ = abs(3*(y1 - y0));
	

	return {
		coeffs: [[xx3, xx2, xx1, x0], [yy3, yy2, yy1, y0]],
		errorBound: [[xx3_, xx2_, xx1_, 0], [yy3_, yy2_, yy1_, 0]]
	}
}



/**
 * only quadratic monomial coefficient has an error, the others are exact
 * @param ps 
 */
function getXY2DdWithRunningError(
		ps: number[][]): {
			coeffs: [[number[], number[], number], [number[], number[], number]];
			errorBound: [[number,0,0],[number,0,0]];
		} {

	const [[x0,y0], [x1,y1], [x2,y2]] = ps;

	// ---------------------
	// xx2 = x2 - 2*x1 + x0
	// ---------------------
	const $a = x2 - 2*x1;
	const a = td(x2,2*x1);  // error free
	const xx2 = qad(a,x0);
	const xx2_ = abs($a + x0);

	// ---------------------
	// xx1 = 2*(x1 - x0)
	// ---------------------
	const xx1 = td(2*x1,2*x0);  // error free

	// ---------------------
	// yy2 = y2 - 2*y1 + y0
	// ---------------------
	const $b = y2 - 2*y1;
	const b = td(y2,2*y1);  // error free
	const yy2 = qad(b,y0);
	const yy2_ = abs($b + y0);

	// ---------------------
	// yy1 = 2*(y1 - y0)
	// ---------------------
	const yy1 = td(2*y1,2*y0);  // error free


	return {
		coeffs: [[xx2, xx1, x0], [yy2, yy1, y0]],
		errorBound: [[xx2_, 0, 0], [yy2_, 0, 0]]
	}
}



/**
 * * exact for any bitlength
 * @param ps linear bezier curve
 */
function getXY1DdWithRunningError(
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


export { 
	getXY1DdWithRunningError, 
	getXY2DdWithRunningError, 
	getXY3DdWithRunningError
}

