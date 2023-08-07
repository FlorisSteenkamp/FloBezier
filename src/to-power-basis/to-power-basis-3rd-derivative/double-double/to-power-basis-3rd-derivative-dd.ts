import { twoDiff, ddAddDd, ddMultDouble2 } from 'double-double';

const td = twoDiff;
const qaq = ddAddDd;
const qmd = ddMultDouble2;


/**
 * Returns the 3rd derivative of the power basis representation of a bezier 
 * curve of order cubic or less (with intermediate calculations done in 
 * double-double precision).
 * 
 * * returns the resulting power basis x and y coordinate polynomials from 
 * highest power to lowest, e.g. if `x(t) = at^2 + bt + c` 
 * and `y(t) = dt^2 + et + f` then  the result is returned 
 * as `[[a,b,c],[d,e,f]]`, where the `a,b,c,...` are in double-double precision
 * 
 * @param ps an order 0,1,2 or 3 bezier curve given by an ordered array of its
 * control points, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * 
 * @doc
 */
function toPowerBasis_3rdDerivativeDd(ps: number[][]): number[][][] {
	if (ps.length === 4) {
		const [[x0,y0], [x1,y1], [x2,y2], [x3,y3]] = ps;
		return [[
			qmd(6,qaq(td(x3,x0), qmd(3,td(x1,x2))))
		], [
			qmd(6,qaq(td(y3,y0), qmd(3,td(y1,y2))))
		]];
	} 
	
	if (ps.length <= 3) {
		return [[[0,0]],[[0,0]]];
	}

	throw new Error('The given bezier curve must be of order <= 3.');
	
	// Side note: if x0,x1,x2,x3 <= X (for some X) and t is an element of [0,1], 
	// then max(dddx)(t) <= 48*X for all t.
}


export { toPowerBasis_3rdDerivativeDd }
