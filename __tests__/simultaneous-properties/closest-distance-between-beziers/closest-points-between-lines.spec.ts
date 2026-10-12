import { describe, expect, it } from '@jest/globals';
import { closestPointsBetweenBeziers } from '../../../src/simultaneous-properties/closest-distance-between-beziers/closest-points-between-beziers.js';


describe('closestPointsBetweenBeziers for two lines', function() {
    it('should return the intersection with distance 0 for intersecting lines', function() {
        const r = closestPointsBetweenBeziers([[0,0],[2,2]], [[0,2],[2,0]]);
        expect(r.length).toEqual(1);
        expect(r[0].d).toEqual(0);
        expect(r[0].pA.p[0]).toBeCloseTo(1, 14);
        expect(r[0].pA.p[1]).toBeCloseTo(1, 14);
    });

    it('should return the closest endpoint pair for non-intersecting lines', function() {
        // the endpoint `[3,1]` of `B` is closest to `A` (at `[3,0]`, `t = 0.75`)
        const A = [[0,0],[4,0]];
        const B = [[3,1],[5,4]];
        const r = closestPointsBetweenBeziers(A, B);
        expect(r.length).toEqual(1);
        expect(r[0].d).toBeCloseTo(1, 14);
        expect(r[0].pB.p).toEqual([3,1]);
        expect(r[0].pB.t).toEqual(0);
        expect(r[0].pA.t).toBeCloseTo(0.75, 14);

        // swapping the lines gives the same distance
        expect(closestPointsBetweenBeziers(B, A)[0].d).toBeCloseTo(1, 14);
    });

    it('should return all endpoints at the minimum distance for parallel lines', function() {
        // overlapping parallel lines: the endpoints `A[1]` and `B[0]` are both 
        // at distance 1 from the other line
        const A = [[0,0],[4,0]];
        const B = [[2,1],[6,1]];
        const r = closestPointsBetweenBeziers(A, B);
        expect(r.length).toEqual(2);
        for (const { d } of r) { expect(d).toEqual(1); }
    });
});
