import { describe, expect, it } from '@jest/globals';
import * as fs from 'fs';
import { eEstimate, eDiff } from 'big-float-ts';
import { γγ3 } from '../../src/error-analysis/error-analysis.js';
import { getCoeffsCubicDd, getCoeffsQuadraticDd, getCoeffsLinearDd } from '../../src/intersection/circle-bezier-intersection/double-double/get-coeffs-dd.js';
import { getCoeffsCubicExact, getCoeffsQuadraticExact, getCoeffsLinearExact } from '../../src/intersection/circle-bezier-intersection/exact/get-coeffs-exact.js';
import { getCoeffsCubicErrorCounters, getCoeffsQuadraticErrorCounters, getCoeffsLinearErrorCounters } from '../../src/intersection/circle-bezier-intersection/get-circle-bezier-intersection-error-counters.js';

const { abs, round } = Math;

const DIR = 'src/intersection/circle-bezier-intersection/';

/**
 * The Stewart error counters as documented in the return value comments of the
 * error counter functions (e.g. `t6_,  // <8>`), in order: cubic, quadratic,
 * linear.
 */
function getDocumentedCounters(): number[][] {
    const src = fs.readFileSync(DIR + 'get-circle-bezier-intersection-error-counters.ts', 'utf8');
    // take the counters from the function bodies' `return` statements / comments
    const cubic = [...src.matchAll(/^\s+t\d_,?\s+\/\/ <(\d+)>\s*$/gm)].map(m => Number(m[1]));
    // the cubic's counters are listed in the body's return statement (7
    // coefficients); the quadratic and linear ones in their JSDoc
    const docs = [...src.matchAll(/\* return \[([\s\S]*?)\* \];/g)]
        .map(m => [...m[1].matchAll(/<(\d+)>/g)].map(x => Number(x[1])));
    return [cubic.slice(-7), ...docs.slice(-2)];
}


describe('circleBezierIntersection error bounds', function() {
    it('should multiply the error bound of each coefficient by its (documented) error counter',
    function() {
        const [cubic, quad, line] = getDocumentedCounters();
        expect(cubic).toEqual([8,8,9,9,8,5,5]);
        expect(quad).toEqual([6,5,6,4,4]);
        expect(line).toEqual([4,4,4]);

        // previously the counters were ignored altogether, i.e. the coefficient
        // error bounds were simply `2*e` (instead of `2*<counter>*e`)
        const src = fs.readFileSync(DIR + 'circle-bezier-intersection.ts', 'utf8');
        const used = [...src.matchAll(/counters = \[([\d,\s]+)\];/g)]
            .map(m => m[1].split(',').map(Number));
        expect(used).toEqual([cubic, quad, line]);
        expect(src).toMatch(/_polyE\.map\(\(e,\s*i\) => 2\*counters\[i\]\*e\)/);
    });

    it('should have valid (exact arithmetic verified) coefficient error bounds',
    function() {
        let s = 41;
        const rnd = () => { s = (s*1103515245 + 12345) % 2147483648; return s/2147483648; };
        const r = (a: number, b: number) => a + (b - a)*rnd();
        const pt = (k = 100) => [r(-k, k), r(-k, k)];

        const curveClasses: ((n: number) => number[][])[] = [
            n => Array.from({ length: n }, () => pt()),
            n => Array.from({ length: n }, () => [r(-100,-1), r(-100,-1)]),
            n => { const o = pt(1e6); return Array.from({ length: n }, () => { const p = pt(1); return [p[0]+o[0], p[1]+o[1]]; }); },
            n => Array.from({ length: n }, () => [round(r(-128,128)*256)/256, round(r(-128,128)*256)/256]),
            n => Array.from({ length: n }, () => pt(1e-3)),
        ];
        const fs_: [number, any, any, any, number[]][] = [
            [4, getCoeffsCubicDd, getCoeffsCubicExact, getCoeffsCubicErrorCounters, [8,8,9,9,8,5,5]],
            [3, getCoeffsQuadraticDd, getCoeffsQuadraticExact, getCoeffsQuadraticErrorCounters, [6,5,6,4,4]],
            [2, getCoeffsLinearDd, getCoeffsLinearExact, getCoeffsLinearErrorCounters, [4,4,4]],
        ];

        let checked = 0;
        for (const [n, getDd, getExact, getErrorCounters, C] of fs_) {
            for (const mk of curveClasses) {
                for (let i=0; i<200; i++) {
                    const ps = mk(n);
                    // a random circle or one passing (very nearly) through the
                    // initial point (i.e. a root near `t = 0`)
                    const center = i % 2 === 0 ? pt() : [ps[0][0] + r(-1,1), ps[0][1] + r(-1,1)];
                    const radius = i % 2 === 0
                        ? r(0.1, 200)
                        : Math.hypot(ps[0][0] - center[0], ps[0][1] - center[1]);
                    const circle = { center, radius };

                    const poly = getDd(circle, ps);
                    const _polyE = getErrorCounters(circle, ps);
                    const exact = getExact(circle, ps);
                    // the exact polynomial may be of lower degree
                    if (exact.length !== poly.length) { continue; }
                    for (let j=0; j<poly.length; j++) {
                        const err = abs(eEstimate(eDiff(exact[j], poly[j])));
                        const bound = γγ3*2*C[j]*_polyE[j];
                        if (!(err <= bound)) {
                            throw new Error(`order ${n-1}, coefficient ${j}: error ${err} > bound ${bound}; ps: ${JSON.stringify(ps)}, circle: ${JSON.stringify(circle)}`);
                        }
                        checked++;
                    }
                }
            }
        }
        expect(checked).toBeGreaterThan(10000);
    });
});
