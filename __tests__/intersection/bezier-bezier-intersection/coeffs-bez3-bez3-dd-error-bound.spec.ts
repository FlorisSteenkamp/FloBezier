import { describe, expect, it } from '@jest/globals';
import { eEstimate, eDiff } from 'big-float-ts';
import { γγ3 } from '../../../src/error-analysis/error-analysis.js';
import { getCoeffsBez3Bez3Dd } from '../../../src/intersection/bezier-bezier-intersection/get-coefficients/double-double/get-coeffs-bez3-bez3-dd.js';
import { getCoeffsBez3Bez3Exact } from '../../../src/intersection/bezier-bezier-intersection/get-coefficients/exact/get-coeffs-bez3-bez3-exact.js';
import { getImplicitForm3DdWithRunningError } from '../../../src/implicit-form/double-double/get-implicit-form3-dd-with-running-error.js';
import { toPowerBasis3Dd } from '../../../src/to-power-basis/to-power-basis/double-double/to-power-basis-dd.js';

const { abs, round } = Math;


//------------------------------------------------------------------------------
// Deterministic random input generators covering some hard cases
//------------------------------------------------------------------------------

function rng(seed: number) {
    let s = seed;
    const rnd = () => { s = (s*1103515245 + 12345) % 2147483648; return s/2147483648; };
    const u = (a: number, b: number) => a + (b - a)*rnd();
    const pt = (r = 100) => [u(-r, r), u(-r, r)];
    const grid = (r = 128) => [round(u(-r, r)*2**10)/2**10, round(u(-r, r)*2**10)/2**10];
    const cubic = () => [pt(), pt(), pt(), pt()];

    /** a cubic that is *nearly* a quadratic (due to rounding when elevating) */
    const nearlyQuad = () => {
        const [p0, p1, p2] = [pt(), pt(), pt()];
        return [p0, [(p0[0] + 2*p1[0])/3, (p0[1] + 2*p1[1])/3], [(2*p1[0] + p2[0])/3, (2*p1[1] + p2[1])/3], p2];
    }

    /** a cubic with nearly collinear control points */
    const nearlyCollinear = () => {
        const [a, b] = [pt(), pt()];
        return [0, u(0.1, 0.4), u(0.6, 0.9), 1].map(t => [
            a[0] + t*(b[0] - a[0]) + u(-1e-9, 1e-9), a[1] + t*(b[1] - a[1]) + u(-1e-9, 1e-9)
        ]);
    }

    const classes: { [name: string]: () => number[][][] } = {
        'grid': () => [[grid(),grid(),grid(),grid()], [grid(),grid(),grid(),grid()]],
        'full precision': () => [cubic(), cubic()],
        'large offset': () => {
            const o = [u(5e5,1e6), u(5e5,1e6)];
            const f = () => { const q = pt(1); return [q[0] + o[0], q[1] + o[1]]; };
            return [[f(),f(),f(),f()], [f(),f(),f(),f()]];
        },
        'nearly quadratic': () => [nearlyQuad(), cubic()],
        'both nearly quadratic': () => [nearlyQuad(), nearlyQuad()],
        'nearly identical': () => {
            const A = cubic();
            return [A, A.map(p => [p[0]*(1 + u(-1e-9,1e-9)), p[1]*(1 + u(-1e-9,1e-9))])];
        },
        'nearly collinear': () => [nearlyCollinear(), cubic()],
        'scale 2**100': () => [cubic(), cubic()].map(ps => ps.map(p => [p[0]*2**100, p[1]*2**100])),
        'scale 2**-100': () => [cubic(), cubic()].map(ps => ps.map(p => [p[0]*2**-100, p[1]*2**-100])),
    }

    return classes;
}


describe('getCoeffsBez3Bez3Dd error bound', function() {
    it('should give a valid (coefficient-wise) error bound for cubic-cubic intersection coefficients, including hard cases',
    function() {
        const classes = rng(20261011);
        for (const name in classes) {
            let checked = 0;
            for (let i=0; i<60; i++) {
                const [A, B] = classes[name]();
                const exact = getCoeffsBez3Bez3Exact(A, B);
                // if a curve is *exactly* of lower order the exact function
                // returns a different (lower degree) polynomial - skip those
                if (exact.length !== 10) { continue; }
                checked++;

                const { coeffs, errBound } = getCoeffsBez3Bez3Dd(A, B);
                for (let k=0; k<10; k++) {
                    const err = abs(eEstimate(eDiff(exact[k], coeffs[k])));
                    const bound = γγ3*errBound[k];
                    if (!(err <= bound)) {
                        throw new Error(`class: ${name}, coefficient: ${k}, error: ${err}, bound: ${bound}, ps1: ${JSON.stringify(A)}, ps2: ${JSON.stringify(B)}`);
                    }
                }
            }
            expect(checked).toBeGreaterThan(30);
        }
    });

    it('should propagate the error of the implicit form coefficients of the 1st curve into the bound of the `t^8` coefficient',
    function() {
        // The `t^8` coefficient is `v8 = u4 + 3*(w7 + u1)` where
        //     w7 = vₓₓₓ*w5, u1 = vᵧᵧᵧ*w6, u2 = vₓₓᵧ*w3, u3 = vₓᵧᵧ*w4, u4 = u2 + u3
        // (with `w3`...`w6` derived from the 2nd curve's power basis) so its
        // error bound must include at least the propagated implicit form
        // coefficient errors:
        //     3*(vₓₓₓ_*|w5| + vᵧᵧᵧ_*|w6|) + vₓₓᵧ_*|w3| + vₓᵧᵧ_*|w4|
        // (Previously these terms were (partly) missing, see the code review.)
        const classes = rng(1234);
        for (const name of ['nearly quadratic', 'full precision', 'nearly collinear']) {
            for (let i=0; i<60; i++) {
                const [A, B] = classes[name]();

                const { errorBound: { vₓₓₓ_, vₓₓᵧ_, vₓᵧᵧ_, vᵧᵧᵧ_ } } = getImplicitForm3DdWithRunningError(A);
                const [[c3,c2],[d3,d2]] = toPowerBasis3Dd(B).map(cs => cs.map(c => c[1]));

                const w1 = 2*c2*d3 + c3*d2;
                const w2 = 2*c3*d2 + c2*d3;
                const w3 = c3*w1;
                const w4 = d3*w2;
                const w5 = c2*c3*c3;
                const w6 = d2*d3*d3;

                const propagated =
                    3*(vₓₓₓ_*abs(w5) + vᵧᵧᵧ_*abs(w6)) +
                    vₓₓᵧ_*abs(w3) + vₓᵧᵧ_*abs(w4);

                const { errBound } = getCoeffsBez3Bez3Dd(A, B);
                // (allow for some round-off in calculating `propagated` above)
                expect(errBound[1]).toBeGreaterThanOrEqual(propagated*(1 - 2**-40));
            }
        }
    });
});
