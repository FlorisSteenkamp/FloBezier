
import { describe, expect, it } from '@jest/globals';
import { generateCuspAtHalf3, normal, tangent } from '../../../src/index.js';

import { getRandomBezier } from '../../helpers/get-random-bezier.js';




describe('normal', function() {
    it('it should accurately calculate the normal of some bezier curves at some `t` values', 
    function() {
        for (let i=0; i<10; i++) {
            for (let order=1; order<=3; order++) {
                const ps = getRandomBezier(128,53)(order as 0|1|2|3)(i);
                let ts = [0, 0.3, 0.9, 1];
            
                for (let t of ts) {
                    let r = normal(ps, t);
                    let s = tangent(ps, t);

                    expect(r).toBeNearly(2**2, [-s[1],s[0]]);
                }
            }
        }

        {
            const ps = [[0,0], [3,0]];
            const t = 0.5;
            let r = normal(ps, t);
            // for lines there should still be a normal defined
            expect(r).toEqual([-0,3]);
        }

        {
            const ps = generateCuspAtHalf3([0,0], [6,2], [3,0]);
            const t = 0.5;
            let r = normal(ps, t);
            // at cusp the normal vanishes
            expect(r).toEqual([-0,0]);
        }
    });
});
