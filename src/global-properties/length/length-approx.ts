import { lengthBez1 } from './length-bez1.js';
import { lengthApproxBez2 } from './length-approx-bez2.js';
import { lengthApproxBez3 } from './length-approx-bez3.js';


/**
 * Returns the curve length (point, linear, quadratic or cubic bezier) in the 
 * specified interval calculated using Gaussian Quadrature *without* subdividing
 * for improved accuracy.
 * 
 * @param ps a bezier curve, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param interval the paramter interval over which the length is 
 * to be calculated (typically `=== [0,1]`).
 * 
 * @doc mdx
 */
function lengthApprox(interval: number[], ps: number[][]): number {
	if (ps.length === 4) {
		return lengthApproxBez3(interval, ps);
	}

	if (ps.length === 3) {
		return lengthApproxBez2(interval, ps);
	}

	if (ps.length === 2) {
		return lengthBez1(interval, ps);
	}

	if (ps.length === 1) {
		return 0;
	}

	throw new Error('The given bezier curve is invalid');
}


export { lengthApprox }
