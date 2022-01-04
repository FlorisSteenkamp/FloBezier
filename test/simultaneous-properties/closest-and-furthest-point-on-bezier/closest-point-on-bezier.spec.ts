import { expect, assert, use } from 'chai';
import { distanceBetween } from 'flo-vector2d';
import { describe } from 'mocha';
import { closestPointOnBezier, evalDeCasteljau } from '../../../src/index.js';
import { nearly } from '../../helpers/chai-extend-nearly.js';
import { getRandomBezier, getRandomPoint } from '../../helpers/get-random-bezier.js';

use(nearly);

const getRandomBezier_ = getRandomBezier(200, 37);


describe('closestPointOnBezier', function() {
	it('it should ...',
	function() {
		for (let order=0;order<=3;order++) {
			for (let i=0;i<=0;i++) {
				const ps = getRandomBezier_(order as 0|1|2|3)(i);
				const p = getRandomPoint((i+97)*93)[0];  // some randomish point
				const { p: bp, t } = closestPointOnBezier(ps,p);
				let pp = evalDeCasteljau(ps,t);
				expect(pp).to.be.nearly(2**4,bp);
				// check against 16 other points on the bezier in [0,1]
				for (let k=0; k<16+1; k++) {
					const t_ = k/16;
					const p_ = evalDeCasteljau(ps,t_);

					const d = distanceBetween(p_,p);
					const dClosest = distanceBetween(bp,p);
					expect(d).to.be.greaterThanOrEqual(dClosest);
				}
			}
		}
	});
});