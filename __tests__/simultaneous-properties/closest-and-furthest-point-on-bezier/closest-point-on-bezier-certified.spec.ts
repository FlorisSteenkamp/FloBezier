import { distanceBetween } from 'flo-vector2d';
import { describe, expect, it } from '@jest/globals';
import { closestPointOnBezier, closestPointOnBezierCertified, evalDeCasteljau, fromPowerBasis, fromTo } from '../../../src/index.js';
import { getRandomBezier, getRandomPoint } from '../../helpers/get-random-bezier.js';
import { randomRotateAndTranslate } from '../../helpers/random-rotate-and-translate.js';



const eps = Number.EPSILON;
const sqrt = Math.sqrt;

const maxCoordinate = 1000;
const getRandomBezier_ = getRandomBezier(maxCoordinate, 37);


describe('closestPointOnBezierCertified', function() {
    it('it should find the certified closest point(s) on some bezier curves from a given point',
    function() {
        for (let order=1;order<=3;order++) {
            for (let i=0;i<=10;i++) {
                const ps = getRandomBezier_(order as 0|1|2|3)(i);
                const point = getRandomPoint((i+97)*93)[0];  // some randomish point
                const cps = closestPointOnBezierCertified(ps,point);
                // it could be more but is unlikely for a random bezier and point
                expect(cps.length).toEqual(1);
                const cp = cps[0];
                const { p, t, d, box, ri, dSquaredI } = cp;
                const di = dSquaredI.map(i => sqrt(i));
                // again, it could be more but is unlikely for a random bezier and point
                expect(ri.multiplicity).toEqual(1);
                expect(ri.tE - ri.tS < 4*eps).toBe(true);
                expect(ri.t).toBeNearly(2**4, t);
                // make sure the distance interval is small
                expect(di[1] - di[0]).toBeLessThanOrEqual(maxCoordinate * 4*eps * 2**6);
                // @ts-ignore
                expect((di[1] + di[0])/2).toBeNearly(2**0, d);
                /** estimate of the closest point on the bezier */
                const cpp = [
                    (box[0][0] + box[1][0]) / 2,
                    (box[0][1] + box[1][1]) / 2
                ];
                const dEst = distanceBetween(cpp,point);
                expect(di[0] <= dEst && di[1] >= dEst).toBe(true);

                const { p: bp } = closestPointOnBezier(ps,point);
                expect(cpp[0]).toBeNearly(2**16,bp[0]);
                expect(cpp[1]).toBeNearly(2**16,bp[1]);

                // @ts-ignore
                expect(cpp).toBeNearly(2**4,p);

                const d2 = distanceBetween(cpp,point);

                for (let k=0; k<16+1; k++) {
                    const t_ = k/16;
                    const p_ = evalDeCasteljau(ps,t_);
                    const d1 = distanceBetween(p_,point);
                    expect(d1 >= d2).toBe(true);
                }
            }
        }

        {
            const p = [1,1];
            const ps = [p,p,p,p,p];
            expect(() => closestPointOnBezierCertified(ps,p)).toThrow();

            // const r = closestPointOnBezierCertified([[1,1]],p);
            // expect(r).toEqual([]);
        }

        {
            const p = [0,1];  // on line of symmetery axis of below parabolas
            // parabolas with vertical axes of symmetry at `x = 0`
            const psA = [[-1,1],[0,-1],[1,1]];
            const psB = [[0,0],[1,0],[2,1]];
            const cpsA = closestPointOnBezierCertified(psA,p);
            const cpsB = closestPointOnBezierCertified(psB,p);

            expect(cpsA.length).toEqual(2);
            expect(cpsB.length).toEqual(2);
        }
    });
});

