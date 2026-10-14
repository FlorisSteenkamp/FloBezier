import { it } from '@jest/globals';
import { hausdorffDistanceOneSidedCandidates } from '../hausdorff-candidates.js';
import { hausdorffDistanceOneSided } from '../../../src/index.js';
it('benchmarks the quadratic/quadratic case against the library (warm, median of 7 runs)', () => {
    let seed = 11;
    const r = () => { seed = (seed*16807) % 2147483647; return seed/2147483647; };
    const rand = (n: number) => Array.from({ length: n }, () => [r(), r()]);
    const cases = Array.from({ length: 1000 }, () => [rand(3), rand(3)]);
    for (let k=0; k<3; k++) for (const [A, B] of cases) { hausdorffDistanceOneSidedCandidates(A, B); hausdorffDistanceOneSided(A, B); }
    const ours: number[] = [], lib: number[] = [];
    for (let rep=0; rep<7; rep++) {
        let t0 = performance.now();
        for (const [A, B] of cases) hausdorffDistanceOneSidedCandidates(A, B);
        ours.push((performance.now() - t0)/cases.length*1000);
        t0 = performance.now();
        for (const [A, B] of cases) hausdorffDistanceOneSided(A, B);
        lib.push((performance.now() - t0)/cases.length*1000);
    }
    const med = (xs: number[]) => xs.slice().sort((a, b) => a - b)[xs.length >> 1].toFixed(1);
    process.stdout.write(`2/2 ours median ${med(ours)}µs, lib default median ${med(lib)}µs\n`);
});
