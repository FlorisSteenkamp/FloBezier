import { evalDeCasteljauError } from "../eval-de-casteljau-error";
import { evalDeCasteljau as evalDeCasteljau_ } from "./eval-de-casteljau";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const evalDeCasteljau = evalDeCasteljau_;


/** 
 * Returns the result of evaluating the given bezier curve at the parameter `t`
 * using [De Casteljau's algorithm](https://en.wikipedia.org/wiki/De_Casteljau%27s_algorithm)
 * in double precision floating point arithmetic.
 * 
 * TODO - finish docs
 * The resulting point `p` is returned as the pair `[x,y]`, where `x` and `y` are 
 * double precision floating point numbers.
 * 
 * @param ps an order 1, 2 or 3 bezier curve, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param t the parameter value where the bezier should be evaluated
 * 
 * @doc mdx
 **/
function evalDeCasteljauWithErr(
		ps: number[][], 
		t: number): { p: number[], pE: number[] } {

	if (ps.length === 4) {
		const p = evalDeCasteljau(ps, t);
		const pE = evalDeCasteljauError(ps, t);
	} 
	
	if (ps.length === 3) {
		const [[x0,y0], [x1,y1], [x2,y2]] = ps;	

		const a01 = x0 + (x1 - x0)*t;
		const a11 = x1 + (x2 - x1)*t;
		const x = a01 + (a11 - a01)*t;

		const b01 = y0 + (y1 - y0)*t;
		const b11 = y1 + (y2 - y1)*t;
		const y = b01 + (b11 - b01)*t;

		return [x,y];
	} 
	
	if (ps.length === 2) {
		const [[x0,y0], [x1,y1]] = ps;	

		const x = x0 + (x1 - x0)*t;
		const y = y0 + (y1 - y0)*t;

		return [x,y];
	}

	if (ps.length === 1) {
		return ps[0];	
	}

	throw new Error('The given bezier curve is invalid.');
}


export { evalDeCasteljau }
