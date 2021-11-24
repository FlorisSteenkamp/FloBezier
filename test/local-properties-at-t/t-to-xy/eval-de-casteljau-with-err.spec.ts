import { expect, assert } from 'chai';
import { describe } from 'mocha';
import { 
	evalDeCasteljauWithErr,
	evaluateExact
} from '../../../src/index.js';
import { eEstimate } from 'big-float-ts';
import { manhattanDistanceBetween } from 'flo-vector2d';


describe('eval decasteljau', function() {
	it('it should eval decasteljau', 
	function() {
		{
			const pss = [
				[[3,-1],[2,-1],[1,1],[0,0]],
				[[0,0],[1,1],[1,2],[3,2]],
				[[3,-1],[2,-1],[1,1]],
				[[0,0],[1,1],[1.54,2]],
				[[3.33,-1.1221],[2.542234,-1]],
				[[1.1111,1.2222],[1.54,2]],
			];

			let ts = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];

			for (let ps of pss) {
				for (let t of ts) {
					let pExact = evaluateExact(ps, t).map(eEstimate);
					let { p, pE } = evalDeCasteljauWithErr(ps, t);

					const errBound = pE[0] + pE[1];
					const errActual = manhattanDistanceBetween(p, pExact);

					assert(
						errActual <= errBound,
						`error should be smaller than its bound, but error = ${errActual} whilst bound = ${errBound}`
					);

					// error should be reasonably small (but depends on 
					// condition number)
					const maxErrorBound = Number.EPSILON * 2**10;
					assert(
						errBound < maxErrorBound,
						`error bound should be reasonably small (< ${maxErrorBound}) but is ${errBound}`
					);
				}
			}
		}
	});
});
