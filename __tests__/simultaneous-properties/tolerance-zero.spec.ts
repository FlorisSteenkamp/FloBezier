import { describe, expect, it } from '@jest/globals';
import { hausdorffDistanceOneSided } from '../../src/simultaneous-properties/hausdorff-distance/hausdorff-distance-one-sided.js';
import { closestPointsBetweenBeziers } from '../../src/simultaneous-properties/closest-distance-between-beziers/closest-points-between-beziers.js';

const { abs } = Math;


// A cubic far from the origin (so that the default tolerance, relative to the
// maximum coordinate, is coarse) whose maximum `y` value, `o + yMax`, is
// attained at an interior (irrational) `t`
const o = 1e5;
const A = [[o,o],[o+1,o+10],[o+7,o+3],[o+10,o]];
const yMax = 5.188967614367036;


describe('an explicit tolerance of `0`', function() {
    it('should not be replaced by the default tolerance in `hausdorffDistanceOneSided`', function() {
        // the Hausdorff distance from `A` to its chord is `yMax`
        const B = [[o,o],[o+10,o]];
        const errDefault = abs(hausdorffDistanceOneSided(A, B) - yMax);
        const err0 = abs(hausdorffDistanceOneSided(A, B, 0) - yMax);

        // previously `0` was treated as "use the default" giving the same result
        expect(err0).toBeLessThan(errDefault);
        expect(err0).toBeLessThan(1e-5);
    });

    it('should not be replaced by the default tolerance in `closestPointsBetweenBeziers`', function() {
        // a horizontal line just above the maximum of `A`
        const y = o + yMax + 1e-3;
        const B = [[o,y],[o+10,y]];
        const gap = y - (o + yMax);
        const errDefault = abs(closestPointsBetweenBeziers(A, B)[0].d - gap);
        const err0 = abs(closestPointsBetweenBeziers(A, B, 0)[0].d - gap);

        expect(err0).toBeLessThan(errDefault);
        expect(err0).toBeLessThan(1e-5);
    });
});
