
import { brent } from 'flo-poly';
import { getCurvatureExtremaBrackets } from './get-curvature-extrema-brackets';
import { κ } from '../../local-properties-at-t/curvature';
import { isLine } from '../../global-properties/type/is-line';
import { isCubicReallyQuad } from '../../global-properties/type/is-cubic-really-quad';
import { toQuadraticFromCubic } from '../..';


/**
 * Returns the parameter t values of maximum absolute curvature for the given 
 * bezier curve. If there are an infinite number of such t values (such as is 
 * the case for a line), an empty array is returned.
 * 
 * * **non-exact:** floating point round-off are not entirely eliminated during
 * calculations
 * 
 * @param ps an order 1, 2 or 3 bezier curve given as an array of control 
 * points, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 */
function getCurvatureExtrema(
		ps: number[][]): { maxCurvatureTs: number[], maxNegativeCurvatureTs: number[] } {

	if (isLine(ps)) {
		return { maxCurvatureTs: [], maxNegativeCurvatureTs: [] };
	}

	if (ps.length === 4 && isCubicReallyQuad(ps)) {
		ps = toQuadraticFromCubic(ps);
	}

	if (ps.length === 3) {
		// See e.g. https://math.stackexchange.com/a/2971112
		// answer KeithWM used - https://math.stackexchange.com/a/2971112/130809
		// At this point the given bezier is not a line so find the point of
		// max curvature (of the parabola)

		// calculate t*
		const [[x0,y0],[x1,y1],[x2,y2]] = ps;

		const x10 = x1 - x0;
		const x21 = x2 - x1;
		const wx = x21 - x10;

		const y10 = y1 - y0;
		const y21 = y2 - y1;
		const wy = y21 - y10;

		const n = 
        	x0*(wx - x1) - x1*(x21 - x1) + 
        	y0*(wy - y1) - y1*(y21 - y1);
			
		const d = wx*wx + wy*wy;

		const t = n/d;

		// eliminate values outside the curve parameter range
		if (t < 0 || t > 1) {
			return { maxCurvatureTs: [], maxNegativeCurvatureTs: [] };
		}

		const sgnκ = -x0*y21 + x1*(y2 - y0) + -x2*y10;
		
		return sgnκ >= 0 
			? { maxCurvatureTs: [t], maxNegativeCurvatureTs: [] }
			: { maxCurvatureTs: [], maxNegativeCurvatureTs: [t] };
	}


	// At this point the input bezier curve is neither a line nor a quadratic
	// bezier curve.

	let maxCurvatureTs = [];
	let maxNegativeCurvatureTs = [];
	
	let brackets = getCurvatureExtremaBrackets(ps).brackets;
	
	let κPs = κ(ps); // The curvature function
	 
	let lenb = brackets.length;
	for (let k=0; k<lenb; k++) {
		let bracket = brackets[k];
		if (!bracket) { continue; }
		
		let root = lookForRoot(ps, bracket);
		if (!root) { continue; }
		
		let κ_ = -κPs(root);
		// Check if local extrema is a maximum or minimum.
		let κAtMinsd = -κPs(bracket[0]);
		let κAtMaxsd = -κPs(bracket[1]);
		
		if (κ_ > κAtMinsd && κ_ > κAtMaxsd) {
			// maximum
			if (κ_ > 0) {
				maxCurvatureTs.push(root);
			}
		} else if (κ_ <= κAtMinsd && κ_ <= κAtMaxsd) {
			// minimum
			if (κ_ < 0) {
				maxNegativeCurvatureTs.push(root);
			}
		}
	}

	return { maxCurvatureTs, maxNegativeCurvatureTs };
}


function lookForRoot(ps: number[][], [minsd, maxsd]: number[]) {
	// At this point there can be exactly 0 or 1 roots within 
	// [minsd, maxsd]
	let dκMod_ = dκMod(ps);
	let c0 = dκMod_(minsd);
	let c1 = dκMod_(maxsd);
	
	if (c0*c1 >= 0) { return; }
	
	// There is exactly one root in the interval.
	let root = brent(dκMod_, minsd, maxsd);
	
	return root;
}


/** 
 * Helper function. This function is curried.
 * A modified version of the differential of κ (use quotient rule, ignore 
 * denominator and multiply by 2/3). We need to find the zeros of this function 
 * to get the min/max curvature.
 * See <a href="http://math.info/Calculus/Curvature_Parametric/">this</a> for
 * more details.
 * @ignore
**/
function dκMod(ps: number[][], t: number): number;
function dκMod(ps: number[][]): (t: number) => number;
function dκMod(ps: number[][], t?: number) {
	let [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = ps;
	
	function f(t: number): number {
		
		let ts = t*t;
		let omt = 1-t; 
		
		let a = ts*x3;
		let b = ts*y3;
		let c = 2*t - 3*ts;
		let d = (3*t-1)*omt;
		let e = omt*omt;
		let f = 3 * (a+c*x2-d*x1-e*x0);
		let g = 3 * (b+c*y2-d*y1-e*y0);
		let h = 6 * (t*y3-(3*t-1)*y2 + (3*t-2)*y1 + omt*y0); 
		let i = 6 * (t*x3-(3*t-1)*x2 + (3*t-2)*x1 + omt*x0);
		let j = Math.sqrt(f*f+g*g);

	   	return 4*(f*(y3-3*y2+3*y1-y0) - 
			   g*(x3-3*x2+3*x1-x0)) * j**3 - 
			   (f*h-i*g)*(2*h*g+2*i*f) * j;
	}

	return t === undefined ? f : f(t);	
}


export { getCurvatureExtrema }
