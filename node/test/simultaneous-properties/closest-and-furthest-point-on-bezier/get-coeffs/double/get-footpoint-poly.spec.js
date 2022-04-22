import { expect, use } from 'chai';
import { describe } from 'mocha';
import { getFootpointPoly } from '../../../../../src/index.js';
import { getFootpointPoly1 } from '../../../../../src/simultaneous-properties/closest-and-furthest-point-on-bezier/get-coeffs/double/get-footpoint-poly-1.js';
import { getFootpointPoly2 } from '../../../../../src/simultaneous-properties/closest-and-furthest-point-on-bezier/get-coeffs/double/get-footpoint-poly-2.js';
import { getFootpointPoly3 } from '../../../../../src/simultaneous-properties/closest-and-furthest-point-on-bezier/get-coeffs/double/get-footpoint-poly-3.js';
import { nearly } from '../../../../helpers/chai-extend-nearly.js';
import { getRandomBezier, getRandomPoint } from '../../../../helpers/get-random-bezier.js';
use(nearly);
const getRandomBezier_ = getRandomBezier(200, 37);
describe('getFootpointPoly', function () {
    it('it should return the footpoint polynomial of some bezier curves from a given point', function () {
        for (let order = 1; order <= 3; order++) {
            for (let i = 0; i <= 0; i++) {
                const ps = getRandomBezier_(order)(i);
                const p = getRandomPoint((i + 97) * 93)[0]; // some randomish point
                const r = getFootpointPoly(ps, p);
                const expected = order === 1
                    ? getFootpointPoly1(ps, p)
                    : order === 2
                        ? getFootpointPoly2(ps, p)
                        : getFootpointPoly3(ps, p);
                expect(r).to.eql(expected);
            }
        }
        {
            const p = [1, 1];
            const ps = [p, p, p, p, p];
            expect(() => getFootpointPoly(ps, p)).to.throw();
        }
    });
});
//# sourceMappingURL=get-footpoint-poly.spec.js.map