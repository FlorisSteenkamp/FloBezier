import { it, expect } from '@jest/globals';
import { hausdorffDistanceOneSidedDirect } from '../../../src/simultaneous-properties/hausdorff-distance-direct/hausdorff-distance-direct.js';
function rng(seed: number) {
    return () => {
        seed |= 0; seed = seed + 0x6D2B79F5 | 0;
        let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
        t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
}
it('the resultant method agrees with the subdivision method on random curves of all orders', () => {
    const r = rng(2024);
    const rand = (n: number) => Array.from({ length: n }, () => [r(), r()]);
    const out: string[] = [];
    for (const nA of [2, 3, 4]) for (const nB of [2, 3, 4]) for (let i=0; i<100; i++) {
        const A = rand(nA), B = rand(nB);
        const res = hausdorffDistanceOneSidedDirect(A, B, 'resultant');
        const sub = hausdorffDistanceOneSidedDirect(A, B, 'subdivision');
        if (Math.abs(sub.d - res.d) > 1e-9) { out.push(`${nA-1}/${nB-1} #${i}: res ${res.d} (${res.kind}) sub ${sub.d} (${sub.kind})`); }
    }
    expect(out).toEqual([]);
});
