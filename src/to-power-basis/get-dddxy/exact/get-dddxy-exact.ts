import { twoDiff, scaleExpansion2, eAdd, twoSum, growExpansion } from 'big-float-ts';

const td = twoDiff;
const ts = twoSum;
const sce = scaleExpansion2;
const eadd = eAdd;


/**
 * Returns the 3rd derivative of the power basis representation of a line, 
 * quadratic or cubic bezier's x and y-coordinates.
 * 
 * * this is a constant value and the same for all t-values and, in 
 * particular, zero for a line or quadratic bezier curve.
 * 
 * @param ps An order 1,2 or 3 bezier curve, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * 
 * @doc
 */
 function getDddxyExact(
        ps: number[][]): number[][] {

	if (ps.length === 4) {
		const [[x0,y0], [x1,y1], [x2,y2], [x3,y3]] = ps;

		return [
			sce(6,eadd(td(x3,x0),sce(3,td(x1,x2)))),
			sce(6,eadd(td(y3,y0),sce(3,td(y1,y2))))
		];
	} else if (ps.length === 3 || ps.length === 2) {
		return [[0], [0]];
	}

	// if x0,x1,x2,x3 <= X (for some X) and t is an element of [0,1], then
	// max(dddx)(t) <= 48*X for all t.
}


export { getDddxyExact }
