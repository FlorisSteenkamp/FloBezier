import { twoDiff, scaleExpansion2, eAdd } from 'big-float-ts';

const td = twoDiff;
const sce = scaleExpansion2;
const eadd = eAdd;


/**
 * Returns the *exact* 3rd derivative of the power basis representation of a 
 * bezier curve of order cubic or less.
 * 
 * * returns the resulting power basis x and y coordinate polynomials from 
 * highest power to lowest, e.g. if `x(t) = at^2 + bt + c` 
 * and `y(t) = dt^2 + et + f` then  the result is returned 
 * as `[[a,b,c],[d,e,f]]`, where the `a,b,c,...` are [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf) floating point
 * expansions
 * 
 * @param ps an order 0,1,2 or 3 bezier curve given by an ordered array of its
 * control points, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * 
 * @doc
 */
 function toPowerBasis_3rdDerivativeExact(
        ps: number[][]): number[][][] {

	if (ps.length === 4) {
		const [[x0,y0], [x1,y1], [x2,y2], [x3,y3]] = ps;

		return [[
			sce(6,eadd(td(x3,x0),sce(3,td(x1,x2))))
		], [
			sce(6,eadd(td(y3,y0),sce(3,td(y1,y2))))
		]];
	} else if (ps.length <= 3) {
		return [[[0]], [[0]]];
	}

	// Note: if x0,x1,x2,x3 <= X (for some X) and t is an element of [0,1], then
	// max(dddx)(t) <= 48*X for all t.

	throw new Error('The given bezier curve must be of order <= 3.');
}


export { toPowerBasis_3rdDerivativeExact }
