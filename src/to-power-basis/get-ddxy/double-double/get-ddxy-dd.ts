import { twoDiff, ddAddDd, ddMultDouble2, ddAddDouble } from 'double-double';

const td = twoDiff;
const qaq = ddAddDd;
const qmd = ddMultDouble2;
const qad = ddAddDouble;


/**
 * Returns the 2nd derivative of the power basis representation of a bezier 
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
function getDdxyDd(ps: number[][]): number[][][] {
	if (ps.length === 4) {
		const [[x0,y0], [x1,y1], [x2,y2], [x3,y3]] = ps;
		return [[
			qmd(6,(qaq(td(x3,x0), qmd(3,(td(x1,x2)))))),
			qmd(6,(qad(td(x2,2*x1),x0)))
		], [
			qmd(6,(qaq(td(y3,y0), qmd(3,(td(y1,y2)))))),
			qmd(6,(qad(td(y2,2*y1),y0)))
		]]
	} 
	
	if (ps.length === 3) {
		const [[x0,y0], [x1,y1], [x2,y2]] = ps;
		return [[
			qad(td(2*x2,4*x1),2*x0)
		], [
			qad(td(2*y2,4*y1),2*y0)
		]];
	} 
	
	if (ps.length <= 2) {
		return [[[0]],[[0]]];
	}

	throw new Error('The given bezier curve must be of order <= 3.');	
}


export { getDdxyDd }
