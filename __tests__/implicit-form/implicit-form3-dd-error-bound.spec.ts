import { describe, expect, it } from '@jest/globals';
import { eEstimate, eDiff } from 'big-float-ts';
import { γγ3 } from '../../src/error-analysis/error-analysis.js';
import { getImplicitForm3DdWithRunningError } from '../../src/implicit-form/double-double/get-implicit-form3-dd-with-running-error.js';
import { getImplicitForm3Exact } from '../../src/implicit-form/expansion/e-get-implicit-form3.js';
import { generateCuspAtHalf3 } from '../../src/create/generate-cusp-at-half-t.js';

const { abs, round } = Math;

const KEYS = ['vₓₓₓ','vₓₓᵧ','vₓᵧᵧ','vᵧᵧᵧ','vₓₓ','vₓᵧ','vᵧᵧ','vₓ','vᵧ','v'] as const;


describe('getImplicitForm3DdWithRunningError error bound', function() {
    it('should give a valid (coefficient-wise) error bound for the implicit form of cubic bezier curves, including hard cases',
    function() {
        let seed = 1919;
        const rnd = () => { seed = (seed*1103515245 + 12345) % 2147483648; return seed/2147483648; };
        const u = (a: number, b: number) => a + (b - a)*rnd();
        const pt = (s = 100) => [u(-s, s), u(-s, s)];
        const grid = (s = 128) => [round(u(-s, s)*2**10)/2**10, round(u(-s, s)*2**10)/2**10];
        const pts = (n: number, f = () => pt()) => Array.from({ length: n }, f);
        const offset = (ps: number[][], o: number[]) => ps.map(p => [p[0] + o[0], p[1] + o[1]]);
        const scale = (ps: number[][], k: number) => ps.map(p => [p[0]*k, p[1]*k]);

        const classes: [string, () => number[][]][] = [
            ['grid', () => pts(4, grid)],
            ['full precision', () => pts(4)],
            // large coordinates relative to the curve size cause heavy
            // cancellation, especially in the constant term `v`
            ['large offset', () => offset(pts(4, () => pt(1)), [u(5e5,1e6), u(5e5,1e6)])],
            ['tiny and far', () => offset(pts(4, () => pt(1e-3)), [u(5e7,1e8), u(5e7,1e8)])],
            ['nearly quadratic', () => {
                const [p0,p1,p2] = pts(3);
                return [p0, [(p0[0]+2*p1[0])/3, (p0[1]+2*p1[1])/3], [(2*p1[0]+p2[0])/3, (2*p1[1]+p2[1])/3], p2];
            }],
            ['nearly collinear', () => {
                const [a,b] = pts(2);
                return [0, u(0.1,0.4), u(0.6,0.9), 1].map(t => [a[0]+t*(b[0]-a[0])+u(-1e-9,1e-9), a[1]+t*(b[1]-a[1])+u(-1e-9,1e-9)]);
            }],
            ['loop', () => offset(scale([[0,0],[3,3],[-1,3],[2,0]], u(1, 50)), pt())],
            ['cusp', () => generateCuspAtHalf3(pt(), pt(), pt())],
            ['scale 2**100', () => scale(pts(4), 2**100)],
            ['scale 2**-100', () => scale(pts(4), 2**-100)],
        ];

        for (const [name, mk] of classes) {
            let checked = 0;
            for (let i=0; i<100; i++) {
                const ps = mk();
                const exact = getImplicitForm3Exact(ps) as any;
                // if the curve is *exactly* of lower order the exact function
                // returns a different (lower order) implicit form - skip those
                if (exact === undefined || !('vₓₓₓ' in exact)) { continue; }
                checked++;

                const { coeffs, errorBound } = getImplicitForm3DdWithRunningError(ps);
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
