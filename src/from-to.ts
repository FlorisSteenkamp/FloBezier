
import { evaluate } from './evaluate';
import { from0ToT } from './from-0-to-T';
import { fromTTo1 } from './from-T-to-1';


/**
 * Returns a cubic bezier curve that starts at the given curve and ends at the
 * given t parameter. Uses de Casteljau's algorithm. 
 * 
 * A loose bound on the accuracy of the resultant points is given by: 
 * |δP| = 2*2n*max_k(|b_k|)η, where n = 3 (cubic), b_k are the control points
 * abd η is Number.EPSILON.
 * @param ps - A cubic bezier curve
 * @param t1 - The t parameter where the resultant bezier should start
 * @param t2 - The t parameter where the resultant bezier should end
 */

function fromTo(ps: number[][]) {
	return function(t1: number, t2: number) {
		if (t1 === t2) {
			// Degenerate case
			let p = evaluate(ps, t1);
			return [p,p,p,p];
		} else if (t1 === 0 && t2 === 1) { 
			return ps;
		} else if (t1 === 0) {
			return from0ToT(ps, t2);
		} else if (t2 === 1) {
			return fromTTo1(ps, t1);
		}
		let t = fromTTo1(ps, t1);
		return from0ToT(t, (t2-t1)/(1-t1));
	}
}


export { fromTo }
