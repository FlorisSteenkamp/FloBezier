import { evalDeCasteljauError as evalDeCasteljauError_ } from "../eval-de-casteljau-error.js";
import { evalDeCasteljau as evalDeCasteljau_ } from "./eval-de-casteljau.js";
import { γ } from '../../../error-analysis/error-analysis.js';

// We *have* to do the below to improve performance with bundlers❗ The assignee is a getter❗ The assigned is a pure function❗
const evalDeCasteljau = evalDeCasteljau_;
const evalDeCasteljauError = evalDeCasteljauError_;

const γ1 = γ(1);


/** 
 * Returns the resulting point of evaluating the given bezier curve at the given
 * parameter `t` including a coordinate-wise error bound.
 * 
 * * uses [De Casteljau's algorithm](https://en.wikipedia.org/wiki/De_Casteljau%27s_algorithm)
 * in double precision floating point arithmetic
 * 
 * The resulting point point is returned as `{ p: number[], pE: number[] }`, 
 * where `p` is the point `[x,y]` and `pE` is the corresponding coordinate-wise
 * absolute error bound of the calculation.
 * 
 * @param ps an order 1,2 or 3 bezier curve, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param t the parameter value where the bezier should be evaluated
 * 
 * @doc mdx
 **/
function evalDeCasteljauWithErr(
		ps: number[][], 
		t: number): { p: number[], pE: number[] } {

	const p = evalDeCasteljau(ps, t);
	const pE = evalDeCasteljauError(ps, [0,t]);

	if (ps.length === 4) {
		return { p, pE: pE.map(e => 9*γ1*e) };
	} 
	
	if (ps.length === 3) {
		return { p, pE: pE.map(e => 6*γ1*e) };
	} 
	
	if (ps.length === 2) {
		return { p, pE: pE.map(e => 3*γ1*e) };
	} 
	
	if (ps.length === 1) {
		return { p: ps[0], pE: [0,0] };
	}

	throw new Error('The given bezier curve must be of order <= 3.');
}


export { evalDeCasteljauWithErr }
