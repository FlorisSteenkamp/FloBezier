import { describe, expect, it } from '@jest/globals';
import { readFileSync } from 'fs';
import { eDiff, eEstimate } from 'big-float-ts';
import { γ1 } from '../../../src/error-analysis/error-analysis.js';
import { getCoeffsBez1Bez1 } from '../../../src/intersection/bezier-bezier-intersection/get-coefficients/double/get-coeffs-bez1-bez1.js';
import { getCoeffsBez1Bez2 } from '../../../src/intersection/bezier-bezier-intersection/get-coefficients/double/get-coeffs-bez1-bez2.js';
import { getCoeffsBez1Bez3 } from '../../../src/intersection/bezier-bezier-intersection/get-coefficients/double/get-coeffs-bez1-bez3.js';
import { getCoeffsBez2Bez1 } from '../../../src/intersection/bezier-bezier-intersection/get-coefficients/double/get-coeffs-bez2-bez1.js';
import { getCoeffsBez2Bez2 } from '../../../src/intersection/bezier-bezier-intersection/get-coefficients/double/get-coeffs-bez2-bez2.js';
import { getCoeffsBez2Bez3 } from '../../../src/intersection/bezier-bezier-intersection/get-coefficients/double/get-coeffs-bez2-bez3.js';
import { getCoeffsBez3Bez1 } from '../../../src/intersection/bezier-bezier-intersection/get-coefficients/double/get-coeffs-bez3-bez1.js';
import { getCoeffsBez3Bez2 } from '../../../src/intersection/bezier-bezier-intersection/get-coefficients/double/get-coeffs-bez3-bez2.js';
import { getCoeffsBez3Bez3 } from '../../../src/intersection/bezier-bezier-intersection/get-coefficients/double/get-coeffs-bez3-bez3.js';
import { getCoeffsBez1Bez1Exact } from '../../../src/intersection/bezier-bezier-intersection/get-coefficients/exact/get-coeffs-bez1-bez1-exact.js';
import { getCoeffsBez1Bez2Exact } from '../../../src/intersection/bezier-bezier-intersection/get-coefficients/exact/get-coeffs-bez1-bez2-exact.js';
import { getCoeffsBez1Bez3Exact } from '../../../src/intersection/bezier-bezier-intersection/get-coefficients/exact/get-coeffs-bez1-bez3-exact.js';
import { getCoeffsBez2Bez1Exact } from '../../../src/intersection/bezier-bezier-intersection/get-coefficients/exact/get-coeffs-bez2-bez1-exact.js';
import { getCoeffsBez2Bez2Exact } from '../../../src/intersection/bezier-bezier-intersection/get-coefficients/exact/get-coeffs-bez2-bez2-exact.js';
import { getCoeffsBez2Bez3Exact } from '../../../src/intersection/bezier-bezier-intersection/get-coefficients/exact/get-coeffs-bez2-bez3-exact.js';
import { getCoeffsBez3Bez1Exact } from '../../../src/intersection/bezier-bezier-intersection/get-coefficients/exact/get-coeffs-bez3-bez1-exact.js';
import { getCoeffsBez3Bez2Exact } from '../../../src/intersection/bezier-bezier-intersection/get-coefficients/exact/get-coeffs-bez3-bez2-exact.js';
import { getCoeffsBez3Bez3Exact } from '../../../src/intersection/bezier-bezier-intersection/get-coefficients/exact/get-coeffs-bez3-bez3-exact.js';

const { abs, round } = Math;

const DIR = 'src/intersection/bezier-bezier-intersection/get-coefficients/double/';

// (these double precision functions are currently unused by the library)
const fs: [string, number, number, typeof getCoeffsBez1Bez1, typeof getCoeffsBez1Bez1Exact][] = [
    ['get-coeffs-bez1-bez1', 2, 2, getCoeffsBez1Bez1, getCoeffsBez1Bez1Exact],
    ['get-coeffs-bez1-bez2', 2, 3, getCoeffsBez1Bez2, getCoeffsBez1Bez2Exact],
    ['get-coeffs-bez1-bez3', 2, 4, getCoeffsBez1Bez3, getCoeffsBez1Bez3Exact],
    ['get-coeffs-bez2-bez1', 3, 2, getCoeffsBez2Bez1, getCoeffsBez2Bez1Exact],
    ['get-coeffs-bez2-bez2', 3, 3, getCoeffsBez2Bez2, getCoeffsBez2Bez2Exact],
    ['get-coeffs-bez2-bez3', 3, 4, getCoeffsBez2Bez3, getCoeffsBez2Bez3Exact],
    ['get-coeffs-bez3-bez1', 4, 2, getCoeffsBez3Bez1, getCoeffsBez3Bez1Exact],
    ['get-coeffs-bez3-bez2', 4, 3, getCoeffsBez3Bez2, getCoeffsBez3Bez2Exact],
    ['get-coeffs-bez3-bez3', 4, 4, getCoeffsBez3Bez3, getCoeffsBez3Bez3Exact],
];


