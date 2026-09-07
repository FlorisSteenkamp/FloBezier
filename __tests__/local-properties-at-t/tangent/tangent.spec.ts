
import { describe, expect, it } from '@jest/globals';
import { classify } from '../../../src/global-properties/classification/classify.js';
import { generateCuspAtHalf3 } from '../../../src/create/generate-cusp-at-half-t.js';
import { tangent } from '../../../src/local-properties-at-t/tangent/double/tangent.js';

import { getRandomCubic, getRandomLine, getRandomQuad } from '../../helpers/get-random-bezier.js';




describe('tangent', function() {
    it('it should accurately calculate the tangent of some bezier curves at some `t` values', 
    function() {
        {
            const ps = getRandomLine(0);
            let ts = [0, 0.1, 0.3, 0.5, 0.7, 0.9, 1];
            
            for (let t of ts) {
                let r = tangent(ps, t);
                expect(r).toBeNearly(2**2, [95.49996989063631,6.018466339429793]);
            }
        }

        {
            const ps = getRandomQuad(0);
            const t = 0.5;
            let r = tangent(ps, t);
            expect(r).toBeNearly(2**2, [88.88790035255639,65.33866243350508]);
        }

        {
            const ps = getRandomCubic(0);
            const t = 0.5;
            let r = tangent(ps, t);
            expect(r).toBeNearly(2**2, [169.98648967610893,-29.899637313155253]);
        }

        {
            const ps = generateCuspAtHalf3([0,0], [6,2], [3,0]);
            const t = 0.5;
            let r = tangent(ps, t);
            // at cusp the tangent vanishes
            expect(r).toBeNearly(2**2, [0,0]);
        }
    });
});
