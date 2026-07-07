
import { describe, expect, it } from '@jest/globals';
import { cubicToQuadratic, lineToCubic, quadraticToCubic, toCubic } from '../../../src/index.js';

import { getRandomCubic, getRandomLine, getRandomPoint, getRandomQuad } from '../../helpers/get-random-bezier.js';




describe('toCubic', function() {
    it('it should correctly convert some point, line and quadratic bezier curves to cubic bezier curves',
    function() {
        {
            let ps = getRandomLine(0);
            const r = toCubic(ps);
            expect(r).toBeNearly(2**6, [
                [-108.49686506776892, -13.011161175008596],
                  [-76.66354177089015, -11.005005728531998],
                  [-44.83021847401138, -8.9988502820554],
                  [-12.996895177132615, -6.992694835578803]
            ]);

            const [[x0,y0],[x1,y1],[x2,y2],[x3,y3]] = r;

            expect((y3 - y0)/3).toBeNearly(2**2, y3 - y2);
            expect((y3 - y0)/3).toBeNearly(2**2, y2 - y1);
            expect((y3 - y0)/3).toBeNearly(2**2, y1 - y0);

            expect((x3 - x0)/3).toBeNearly(2**2, x3 - x2);
            expect((x3 - x0)/3).toBeNearly(2**2, x2 - x1);
            expect((x3 - x0)/3).toBeNearly(2**2, x1 - x0);

            expect(lineToCubic(ps)).toEqual(toCubic(ps));
        }

        {
            let ps = getRandomQuad(0);
            const r = toCubic(ps);
            expect(r).toBeNearly(2**6, [
                [-108.49686506776892, -13.011161175008596],
                [-44.83021847401138, -8.9988502820554],
                [-15.200918356492588, 12.780703862446293],
                [-19.608964715212537, 52.32750125849648]
            ]);

            const ps_ = cubicToQuadratic(r);

            expect(ps).toBeNearly(2**2,ps_!);

            expect(quadraticToCubic(ps)).toEqual(toCubic(ps));
        }


        {
            let ps = getRandomCubic(0);
            const r = toCubic(ps);
            expect(r).toEqual(ps);
        }
        {
            let ps = getRandomQuad(0);
            const r = toCubic(ps);
            expect(ps).toBeNearly(2**2, cubicToQuadratic(r)!);
        }
        {
            let ps = getRandomLine(0);
            const r = toCubic(ps);
            expect(ps).toBeNearly(2**1, [r[0],r[3]]);
        }
        {
            let ps = getRandomPoint(0);
            const r = toCubic(ps);
            const p = ps[0];
            expect(r).toEqual([p,p,p,p]);
        }

        // some edge cases
        {
            const p = [1,1];
            const ps = [p,p,p,p,p];
            expect(() => toCubic(ps)).toThrow();
        }
    });
});
