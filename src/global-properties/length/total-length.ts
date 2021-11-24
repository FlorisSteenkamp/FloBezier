import { lengthBez1 } from './length-bez1.js';
import { lengthBez2 } from './length-bez2.js';
import { lengthBez3 } from './length-bez3.js';


/**
 * Returns the curve (linear, quadratic or cubic bezier) length in the specified 
 * interval calculated using Gaussian Quadrature.
 * 
 * @param ps a cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param interval the paramter interval over which the length is 
 * to be calculated (usually === [0,1]).
 * 
 * @doc mdx
 */
 function totalLength(
	 	ps: number[][],
		maxFlatness = 1.01,
		gaussOrder: 4|16|64 = 16): number {

	if (ps.length === 4) {
		return lengthBez3([0,1], ps, maxFlatness, gaussOrder);
	}

	if (ps.length === 3) {
		return lengthBez2([0,1], ps, maxFlatness, gaussOrder);
	}

    if (ps.length === 2) {
		return lengthBez1([0,1], ps);
	}

	if (ps.length === 1) {
		return 0;
	}

	throw new Error('The given bezier curve is invalid.');
}


export { totalLength }
