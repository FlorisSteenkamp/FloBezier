
const abs = Math.abs;


// TODO - fix docs - uses Wilson error counters
/**
 * Returns the power basis representation of a line, quadratic or cubic bezier. 
 * 
 * * **non-exact:** if certain preconditions are met (see below) it returns the 
 * exact result, else round-off may have occured during intermediate calculation.
 * * returns the power basis polynomial from highest power to lowest, 
 * e.g. `at^3 + bt^2 + ct + d` is returned as `[a,b,c,d]`
 * 
 * @param ps an order 1, 2 or 3 bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * 
 * @doc
 */
function getXYAnyBithlengthInclErrorCounters1(
		ps: number[][]): { 
			coeffs: number[][],
			errorBound: number[][]
		} {

	const [[x0,y0], [x1,y1]] = ps;

	const _x0 = abs(x0);
	const _x1 = abs(x1);
	const _y0 = abs(y0);
	const _y1 = abs(y1);

	return {
		coeffs: [[
			x1 - x0,
			x0,
		], [
			y1 - y0,
			y0,
		]],
		errorBound: [[
			// <1> <= <1>(<0>x1 - <0>x0)
			_x1 + _x0,  // <1>
			0,
		], [
			_y1 + _y0,  // <1>
			0,
		]]
	};
}


// TODO - fix docs
function getXYAnyBithlengthInclErrorCounters2(
		ps: number[][]): { 
			coeffs: number[][],
			errorBound: number[][]
		} {

	const [[x0,y0], [x1,y1], [x2,y2]] = ps;

	const _x0 = abs(x0);
	const _x1 = abs(x1);
	const _x2 = abs(x2);
	const _y0 = abs(y0);
	const _y1 = abs(y1);
	const _y2 = abs(y2);

	return {
		coeffs: [[
			x2 + x0 - 2*x1,
			2*(x1 - x0),
			x0,
		], [
			y2 + y0 - 2*y1,
			2*(y1 - y0),
			y0,
		]],
		errorBound: [[
			// <2> <= <2>(<1>(x2 + x0) - 2*x1)
			_x2 + _x0 + 2*_x1,
			// <1> <= 2*<1>(x1 - x0)
			2*(_x1 + _x0),
			0,
		], [
			_y2 + _y0 + 2*_y1,  // <2>
			2*(_y1 + _y0),  // <1>
			0,
		]]
	}
}


// TODO - fix docs
function getXYAnyBithlengthInclErrorCounters3(
		ps: number[][]): { 
			coeffs: number[][],
			errorBound: number[][]
		} {

	const [[x0,y0], [x1,y1], [x2,y2], [x3,y3]] = ps;

	const _x0 = abs(x0);
	const _x1 = abs(x1);
	const _x2 = abs(x2);
	const _x3 = abs(x3);
	const _y0 = abs(y0);
	const _y1 = abs(y1);
	const _y2 = abs(y2);
	const _y3 = abs(y3);

	return {
		coeffs: [[
			x3 - x0 + 3*(x1 - x2),
			3*(x2 + x0 - 2*x1),
			3*(x1 - x0),
			x0,
		], [
			y3 - y0 + 3*(y1 - y2),
			3*(y2 + y0 - 2*y1),
			3*(y1 - y0),
			y0,
		]],
		errorBound: [[
			// <3> <= <3>(<1>(x3 - x0) + <2>(3*(<1>(x1 - x2))))
			_x3 + _x0 + 3*(_x1 + _x2),
			// <3> <= <3>(3*(<2>(<1>(x2 + x0) - 2*x1)))
			3*(_x2 + _x0 + 2*_x1),
			// <2> <= <2>(3*(<1>(x1 - x0)))
			3*(_x1 + _x0),
			0,
		], [
			_y3 + _y0 + 3*(_y1 + _y2),  // <3>
			3*(_y2 + _y0 + 2*_y1),  // <3>
			3*(_y1 + _y0),  // <2>
			0,
		]]
	};
}

export { 
	getXYAnyBithlengthInclErrorCounters1,
	getXYAnyBithlengthInclErrorCounters2,
	getXYAnyBithlengthInclErrorCounters3
}
