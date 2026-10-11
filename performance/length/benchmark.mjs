// Benchmarks the accuracy and speed of the current `length` implementation
// against the legacy one (curviness-based subdivision + Gauss quadrature)
// using a double-double precision reference implementation as ground truth.
//
// Run (after building the library with `npm run build-node`) from the repo
// root with:
//
//     node performance/length/benchmark.mjs

import { length, splitByCurvature, fromTo, generateCuspAtHalf3 } from '../../node/index.js';
import { ds } from '../../node/local-properties-at-t/ds.js';
import { gaussQuadrature } from 'flo-gauss-quadrature';
import { referenceLength, relativeError } from '../../__tests__/helpers/reference-length.ts';


//------------------------------------------------------------------------------
// The legacy implementation (as it was before the rewrite)
//------------------------------------------------------------------------------

function legacyLength(interval, ps, maxCurviness = 0.4, gaussOrder = 16) {
    const [tS, tE] = interval;
    if (tS === tE) { return 0; }
    if (ps.length === 2) {
        const [[x0,y0],[x1,y1]] = ps;
        return Math.hypot((tE - tS)*(x1 - x0), (tE - tS)*(y1 - y0));
    }
    if (ps.every(p => p[0] === ps[0][0] && p[1] === ps[0][1])) { return 0; }
    const ps_ = fromTo(ps, tS, tE);
    const ts = splitByCurvature(ps_, maxCurviness);
    let total = 0;
    for (let i=0; i<ts.length-1; i++) {
        total += gaussQuadrature(ds(ps_), [ts[i], ts[i+1]], gaussOrder);
    }
    return total;
}


//------------------------------------------------------------------------------
// Test curve generators
//------------------------------------------------------------------------------

let seed = 123456789;
const rnd = () => (seed = (seed*1103515245 + 12345) & 0x7fffffff)/0x7fffffff;
const rndPt = (s = 100) => [rnd()*2*s - s, rnd()*2*s - s];
const rndPs = n => Array.from({ length: n }, () => rndPt());

const classes = [
    { name: 'random cubics', mk: () => [rndPs(4), [0,1]] },
    { name: 'random quadratics', mk: () => [rndPs(3), [0,1]] },
    { name: 'random cubics, sub-interval', mk: () => { const a = rnd(), b = rnd(); return [rndPs(4), [Math.min(a,b), Math.max(a,b)]]; } },
    { name: 'random quads, sub-interval', mk: () => { const a = rnd(), b = rnd(); return [rndPs(3), [Math.min(a,b), Math.max(a,b)]]; } },
    { name: 'cubics, tiny interval (1e-9)', mk: () => { const a = rnd(); return [rndPs(4), [a, a + 1e-9]]; } },
    { name: 'quads, tiny interval (1e-9)', mk: () => { const a = rnd(); return [rndPs(3), [a, a + 1e-9]]; } },
    { name: 'cubics with a cusp (at t=0.5)', mk: () => [generateCuspAtHalf3(rndPt(), rndPt(), rndPt()), [0,1]] },
    { name: 'cubics, near cusp (perturbed 1e-6)', mk: () => { const ps = generateCuspAtHalf3(rndPt(), rndPt(), rndPt()); ps[1] = [ps[1][0] + 1e-6*rnd(), ps[1][1] + 1e-6*rnd()]; return [ps, [0,1]]; } },
    { name: 'cubics, near cusp (perturbed 1e-10)', mk: () => { const ps = generateCuspAtHalf3(rndPt(), rndPt(), rndPt()); ps[1] = [ps[1][0] + 1e-10*rnd(), ps[1][1] + 1e-10*rnd()]; return [ps, [0,1]]; } },
    { name: 'loopy cubics', mk: () => { const a = rndPt(); return [[a, [a[0]+100, a[1]+100], [a[0]-100, a[1]+100], [a[0]+1, a[1]]], [0,1]]; } },
    { name: 'near-folded quads', mk: () => { const a = rndPt(), d = rndPt(); const k = 0.5 + rnd(); return [[a, [a[0]+d[0], a[1]+d[1]], [a[0]+d[0]*(1-k)+rnd()*1e-3, a[1]+d[1]*(1-k)+rnd()*1e-3]], [0,1]]; } },
    { name: 'collinear folded quads (exact)', mk: () => { const a = rndPt(), d = rndPt(); const k = 2*rnd(); return [[a, [a[0]+d[0], a[1]+d[1]], [a[0]+d[0]*(1-k), a[1]+d[1]*(1-k)]], [0,1]]; } },
    { name: 'collinear folded cubics (exact)', mk: () => { const a = rndPt(), d = rndPt(); return [[a, [a[0]+d[0], a[1]+d[1]], [a[0]-d[0]*rnd(), a[1]-d[1]*rnd()], [a[0]+d[0]*rnd(), a[1]+d[1]*rnd()]], [0,1]]; } },
    { name: 'cubics that are really quads', mk: () => { const [p0,p1,p2] = rndPs(3); return [[p0, [(p0[0]+2*p1[0])/3, (p0[1]+2*p1[1])/3], [(2*p1[0]+p2[0])/3, (2*p1[1]+p2[1])/3], p2], [0,1]]; } },
];


