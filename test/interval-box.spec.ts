
import { expect, assert } from 'chai';
//import { describe } from 'mocha';
import 'mocha';
import { 
	evalDeCasteljauWithErr, 
	evalDeCasteljauWithErrQuad 
} from '../src/local-properties-at-t/t-to-xy/eval-de-casteljau-with-err';
import { evalDeCasteljau } from '../src/local-properties-at-t/t-to-xy/eval-de-casteljau';
import { evaluate } from '../src/local-properties-at-t/t-to-xy/evaluate';
import { qDivQuad, qDivDouble, qAddQuad, qAddDouble } from 'flo-numerical';
import { getIntervalBox, getIntervalBoxQuad } from '../src/index';



describe('interval box', function() {
	it('it should interval box', 
	function() {
		{
			let ps = [[3.3,-1.3],[2.3,-1.3],[1.3,1.3],[0.1,0.1]];
			//let ps = [[0,0],[1,1],[1,2],[3,2]];
			//let ps = [[3,-1],[2,-1],[1,1]];
			//let ps = [[0,0],[1,1],[1.54,2]];
			//let ps = [[3.33,-1.1221],[2.542234,-1]];
			//let ps = [[1.1111,1.2222],[1.54,2]];

			//console.log(qDivDouble([0,1],10));
			//console.log(qDivDouble([0,1],3));
			let one_over_10 = [-5.551115123125783e-18,0.1]; // closer to 0.1 than [0,0.1]
			let one_over_3  = [ 1.850371707708594e-17, 0.3333333333333333 ] // closer to 1/3 than [0,0.3333333333333333]
			//let delta = Number.EPSILON * 2**40;  // === 0.000244140625
			let delta = Number.EPSILON * 2**-140

			let i = [1/3,1/3 + delta];
			let iq = [one_over_3, qAddDouble(one_over_3,delta)];
			//let atq = one_over_10;
			
			let r1 = getIntervalBox(ps, i);
			let r2 = getIntervalBoxQuad(ps, iq);
			
			console.log('interval box', r1);
			console.log('interval box quad', r2);
		}
	});
});
