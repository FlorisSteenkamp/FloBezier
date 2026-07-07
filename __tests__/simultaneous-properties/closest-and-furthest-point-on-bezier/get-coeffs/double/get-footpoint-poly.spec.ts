import { describe, expect, it } from '@jest/globals';
import { getFootpointPoly } from '../../../../../src/index.js';
import { getFootpointPoly1 } from '../../../../../src/simultaneous-properties/closest-and-furthest-point-on-bezier/get-coeffs/double/get-footpoint-poly-1.js';
import { getFootpointPoly2 } from '../../../../../src/simultaneous-properties/closest-and-furthest-point-on-bezier/get-coeffs/double/get-footpoint-poly-2.js';
import { getFootpointPoly3 } from '../../../../../src/simultaneous-properties/closest-and-furthest-point-on-bezier/get-coeffs/double/get-footpoint-poly-3.js';
import { getRandomBezier, getRandomPoint } from '../../../../helpers/get-random-bezier.js';



const getRandomBezier_ = getRandomBezier(200, 37);


describe('getFootpointPoly', function() {
    it('it should return the footpoint polynomial of some bezier curves from a given point',
    function() {
        for (let order=1;order<=3;order++) {
            for (let i=0;i<=0;i++) {
                const ps = getRandomBezier_(order as 0|1|2|3)(i);
                const p = getRandomPoint((i+97)*93)[0];  // some randomish point
                const r = getFootpointPoly(ps,p);

                const expected = order === 1
                    ? getFootpointPoly1(ps,p)
                    : order === 2 
                        ? getFootpointPoly2(ps,p) 
                        : getFootpointPoly3(ps,p);


                expect(r).toEqual(expected);
            }
        }

        {
            const p = [1,1];
            const ps = [p,p,p,p,p];
            expect(() => getFootpointPoly(ps,p)).toThrow();
        }
    });
});
