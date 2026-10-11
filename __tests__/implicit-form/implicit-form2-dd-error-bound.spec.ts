import { describe, expect, it } from '@jest/globals';
import { eEstimate, eDiff } from 'big-float-ts';
import { γγ3 } from '../../src/error-analysis/error-analysis.js';
import { getImplicitForm2DdWithRunningError } from '../../src/implicit-form/double-double/get-implicit-form2-dd-with-running-error.js';
import { getImplicitForm2Exact } from '../../src/implicit-form/expansion/e-get-implicit-form2.js';

const { abs, round } = Math;

const KEYS = ['vₓₓ','vₓᵧ','vᵧᵧ','vₓ','vᵧ','v'] as const;


describe('getImplicitForm2DdWithRunningError error bound', function() {
    it('should give a valid (coefficient-wise) error bound for the implicit form of quadratic bezier curves, including hard cases',
    function() {
        let seed = 2222;
        const rnd = () => { seed = (seed*1103515245 + 12345) % 2147483648; return seed/2147483648; };
        const u = (a: number, b: number) => a + (b - a)*rnd();
        const pt = (s = 100) => [u(-s, s), u(-s, s)];
        const grid = (s = 128) => [round(u(-s, s)*2**10)/2**10, round(u(-s, s)*2**10)/2**10];
        const pts = (n: number, f = () => pt()) => Array.from({ length: n }, f);
        const offset = (ps: number[][], o: number[]) => ps.map(p => [p[0] + o[0], p[1] + o[1]]);
        const scale = (ps: number[][], k: number) => ps.map(p => [p[0]*k, p[1]*k]);

        const classes: [string, () => number[][]][] = [
            ['grid', () => pts(3, grid)],
            ['full precision', () => pts(3)],
            ['large offset', () => offset(pts(3, () => pt(1)), [u(5e5,1e6), u(5e5,1e6)])],
            ['tiny and far', () => offset(pts(3, () => pt(1e-3)), [u(5e7,1e8), u(5e7,1e8)])],
            ['nearly a line', () => {
                const [p0,p2] = pts(2);
                return [p0, [(p0[0]+p2[0])/2 + u(-1e-9,1e-9), (p0[1]+p2[1])/2 + u(-1e-9,1e-9)], p2];
            }],
            ['nearly collinear', () => {
                const [a,b] = pts(2);
                return [0, u(0.2,0.8), 1].map(t => [a[0]+t*(b[0]-a[0])+u(-1e-9,1e-9), a[1]+t*(b[1]-a[1])+u(-1e-9,1e-9)]);
            }],
            ['scale 2**100', () => scale(pts(3), 2**100)],
            ['scale 2**-100', () => scale(pts(3), 2**-100)],
        ];

        for (const [name, mk] of classes) {
            let checked = 0;
            for (let i=0; i<100; i++) {
                const ps = mk();
                const exact = getImplicitForm2Exact(ps) as any;
                // if the curve is *exactly* of lower order the exact function
                // returns a different (lower order) implicit form - skip those
                if (exact === undefined || !('vₓₓ' in exact)) { continue; }
                checked++;

                const { coeffs, errorBound } = getImplicitForm2DdWithRunningError(ps);
                for (const k of KEYS) {
                    const err = abs(eEstimate(eDiff(exact[k], (coeffs as any)[k])));
                    const bound = γγ3*(errorBound as any)[k + '_'];
                    if (!(err <= bound)) {
                        throw new Error(`class: ${name}, coefficient: ${k}, error: ${err}, bound: ${bound}, ps: ${JSON.stringify(ps)}`);
                    }
                }
            }
            expect(checked).toBeGreaterThan(50);
        }
    });
});
