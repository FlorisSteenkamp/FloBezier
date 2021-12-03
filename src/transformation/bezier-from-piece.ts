import { from0ToT } from "./split-and-merge/from-0-to-T.js";
import { fromTTo1 } from "./split-and-merge/from-T-to-1.js";
import { evalDeCasteljau } from "../local-properties-at-t/t-to-xy/double/eval-de-casteljau.js";
import { BezierPiece } from "../bezier-piece.js";


/**
 * Returns a new bezier from the given bezier by limiting its `t` range. 
 * 
 * * uses de Casteljau's algorithm.
 * 
 * @param bezierPiece A partial bezier
 * 
 * @doc
 */
function bezierFromPiece(bezierPiece: BezierPiece) {
	const { ps, ts } = bezierPiece;

	// If ts = [0,1] then return original bezier.
	if (ts[0] === 0 && ts[1] === 1) {
		return ps;
	}

	// If ts[0] === ts[1] then return a single point degenerated bezier.
	if (ts[0] === ts[1]) {
		const p = evalDeCasteljau(ps,ts[0]);
		// return [p,p,p,p];
		return [p];
	}

	if (ts[0] === 0) {
		return from0ToT(ps, ts[1]);
	} 

	if (ts[1] === 1) {
		return fromTTo1(ps, ts[0]);
	} 

	// At this stage we know the t range is not degenerate and ts[0] !== 0 
	// and ts[1] !== 1
	return from0ToT(
		fromTTo1(ps, ts[0]), 
		(ts[1]-ts[0]) / (1-ts[0])
	);
}


export { bezierFromPiece }