describe('double precision bezier-bezier intersection coefficients', function() {
    it('should have valid (exact arithmetic verified) coefficient error bounds', function() {
        let s = 3333;
        const rnd = () => { s = (s*1103515245 + 12345) % 2147483648; return s/2147483648; };
        const r = (a: number, b: number) => a + (b - a)*rnd();
        const pt = (k = 1) => [r(-k,k), r(-k,k)];

        const classes: ((n: number) => number[][])[] = [
            n => Array.from({ length: n }, () => pt(10)),
            n => Array.from({ length: n }, () => [r(-100,-1), r(-100,-1)]),
            n => { const o = pt(1e6); return Array.from({ length: n }, () => { const p = pt(1); return [p[0]+o[0], p[1]+o[1]]; }); },
            n => Array.from({ length: n }, () => [round(r(-128,128)*256)/256, round(r(-128,128)*256)/256]),
            n => Array.from({ length: n }, () => pt(1e-3)),
            // nearly degenerate (nearly collinear control points)
            n => {
                const a = pt(10), b = pt(10);
                return Array.from({ length: n }, (_, i) => {
                    const t = i/(n-1);
                    return [a[0] + (b[0]-a[0])*t + r(-1e-7,1e-7), a[1] + (b[1]-a[1])*t + r(-1e-7,1e-7)];
                });
            },
        ];

        let checked = 0;
        for (const [name, n1, n2, f, fExact] of fs) {
            for (const mk of classes) {
                for (let i=0; i<100; i++) {
                    const ps1 = mk(n1), ps2 = mk(n2);
                    const { coeffs, errBound } = f(ps1, ps2);
                    const exact = fExact(ps1, ps2);
                    // the exact polynomial may be of lower degree
                    if (exact.length !== coeffs.length) { continue; }
                    for (let k=0; k<coeffs.length; k++) {
                        const err = abs(eEstimate(eDiff(exact[k], [coeffs[k]])));
                        const bound = γ1*errBound[k];
                        if (!(err <= bound)) {
                            throw new Error(`${name}, coefficient ${k}: error ${err} > bound ${bound}; ps1: ${JSON.stringify(ps1)}, ps2: ${JSON.stringify(ps2)}`);
                        }
                        checked++;
                    }
                }
            }
        }
        expect(checked).toBeGreaterThan(20000);
    });

    it('should return the correct coefficients', function() {
        // independent of the error bounds: compare with the exact coefficients
        let s = 4444;
        const rnd = () => { s = (s*1103515245 + 12345) % 2147483648; return s/2147483648; };
        const pt = () => [20*rnd() - 10, 20*rnd() - 10];

        for (const [name, n1, n2, f, fExact] of fs) {
            for (let i=0; i<100; i++) {
                const ps1 = Array.from({ length: n1 }, pt);
                const ps2 = Array.from({ length: n2 }, pt);
                const { coeffs } = f(ps1, ps2);
                const exact = fExact(ps1, ps2).map(eEstimate);
                expect(coeffs.length).toEqual((n1 - 1)*(n2 - 1) + 1);
                expect(exact.length).toEqual(coeffs.length);
                const scale = Math.max(...exact.map(abs));
                for (let k=0; k<coeffs.length; k++) {
                    if (!(abs(coeffs[k] - exact[k]) <= scale*1e-12)) {
                        throw new Error(`${name}, coefficient ${k}: ${coeffs[k]} !== ${exact[k]} (exact); ps1: ${JSON.stringify(ps1)}, ps2: ${JSON.stringify(ps2)}`);
                    }
                }
            }
        }
    });

    it('should include the 2nd order error term for products of two inexact values', function() {
        // i.e. the error bound of `p = a*b` (with both `a` and `b` inexact)
        // must be `_a*b_ + a_*(_b + γ1*b_) + |p|` (and not merely
        // `_a*b_ + a_*_b + |p|`) and that of `a*a` must be
        // `a_*(2*_a + γ1*a_) + |a*a|` (and not merely `2*(a_*_a) + |a*a|`)
        for (const [name] of fs) {
            const src = readFileSync(DIR + name + '.ts', 'utf8');
            for (const line of src.split('\n')) {
                const m = line.match(/^\s+const \S+_ = (.*)$/);
                if (!m) { continue; }
                const expr = m[1];
                // squares without the 2nd order term
                expect(expr).not.toMatch(/2\*\((\w+)_\*_\1\)/u);
                // paired products `a_*_b` (with partner `_a*b_`) without the
                // 2nd order term
                for (const [, a, b] of expr.matchAll(/(?<!\w)([^\W\d_]\w*)_\*_([^\W\d_]\w*)(?!\w)/gu)) {
                    const partner = new RegExp(`(?<!\\w)_${a}\\*${b}_(?!\\w)`, 'u');
                    if (partner.test(expr)) {
                        throw new Error(`${name}: the error bound \`${line.trim()}\` is missing the 2nd order term`);
                    }
                }
            }
        }
    });
});
