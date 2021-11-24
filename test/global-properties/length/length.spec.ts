import { expect, assert, use } from 'chai';
import { distanceBetween } from 'flo-vector2d';
import { describe } from 'mocha';
import { evalDeCasteljau, length, lengthApprox, totalLength, totalLengthApprox } from '../../../src/index.js';
import { nearly } from '../../helpers/chai-extend-nearly.js';
import { getRandomBezier } from '../../helpers/get-random-bezier.js';


use(nearly);


describe('length', function() {
    it('it should return a reasonable approximate length (between two `t` values) of some cubic bezier curves', 
	function() {
		const count = 1;
		const getRandomBezier_ = getRandomBezier(128,53);
		for (let order=1; order<=3; order++) {
			for (let i=0; i<count; i++) {
				const ps = getRandomBezier_(order as 0|1|2|3)(i);

				const l = length([0,1], ps, 1.01, 64);

				const approx0 = totalLength(ps);

				// approximate by cubic pieces
				let approx1 = 0;
				const pieces1 = 2**4;
				for (let i=0; i<pieces1; i++) {
					const l = lengthApprox([i/pieces1, (i+1)/pieces1], ps);
					approx1 += l;
				}

				const approx2 = totalLengthApprox(ps);

				// approximate by lines
				let approx3 = 0;
				const pieces2 = 2**6;
				let prevP = ps[0];
				for (let i=0; i<pieces2; i++) {
					const t = (i+1)/pieces2;
					const p = evalDeCasteljau(ps, t);
					const l = distanceBetween(prevP, p);
					prevP = p;
					approx3 += l;
				}

				//l       //?
				//approx0 //?
				//approx1 //?
				//approx2 //?
				//approx3 //?
				
				expect(approx0).to.be.nearly(2**32, l);
				expect(approx1).to.be.nearly(2**16, l);
				expect(approx2).to.be.nearly(2**44, l);
				expect(approx3).to.be.nearly(2**40, l);
			}
		}
	});
});
