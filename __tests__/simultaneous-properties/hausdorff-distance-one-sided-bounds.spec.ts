import { describe, expect, it } from '@jest/globals';
import { evalDeCasteljau } from '../../src/local-properties-at-t/evaluate/double/eval-de-casteljau.js';
import { closestPointOnBezier } from '../../src/simultaneous-properties/closest-and-furthest-point-on-bezier/closest-point-on-bezier.js';
import { hausdorffDistanceOneSidedBounds } from '../../src/simultaneous-properties/hausdorff-distance/hausdorff-distance-one-sided-bounds.js';
import { hausdorffDistanceOneSided } from '../../src/simultaneous-properties/hausdorff-distance/hausdorff-distance-one-sided.js';
import { getRandomBezier } from '../helpers/get-random-bezier.js';

const { max, min, sqrt } = Math;


/**
 * Returns `[lo, hi]` with `lo <= h(A,B) <= hi` by sampling `A` at `n + 1`
 * equally spaced parameter values; `B` is given as an array of pieces.
 *
 * * `lo` is the max of the sampled distances and `hi` adds the largest
 * possible distance from any point of `A` to its nearest sample (via the
 * bound `n*maxEdge` on the speed of `A`, `n` its order and `maxEdge` its
 * longest control polygon edge)
 */
function sampled(
        A: number[][],
        Bs: number[][][],
        n = 2000): [number, number] {

    let lo = 0;
    for (let i=0; i<=n; i++) {
        const p = evalDeCasteljau(A, i/n);
        let d = Infinity;
        for (const B of Bs) { d = min(d, closestPointOnBezier(B, p).d); }
        lo = max(lo, d);
    }

    let maxEdge = 0;
    for (let i=1; i<A.length; i++) {
        maxEdge = max(maxEdge, sqrt((A[i][0] - A[i-1][0])**2 + (A[i][1] - A[i-1][1])**2));
    }

    return [lo, lo + (A.length - 1)*maxEdge/(2*n)];
}


const randomBezier = getRandomBezier(1, 53);

/** Returns a few random pairs `[A, Bs]` of curves of all order combinations. */
function getRandomPairs() {
    const pairs: [number[][], number[][][]][] = [];
    let seed = 0;
    for (const oA of [1,2,3] as const) {
        for (const oB of [1,2,3] as const) {
            for (let i=0; i<4; i++) {
                const A = randomBezier(oA)(seed++);
                const B1 = randomBezier(oB)(seed++);
                pairs.push([A, [B1]]);

                // and a `B` of two connected pieces
                const B2 = randomBezier(oB)(seed++);
                B2[0] = B1[B1.length - 1];
                pairs.push([A, [B1, B2]]);
            }
        }
    }

    return pairs;
}


