import { expect, assert, use } from 'chai';
import { distanceBetween } from 'flo-vector2d';
import { describe } from 'mocha';
import { closestPointOnBezier, closestPointOnBezierCertified, evalDeCasteljau } from '../../../src/index.js';
import { nearly } from '../../helpers/chai-extend-nearly.js';
import { getRandomBezier, getRandomPoint } from '../../helpers/get-random-bezier.js';
import { randomRotateAndTranslate } from '../../helpers/random-rotate-and-translate.js';

use(nearly);

const eps = Number.EPSILON;
const sqrt = Math.sqrt;

const maxCoordinate = 1000;
const getRandomBezier_ = getRandomBezier(maxCoordinate, 37);


describe('closestPointOnBezierCertified', function() {
	it('it should ...',
	function() {
		for (let order=3;order<=3;order++) {
			for (let i=0;i<=0;i++) {
				const ps = getRandomBezier_(order as 0|1|2|3)(i);
				const p = getRandomPoint((i+97)*93)[0];  // some randomish point
				const cps = closestPointOnBezierCertified(ps,p);
				// it could be more but is unlikely for a random bezier and point
				expect(cps.length).to.eql(1);
				const cp = cps[0];
				const { intervalBox, ri, dSquaredI } = cp;
				const di = dSquaredI.map(i => sqrt(i));
				// again, it could be more but is unlikely for a random bezier and point
				expect(ri.multiplicity).to.eql(1);
				assert(ri.tE - ri.tS < 4*eps);
				// make sure the distance interval is small
				assert(di[1] - di[0] < maxCoordinate * 4*eps * 2**4);
				/** estimate of the closest point on the bezier */
				const cpp = [
					(intervalBox[0][0] + intervalBox[1][0]) / 2,
					(intervalBox[0][1] + intervalBox[1][1]) / 2
				];
				const dEst = distanceBetween(cpp,p);
				assert(di[0] < dEst && di[1] > dEst);

				const { p: bp } = closestPointOnBezier(ps,p);
				expect(cpp[0]).to.be.nearly(2**8,bp[0]);
				expect(cpp[1]).to.be.nearly(2**8,bp[1]);

				for (let k=0; k<16+1; k++) {
					const t_ = k/16;
					const p_ = evalDeCasteljau(ps,t_);
					assert(distanceBetween(p_,p) > distanceBetween(cpp,p));
				}
			}
		}
	});
});

