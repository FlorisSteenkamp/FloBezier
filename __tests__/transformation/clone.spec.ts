import { describe, expect, it } from '@jest/globals';
import { clone } from '../../src/index.js';
import { getRandomBezier, getRandomCubic } from '../helpers/get-random-bezier.js';


describe('clone', function() {
    it('should deep clone some bezier curves, i.e. create an identical bezier but with a different reference',
    function() {
        for (let order=0; order<=3; order++) {
            for (let j=0; j<5; j++) {
                let ps = getRandomBezier(111,53)(order as 0|1|2|3)(j);
                const ps_ = clone(ps);
                expect(ps_ !== ps).toBe(true);

                for (let i=0; i<ps.length; i++) {
                    const p = ps[i];
                    const p_ = ps_[i];
                    expect(p !== p_).toBe(true);
                }

                expect(ps_).toEqual(ps);
            }
        }
    });
});
