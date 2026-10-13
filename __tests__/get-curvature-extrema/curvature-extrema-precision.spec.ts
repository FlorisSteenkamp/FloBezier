import { describe, expect, it } from '@jest/globals';
import type { Extrema } from '../../src/get-curvature-extrema/extrema.js';
import { eAdd, eMultDouble2, eSign } from 'big-float-ts';
import {  } from 'double-double';
import { squares } from 'squares-rng';
import { getCurvatureExtrema } from '../../src/get-curvature-extrema/double/get-curvature-extrema.js';
import { getCurvatureExtremaDd } from '../../src/get-curvature-extrema/double-double/get-curvature-extrema-dd.js';
import { getCurvatureExtremaE } from '../../src/get-curvature-extrema/expansion/get-curvature-extrema-e.js';
import { getAbsCurvatureExtremaPolysE } from '../../src/get-curvature-extrema/expansion/get-abs-curvature-extrema-polys-e.js';
import { getCurvatureExtremaQuadraticPolyE } from '../../src/get-curvature-extrema/expansion/get-curvature-extrema-quadratic-poly-e.js';
import { isCollinear } from '../../src/global-properties/classification/is-collinear.js';
import { isCubicReallyQuad } from '../../src/global-properties/classification/is-cubic-really-quad.js';
import { nextUp } from '../../src/next-up.js';

/**
 * A benchmark (with some sanity checks) comparing the accuracy (and speed) of
 * the double, double-double and expansion (exact) precision curvature extrema
 * functions for various classes of quadratic and cubic bezier curves.
 *
 * * the reference roots are the *exact* roots of the exact polynomials (as
 * calculated by the `...E` functions), bracketed between adjacent doubles
 * using exact sign evaluation, i.e. the reference is accurate to within
 * 1/2 ulp, so that the error of the expansion version itself can be measured
 * * errors are given in ulps of the reference root (with a resolution of 1/2 ulp)
 * * `countDiffs` counts the curves where the number of minima, maxima or
 * inflections differs from the exact (certified) version, i.e. missed or extra
 * roots or minima / maxima misclassification (such curves are excluded from
 * the error statistics)
 * * inspect the `results` object (e.g. using Wallaby's `//?`) or set the
 * environment variable `PRINT_BENCHMARKS` to print the tables
 */

const N = 250;  // the number of curves per class


//------------------------------------------------------------------------
// the results
//------------------------------------------------------------------------
/** the accuracy (and speed) statistics of one precision level for one class of curves */
interface Stats {
    /** the number of roots (minima, maxima and inflections) compared */
    readonly roots: number;
    /** the maximum error in ulps */
    readonly maxUlps: number;
    /** the mean error in ulps */
    readonly meanUlps: number;
    /** 
     * the number of curves where the number of minima, maxima or inflections 
     * differs from the exact (certified) version
     */
    readonly countDiffs: number;
    /** the mean time per call in micro-seconds */
    readonly µsPerCall: number;
}

/** the statistics for each precision level */
interface LevelStats {
    readonly 'double': Stats;
    readonly 'double-double': Stats;
    readonly 'expansion': Stats;
}

/** the statistics for each class of cubic bezier curves */
interface CubicResults {
    readonly 'random': LevelStats;
    readonly 'scaled 1e-5..1e5': LevelStats;
    readonly 'large offset': LevelStats;
    readonly 'nearly a quadratic': LevelStats;
    readonly 'near cusp': LevelStats;
}

/** the statistics for each class of quadratic bezier curves */
interface QuadraticResults {
    readonly 'random': LevelStats;
    readonly 'scaled 1e-5..1e5': LevelStats;
    readonly 'large offset': LevelStats;
    readonly 'nearly a line': LevelStats;
    readonly 'sharp turn': LevelStats;
}

interface Results {
    cubic: CubicResults;
    quadratic: QuadraticResults;
}

/** the curve generators for each class of curves */
type CurveClasses<T> = { readonly [K in keyof T]: () => number[][] };


//------------------------------------------------------------------------
// random curves
//------------------------------------------------------------------------
/** the counter for the (deterministic) random number generator */
let n = 2026;
/** a random number in `[0,1)` */
const rnd = () => squares(n++) / 2**32;
const r = (a: number, b: number) => a + (b - a)*rnd();
const pt = (k = 1) => [r(-k,k), r(-k,k)];
const lerp = (p: number[], q: number[], t: number) => [p[0] + (q[0] - p[0])*t, p[1] + (q[1] - p[1])*t];

