import { expect, assert } from 'chai';
import { describe } from 'mocha';
import { evaluate, evaluate_anyBitlength_exact } from '../../../src/index.js';
import { eEstimate } from 'big-float-ts';


describe('eval decasteljau', function() {
	it('it should evaluate some beziers correctly at some t values using Decasteljau\'s algorithm', 
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
					let pExact = evaluate_anyBitlength_exact(ps, t).map(eEstimate);
					let r2 = evaluate(ps, t);

					// We check that evaluation using two different methods
					// (de Casteljau and power basis evaluation) yields roughly 
					// the same result
					let rX = Math.abs(pExact[0] - r2[0]);
					let rY = Math.abs(pExact[1] - r2[1]);

					assert(rX < Number.EPSILON * 2**5);
					assert(rY < Number.EPSILON * 2**5);

					//console.log(rX, rY)
				}
			}
		}
	});
});
