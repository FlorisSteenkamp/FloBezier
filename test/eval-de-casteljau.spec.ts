
import { expect, assert } from 'chai';
//import { describe } from 'mocha';
import 'mocha';
import { evalDeCasteljau } from '../src/local-properties-at-t/t-to-xy/eval-de-casteljau';
import { evaluate } from '../src/local-properties-at-t/t-to-xy/evaluate';


describe('eval decasteljau', function() {
	it('it should eval decasteljau', 
	function() {
		{
			let ps = [[3,-1],[2,-1],[1,1],[0,0]];
			//let ps = [[0,0],[1,1],[1,2],[3,2]];
			//let ps = [[3,-1],[2,-1],[1,1]];
			//let ps = [[0,0],[1,1],[1.54,2]];
			//let ps = [[3.33,-1.1221],[2.542234,-1]];
			//let ps = [[1.1111,1.2222],[1.54,2]];
			let r1 = evalDeCasteljau(ps, 0.1);
			let r2 = evaluate(ps, 0.1);
			
			console.log(r1,r2);
			//assert(r < 0);
		}
	});
});
