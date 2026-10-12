import { describe, expect, it } from '@jest/globals';
import { getMedialPoints } from '../../src/get-medial-points/double/get-medial-points.js';
import { getMedialPointCoeffs } from '../../src/get-medial-points/double/get-medial-point-coeffs.js';
import { ddGetMedialPointCoeffs } from '../../src/get-medial-points/double-double/dd-get-medial-point-coeffs.js';

const { abs, hypot } = Math;


describe('getMedialPoints for a point (order 0 bezier curve)', function() {
    it('should return the intersection of the ray with the perpendicular bisector', function() {
        // the bisector of [0,0] and [4,0] is the line x = 2
        expect(getMedialPoints([0,0], [1,0], [[4,0]])).toEqual({ ts: [2], ss: [0], qs: [[2,0]] });
        // `v` need not be a unit vector
        expect(getMedialPoints([0,0], [2,0], [[4,0]])).toEqual({ ts: [1], ss: [0], qs: [[2,0]] });

        let s = 50;
        const rnd = () => { s = (s*1103515245 + 12345) % 2147483648; return s/2147483648; };
        const r = (a: number, b: number) => a + (b - a)*rnd();
        for (let i=0; i<1000; i++) {
            const p = [r(-100,100), r(-100,100)];
            const v = [r(-1,1), r(-1,1)];
            const P = [r(-100,100), r(-100,100)];
            const { ts, ss, qs } = getMedialPoints(p, v, [P]);
            expect(ts.length).toEqual(1);
            expect(ss).toEqual([0]);
            const [q] = qs;
            // `q` is on the ray at `t`
            expect(q).toEqual([p[0] + ts[0]*v[0], p[1] + ts[0]*v[1]]);
            // `q` is equidistant from `p` and `P` (unless the ray is nearly
            // parallel to the bisector in which case `q` is very far away)
            const dP = hypot(q[0] - p[0], q[1] - p[1]);
            const dQ = hypot(q[0] - P[0], q[1] - P[1]);
            expect(abs(dP - dQ)).toBeLessThanOrEqual(1e-12*(dP + dQ));
        }
    });

    it('should return a negative `t` if the medial point lies behind `p`', function() {
        expect(getMedialPoints([0,0], [1,0], [[-4,0]])).toEqual({ ts: [-2], ss: [0], qs: [[-2,0]] });
    });

    it('should return `NaN` for `t` if the ray is parallel to the bisector or `p` coincides with the point', function() {
        // the ray runs along the bisector's direction (the line x = 0 is
        // parallel to the bisector x = 2)
        expect(getMedialPoints([0,0], [0,1], [[4,0]]).ts).toEqual([NaN]);
        // `p` is the point itself
        expect(getMedialPoints([1,2], [1,0], [[1,2]]).ts).toEqual([NaN]);
    });
});


describe('getMedialPointCoeffs / ddGetMedialPointCoeffs unsupported orders', function() {
    it('should throw a descriptive error for unsupported bezier curve orders', function() {
        const p = [0.4, -0.3];
        const v = [1.1, 0.2];
        const pDd = p.map(c => [0,c]);
        const vDd = v.map(c => [0,c]);
        const ps4 = [[0,0],[1,1],[2,1],[3,0],[4,2]];
        const msg = /must be of order 0, 1, 2 or 3/;

        expect(() => getMedialPointCoeffs(p, v, ps4)).toThrow(msg);
        expect(() => getMedialPointCoeffs(p, v, [])).toThrow(msg);
        expect(() => ddGetMedialPointCoeffs(pDd, vDd, ps4)).toThrow(msg);
        expect(() => ddGetMedialPointCoeffs(pDd, vDd, [])).toThrow(msg);
        expect(() => getMedialPoints(p, v, ps4)).toThrow(msg);
    });
});


describe('getMedialPoints scale invariance', function() {
    it('should give scaled results for scaled inputs (also for very small and very large coordinates)', function() {
        // previously a fixed absolute threshold (and comparing `A` with `B`,
        // which scale differently) made valid solutions `NaN` for very small 
        // or very large coordinates
        const cases = [
            { p: [0,0], v: [1,0], ps: [[4,1]] },
            { p: [1,-0.5], v: [0.1,1], ps: [[-1,2],[2,5]] },
            { p: [0,0], v: [1,0.35], ps: [[2,-1],[4,3],[7,0]] },
            { p: [0.5,0.25], v: [1,0.1], ps: [[1.5,0.1],[-3.2,0.35],[4.5,0.2],[6.5,0.2]] }
        ];
        for (const { p, v, ps } of cases) {
            const ts = getMedialPoints(p, v, ps).ts;
            expect(ts.length).toBeGreaterThan(0);
            for (const k of [1e-30, 1e-12, 1e12, 1e30]) {
                const sc = (q: number[]) => q.map(c => c*k);
                // scaling `p` and `ps` (but not the direction `v`) scales `t`
                const tsK = getMedialPoints(sc(p), v, ps.map(sc)).ts;
                expect(tsK.length).toEqual(ts.length);
                for (let i=0; i<ts.length; i++) {
                    expect(abs(tsK[i]/(k*ts[i]) - 1)).toBeLessThan(1e-9);
                }
            }
        }

        // a very close point
        expect(getMedialPoints([0,0], [1,0], [[4e-17,0]]).ts).toEqual([2e-17]);
    });
});
