import { describe, expect, it } from '@jest/globals';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { eEstimate, eDiff } from 'big-float-ts';
import { γγ3 } from '../../../src/error-analysis/error-analysis.js';
import { getCoeffsBez3Bez2Dd } from '../../../src/intersection/bezier-bezier-intersection/get-coefficients/double-double/get-coeffs-bez3-bez2-dd.js';
import { getCoeffsBez3Bez2Exact } from '../../../src/intersection/bezier-bezier-intersection/get-coefficients/exact/get-coeffs-bez3-bez2-exact.js';
import { getCoeffsBez2Bez2Dd } from '../../../src/intersection/bezier-bezier-intersection/get-coefficients/double-double/get-coeffs-bez2-bez2-dd.js';
import { getCoeffsBez2Bez2Exact } from '../../../src/intersection/bezier-bezier-intersection/get-coefficients/exact/get-coeffs-bez2-bez2-exact.js';

const { abs, round } = Math;


//------------------------------------------------------------------------------
// Deterministic random input generators covering some hard cases (for curves
// with `n1` and `n2` control points respectively)
//------------------------------------------------------------------------------

function getClasses(n1: number, n2: number, seed: number) {
    let s = seed;
    const rnd = () => { s = (s*1103515245 + 12345) % 2147483648; return s/2147483648; };
    const u = (a: number, b: number) => a + (b - a)*rnd();
    const pt = (r = 100) => [u(-r, r), u(-r, r)];
    const grid = (r = 128) => [round(u(-r, r)*2**10)/2**10, round(u(-r, r)*2**10)/2**10];
    const pts = (n: number, f = () => pt()) => Array.from({ length: n }, f);
    const offset = (ps: number[][], o: number[]) => ps.map(p => [p[0] + o[0], p[1] + o[1]]);
    const scale = (ps: number[][], k: number) => ps.map(p => [p[0]*k, p[1]*k]);
    const perturb = (ps: number[][], e: number) => ps.map(p => [p[0]*(1 + u(-e,e)), p[1]*(1 + u(-e,e))]);

    /** a curve that is *nearly* of lower order (due to rounding when elevating) */
    const nearlyLower = (n: number) => {
        if (n === 4) {
            const [p0, p1, p2] = pts(3);
            return [p0, [(p0[0] + 2*p1[0])/3, (p0[1] + 2*p1[1])/3], [(2*p1[0] + p2[0])/3, (2*p1[1] + p2[1])/3], p2];
        }
        const [p0, p2] = pts(2);
        return [p0, [(p0[0] + p2[0])/2 + u(-1e-9,1e-9), (p0[1] + p2[1])/2 + u(-1e-9,1e-9)], p2];
    }

    /** a curve with nearly collinear control points */
    const nearlyCollinear = (n: number) => {
        const [a, b] = pts(2);
        const ts = n === 4 ? [0, u(0.1,0.4), u(0.6,0.9), 1] : [0, u(0.2,0.8), 1];
        return ts.map(t => [a[0] + t*(b[0] - a[0]) + u(-1e-9,1e-9), a[1] + t*(b[1] - a[1]) + u(-1e-9,1e-9)]);
    }

    const classes: { [name: string]: () => number[][][] } = {
        'grid': () => [pts(n1, grid), pts(n2, grid)],
        'full precision': () => [pts(n1), pts(n2)],
        'large offset': () => {
            const o = [u(5e5,1e6), u(5e5,1e6)];
            return [offset(pts(n1, () => pt(1)), o), offset(pts(n2, () => pt(1)), o)];
        },
        'nearly lower order 1st': () => [nearlyLower(n1), pts(n2)],
        'nearly lower order 2nd': () => [pts(n1), nearlyLower(n2)],
        'nearly collinear 1st': () => [nearlyCollinear(n1), pts(n2)],
        'nearly collinear 2nd': () => [pts(n1), nearlyCollinear(n2)],
        'scale 2**100': () => [scale(pts(n1), 2**100), scale(pts(n2), 2**100)],
        'scale 2**-100': () => [scale(pts(n1), 2**-100), scale(pts(n2), 2**-100)],
    }
    if (n1 === n2) {
        classes['nearly identical'] = () => { const A = pts(n1); return [A, perturb(A, 1e-9)]; };
    }

    return classes;
}


