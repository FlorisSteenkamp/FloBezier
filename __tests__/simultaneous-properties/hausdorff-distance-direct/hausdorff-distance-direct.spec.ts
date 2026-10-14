import { expect, describe, it } from '@jest/globals';
import { writeFileSync } from 'fs';
import { hausdorffDistanceOneSided, closestPointOnBezier, evalDeCasteljau } from '../../../src/index.js';
import { hausdorffDistanceOneSidedDirect, uOp, sOp, type HausdorffDirectKind as Kind } from '../../../src/simultaneous-properties/hausdorff-distance-direct/hausdorff-distance-direct.js';
import { evaluate, univariate, add } from '../../../src/simultaneous-properties/hausdorff-distance-direct/tensor-poly.js';
import { solveSystem } from '../../../src/simultaneous-properties/hausdorff-distance-direct/solve-system.js';


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
    it('solves a simple 2x2 system', function() {
        // t² + s - 0.79 = 0, t - s + 0.4 = 0 has the single root (0.3, 0.7)
        const t2 = univariate([0, 0, 1], 0, 2);
        const s = univariate([0, 1], 1, 2);
        const { roots } = solveSystem([
            add(add(t2, s), univariate([-0.79], 0, 2)),
            add(add(univariate([0.4, 1], 0, 2), univariate([0, -1], 1, 2)), univariate([0], 0, 2))
        ]);
        expect(roots.length).toBe(1);
        expect(roots[0][0]).toBeCloseTo(0.3, 12);
        expect(roots[0][1]).toBeCloseTo(0.7, 12);
    });

    it('builds the divided-out operators U and S correctly', function() {
        const r = rng(1);
        for (let k=0; k<=6; k++) {
            const q = Array.from({ length: k + 1 }, () => r() - 0.5);
            const Q = (s: number) => q.reduce((a, c, m) => a + c*s**m, 0);
            const D = (s: number) => q.reduce((a, c, m) => a + (m ? m*c*s**(m-1) : 0), 0);
            const U = uOp(q);
            const S = sOp(q);
            for (let n=0; n<20; n++) {
                const s1 = r(), s2 = r();
                // U[Q] = ((Q(s1) - Q(s2))/(s1 - s2) - (Q′(s1) + Q′(s2))/2)/(s1 - s2)²
                const u = ((Q(s1) - Q(s2))/(s1 - s2) - (D(s1) + D(s2))/2)/(s1 - s2)**2;
                expect(Math.abs(evaluate(U, [0, s1, s2]) - u)).toBeLessThan(1e-6*(1 + Math.abs(u)));
                // S[Q] = ((Q(s) - Q(0))/s - Q′(s))/s
                const sv = ((Q(s1) - Q(0))/s1 - D(s1))/s1;
                const sp = S.reduce((a, c, m) => a + c*s1**m, 0);
                expect(Math.abs(sp - sv)).toBeLessThan(1e-6*(1 + Math.abs(sv)));
            }
        }
    });

    it('matches the library and brute force on random curves of all orders', function() {
        const r = rng(12345);
        const rand = (n: number) => Array.from({ length: n }, () => [r(), r()]);
        const N = Number(process.env['HAUSDORFF_N'] ?? 40);

        const rows: Record<string, unknown>[] = [];
        let worstSub = 0;
        for (const nA of [2, 3, 4]) {
            for (const nB of [2, 3, 4]) {
                let errSub = 0, errRes = 0, missRes = 0, libLow = 0, capped = 0;
                let tSub = 0, tRes = 0, tLib = 0;
                const resTimes: number[] = [];
                const kinds: Partial<Record<Kind, number>> = {};
                for (let i=0; i<N; i++) {
                    const A = rand(nA), B = rand(nB);

                    let t0 = performance.now();
                    const sub = hausdorffDistanceOneSidedDirect(A, B, 'subdivision');
                    tSub += performance.now() - t0;

                    t0 = performance.now();
                    const res = hausdorffDistanceOneSidedDirect(A, B, 'resultant');
                    tRes += performance.now() - t0;
                    resTimes.push(performance.now() - t0);

                    t0 = performance.now();
                    const lib = hausdorffDistanceOneSided(A, B, 1e-12, 200);
                    tLib += performance.now() - t0;

                    // every candidate value is attained, so none can exceed the
                    // true value; the largest of the three is the best estimate
                    // and brute force settles any disagreement
                    let truth = Math.max(sub.d, res.d, lib);
                    if (truth - Math.min(sub.d, res.d, lib) > 1e-10) {
                        truth = Math.max(truth, brute(A, B));
                        if (truth - lib > 1e-10) { libLow++; }
                    }
                    errSub = Math.max(errSub, truth - sub.d);
                    errRes = Math.max(errRes, truth - res.d);
                    if (truth - res.d > 1e-8) { missRes++; }
                    kinds[res.kind] = (kinds[res.kind] ?? 0) + 1;
                    if (sub.capped || res.capped) { capped++; }
                }
                worstSub = Math.max(worstSub, errSub);
                rows.push({
                    A: nA - 1, B: nB - 1, n: N,
                    errSub, errRes, missRes, libLow,
                    msSub: +(tSub/N).toFixed(2), msRes: +(tRes/N).toFixed(2), msLib: +(tLib/N).toFixed(2),
                    msResMedian: +resTimes.sort((a, b) => a - b)[N >> 1].toFixed(2),
                    msResMax: +resTimes[N - 1].toFixed(2),
                    capped, kinds
                });
            }
        }
        if (OUT) { writeFileSync(OUT, JSON.stringify(rows, null, 1)); }
        // only the subdivision method is held to an accuracy standard
        expect(worstSub).toBeLessThan(1e-10);
    });

});

