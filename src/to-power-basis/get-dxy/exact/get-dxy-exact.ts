import { twoDiff, scaleExpansion2, eAdd, twoSum, growExpansion } from 'big-float-ts';

const td = twoDiff;
const ts = twoSum;
const sce = scaleExpansion2;
const eadd = eAdd;
const ge = growExpansion;


/**
 * Returns the derivative of the power basis representation of a line, quadratic
 * or cubic bezier. 
 * 
 * @param ps An order 1,2 or 3 bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * 
 * @doc
 */
function getDxyExact(
		ps: number[][]): number[][][] {

	if (ps.length === 4) {
		const [[x0,y0], [x1,y1], [x2,y2], [x3,y3]] = ps;

		return [[
			sce(3,eadd(td(x3,x0), sce(3,td(x1,x2)))),
			sce(6,ge(ts(x2,x0), -2*x1)),
			sce(3,td(x1,x0))
		], [
			sce(3,eadd(td(y3,y0), sce(3,td(y1,y2)))),
			sce(6,ge(ts(y2,y0), -2*y1)),
			sce(3,td(y1,y0))
		]];
	} 
	
	if (ps.length === 3) {
		const [[x0,y0], [x1,y1], [x2,y2]] = ps;

		return [[
			ge(ts(2*x2,2*x0), -4*x1),
			td(2*x1,2*x0),
		], [
			ge(ts(2*y2,2*y0), -4*y1),
			td(2*y1,2*y0),
		]];
	} 
	
	if (ps.length === 2) {
		const [[x0,y0], [x1,y1]] = ps;
		return [[
			td(x1,x0),
		], [
			td(y1,y0),
		]];
	}
}


export { getDxyExact }