const cubicClasses: CurveClasses<CubicResults> = {
    'random': () => Array.from({ length: 4 }, () => pt(10)),
    'scaled 1e-5..1e5': () => { const k = 10**r(-5,5); return Array.from({ length: 4 }, () => pt(k)); },
    'large offset': () => {
        const o = pt(1e6);
        return Array.from({ length: 4 }, () => { const p = pt(1); return [p[0]+o[0], p[1]+o[1]]; });
    },
    'nearly a quadratic': () => {
        // a quadratic degree-elevated to a cubic with a perturbed control point
        const [q0,q1,q2] = [pt(10),pt(10),pt(10)];
        const c1 = lerp(q0, q1, 2/3), c2 = lerp(q2, q1, 2/3);
        return [q0, [c1[0] + r(-1e-6,1e-6), c1[1] + r(-1e-6,1e-6)], c2, q2];
    },
    'near cusp': () => {
        // inner control points (nearly) coincident
        const m = pt(10);
        return [pt(10), [m[0] + r(-1e-4,1e-4), m[1] + r(-1e-4,1e-4)], m, pt(10)];
    }
};

const quadraticClasses: CurveClasses<QuadraticResults> = {
    'random': () => Array.from({ length: 3 }, () => pt(10)),
    'scaled 1e-5..1e5': () => { const k = 10**r(-5,5); return Array.from({ length: 3 }, () => pt(k)); },
    'large offset': () => {
        const o = pt(1e6);
        return Array.from({ length: 3 }, () => { const p = pt(1); return [p[0]+o[0], p[1]+o[1]]; });
    },
    'nearly a line': () => {
        // the middle control point very close to (and perpendicularly off) 
        // the midpoint of the chord so that the curvature maximum is (near) 
        // `t = 0.5` (if the middle control point is not near the midpoint 
        // the maximum of such a flat parabola is far outside `[0,1]`)
        const p0 = pt(10), p2 = pt(10), m = lerp(p0, p2, 0.5);
        const δ = r(-1e-6,1e-6);
        return [p0, [m[0] - δ*(p2[1] - p0[1]), m[1] + δ*(p2[0] - p0[0])], p2];
    },
    'sharp turn': () => {
        // endpoints close together relative to the middle control point
        const p0 = pt(10), d = pt(1e-3);
        return [p0, pt(10), [p0[0] + d[0], p0[1] + d[1]]];
    }
};


//------------------------------------------------------------------------
// exact root bracketing
//------------------------------------------------------------------------
const ulp = (t: number) => Math.max(Number.MIN_VALUE, 2**(Math.floor(Math.log2(Math.abs(t))) - 52));

/** exact sign of the exact polynomial `p` (expansion coefficients) at the double `t` */
function sgnAt(p: number[][], t: number): number {
    let acc = [0];
    for (const c of p) { acc = eAdd(eMultDouble2(t, acc), c); }
    return eSign(acc);
}

/**
 * Returns the root of the exact polynomial `p` closest to `t` bracketed
 * between adjacent doubles `[lo,hi]` (with `lo === hi` if the root is exactly
 * a double) or `undefined` if no sign change is found nearby (e.g. a double
 * root).
 */
function bracket(p: number[][], t: number): [number, number] | undefined {
    const s0 = sgnAt(p, t);
    if (s0 === 0) { return [t,t]; }
    // find a sign change by searching outwards
    let w = ulp(t);
    for (let k=0; k<64; k++, w *= 2) {
        for (const side of [1,-1]) {
            const t_ = t + side*w;
            const s = sgnAt(p, t_);
            if (s === 0) { return [t_,t_]; }
            if (s === s0) { continue; }
            // bisect between `t` (sign `s0`) and `t_` (sign `s`)
            let [a, b] = side > 0 ? [t, t_] : [t_, t];
            const sa = sgnAt(p, a);
            while (nextUp(a) < b) {
                const m = a + (b - a)/2;
                const sm = sgnAt(p, m);
                if (sm === 0) { return [m,m]; }
                if (sm === sa) { a = m; } else { b = m; }
            }
            return [a, b];
        }
    }
    return undefined;
}

/** the error of `t` in ulps of the bracketed root (with a resolution of 1/2 ulp) */
function ulpErr(t: number, [lo, hi]: [number, number]): number {
    if (lo === hi) { return Math.abs(t - lo)/ulp(lo); }
    const u = ulp(lo);
    return t <= lo ? (lo - t)/u + 0.5 : t >= hi ? (t - hi)/u + 0.5 : 0.5;
}


