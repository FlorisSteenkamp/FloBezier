
import { brent } from 'flo-poly';
import { getCurvatureExtremaBrackets } from './get-curvature-extrema-brackets';
import { κ } from '../curvature';
import { dκMod } from '../index';


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


export { getCurvatureExtrema }
