
import { from0ToT } from "./split-merge-clone/from-0-to-T";
import { fromTTo1 } from "./split-merge-clone/from-T-to-1";
import { evalDeCasteljau } from "../local-properties-at-t/t-to-xy/eval-de-casteljau";


/**
 * Returns a new bezier from the given bezier by limiting its t range. 
 * 
 * Uses de Casteljau's algorithm.
 * 
 * @param ps A bezier
 * @param tRange A t range
 */
function bezierFromBezierPiece(ps: number[][], tRange: number[]) {

	// If tRange = [0,1] then return original bezier.
	if (tRange[0] === 0 && tRange[1] === 1) {
		return ps;
	}

	// If tRange[0] === tRange[1] then return a single point degenerated bezier.
	if (tRange[0] === tRange[1]) {
		let p = evalDeCasteljau(ps,tRange[0]);
		return [p,p,p,p];
	}

	if (tRange[0] === 0) {
		return from0ToT(ps, tRange[1]);
	} 

	if (tRange[1] === 1) {
		return fromTTo1(ps, tRange[0]);
	} 

	// At this stage we know the t range is not degenerate and tRange[0] !== 0 
	// and tRange[1] !== 1
	return from0ToT(
		fromTTo1(ps, tRange[0]), 
		(tRange[1]-tRange[0]) / (1-tRange[0])
	);
}


export { bezierFromBezierPiece }
