
import { describe, expect, it } from '@jest/globals';
import { eCompress, eEstimate } from 'big-float-ts';
import { evaluate1stDerivative } from '../../../../src/local-properties-at-t/evaluate-1st-derivative/double/evaluate-1st-derivative.js';
import { evaluate1stDerivativeExact } from '../../../../src/local-properties-at-t/evaluate-1st-derivative/exact/evaluate-1st-derivative-exact.js';
import { tangentExact } from '../../../../src/local-properties-at-t/tangent/exact/tangent-exact.js';

import { getRandomCubic, getRandomLine, getRandomQuad } from '../../../helpers/get-random-bezier.js';




describe('evaluate1stDerivativeExact', function() {
    it('it should exactly evaluate the 1st derivative of the power basis of some bezier curves',
    function() {
        for (const getRandom of [getRandomLine, getRandomQuad, getRandomCubic]) {
            for (let i=0; i<10; i++) {
                const ps = getRandom(i);

                for (const t of [0, 1/8, 0.5, 1]) {
                    const est = evaluate1stDerivative(ps, t);
                    const exact = evaluate1stDerivativeExact(ps, t).map(eCompress);

                    // the exact result estimated back to a double matches the double result
                    expect(exact.map(eEstimate)).toBeNearly(2**8, est);
                    // and it agrees with the existing exact tangent
                    expect(exact).toEqual(tangentExact(ps, t).map(eCompress));
                }
            }
        }
    });
});
