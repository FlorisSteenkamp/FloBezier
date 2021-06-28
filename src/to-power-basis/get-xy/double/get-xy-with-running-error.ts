
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
function getXY3WithRunningError(
		ps: number[][]): {
			coeffs: [[number, number, number, number], [number, number, number, number]];
			errorBound: [[number,number,number,0],[number,number,number,0]];
		} {

	const [[x0,y0], [x1,y1], [x2,y2], [x3,y3]] = ps;
	
	// ----------------------------
	// xx3 = (x3 - x0) + 3*(x1 - x2)
	// ----------------------------
	const xa = x3 - x0;
	const _xa_ = abs(xa);
	const xb = x1 - x2;
	const _xb_ = abs(xb);
	const xc = 3*xb;
	const xc_ = 6*_xb_;  // === 3*_xb_ + 3*abs(xc)
	const xx3 = xa + xc;
	const xx3_ = _xa_ + xc_ + abs(xx3);
	
	// ----------------------------
	// xx2 = 3*((x2 + x0) - 2*x1)
	// ----------------------------
	const xd = x2 + x0;
	const _xd_ = abs(xd);
	const xe = xd - 2*x1;
	const _xe_ = _xd_ + abs(xe);
	const xx2 = 3*xe;
	const xx2_ = 6*_xe_;  // 3*_xe_ + abs(xx2)

	// ----------------------------
	// xx1 = 3*(x1 - x0)
	// ----------------------------
	const xg = x1 - x0;
	const _xg_ = abs(xg);
	const xx1 = 3*xg;
	const xx1_ = 6*_xg_;  // 3*_xg_ + abs(3*xg)


	// ------------------------------
	// yy3 = (y3 - y0) + 3*(y1 - y2)
	// ------------------------------
	const ya = y3 - y0;
	const _ya_ = abs(ya);
	const yb = y1 - y2;
	const _yb_ = abs(yb);
	const yc = 3*yb;
	const yc_ = 6*_yb_;  // === 3*_yb_ + 3*abs(yc)
	const yy3 = ya + yc;
	const yy3_ = _ya_ + yc_ + abs(yy3);
	
	// ----------------------------
	// yy2 = 3*((y2 + y0) - 2*y1)
	// ----------------------------
	const yd = y2 + y0;
	const _yd_ = abs(yd);
	const ye = yd - 2*y1;
	const _ye_ = _yd_ + abs(ye);
	const yy2 = 3*ye;
	const yy2_ = 6*_ye_;  // 3*_ye_ + abs(yy2)

	// ----------------------------
	// yy1 = 3*(y1 - y0)
	// ----------------------------
	const yg = y1 - y0;
	const _yg_ = abs(yg);
	const yy1 = 3*yg;
	const yy1_ = 6*_yg_;  // 3*_yg_ + abs(3*yg)
	

	return {
		coeffs: [[xx3, xx2, xx1, x0], [yy3, yy2, yy1, y0]],
		errorBound: [[xx3_, xx2_, xx1_, 0], [yy3_, yy2_, yy1_, 0]]
	}
}



/**
 * only quadratic monomial coefficient has an error, the others are exact
 * @param ps 
 */
function getXY2WithRunningError(
		ps: number[][]): {
			coeffs: [[number, number, number], [number, number, number]];
			errorBound: [[number,number,0],[number,number,0]];
		} {

	const [[x0,y0], [x1,y1], [x2,y2]] = ps;

	// ---------------------
	// xx2 = (x2 + x0) - 2*x1
	// ---------------------
	const xa = x2 + x0;
	const _xa_ = abs(xa);
	const xx2 = xa - 2*x1;
	const xx2_ = _xa_ + abs(xx2);

	// ---------------------
	// xx1 = 2*(x1 - x0)
	// ---------------------
	const xx1 = 2*(x1 - x0);
	const xx1_ = abs(xx1);

	// ---------------------
	// yy2 = (y2 + y0) - 2*y1
	// ---------------------
	const ya = y2 + y0;
	const _ya_ = abs(ya);
	const yy2 = ya - 2*y1;
	const yy2_ = _ya_ + abs(yy2);

	// ---------------------
	// yy1 = 2*(y1 - y0)
	// ---------------------
	const yy1 = 2*(y1 - y0);
	const yy1_ = abs(yy1);


	return {
		coeffs: [[xx2, xx1, x0], [yy2, yy1, y0]],
		errorBound: [[xx2_, xx1_, 0], [yy2_, yy1_, 0]]
	}
}



/**
 * * exact for any bitlength
 * @param ps linear bezier curve
 */
function getXY1WithRunningError(
		ps: number[][]): {
			coeffs: [[number, number], [number, number]];
			errorBound: [[number,0],[number,0]];
		} {

	const [[x0,y0], [x1,y1]] = ps;

	const xx1 = x1 - x0;
	const xx1_ = abs(xx1);

	const yy1 = y1 - y0;
	const yy1_ = abs(yy1);

	return {
		coeffs: [[xx1, x0], [yy1, y0]],
		errorBound: [[xx1_, 0], [yy1_, 0]]
	}
}


export { 
	getXY1WithRunningError, 
	getXY2WithRunningError, 
	getXY3WithRunningError 
}
