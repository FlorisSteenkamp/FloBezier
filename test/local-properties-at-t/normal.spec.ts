import { expect, assert } from 'chai';
import { describe } from 'mocha';
import { normal } from '../../src/index.js';


describe('normal', function() {
	it('it should calculate the normal of some beziers at some t values correctly', 
	function() {
		{
			const pss = [
				[[3.33,-1.1221],[2.542234,-1]],
				[[1.1111,1.2222],[1.54,2]],
			];

			let ts = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];
			
			for (let ps of pss) {
				for (let t of ts) {
                    let r1 = normal(ps, t);
                    
                    console.log(r1);

					//assert(rX < Number.EPSILON * 2**5);
				}
			}
		}
	});
});
