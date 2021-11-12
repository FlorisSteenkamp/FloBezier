import { lengthBez1 } from './length-bez1.js';
import { lengthBez2 } from './length-bez2.js';
import { lengthBez3 } from './length-bez3.js';


/**
 * Returns the curve length (linear, quadratic or cubic bezier) in the 
 * specified interval calculated using Gaussian Quadrature.
 * 
 * @param ps a bezier curve, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param interval the paramter interval over which the length is 
 * to be calculated (typically `=== [0,1]`).
 * 
 * @doc mdx
 */
function length(interval: number[], ps: number[][]): number {
	if (ps.length === 4) {
		return lengthBez3(interval, ps);
	}

	if (ps.length === 3) {
		return lengthBez2(interval, ps);
	}

	if (ps.length === 2) {
		return lengthBez1(interval, ps);
	}

	if (ps.length === 1) {
		return 0;
	}

	throw new Error('The given bezier curve is invalid');
}


export { length }
