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
function getXYDdAnyBitlength3(
		ps: number[][]): [[number[], number[], number[], number], [number[], number[], number[], number]] {

	const [[x0,y0], [x1,y1], [x2,y2], [x3,y3]] = ps;
	
	// ----------------------------
	// xx3 = x3 + 3*(x1 - x2) - x0
	// ----------------------------
	const xa = td(x3,x0);  // error free
	const xb = td(x1,x2);  // error free
	const xc = qmd(3, xb);
	const xx3 = qaq(xa, xc);
	
	// ----------------------------
	// xx2 = 3*(x2 - 2*x1 + x0)
	// ----------------------------
	const xd = td(x2,2*x1);  // error free
	const xe = qad(xd,x0);
	const xx2 = qmd(3,xe);

	// ----------------------------
	// xx1 = 3*(x1 - x0)
	// ----------------------------
	const xg = td(x1,x0);  // error free
	const xx1 = qmd(3,xg);


	// ----------------------------
	// yy3 = y3 + 3*(y1 - y2) - y0
	// ----------------------------
	const ya = td(y3,y0);  // error free
	const yb = td(y1,y2);  // error free
	const yc = qmd(3, yb);
	const yy3 = qaq(ya, yc);
	
	// ----------------------------
	// yy2 = 3*(y2 - 2*y1 + y0)
	// ----------------------------
	const yd = td(y2,2*y1);  // error free
	const ye = qad(yd,y0);
	const yy2 = qmd(3,ye);

	// ----------------------------
	// yy1 = 3*(y1 - y0)
	// ----------------------------
	const yg = td(y1,y0);  // error free
	const yy1 = qmd(3,yg);
	

	return [[xx3, xx2, xx1, x0], [yy3, yy2, yy1, y0]];
}



/**
 * only quadratic monomial coefficient has an error, the others are exact
 * @param ps 
 */
function getXYDdAnyBitlength2(
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
function getXYDdAnyBitlength1(
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


export { getXYDdAnyBitlength1, getXYDdAnyBitlength2, getXYDdAnyBitlength3 }

