import { expect, describe, it } from '@jest/globals';
import { writeFileSync } from 'fs';
import {
    hausdorffDistanceOneSided, hausdorffDistanceOneSidedDirect, hausdorffDistanceDirect,
    closestPointOnBezier,
    evalDeCasteljau, type HausdorffDirectKind as Kind
} from '../../../src/index.js';

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
        const N = Number(process.env['HAUSDORFF_N'] ?? 40);

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

});

