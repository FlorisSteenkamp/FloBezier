import { splitAt, splitAtPrecise } from './split-at.js';
import { evalDeCasteljau } from '../../local-properties-at-t/t-to-xy/double/eval-de-casteljau.js';

// TODO - unify all these `fromTo`s
// TODO - other `fromTo`s has preconditions - add to docs that it is only for error purposes and can be ignored otherwise

/**
 * Returns a bezier curve that starts and ends at the given t parameters. 
 * Uses de Casteljau's algorithm. 
 * 
 * A loose bound on the accuracy of the resultant points is given by: 
 * |δP| = 2*2n*max_k(|b_k|)η, where n = 3 (for a cubic), b_k are the control 
 * points and η is Number.EPSILON.
 * 
 * @param ps a cubic bezier curve
 * @param t1 the t parameter where the resultant bezier should start
 * @param t2 the t parameter where the resultant bezier should end
 * 
 * @doc
 */
function fromTo(ps: number[][]) {
	return (t1: number, t2: number) => {
		const reverse = t1 > t2;
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
			const p = evalDeCasteljau(ps, t1);
			if (ps.length === 1) { return [p]; }
			if (ps.length === 2) { return [p,p]; }
			if (ps.length === 3) { return [p,p,p]; }
			if (ps.length === 4) { return [p,p,p,p]; }
			throw new Error('The given bezier curve is invalid.');
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
		const reverse = t1 > t2;
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
			const p = evalDeCasteljau(ps, t1);
			if (ps.length === 1) { return [p]; }
			if (ps.length === 2) { return [p,p]; }
			if (ps.length === 3) { return [p,p,p]; }
			if (ps.length === 4) { return [p,p,p,p]; }
			throw new Error('The given bezier curve is invalid.');
		} else {
			ps_ = splitAtPrecise(splitAtPrecise(ps, t1)[1], (t2-t1)/(1-t1))[0];
		}

		return reverse ? ps_.slice().reverse() : ps_;
	}
}


export { fromTo, fromToPrecise }
