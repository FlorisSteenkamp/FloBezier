import { expect, assert, use } from 'chai';
import { describe } from 'mocha';
import { getFootpointPoly1Exact } from '../../../../../src/simultaneous-properties/closest-and-furthest-point-on-bezier/get-coeffs/exact/get-footpoint-poly-1-exact.js';
import { getFootpointPoly2Exact } from '../../../../../src/simultaneous-properties/closest-and-furthest-point-on-bezier/get-coeffs/exact/get-footpoint-poly-2-exact.js';
import { getFootpointPoly3Exact } from '../../../../../src/simultaneous-properties/closest-and-furthest-point-on-bezier/get-coeffs/exact/get-footpoint-poly-3-exact.js';
import { getFootpointPolyExact } from '../../../../../src/index.js';
import { nearly } from '../../../../helpers/chai-extend-nearly.js';
import { getRandomBezier, getRandomPoint } from '../../../../helpers/get-random-bezier.js';


use(nearly);

const getRandomBezier_ = getRandomBezier(200, 37);


describe('getFootpointPoly', function() {
	it('it should return the footpoint polynomial of some bezier curves from a given point',
	function() {
		for (let order=1;order<=3;order++) {
			for (let i=0;i<=0;i++) {
				const ps = getRandomBezier_(order as 0|1|2|3)(i);
				const p = getRandomPoint((i+97)*93)[0];  // some randomish point
				const r = getFootpointPolyExact(ps,p);

                const expected = order === 1
                    ? getFootpointPoly1Exact(ps,p)
                    : order === 2 
                        ? getFootpointPoly2Exact(ps,p) 
                        : getFootpointPoly3Exact(ps,p);


				expect(r).to.eql(expected);
			}
		}

		{
			const p = [1,1];
			const ps = [p,p,p,p,p];
			expect(() => getFootpointPolyExact(ps,p)).to.throw();
		}
	});
});