type F = (A: number[][], B: number[][]) => { coeffs: number[][]; errBound: number[] };
type FE = (A: number[][], B: number[][]) => number[][];

function testErrorBound(fDd: F, fExact: FE, n1: number, n2: number, seed: number) {
    const deg = (n1 - 1)*(n2 - 1);
    const classes = getClasses(n1, n2, seed);
    for (const name in classes) {
        let checked = 0;
        for (let i=0; i<60; i++) {
            const [A, B] = classes[name]();
            const exact = fExact(A, B);
            // if a curve is *exactly* of lower order the exact function
            // returns a different (lower degree) polynomial - skip those
            if (exact.length !== deg + 1) { continue; }
            checked++;

            const { coeffs, errBound } = fDd(A, B);
            for (let k=0; k<=deg; k++) {
                const err = abs(eEstimate(eDiff(exact[k], coeffs[k])));
                const bound = γγ3*errBound[k];
                if (!(err <= bound)) {
                    throw new Error(`class: ${name}, coefficient: ${k}, error: ${err}, bound: ${bound}, ps1: ${JSON.stringify(A)}, ps2: ${JSON.stringify(B)}`);
                }
            }
        }
        expect(checked).toBeGreaterThan(30);
    }
}


describe('double-double intersection coefficients error bounds', function() {
    it('should give a valid (coefficient-wise) error bound for cubic-quadratic intersection coefficients, including hard cases',
    function() {
        testErrorBound(getCoeffsBez3Bez2Dd as F, getCoeffsBez3Bez2Exact, 4, 3, 31);
    });

    it('should give a valid (coefficient-wise) error bound for quadratic-quadratic intersection coefficients, including hard cases',
    function() {
        testErrorBound(getCoeffsBez2Bez2Dd as F, getCoeffsBez2Bez2Exact, 3, 3, 22);
    });

    it('should follow the error bound convention for double-double products (see `error-bound-calc.txt`)',
    function() {
        // The error bounds have so much slack in practice that a missing term
        // is not caught by testing against exact results, so instead check the
        // source directly: the error bound of every double-double times
        // double-double product, i.e. `x = qmq(a,b)`, must include `2|x|`, i.e.
        // be of the form `x_ = ... + 2*abs($x)` (or `2*_x`, or `2*abs(x[1])`,
        // or `2*(a_*_a + |x|)` for a square).
        const dirs = [
            'src/intersection/bezier-bezier-intersection/get-coefficients/double-double',
            'src/intersection/self-intersection/get-coefficients/double-double'
        ];

        const violations: string[] = [];
        let count = 0;
        for (const dir of dirs) {
            for (const file of readdirSync(dir).filter(f => f.endsWith('.ts'))) {
                const lines = readFileSync(join(dir, file), 'utf8').split(/\r?\n/);
                for (let i=0; i<lines.length; i++) {
                    const m = lines[i].match(/^\s*const (\w+) = qmq\(/);
                    if (!m) { continue; }
                    count++;
                    const v = m[1];
                    const V = v.replace(/\$/g, '\\$');
                    // the error bound line may come just before or just after
                    const near = [...lines.slice(i + 1, i + 6), ...lines.slice(Math.max(0, i - 6), i)];
                    const errLine = near.find(l => new RegExp(`^\\s*const ${V}_ = `).test(l));
                    if (errLine === undefined) {
                        violations.push(`${file}:${i+1} no error bound line found for \`${v}\``);
                        continue;
                    }
                    const ok =
                        new RegExp(`2\\*abs\\(\\$${V}\\)`).test(errLine) ||
                        new RegExp(`2\\*abs\\(${V}\\[1\\]\\)`).test(errLine) ||
                        new RegExp(`2\\*_${V}(?!\\w)`).test(errLine) ||
                        // a square: `x_ = 2*(a_*_a + |x|)`
                        new RegExp(`^\\s*const ${V}_ = 2\\*\\(.*(_${V}|abs\\(\\$${V}\\)|abs\\(${V}\\[1\\]\\)|\\$${V})\\);\\s*$`).test(errLine);
                    if (!ok) { violations.push(`${file}:${i+1} ${errLine.trim()}`); }
                }
            }
        }

        expect(count).toBeGreaterThan(300);
        expect(violations).toEqual([]);
    });
});
