import { twoSum, scaleExpansion2, growExpansion } from 'big-float-ts';

const ts = twoSum;
const sce = scaleExpansion2;
const ge = growExpansion;


/**
 * Returns the result, `[x,y]`, of evaluating the 2nd derivative of a linear,
 * quadratic or cubic bezier curve's power basis at `t === 0`. 
 * 
 * @param ps An order 1,2 or 3 bezier, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * 
 * @doc
 */
function evaluatePowerBasis_2ndDerivativeAt0Exact(
		ps: number[][]): number[][] {

	if (ps.length === 4) {
		const [[x0,y0], [x1,y1], [x2,y2]] = ps;
		return [
			sce(6,ge(ts(x2,x0), -2*x1)),
			sce(6,ge(ts(y2,y0), -2*y1))
		];
	} 
	
	if (ps.length === 3) {
		const [[x0,y0], [x1,y1], [x2,y2]] = ps;
		return [
			ge(ts(2*x2,2*x0), -4*x1),
			ge(ts(2*y2,2*y0), -4*y1) 
		];
	} 
	
	if (ps.length <= 2) {
		return [[0], [0]];
	}

	throw new Error('The given bezier curve must be of order <= 3');
}


export { evaluatePowerBasis_2ndDerivativeAt0Exact }
