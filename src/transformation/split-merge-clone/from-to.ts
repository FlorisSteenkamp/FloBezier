
import { expEvaluateExact } from '../../local-properties-at-t/t-to-xy/evaluate';
import { splitAt, splitAtPrecise, splitAtExact } from './split-at';
import { evalDeCasteljau } from '../../local-properties-at-t/t-to-xy/eval-de-casteljau';


/**
 * Returns a bezier curve that starts and ends at the given t parameters. 
 * Uses de Casteljau's algorithm. 
 * 
 * A loose bound on the accuracy of the resultant points is given by: 
 * |δP| = 2*2n*max_k(|b_k|)η, where n = 3 (for a cubic), b_k are the control 
 * points and η is Number.EPSILON.
 * @param ps A cubic bezier curve
 * @param t1 The t parameter where the resultant bezier should start
 * @param t2 The t parameter where the resultant bezier should end
 */

function fromTo(ps: number[][]) {
	return function(t1: number, t2: number) {
		let reverse = t1 > t2;
		if (t1 > t2) { [t1,t2] = [t2,t1]; }

		let ps_: number[][];

		if (t1 === 0 && t2 === 1) { 
			ps_ = ps; 
		} else if (t1 === 0) { 
			ps_ = splitAt(ps, t2)[0];
		} else if (t2 === 1) { 
			ps_ = splitAt(ps, t1)[1]; 
		} else if (t1 === t2) {
			// Degenerate case
			let p = evalDeCasteljau(ps, t1);
			if (ps.length === 2) { return [p,p]; }
			if (ps.length === 3) { return [p,p,p]; }
			if (ps.length === 4) { return [p,p,p,p]; }
		} else {
			ps_ = splitAt(splitAt(ps, t1)[1], (t2-t1)/(1-t1))[0];
		}

		return reverse ? ps_.slice().reverse() : ps_;
	}
}


/**
 * Returns a bezier curve that starts at the given curve and ends at the
 * given t parameter. Uses de Casteljau's algorithm. 
 * 
 * A loose bound on the accuracy of the resultant points is given by: 
 * |δP| = 2*2n*max_k(|b_k|)η, where n = 3 (for a cubic), b_k are the control 
 * points and η is Number.EPSILON.
 * @param ps - A cubic bezier curve
 * @param t1 - The t parameter where the resultant bezier should start
 * @param t2 - The t parameter where the resultant bezier should end
 */

function fromToPrecise(ps: number[][]) {
	return function(t1: number, t2: number) {
		let reverse = t1 > t2;
		if (t1 > t2) { [t1,t2] = [t2,t1]; }

		let ps_: number[][];

		if (t1 === 0 && t2 === 1) { 
			ps_ = ps; 
		} else if (t1 === 0) { 
			ps_ = splitAtPrecise(ps, t2)[0];
		} else if (t2 === 1) { 
			ps_ = splitAtPrecise(ps, t1)[1]; 
		} else if (t1 === t2) {
			// Degenerate case
			let p = evalDeCasteljau(ps, t1);
			if (ps.length === 2) { return [p,p]; }
			if (ps.length === 3) { return [p,p,p]; }
			if (ps.length === 4) { return [p,p,p,p]; }
		} else {
			ps_ = splitAtPrecise(splitAtPrecise(ps, t1)[1], (t2-t1)/(1-t1))[0];
		}

		return reverse ? ps_.slice().reverse() : ps_;
	}
}


// TODO - currently the bezier returned is exact, but not exactly according
// to the given ts due to division
function fromToExact(ps: number[][][]) {
	return function(t1: number, t2: number): number[][][] {
		if (t1 === 0 && t2 === 1) { 
			return ps; 
		} else if (t1 === 0) { 
			return splitAtExact(ps, t2)[0];
		} else if (t2 === 1) { 
			return splitAtExact(ps, t1)[1]; 
		} else if (t1 === t2) {
			// Degenerate case
			let p = expEvaluateExact(ps, t1);
			if (ps.length === 2) { return [p,p]; }
			if (ps.length === 3) { return [p,p,p]; }
			if (ps.length === 4) { return [p,p,p,p]; }
		} else {
			return splitAtExact(splitAtExact(ps, t1)[1], (t2-t1)/(1-t1))[0];
		}
	}
}


export { fromTo, fromToPrecise, fromToExact }
