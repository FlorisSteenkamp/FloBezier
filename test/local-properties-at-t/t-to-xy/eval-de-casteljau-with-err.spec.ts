
import { expect, assert } from 'chai';
//import { describe } from 'mocha';
import 'mocha';
import { 
	evalDeCasteljauWithErr, 
	evalDeCasteljauWithErrQuad 
} from '../../../src/local-properties-at-t/t-to-xy/eval-de-casteljau-with-err';
import { evalDeCasteljau } from '../../../src/local-properties-at-t/t-to-xy/eval-de-casteljau';
import { evaluate } from '../../../src/local-properties-at-t/t-to-xy/evaluate';


describe('eval decasteljau', function() {
	it('it should eval decasteljau', 
	function() {
		{
			//let ps = [[3,-1],[2,-1],[1,1],[0,0]];
			//let ps = [[0,0],[1,1],[1,2],[3,2]];
			//let ps = [[3,-1],[2,-1],[1,1]];
			//let ps = [[0,0],[1,1],[1.54,2]];
			let ps = [[3.33,-1.1221],[2.542234,-1]];
			//let ps = [[1.1111,1.2222],[1.54,2]];

			let one_over_10 = [-5.551115123125783e-18,0.1]; // closer to 0.1 than [0,0.1]
			let one_over_3  = [ 1.850371707708594e-17, 0.3333333333333333 ] // closer to 1/3 than [0,0.3333333333333333]

			let at = 1/3;
			let atq = one_over_3;

			let r1 = evalDeCasteljau(ps, at);
			let r2 = evalDeCasteljauWithErr(ps, at);
			let r3 = evalDeCasteljauWithErrQuad(ps, atq);  
			let r4 = evaluate(ps, at);
			
			console.log('casteljau', r1);
			console.log('casteljau with error', r2);
			console.log('casteljau with error quad', r3);
			console.log('naive evaluation', r4);
			//assert(r < 0);
		}
	});
});
