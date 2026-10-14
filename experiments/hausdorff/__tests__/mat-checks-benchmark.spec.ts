import { it } from '@jest/globals';
import { readFileSync } from 'fs';
import { hausdorffDistanceOneSidedBounds } from '../../../src/index.js';
import { hausdorffDistanceOneSidedDirect } from '../hausdorff-distance-direct.js';
import { hausdorffDistanceOneSidedExceeds } from '../mat-exceeds-reference.js';

// The 8718 one-sided Hausdorff checks made during MAT simplification (flo-mat)
// of 24 glyphs; `exceedsTrue` is from the MAT function with 1e7 iterations.
interface Check {
    A: number[][];
    B: number[][][];
    tolerance: number;
    exceedsMaxIter1000: boolean;
    exceedsTrue: boolean;
}

const checks: Check[] = JSON.parse(readFileSync(
    new URL('../mat-hausdorff-checks.json', import.meta.url), 'utf8'
));

// Note: timings under jest (with @swc/jest) are about 3 times those of the same
// code compiled with tsc and run in plain node.
const ROUNDS = 5;


function time(name: string, f: (c: Check) => boolean, cs = checks) {
    for (const c of cs) { f(c); }  // warm up
    let best = Infinity;
    let decisions: boolean[] = [];
    for (let r=0; r<ROUNDS; r++) {
        decisions = [];
        const t0 = performance.now();
        for (const c of cs) { decisions.push(f(c)); }
        best = Math.min(best, performance.now() - t0);
    }
    let wrong = 0;
    for (let i=0; i<cs.length; i++) {
        if (decisions[i] !== cs[i].exceedsTrue) { wrong++; }
    }
    const us = (1000*best/cs.length).toFixed(1);
    console.log(`${name.padEnd(44)} ${us.padStart(6)} μs/check  ${String(wrong).padStart(3)} wrong decisions of ${cs.length}`);
}


it('benchmarks the decision versions on the MAT checks', function() {
    const single = checks.filter(c => c.B.length === 1);

    time('MAT exceeds (maxIterations 1000)', c => hausdorffDistanceOneSidedExceeds(c.A, c.B, c.tolerance, 1000));
    for (const maxIterations of [1000, Infinity]) {
        time(`bounds, stops = tol, maxIterations ${maxIterations}`, c => hausdorffDistanceOneSidedBounds(
            c.A, c.B, { lowerStop: c.tolerance, upperStop: c.tolerance, maxIterations }
        ).upper > c.tolerance);
    }
    for (const δ of [1e-3, 1e-6, 1e-9]) {
        time(`bounds, margin δ = ${δ}*tol, no maxIterations`, c => hausdorffDistanceOneSidedBounds(
            c.A, c.B, { lowerStop: c.tolerance*(1 - δ), upperStop: c.tolerance, maxIterations: Infinity }
        ).upper > c.tolerance);
    }
    time('bounds, default (tolerance, 50 iter.)', c => hausdorffDistanceOneSidedBounds(c.A, c.B).lower > c.tolerance);

    console.log(`--- single-piece B only (${single.length})`);
    time('MAT exceeds (maxIterations 1000)', c => hausdorffDistanceOneSidedExceeds(c.A, c.B, c.tolerance, 1000), single);
    time('bounds, stops = tol, maxIterations 1000', c => hausdorffDistanceOneSidedBounds(
        c.A, c.B, { lowerStop: c.tolerance, upperStop: c.tolerance, maxIterations: 1000 }
    ).upper > c.tolerance, single);
    time('direct (uncertified)', c => hausdorffDistanceOneSidedDirect(c.A, c.B[0]).d > c.tolerance, single);
}, 600_000);
