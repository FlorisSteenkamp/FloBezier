import { describe, expect, it } from '@jest/globals';
import { eEstimate, eDiff } from 'big-float-ts';
import { γ1 } from '../../src/error-analysis/error-analysis.js';
import { getImplicitForm2WithRunningError } from '../../src/implicit-form/double/get-implicit-form2-with-running-error.js';
import { getImplicitForm3WithRunningError } from '../../src/implicit-form/double/get-implicit-form3-with-running-error.js';
import { getImplicitForm2Exact } from '../../src/implicit-form/expansion/e-get-implicit-form2.js';
import { getImplicitForm3Exact } from '../../src/implicit-form/expansion/e-get-implicit-form3.js';
import { getCoeffsBez3WithRunningError } from '../../src/intersection/self-intersection/get-coefficients/double/get-coeffs-bez3-with-running-error.js';
import { getCoeffsBez3Exact } from '../../src/intersection/self-intersection/get-coefficients/exact/get-coeffs-bez3-exact.js';
import { toPowerBasis3WithRunningError } from '../../src/to-power-basis/to-power-basis/double/to-power-basis-with-running-error.js';
import { generateCuspAtHalf3 } from '../../src/create/generate-cusp-at-half-t.js';

const { abs, round } = Math;

const K2 = ['vₓₓ','vₓᵧ','vᵧᵧ','vₓ','vᵧ','v'];
const K3 = ['vₓₓₓ','vₓₓᵧ','vₓᵧᵧ','vᵧᵧᵧ', ...K2];


function getClasses(n: number, seed: number): [string, () => number[][]][] {
    let s = seed;
    const rnd = () => { s = (s*1103515245 + 12345) % 2147483648; return s/2147483648; };
    const u = (a: number, b: number) => a + (b - a)*rnd();
    const pt = (r = 100) => [u(-r, r), u(-r, r)];
    const pts = (k: number, f = () => pt()) => Array.from({ length: k }, f);
    const offset = (ps: number[][], o: number[]) => ps.map(p => [p[0] + o[0], p[1] + o[1]]);
    const scale = (ps: number[][], k: number) => ps.map(p => [p[0]*k, p[1]*k]);

    return [
        ['grid', () => pts(n, () => [round(u(-128,128)*2**10)/2**10, round(u(-128,128)*2**10)/2**10])],
        ['full precision', () => pts(n)],
        ['large offset', () => offset(pts(n, () => pt(1)), [u(5e5,1e6), u(5e5,1e6)])],
        // A curve that is *nearly* of lower order: some power basis coefficients
        // then round to exactly zero while their true value is not zero - a
        // running error bound that omits 2nd order terms collapses to zero here
        ['nearly lower order', () => {
            if (n === 4) {
                const [p0,p1,p2] = pts(3);
                return [p0, [(p0[0]+2*p1[0])/3, (p0[1]+2*p1[1])/3], [(2*p1[0]+p2[0])/3, (2*p1[1]+p2[1])/3], p2];
            }
            const [p0,p2] = pts(2);
            return [p0, [(p0[0]+p2[0])/2 + u(-1e-9,1e-9), (p0[1]+p2[1])/2 + u(-1e-9,1e-9)], p2];
        }],
        ['nearly collinear', () => {
            const [a,b] = pts(2);
            const ts = n === 4 ? [0, u(0.1,0.4), u(0.6,0.9), 1] : [0, u(0.2,0.8), 1];
            return ts.map(t => [a[0]+t*(b[0]-a[0])+u(-1e-9,1e-9), a[1]+t*(b[1]-a[1])+u(-1e-9,1e-9)]);
        }],
        ...(n === 4 ? [['cusp', () => generateCuspAtHalf3(pt(), pt(), pt())] as [string, () => number[][]]] : []),
        ['scale 2**100', () => scale(pts(n), 2**100)],
        ['scale 2**-100', () => scale(pts(n), 2**-100)],
    ];
}


/** throws if an error bound is violated; returns the number of curves checked */
function check(
        n: number,
        seed: number,
        f: (ps: number[][]) => [string, number, number][] | undefined) {

    for (const [name, mk] of getClasses(n, seed)) {
        let checked = 0;
        for (let i=0; i<100; i++) {
            const ps = mk();
            const r = f(ps);
            if (r === undefined) { continue; }
            checked++;
            for (const [k, err, bound] of r) {
                if (!(err <= bound)) {
                    throw new Error(`class: ${name}, coefficient: ${k}, error: ${err}, bound: ${bound}, ps: ${JSON.stringify(ps)}`);
                }
            }
        }
        expect(checked).toBeGreaterThan(50);
    }
}


describe('double precision running error bounds', function() {
    it('should give a valid error bound for the implicit form of quadratic bezier curves, including hard cases',
    function() {
        check(3, 21, ps => {
            const ex = getImplicitForm2Exact(ps) as any;
            if (ex === undefined || !('vₓₓ' in ex)) { return undefined; }
            const r = getImplicitForm2WithRunningError(ps) as any;
            return K2.map(k => [k, abs(eEstimate(eDiff(ex[k], [r.coeffs[k]]))), γ1*r.errorBound[k + '_']]);
        });
    });

    it('should give a valid error bound for the implicit form of cubic bezier curves, including hard cases',
    function() {
        check(4, 31, ps => {
            const ex = getImplicitForm3Exact(ps) as any;
            if (ex === undefined || !('vₓₓₓ' in ex)) { return undefined; }
            const r = getImplicitForm3WithRunningError(ps) as any;
            return K3.map(k => [k, abs(eEstimate(eDiff(ex[k], [r.coeffs[k]]))), γ1*r.errorBound[k + '_']]);
        });
    });

    it('should give a valid error bound for the self-intersection polynomial coefficients of cubic bezier curves, including hard cases',
    function() {
        check(4, 41, ps => {
            const ex = getCoeffsBez3Exact(ps);
            const r = getCoeffsBez3WithRunningError(ps);
            // (the returned error bound is already scaled)
            return [0,1,2].map(k => [`u${2-k}`, abs(eEstimate(eDiff(ex[k], [r.coeffs[k]]))), r.errBound[k]]);
        });
    });

    it('should propagate the errors of all power basis coefficients into the self-intersection polynomial coefficient bounds',
    function() {
        // `u1 = f4*f5` where `f5 = a1*b3 - a3*b1`, so the error bound of `u1`
        // must include (at least) `|f4|` times the (first order) propagated
        // errors of `a1*b3` and `a3*b1`, including the errors of the power basis
        // coefficients `a1` and `b1` (which were previously ignored)
        let s = 77;
        const rnd = () => { s = (s*1103515245 + 12345) % 2147483648; return s/2147483648; };
        const u = (a: number, b: number) => a + (b - a)*rnd();

        for (let i=0; i<3000; i++) {
            const ps = [0,1,2,3].map(() => [u(-100,100), u(-100,100)]);

            const {
                coeffs: [[a3,a2,a1],[b3,b2,b1]],
                errorBound: [[a3_,,a1_],[b3_,,b1_]]
            } = toPowerBasis3WithRunningError(ps);
            const f4 = a2*b3 - a3*b2;
            const required = γ1*abs(f4)*(a1_*abs(b3) + abs(a1)*b3_ + a3_*abs(b1) + abs(a3)*b1_);

            const { errBound } = getCoeffsBez3WithRunningError(ps);
            // (allow for some round-off in calculating `required` above)
            expect(errBound[1]).toBeGreaterThanOrEqual(required*(1 - 2**-40));
        }
    });
});
