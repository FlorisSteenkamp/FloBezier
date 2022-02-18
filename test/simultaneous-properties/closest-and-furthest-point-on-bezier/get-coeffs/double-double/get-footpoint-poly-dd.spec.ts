import { expect, assert, use } from 'chai';
import { describe } from 'mocha';
import { getFootpointPoly1Dd } from '../../../../../src/simultaneous-properties/closest-and-furthest-point-on-bezier/get-coeffs/double-double/get-footpoint-poly-1-dd.js';
import { getFootpointPoly2Dd } from '../../../../../src/simultaneous-properties/closest-and-furthest-point-on-bezier/get-coeffs/double-double/get-footpoint-poly-2-dd.js';
import { getFootpointPoly3Dd } from '../../../../../src/simultaneous-properties/closest-and-furthest-point-on-bezier/get-coeffs/double-double/get-footpoint-poly-3-dd.js';
import { getFootpointPolyDd } from '../../../../../src/index.js';
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
				const r = getFootpointPolyDd(ps,p);

                const expected = order === 1
                    ? getFootpointPoly1Dd(ps,p)
                    : order === 2 
                        ? getFootpointPoly2Dd(ps,p) 
                        : getFootpointPoly3Dd(ps,p);


				expect(r).to.eql(expected);
			}
		}

        {
			const p = [1,1];
			const ps = [p,p,p,p,p];
			expect(() => getFootpointPolyDd(ps,p)).to.throw();
		}
	});
});
