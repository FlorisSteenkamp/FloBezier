import { scaleExpansion } from 'big-float-ts';

import { describe, expect, it } from '@jest/globals';

import { getRandomBezier, getRandomCubic, getRandomLine, getRandomPoint, getRandomQuad } from '../helpers/get-random-bezier.js';
import { toEstimation } from '../../src/transformation/to-estimation.js';



describe('toEstimation', function() {
    it('it should correctly convert some bezier curves with control point coordinates in Shewchuk expansions to double precision',
    function() {
        {
            // get some bezier with Shewchuk expansion coordinates
            const seed = 0;
            const pss = [0,1,2,3].map(i => getRandomCubic(i + 4*seed));
            const ps: number[][][] = [];
            for (let i=0; i<4; i++) {  // 4 points
                const pe = [[1],[1]];  // point with Shewchuk expansion coordinates
                for (let j=0; j<2; j++)  {  // 2 coordinates per point
                    for (let k=0; k<4; k++) {  // 4 beziers to comine to get some random coordinates
                        const ps = pss[k];
                        const p = ps[i];
                        const c = p[j];

                        pe[j] = scaleExpansion(pe[j],c);
                    }
                }
                ps.push(pe);
            }

            const r = toEstimation(ps);
            expect(r).toBeNearly(2**0, ps.map(p => p.map(c => c[c.length-1])));
        }
    });
});
