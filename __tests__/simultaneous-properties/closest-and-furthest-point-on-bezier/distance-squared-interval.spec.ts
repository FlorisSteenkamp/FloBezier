import { describe, expect, it } from '@jest/globals';
import { eCompare, eAdd, eMult, twoDiff, eDiff } from 'big-float-ts';
import { rootIntervalToDistanceSquaredInterval } from '../../../src/simultaneous-properties/closest-and-furthest-point-on-bezier/root-interval-to-distance-squared-interval.js';
import { closestPointOnBezierCertified } from '../../../src/simultaneous-properties/closest-and-furthest-point-on-bezier/closest-point-on-bezier-certified.js';
import { evaluateExact } from '../../../src/local-properties-at-t/evaluate/exact/evaluate-exact.js';
import { evaluate } from '../../../src/local-properties-at-t/evaluate/double/evaluate.js';

const { min, max } = Math;

/** exact squared distance between two double points */
const d2 = (a: number[], b: number[]) => {
    const dx = twoDiff(a[0], b[0]), dy = twoDiff(a[1], b[1]);
    return eAdd(eMult(dx,dx), eMult(dy,dy));
};
/** exact squared distance between a double point and an exact (expansion) point */
const d2e = (p: number[], q: number[][]) => {
    const dx = eDiff([p[0]], q[0]), dy = eDiff([p[1]], q[1]);
    return eAdd(eMult(dx,dx), eMult(dy,dy));
};


describe('rootIntervalToDistanceSquaredInterval', function() {
    it('should return an interval containing the squared distance from the point to any point in the box',
    function() {
        // simple cases (the exact extremes are `[0,2]`, `[1,10]` and `[2,18]`;
        // the returned bounds are within a few ulps of these)
        const near = (a: number, b: number) => Math.abs(a - b) <= Math.abs(b)*2**-48;
        {
            const [lo, hi] = rootIntervalToDistanceSquaredInterval([[0,0],[2,2]], [1,1]);  // inside
            expect(lo).toEqual(0);  // exactly zero if the point is inside the box
            expect(hi >= 2 && near(hi, 2)).toBe(true);
        }
        {
            const [lo, hi] = rootIntervalToDistanceSquaredInterval([[0,0],[2,2]], [1,3]);  // above (in x-range)
            expect(lo <= 1 && near(lo, 1)).toBe(true);
            expect(hi >= 10 && near(hi, 10)).toBe(true);
        }
        {
            const [lo, hi] = rootIntervalToDistanceSquaredInterval([[0,0],[2,2]], [3,3]);  // outside both ranges
            expect(lo <= 2 && near(lo, 2)).toBe(true);
            expect(hi >= 18 && near(hi, 18)).toBe(true);
        }

        let s = 23;
        const rnd = () => { s = (s*1103515245 + 12345) % 2147483648; return s/2147483648; };
        const u = (a: number, b: number) => a + (b - a)*rnd();
        const pt = () => [u(-100, 100), u(-100, 100)];

        for (let i=0; i<3000; i++) {
            const a = pt(), b = pt();
            const box = [[min(a[0],b[0]), min(a[1],b[1])], [max(a[0],b[0]), max(a[1],b[1])]];
            const [[x0,y0],[x1,y1]] = box;
            // points inside, aligned with the box (in x or y range) and outside it
            const p = [
                [u(x0, x1), u(y0, y1)],
                [u(x0, x1), y1 + u(0.1, 50)],
                [x0 - u(0.1, 50), u(y0, y1)],
                [x1 + u(0.1, 50), y0 - u(0.1, 50)]
            ][i % 4];

            const [dMin, dMax] = rootIntervalToDistanceSquaredInterval(box, p);

            // the extremes: the point clamped to the box and the furthest corner
            const clamped = [min(max(p[0], x0), x1), min(max(p[1], y0), y1)];
            const others = [clamped, [x0,y0], [x0,y1], [x1,y0], [x1,y1], [u(x0,x1), u(y0,y1)]];
            for (const q of others) {
                const e = d2(p, q);
                expect(eCompare([dMin], e)).toBeLessThanOrEqual(0);
                expect(eCompare([dMax], e)).toBeGreaterThanOrEqual(0);
            }
        }
    });
});


describe('closestPointOnBezierCertified', function() {
    it('should return a squared distance interval containing the exact squared distance, also for points on the curve',
    function() {
        let s = 32;
        const rnd = () => { s = (s*1103515245 + 12345) % 2147483648; return s/2147483648; };
        const u = (a: number, b: number) => a + (b - a)*rnd();
        const pt = () => [u(-100, 100), u(-100, 100)];

        for (const order of [1, 2, 3]) {
            for (let i=0; i<100; i++) {
                const ps = Array.from({ length: order + 1 }, pt);
                // a point (very nearly) on the curve and a point away from it
                for (const p of [evaluate(ps, u(0, 1)), pt()]) {
                    const r = closestPointOnBezierCertified(ps, p);
                    expect(r.length).toBeGreaterThan(0);
                    for (const { ri, dSquaredI, d } of r) {
                        for (let j=0; j<=4; j++) {
                            const t = ri.tS + (ri.tE - ri.tS)*j/4;
                            if (t < ri.tS || t > ri.tE) { continue; }
                            const e = d2e(p, evaluateExact(ps, t));
                            expect(eCompare([dSquaredI[0]], e)).toBeLessThanOrEqual(0);
                            expect(eCompare([dSquaredI[1]], e)).toBeGreaterThanOrEqual(0);
                        }
                        // the best estimate distance lies within the interval
                        expect(d*d).toBeGreaterThanOrEqual(dSquaredI[0]*(1 - 2**-50));
                        expect(d*d).toBeLessThanOrEqual(dSquaredI[1]*(1 + 2**-50));
                    }
                }
            }
        }

        // a point exactly on the curve has a closest distance of exactly zero
        const r = closestPointOnBezierCertified([[0,0],[4,4]], [1,1]);
        expect(r[0].dSquaredI[0]).toEqual(0);
        expect(r[0].d).toEqual(0);
    });
});