//------------------------------------------------------------------------
// the benchmark
//------------------------------------------------------------------------
type Level = keyof LevelStats;
const levels: [Level, (ps: number[][]) => Extrema][] = [
    ['double', getCurvatureExtrema],
    ['double-double', getCurvatureExtremaDd],
    ['expansion', getCurvatureExtremaE]
];
const kinds = ['minima', 'maxima', 'inflections'] as const;

/** the exact polynomial whose roots are the given kind of extrema */
function getExactPoly(ps: number[][], kind: typeof kinds[number]) {
    if (ps.length === 3) { return getCurvatureExtremaQuadraticPolyE(ps); }
    const { inflectionPoly, otherExtremaPoly } = getAbsCurvatureExtremaPolysE(ps);
    return kind === 'inflections' ? inflectionPoly : otherExtremaPoly;
}

function runClass(mk: () => number[][], order: number): LevelStats {
    // generate the (valid) curves
    const pss: number[][][] = [];
    while (pss.length < N) {
        const ps = mk();
        if (isCollinear(ps) || (order === 3 && isCubicReallyQuad(ps))) { continue; }
        pss.push(ps);
    }

    // the reference (exact) roots
    const refs = pss.map(ps => {
        const ex = getCurvatureExtremaE(ps);
        return Object.fromEntries(kinds.map(kind => {
            const p = getExactPoly(ps, kind);
            return [kind, ex[kind].map(t => bracket(p, t))];
        })) as Record<typeof kinds[number], ([number, number] | undefined)[]>;
    });
    const exs = pss.map(getCurvatureExtremaE);

    const res = {} as { -readonly [L in Level]: Stats };
    for (const [level, f] of levels) {
        // timing
        const t0 = performance.now();
        const results = pss.map(f);
        const µsPerCall = (performance.now() - t0)*1000/pss.length;

        let roots = 0, sum = 0, maxUlps = 0, countDiffs = 0;
        for (let i=0; i<pss.length; i++) {
            const res_ = results[i], ex = exs[i];
            if (kinds.some(kind => res_[kind].length !== ex[kind].length)) {
                countDiffs++; continue;
            }
            for (const kind of kinds) {
                res_[kind].forEach((t, j) => {
                    const br = refs[i][kind][j];
                    if (br === undefined) { return; }
                    const e = ulpErr(t, br);
                    roots++; sum += e; maxUlps = Math.max(maxUlps, e);
                });
            }
        }
        res[level] = {
            roots, maxUlps,
            meanUlps: roots ? sum/roots : 0,
            countDiffs,
            µsPerCall: Math.round(µsPerCall*10)/10
        };
    }

    return res;
}


/** runs the benchmark for each of the given classes of curves */
function runClasses<T>(classes: CurveClasses<T>, order: number): T {
    const res = {} as { -readonly [K in keyof T]: LevelStats };
    for (const name of Object.keys(classes) as (keyof T)[]) {
        res[name] = runClass(classes[name], order);
    }
    return res as T;
}


describe('curvature extrema precision benchmark (double vs double-double vs expansion)', function() {
    const results = {} as Results;

    it('should measure the accuracy for cubic bezier curves', function() {
        results.cubic = runClasses(cubicClasses, 3);
        results.cubic; //?

        // sanity checks
        for (const stats of Object.values(results.cubic)) {
            expect(stats['expansion'].countDiffs).toEqual(0);
            expect(stats['expansion'].maxUlps).toBeLessThanOrEqual(8);
            expect(stats['double-double'].maxUlps).toBeLessThanOrEqual(8);
        }
    });

    it('should measure the accuracy for quadratic bezier curves', function() {
        results.quadratic = runClasses(quadraticClasses, 2);
        results.quadratic; //?

        // the double precision version is independent of the position of the 
        // curve (previously its numerator was calculated from the absolute 
        // coordinates giving errors of about 1e13 ulps for large offsets)
        expect(results.quadratic['large offset']['double'].maxUlps).toBeLessThanOrEqual(64);

        // sanity checks
        for (const stats of Object.values(results.quadratic)) {
            expect(stats['expansion'].countDiffs).toEqual(0);
            expect(stats['expansion'].maxUlps).toBeLessThanOrEqual(8);
            expect(stats['double-double'].maxUlps).toBeLessThanOrEqual(8);
        }

        // results;//?

        if (process.env.PRINT_BENCHMARKS) {
            for (const order of ['cubic', 'quadratic'] as const) {
                console.log(order);
                console.table(Object.fromEntries(
                    Object.entries(results[order]).flatMap(([name, stats]) =>
                        Object.entries(stats).map(([level, s]) => [`${name} / ${level}`, s])
                    )
                ));
            }
        }
    });
});
