
import { describe, expect, it } from '@jest/globals';
import { evaluate1stDerivative } from '../../../../src/local-properties-at-t/evaluate-1st-derivative/double/evaluate-1st-derivative.js';
import { tangent } from '../../../../src/local-properties-at-t/tangent/double/tangent.js';

import { getRandomBezier } from '../../../helpers/get-random-bezier.js';




describe('evaluate1stDerivative', function() {
    it('it should equal the (Horner-evaluated) tangent for some bezier curves at some `t` values',
    function() {
        for (let i=0; i<10; i++) {
            for (let order=1; order<=3; order++) {
                const ps = getRandomBezier(128,53)(order as 0|1|2|3)(i);

                for (const t of [0, 0.1, 0.3, 0.5, 0.7, 0.9, 1]) {
                    // same underlying computation as `tangent` => bit-identical
                    expect(evaluate1stDerivative(ps, t)).toEqual(tangent(ps, t));
                }
            }
        }
    });
});
