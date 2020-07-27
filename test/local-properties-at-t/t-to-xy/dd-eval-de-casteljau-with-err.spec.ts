
import { expect, assert } from 'chai';
//import { describe } from 'mocha';
import 'mocha';
import { 
	evalDeCasteljauWithErrQuad,
	evaluate_anyBitlength_exact
} from '../../../src/index';
import { eEstimate } from 'big-float-ts';
import { manhattanDistanceBetween } from 'flo-vector2d';


// closer to 0.1 than [0,0.1] seen as a double-double
const one_over_10 = [-5.551115123125783e-18,0.1]; 

// closer to 1/3 than [0,0.3333333333333333] seen as a double-double
const one_over_3  = [ 1.850371707708594e-17, 0.3333333333333333 ] 


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
					let pExact = evaluate_anyBitlength_exact(ps, t);
					let { p, pE } = evalDeCasteljauWithErrQuad(ps, [0,t]);

					const errBound = pE[0] + pE[1];
					const errActual = manhattanDistanceBetween(p.map(eEstimate), pExact.map(eEstimate));

					assert(
						errActual <= errBound,
						`error should be smaller than its bound, but error = ${errActual} whilst bound = ${errBound}`
					);

					// error should be reasonably small (but depends on 
					// condition number)
					const maxErrorBound = Number.EPSILON**2 * 2**10;
					assert(
						errBound < maxErrorBound,
						`error bound should be reasonably small (< ${maxErrorBound}) but is ${errBound}`
					);

					//console.log(errActual, errBound, maxErrorBound)
				}
			}
		}
	});
});
