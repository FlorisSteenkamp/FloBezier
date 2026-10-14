import { it } from '@jest/globals';
import { writeFileSync } from 'fs';
import { hausdorffDistanceOneSided, closestPointOnBezier, evalDeCasteljau } from '../../../src/index.js';
import { hausdorffDistanceOneSidedCandidates } from '../hausdorff-candidates.js';

function rng(seed: number) {
    return () => {
        seed |= 0; seed = seed + 0x6D2B79F5 | 0;
        let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
        t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
}
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
const stats = (xs: number[]) => {
    const s = xs.slice().sort((a, b) => a - b);
    return { median: s[s.length >> 1], p95: s[Math.floor(0.95*(s.length - 1))], max: s[s.length - 1],
             over1e9: s.filter(x => x > 1e-9).length };
};

it('measures accuracy against the library (set HAUSDORFF_OUT to save the table)', () => {
    const r = rng(2024);
    const rand = (n: number) => Array.from({ length: n }, () => [r(), r()]);
    const N = Number(process.env['HAUSDORFF_N'] ?? 100);
    const rows: unknown[] = [];
    for (const nA of [2, 3, 4]) for (const nB of [2, 3, 4]) {
        const err = { ours: [] as number[], libDefault: [] as number[], libTight: [] as number[] };
        const ms = { ours: 0, libDefault: 0, libTight: 0 };
        for (let i=0; i<N; i++) {
            const A = rand(nA), B = rand(nB);
            let t0 = performance.now(); const ours = hausdorffDistanceOneSidedCandidates(A, B).d; ms.ours += performance.now() - t0;
            t0 = performance.now(); const libD = hausdorffDistanceOneSided(A, B); ms.libDefault += performance.now() - t0;
            t0 = performance.now(); const libT = hausdorffDistanceOneSided(A, B, 1e-12, 200); ms.libTight += performance.now() - t0;
            let truth = Math.max(ours, libD, libT);
            if (truth - Math.min(ours, libD, libT) > 1e-12) { truth = Math.max(truth, brute(A, B)); }
            err.ours.push(truth - ours); err.libDefault.push(truth - libD); err.libTight.push(truth - libT);
        }
        rows.push({ A: nA - 1, B: nB - 1, n: N,
            ours: { ...stats(err.ours), ms: +(ms.ours/N).toFixed(2) },
            libDefault: { ...stats(err.libDefault), ms: +(ms.libDefault/N).toFixed(2) },
            libTight: { ...stats(err.libTight), ms: +(ms.libTight/N).toFixed(2) } });
    }
    const out = process.env['HAUSDORFF_OUT'];
    if (out) { writeFileSync(out, JSON.stringify(rows, null, 1)); }
});
