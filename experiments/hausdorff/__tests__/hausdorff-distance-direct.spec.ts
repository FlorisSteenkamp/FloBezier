import { expect, describe, it } from '@jest/globals';
import { writeFileSync } from 'fs';
import {
    hausdorffDistanceOneSided,
    closestPointOnBezier,
    evalDeCasteljau
} from '../../../src/index.js';
import { hausdorffDistanceOneSidedDirect, hausdorffDistanceDirect, type HausdorffDirectKind as Kind } from '../hausdorff-distance-direct.js';
import { bernsteinRoots01 } from '../bernstein-roots.js';

const OUT = process.env['HAUSDORFF_OUT'];


/** mulberry32 */
function rng(seed: number) {
    return () => {
        seed |= 0; seed = seed + 0x6D2B79F5 | 0;
        let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
        t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
}


/** `max_t min_s |A(t) - B(s)|` by dense sampling plus golden section search */
function brute(A: number[][], B: number[][]): number {
    const g = (t: number) => closestPointOnBezier(B, evalDeCasteljau(A, t)).d;
    const N = 100_000;
    let bt = 0, bd = -1;
    for (let i=0; i<=N; i++) { const d = g(i/N); if (d > bd) { bd = d; bt = i/N; } }
    let a = Math.max(0, bt - 1/N), b = Math.min(1, bt + 1/N);
    for (let k=0; k<100; k++) {
        const m1 = a + (b - a)*0.382, m2 = a + (b - a)*0.618;
        if (g(m1) < g(m2)) { a = m1; } else { b = m2; }
    }
    return Math.max(bd, g((a + b)/2));
}


describe('candidate based one-sided Hausdorff distance', function() {
    it('matches the library and brute force on random curves of all orders', function() {
        const r = rng(12345);
        const rand = (n: number) => Array.from({ length: n }, () => [r(), r()]);
        const N = Number(process.env['HAUSDORFF_N'] ?? 15);

        const rows: Record<string, unknown>[] = [];
        let worst = 0, misses = 0;
        for (const nA of [2, 3, 4]) {
            for (const nB of [2, 3, 4]) {
                let errRes = 0, missRes = 0, libLow = 0;
                let tRes = 0, tLib = 0;
                const resTimes: number[] = [];
                const kinds: Partial<Record<Kind, number>> = {};
                for (let i=0; i<N; i++) {
                    const A = rand(nA), B = rand(nB);

                    let t0 = performance.now();
                    const res = hausdorffDistanceOneSidedDirect(A, B);
                    tRes += performance.now() - t0;
                    resTimes.push(performance.now() - t0);

                    t0 = performance.now();
                    const lib = hausdorffDistanceOneSided(A, B, 1e-12, 200);
                    tLib += performance.now() - t0;

                    // every candidate value is attained, so neither can exceed
                    // the true value; the larger of the two is the best estimate
                    // and brute force settles any disagreement
                    let truth = Math.max(res.d, lib);
                    if (truth - Math.min(res.d, lib) > 1e-10) {
                        truth = Math.max(truth, brute(A, B));
                        if (truth - lib > 1e-10) { libLow++; }
                    }
                    errRes = Math.max(errRes, truth - res.d);
                    if (truth - res.d > 1e-8) { missRes++; }
                    kinds[res.kind] = (kinds[res.kind] ?? 0) + 1;
                }
                worst = Math.max(worst, errRes);
                misses += missRes;
                rows.push({
                    A: nA - 1, B: nB - 1, n: N,
                    errRes, missRes, libLow,
                    msRes: +(tRes/N).toFixed(2), msLib: +(tLib/N).toFixed(2),
                    msResMedian: +resTimes.sort((a, b) => a - b)[N >> 1].toFixed(2),
                    msResMax: +resTimes[N - 1].toFixed(2),
                    kinds
                });
            }
        }
        if (OUT) { writeFileSync(OUT, JSON.stringify(rows, null, 1)); }
        expect(misses).toBe(0);
        expect(worst).toBeLessThan(1e-10);
    });

    it('returns the larger one-sided result, with the roles of A and B swapped if it is h(B,A)', function() {
        const r = rng(777);
        const rand = (n: number) => Array.from({ length: n }, () => [r(), r()]);
        const sides = new Set<string>();
        for (let i=0; i<40; i++) {
            const A = rand(2 + (i % 3)), B = rand(2 + ((i >> 1) % 3));
            const ab = hausdorffDistanceOneSidedDirect(A, B);
            const ba = hausdorffDistanceOneSidedDirect(B, A);
            const h = hausdorffDistanceDirect(A, B);
            sides.add(h.side);
            expect(h.d).toBe(Math.max(ab.d, ba.d));
            const [tA, tB] = h.side === 'ab' ? [ab.tA, ab.tB] : [ba.tB, ba.tA];
            expect(h.tA).toBe(tA);
            expect(h.tB).toBe(tB);
            // `pA` lies on `A`, `pB` on `B` and they are `d` apart
            expect(h.pA).toEqual(evalDeCasteljau(A, h.tA));
            expect(h.pB).toEqual(evalDeCasteljau(B, h.tB));
            expect(Math.hypot(h.pA[0] - h.pB[0], h.pA[1] - h.pB[1])).toBeCloseTo(h.d, 12);
        }
        expect(sides.size).toBe(2);
    });

    it('finds interior roots next to (exact or rounded) roots at the end points', function() {
        const sorted = (p: number[]) => bernsteinRoots01(p).sort((a, b) => a - b);
        // s(s - 0.3)(s - 0.7), (s - 0.5)(s - 1), 10s³ - 6s
        const r1 = sorted([1, -1, 0.21, 0]);
        expect(r1.length).toBe(3);
        [0, 0.3, 0.7].forEach((x, i) => expect(r1[i]).toBeCloseTo(x, 14));
        const r2 = sorted([1, -1.5, 0.5]);
        expect(r2.length).toBe(2);
        [0.5, 1].forEach((x, i) => expect(r2[i]).toBeCloseTo(x, 14));
        const r3 = sorted([10, 0, -6, 0]);
        expect(r3.length).toBe(2);
        [0, Math.sqrt(0.6)].forEach((x, i) => expect(r3[i]).toBeCloseTo(x, 14));
        // a root at 1 rounded to opposite signs in the power and Bernstein
        // forms (just outside `[0,1]` in the latter): the interior root
        const r4 = sorted([
            544.8637862662966, -1651.621517489302, 1666.8791399728693,
            -625.4165824159363, 69.71274385818279, -4.417570192110393
        ]);
        expect(r4.length).toBe(1);
        expect(r4[0]).toBeCloseTo(0.58632, 4);
    });

    it('handles a zero derivative of B at an end point', function() {
        // the reported case: a quadratic with a doubled control point
        const A = [[0,0],[1,1],[2,0]];
        expect(hausdorffDistanceOneSidedDirect(A, [[0,0],[0,0],[3,1]]).d).toBeCloseTo(2/Math.sqrt(10), 14);
        expect(hausdorffDistanceOneSidedDirect(A, [[0,0],[3,1],[3,1]]).d).toBeCloseTo(2/Math.sqrt(10), 14);
        // a line and a quadratic that are a single point
        expect(hausdorffDistanceOneSidedDirect(A, [[1,0],[1,0]]).d).toBeCloseTo(1, 14);
        expect(hausdorffDistanceOneSidedDirect(A, [[1,0],[1,0],[1,0]]).d).toBeCloseTo(1, 14);

        const r = rng(4242);
        const P = () => [r(), r()];
        for (let i=0; i<24; i++) {
            const A = Array.from({ length: 2 + (i % 3) }, P);
            const p = P(), q = P();
            const B = [
                [p, p, q], [p, q, q],
                [p, p, P(), P()], [P(), P(), q, q]
            ][i % 4];
            const res = hausdorffDistanceOneSidedDirect(A, B);
            expect(res.kind === 'iterative').toBe(B.length === 4);
            expect(Math.abs(res.d - brute(A, B))).toBeLessThan(1e-10);
            // `tB` is a parameter of `B` itself (not of the reduced curve)
            const pB = evalDeCasteljau(B, res.tB);
            expect(Math.hypot(pB[0] - res.pB[0], pB[1] - res.pB[1])).toBeLessThan(1e-10);
        }
    });

});

