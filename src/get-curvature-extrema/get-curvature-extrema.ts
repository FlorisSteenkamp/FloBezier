
import { brent } from 'flo-poly';
import { getCurvatureExtremaBrackets } from './get-curvature-extrema-brackets';
import { κ } from '../local-properties-at-t/curvature';


/**
 * Finds the osculating circles and inflection points for the given bezier. 
 * @param ps
 */
function getCurvatureExtrema(
		ps: number[][]): { maxCurvatureTs: number[], maxNegativeCurvatureTs: number[] } {

	if (ps.length === 2) {
		return { maxCurvatureTs: [], maxNegativeCurvatureTs: [] };
	} else if (ps.length === 3) {
		// See e.g. https://math.stackexchange.com/a/2971112
		// TODO
		return { maxCurvatureTs: [], maxNegativeCurvatureTs: [] };
	}

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