describe('hausdorffDistanceOneSidedBounds', function() {
    it('should return certified bounds (`lower <= h(A,B) <= upper`) for random curves', function() {
        for (const [A, Bs] of getRandomPairs()) {
            const [lo, hi] = sampled(A, Bs);
            const eps = 2**-40;

            for (const options of [
                    {},
                    { maxIterations: 5 },
                    { tolerance: 0, maxIterations: 200 },
                    { lowerStop: lo, upperStop: lo },
                    { lowerStop: 0.5*lo, upperStop: 2*hi + 1 }]) {

                const r = hausdorffDistanceOneSidedBounds(A, Bs, options);
                expect(r.lower).toBeLessThanOrEqual(r.upper);
                expect(r.lower).toBeLessThanOrEqual(hi + eps);
                expect(r.upper).toBeGreaterThanOrEqual(lo - eps);

                // `lower` is the distance from `pA` (at `tA` on `A`) to `pB` (on `B`)
                const pA = evalDeCasteljau(A, r.tA);
                expect(pA[0]).toBeCloseTo(r.pA[0], 12);
                expect(pA[1]).toBeCloseTo(r.pA[1], 12);
                const pB = evalDeCasteljau(Bs[r.kB], r.tB);
                expect(pB[0]).toBeCloseTo(r.pB[0], 12);
                expect(pB[1]).toBeCloseTo(r.pB[1], 12);
                expect(sqrt((pA[0] - pB[0])**2 + (pA[1] - pB[1])**2)).toBeCloseTo(r.lower, 12);
            }

            // a single bezier `B` is the same as a `B` of one piece
            if (Bs.length === 1) {
                expect(hausdorffDistanceOneSidedBounds(A, Bs[0]))
                    .toEqual(hausdorffDistanceOneSidedBounds(A, Bs));
            }
        }
    });

    it('should make the correct decisions for thresholds clearly away from the distance', function() {
        for (const [A, Bs] of getRandomPairs()) {
            const [lo, hi] = sampled(A, Bs);

            for (const maxIterations of [1000, Infinity]) {
                // clearly below the distance
                const below = 0.99*lo;
                const r1 = hausdorffDistanceOneSidedBounds(A, Bs, { lowerStop: below, upperStop: below, maxIterations });
                expect(r1.lower).toBeGreaterThanOrEqual(below);

                // clearly above the distance
                const above = 1.01*hi;
                const r2 = hausdorffDistanceOneSidedBounds(A, Bs, { lowerStop: above, upperStop: above, maxIterations });
                expect(r2.upper).toBeLessThanOrEqual(above);
            }

            // with a margin `δ` it must stop (without `maxIterations`) for
            // any threshold; the decision is undecided only within the margin
            for (const d of [0.5*lo, lo, 0.5*(lo + hi), hi, 2*hi]) {
                const δ = 1e-6;
                const r = hausdorffDistanceOneSidedBounds(A, Bs, { lowerStop: d - δ, upperStop: d, maxIterations: Infinity });
                expect(r.lower >= d - δ || r.upper <= d).toBe(true);
                if (d < lo - δ) { expect(r.upper).toBeGreaterThan(d); }
                if (d > hi) { expect(r.upper).toBeLessThanOrEqual(d); }
            }
        }
    });

    it('should decide a hard case just within the threshold', function() {
        // the true distance is about 0.12345; a former version (with
        // `maxIterations` 1000) wrongly found it to exceed 0.125
        const A = [[199.92633401418215,339.1925881622451],[227.00454513420547,344.68770359828403],[253.738391585154,339.5929808754821]];
        const B = [[199.92633401418215,339.1925881622451],[240.45719229000727,347.41771588431595],[277.7519825791059,332.617403229154]];
        const tol = 0.125;

        const r1 = hausdorffDistanceOneSidedBounds(A, B, { lowerStop: tol, upperStop: tol, maxIterations: Infinity });
        expect(r1.upper).toBeLessThanOrEqual(tol);
        expect(r1.lower).toBeLessThan(tol);

        const r2 = hausdorffDistanceOneSidedBounds(A, B, { lowerStop: tol - 1e-9, upperStop: tol, maxIterations: Infinity });
        expect(r2.upper).toBeLessThanOrEqual(tol);

        const r3 = hausdorffDistanceOneSidedBounds(A, B, { tolerance: 1e-12, maxIterations: Infinity });
        expect(r3.upper - r3.lower).toBeLessThan(1e-12);
        expect(r3.lower).toBeCloseTo(0.12345, 5);
    });

    it('should stop immediately if an endpoint of `A` is beyond `lowerStop`', function() {
        const A = [[0,0],[1,1],[2,0]];
        const B = [[0,1],[1,2],[2,1]];
        const r = hausdorffDistanceOneSidedBounds(A, B, { lowerStop: 0.5, upperStop: 0.5, maxIterations: 0 });
        expect(r.lower).toBeGreaterThanOrEqual(0.5);
    });

    it('should behave like `hausdorffDistanceOneSided` when no options are given', function() {
        for (const [A, Bs] of getRandomPairs()) {
            if (Bs.length !== 1) { continue; }
            expect(hausdorffDistanceOneSidedBounds(A, Bs[0]).lower)
                .toEqual(hausdorffDistanceOneSided(A, Bs[0]));
        }
    });

    it('should handle the special cases', function() {
        // `A` a point
        {
            const r = hausdorffDistanceOneSidedBounds([[0,1]], [[[-1,0],[1,0]], [[1,0],[1,1]]]);
            expect(r).toEqual({ lower: 1, upper: 1, tA: 0, pA: [0,1], kB: 0, tB: 0.5, pB: [0,0] });
        }
        // `B` a point
        {
            const r = hausdorffDistanceOneSidedBounds([[0,0],[1,1],[2,0]], [[0,0]]);
            expect(r.lower).toEqual(2);
            expect(r.upper).toEqual(2);
        }
        // a line and a line (convex)
        {
            const r = hausdorffDistanceOneSidedBounds([[0,1],[2,3]], [[0,0],[5,0]]);
            expect(r.lower).toEqual(3);
            expect(r.upper).toEqual(3);
            expect(r.tA).toEqual(1);
        }
        // a line and two lines (not convex): the max is in the interior
        {
            const r = hausdorffDistanceOneSidedBounds([[0,1],[2,1]], [[[0,0],[1,-1]], [[1,-1],[2,0]]], { tolerance: 1e-12, maxIterations: 1000 });
            expect(r.upper - r.lower).toBeLessThan(1e-12);
            expect(r.lower).toBeCloseTo(sqrt(2), 12);
            expect(r.tA).toBeCloseTo(0.5, 6);
        }
    });
});
