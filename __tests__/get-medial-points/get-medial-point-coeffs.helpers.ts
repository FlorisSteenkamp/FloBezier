import { expect } from '@jest/globals';
import { Horner } from 'flo-poly';
import { dot } from 'flo-vector2d';
import { evalDeCasteljau } from '../../src/local-properties-at-t/evaluate/double/eval-de-casteljau.js';
import { tangent } from '../../src/local-properties-at-t/tangent/double/tangent.js';

const { abs } = Math;


const EPS = 2**-32;
const EPS_H = 2**-32;


function expectCoeffPolysToMatchGeometry(
        p: number[],
        v: number[],
        ps: number[][],
        coeffs: { A: number[]; B: number[]; C: number[]; D: number[]; H: number[] }) {

    const ss = [-0.25, 0, 0.2, 0.5, 1, 1.4];

    for (const s of ss) {
        const b = evalDeCasteljau(ps, s);
        const w = tangent(ps, s);
        const u = [p[0] - b[0], p[1] - b[1]];

        const A = Horner(coeffs.A, s);
        const B = Horner(coeffs.B, s);
        const C = Horner(coeffs.C, s);
        const D = Horner(coeffs.D, s);
        const H = Horner(coeffs.H, s);

        const expectedA = 2*dot(v, u);
        const expectedB = dot(u, u);
        const expectedC = dot(v, w);
        const expectedD = dot(u, w);
        const expectedH = A*D - B*C;

        expect(abs(A - expectedA)).toBeLessThan(EPS);
        expect(abs(B - expectedB)).toBeLessThan(EPS);
        expect(abs(C - expectedC)).toBeLessThan(EPS);
        expect(abs(D - expectedD)).toBeLessThan(EPS);
        expect(abs(H - expectedH)).toBeLessThan(EPS_H);
    }
}


export { EPS, expectCoeffPolysToMatchGeometry };
