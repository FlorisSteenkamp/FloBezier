import { describe, expect, it } from '@jest/globals';
import { unitTangent } from '../../../src/local-properties-at-t/tangent/double/unit-tangent.js';
import { tangent } from '../../../src/local-properties-at-t/tangent/double/tangent.js';
import { getRandomBezier } from '../../helpers/get-random-bezier.js';




describe('unitTangent', function() {
    it('it should return a unit-length vector parallel to the tangent',
    function() {
        for (let i=0; i<10; i++) {
            for (let order=1; order<=3; order++) {
                const ps = getRandomBezier(128,53)(order as 0|1|2|3)(i);
                const ts = [0, 0.3, 0.9, 1];

                for (const t of ts) {
                    const u = unitTangent(ps, t)!;
                    const v = tangent(ps, t);
                    const len = Math.sqrt(v[0]*v[0] + v[1]*v[1]);

                    // unit length
                    expect(Math.sqrt(u[0]*u[0] + u[1]*u[1])).toBeNearly(2**4, 1);
                    // parallel to (and same direction as) the raw tangent
                    expect(u).toBeNearly(2**4, [v[0]/len, v[1]/len]);
                }
            }
        }
    });

    it('it should return undefined where the tangent vanishes (e.g. at a cusp)',
    function() {
        // integer cusp with P0+P1 === P2+P3 => tangent at t=0.5 is exactly [0,0]
        const ps = [[-1,1], [1,-1], [-1,-1], [1,1]];
        expect(tangent(ps, 0.5)).toEqual([0, 0]);
        expect(unitTangent(ps, 0.5)).toBeUndefined();
    });
});
