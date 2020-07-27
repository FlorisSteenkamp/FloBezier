
import { expEvaluateExact } from '../../local-properties-at-t/evaluate/evaluate';


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