//------------------------------------------------------------------------------
// Run
//------------------------------------------------------------------------------

const N = Number(process.argv[2] ?? 100);
const REPS = 20;

const fmt = x => x.toExponential(2).padStart(9);
const fmtT = x => x.toFixed(2).padStart(7);

console.log(`\n${N} curves per class, timing over ${REPS} repetitions\n`);
console.log(
    'class'.padEnd(38) +
    '| rel. error (max / mean)                 | time per call (µs)'
);
console.log(
    ''.padEnd(38) +
    '|      new            |     legacy          |   new  | legacy | ratio'
);
console.log('-'.repeat(38) + '+' + '-'.repeat(21) + '+' + '-'.repeat(21) + '+' + '-'.repeat(26));

let overallWorstNew = 0;
let overallWorstLegacy = 0;

// warm up (JIT) on all classes before timing anything
for (let r=0; r<3; r++) {
    for (const { mk } of classes) {
        for (let i=0; i<20; i++) { const [ps, interval] = mk(); length(interval, ps); legacyLength(interval, ps); }
    }
}
seed = 123456789;

for (const { name, mk } of classes) {
    const cases = Array.from({ length: N }, mk);
    const refs = cases.map(([ps, interval]) => referenceLength(interval, ps));

    let maxNew = 0, sumNew = 0, maxLeg = 0, sumLeg = 0;
    for (let i=0; i<N; i++) {
        const [ps, interval] = cases[i];
        const eN = relativeError(length(interval, ps), refs[i]);
        const eL = relativeError(legacyLength(interval, ps), refs[i]);
        maxNew = Math.max(maxNew, eN); sumNew += eN;
        maxLeg = Math.max(maxLeg, eL); sumLeg += eL;
    }
    overallWorstNew = Math.max(overallWorstNew, maxNew);
    overallWorstLegacy = Math.max(overallWorstLegacy, maxLeg);

    // warm up
    for (const [ps, interval] of cases) { length(interval, ps); legacyLength(interval, ps); }

    let t0 = performance.now();
    for (let r=0; r<REPS; r++) { for (const [ps, interval] of cases) { length(interval, ps); } }
    const tNew = (performance.now() - t0)/(REPS*N)*1000;

    t0 = performance.now();
    for (let r=0; r<REPS; r++) { for (const [ps, interval] of cases) { legacyLength(interval, ps); } }
    const tLeg = (performance.now() - t0)/(REPS*N)*1000;

    console.log(
        name.padEnd(38) +
        `| ${fmt(maxNew)} / ${fmt(sumNew/N)} | ${fmt(maxLeg)} / ${fmt(sumLeg/N)} ` +
        `| ${fmtT(tNew)} | ${fmtT(tLeg)} | ${(tLeg/tNew).toFixed(2).padStart(5)}x`
    );
}

console.log('\nworst case relative error over all classes:');
console.log(`  new:    ${overallWorstNew.toExponential(2)}`);
console.log(`  legacy: ${overallWorstLegacy.toExponential(2)}`);

// Tolerance sweep for the new implementation (cubics only - quads are closed form)
console.log('\ntolerance sweep (random cubics + near cusp cubics):');
const sweepCases = [
    ...Array.from({ length: N }, classes[0].mk),
    ...Array.from({ length: N }, classes[7].mk)
];
const sweepRefs = sweepCases.map(([ps, interval]) => referenceLength(interval, ps));
for (const tolPow of [-24, -32, -40, -44, -48, -52]) {
    const tol = 2**tolPow;
    let maxE = 0;
    for (let i=0; i<sweepCases.length; i++) {
        const [ps, interval] = sweepCases[i];
        maxE = Math.max(maxE, relativeError(length(interval, ps, tol), sweepRefs[i]));
    }
    let t0 = performance.now();
    for (let r=0; r<REPS; r++) { for (const [ps, interval] of sweepCases) { length(interval, ps, tol); } }
    const t = (performance.now() - t0)/(REPS*sweepCases.length)*1000;
    console.log(`  tolerance 2**${tolPow}: max rel. error ${maxE.toExponential(2)}, ${t.toFixed(2)} µs per call`);
}
