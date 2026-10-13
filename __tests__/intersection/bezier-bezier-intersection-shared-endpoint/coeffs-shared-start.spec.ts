import { describe, expect, it } from '@jest/globals';
import { eCompare, eMult, eSign, eDiff, eEstimate } from 'big-float-ts';
import { γγ3 } from '../../../src/error-analysis/error-analysis.js';
import { getCoeffsBezBez } from '../../../src/intersection/bezier-bezier-intersection/get-coefficients/get-coeffs-bez-bez.js';
import { getCoeffsSharedStart } from '../../../src/intersection/bezier-bezier-intersection-shared-endpoint/get-coefficients/get-coeffs-shared-start.js';

const { abs, round } = Math;


/** `true` if the exact polynomials `p` and `q` are equal up to a non-zero scalar */
function proportional(p: number[][], q: number[][]) {
    if (p.length !== q.length) { return false; }
    const i = p.findIndex(c => eSign(c) !== 0);
    if (i === -1 || eSign(q[i]) === 0) { return false; }
    return p.every((c, k) => eCompare(eMult(c, q[i]), eMult(q[k], p[i])) === 0);
}


let s = 2027;
const rnd = () => { s = (s*1103515245 + 12345) % 2147483648; return s/2147483648; };
const r = (a: number, b: number) => a + (b - a)*rnd();
const pt = (k = 1) => [r(-k,k), r(-k,k)];
const gridPt = () => [round(r(-64,64)), round(r(-64,64))];

/** pairs of curves (of the given orders) starting at the same point */
const classes: [string, (n1: number, n2: number) => number[][][]][] = [
    ['random', (n1, n2) => mk(n1, n2, () => pt(10))],
    ['grid', (n1, n2) => mk(n1, n2, gridPt)],
    ['large offset', (n1, n2) => { const o = pt(1e6); return mk(n1, n2, () => { const p = pt(1); return [p[0]+o[0], p[1]+o[1]]; }); }],
    ['tiny', (n1, n2) => mk(n1, n2, () => pt(1e-3))],
];

function mk(n1: number, n2: number, f: () => number[]) {
    const A = Array.from({ length: n1+1 }, f);
    const B = Array.from({ length: n2+1 }, f);
    B[0] = A[0];
    return [A, B];
}


describe('getCoeffsSharedStart', function() {
    it('should return (exactly) the general intersection polynomial with the root at `t = 0` divided out (up to a scalar)',
    function() {
        for (const [, mkPair] of classes) {
            for (const n1 of [1,2,3]) {
                for (const n2 of [1,2,3]) {
                    if (n1 === 1 && n2 === 1) { continue; }  // (degree 0)
                    for (let i=0; i<10; i++) {
                        const [A, B] = mkPair(n1, n2);
                        const general = getCoeffsBezBez(A, B).getPExact();
                        // the general polynomial has an exact root at `t = 0`
                        expect(eSign(general[general.length-1])).toEqual(0);
                        const exact = getCoeffsSharedStart(A, B, false).getPExact();
                        expect(proportional(exact, general.slice(0, general.length-1))).toBe(true);
                    }
                }
            }
        }
    });

    it('should have a zero constant term if the curves are tangent at the shared point', function() {
        for (const n1 of [1,2,3]) {
            for (const n2 of [1,2,3]) {
                for (let i=0; i<10; i++) {
                    const [A, B] = mk(n1, n2, gridPt);
                    const k = [2,-1,3,-2][i % 4];
                    B[1] = [A[0][0] + k*(A[1][0] - A[0][0]), A[0][1] + k*(A[1][1] - A[0][1])];
                    const exact = getCoeffsSharedStart(A, B, false).getPExact();
                    expect(eSign(exact[exact.length-1])).toEqual(0);
                    // and dividing out another `t` drops it
                    const tangent = getCoeffsSharedStart(A, B, true);
                    expect(tangent.coeffs.length).toEqual(exact.length - 1);
                    expect(tangent.getPExact().length).toEqual(exact.length - 1);
                }
            }
        }
    });

    it('should have valid (exact arithmetic verified) double-double coefficient error bounds', function() {
        let checked = 0;
        for (const [name, mkPair] of classes) {
            for (const n1 of [1,2,3]) {
                for (const n2 of [1,2,3]) {
                    for (let i=0; i<30; i++) {
                        const [A, B] = mkPair(n1, n2);
                        const { coeffs, errBound, getPExact } = getCoeffsSharedStart(A, B, false);
                        const exact = getPExact();
                        expect(exact.length).toEqual(coeffs.length);
                        for (let j=0; j<coeffs.length; j++) {
                            const err = abs(eEstimate(eDiff(exact[j], coeffs[j])));
                            const bound = γγ3*errBound[j];
                            if (!(err <= bound)) {
                                throw new Error(`${name}, orders ${n1}-${n2}, coefficient ${j}: error ${err} > bound ${bound}; A: ${JSON.stringify(A)}, B: ${JSON.stringify(B)}`);
                            }
                            checked++;
                        }
                    }
                }
            }
        }
        expect(checked).toBeGreaterThan(4000);
    });
});
