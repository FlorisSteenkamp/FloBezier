import { describe, expect, it } from '@jest/globals';
import { elevateDegree } from '../../../src/transformation/degree-or-type/elevate-degree.js';
import { getRandomBezier } from '../../helpers/get-random-bezier.js';


/** Order-agnostic de Casteljau evaluation used to cross-check the curve. */
function deCasteljau(ps: number[][], t: number): number[] {
    let pts = ps.map(p => p.slice());
    while (pts.length > 1) {
        const next: number[][] = [];
        for (let i=0; i<pts.length-1; i++) {
            next.push([
                (1 - t)*pts[i][0] + t*pts[i+1][0],
                (1 - t)*pts[i][1] + t*pts[i+1][1]
            ]);
        }
        pts = next;
    }
    return pts[0];
}


describe('elevateDegree', function() {
    it('it should add one control point while tracing the identical curve',
    function() {
        for (let i=0; i<10; i++) {
            for (let order=1; order<=3; order++) {
                const ps = getRandomBezier(128,53)(order as 0|1|2|3)(i);
                const r = elevateDegree(ps);

                // exactly one extra control point
                expect(r.length).toBe(ps.length + 1);

                // endpoints are preserved exactly
                expect(r[0]).toEqual(ps[0]);
                expect(r[r.length-1]).toEqual(ps[ps.length-1]);

                // the elevated curve traces the same points as the original
                for (const t of [0, 0.1, 0.25, 0.5, 0.75, 0.9, 1]) {
                    expect(deCasteljau(r, t)).toBeNearly(2**8, deCasteljau(ps, t));
                }
            }
        }
    });

    it('it should elevate a line to a quadratic with an evenly spaced midpoint',
    function() {
        const ps = [[0,0], [3,6]];
        const r = elevateDegree(ps);
        expect(r).toEqual([[0,0], [1.5,3], [3,6]]);
    });

    it('it should keep a degenerate (point) curve at that point',
    function() {
        const p = [1,1];
        const ps = [p,p];
        expect(elevateDegree(ps)).toEqual([p,p,p]);
    });
});
