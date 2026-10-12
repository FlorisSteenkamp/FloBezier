import { describe, expect, it } from '@jest/globals';
import { Horner, roots } from 'flo-poly';
import { getMedialPointCoeffsBez0 } from '../../src/get-medial-points/double/get-medial-point-coeffs-bez0.js';
import { getMedialPointCoeffsBez1 } from '../../src/get-medial-points/double/get-medial-point-coeffs-bez1.js';
import { getMedialPointCoeffsBez2 } from '../../src/get-medial-points/double/get-medial-point-coeffs-bez2.js';
import { getMedialPointCoeffsBez3 } from '../../src/get-medial-points/double/get-medial-point-coeffs-bez3.js';
import { getMedialPointCoeffsBez2_SameCurve } from '../../src/get-medial-points/double/get-medial-point-coeffs-bez2-same-curve.js';
import { getMedialPointCoeffsBez3_SameCurve } from '../../src/get-medial-points/double/get-medial-point-coeffs-bez3-same-curve.js';
import { ddGetMedialPointCoeffsBez0 } from '../../src/get-medial-points/double-double/dd-get-medial-point-coeffs-bez0.js';
import { ddGetMedialPointCoeffsBez1 } from '../../src/get-medial-points/double-double/dd-get-medial-point-coeffs-bez1.js';
import { ddGetMedialPointCoeffsBez2 } from '../../src/get-medial-points/double-double/dd-get-medial-point-coeffs-bez2.js';
import { ddGetMedialPointCoeffsBez3 } from '../../src/get-medial-points/double-double/dd-get-medial-point-coeffs-bez3.js';
import { ddGetMedialPointCoeffsBez2_SameCurve } from '../../src/get-medial-points/double-double/dd-get-medial-point-coeffs-bez2-same-curve.js';
import { ddGetMedialPointCoeffsBez3_SameCurve } from '../../src/get-medial-points/double-double/dd-get-medial-point-coeffs-bez3-same-curve.js';
import { ddGetMedialPointCoeffs } from '../../src/get-medial-points/double-double/dd-get-medial-point-coeffs.js';
import { evaluate } from '../../src/local-properties-at-t/evaluate/double/evaluate.js';

const { abs, max, hypot } = Math;


let s = 60;
const rnd = () => { s = (s*1103515245 + 12345) % 2147483648; return s/2147483648; };
const r = (a: number, b: number) => a + (b - a)*rnd();
const ri = (a: number, b: number) => a + Math.floor((b - a + 1)*rnd());

/** a double as a double-double */
const toDd = (p: number[]) => p.map(c => [0,c]);
/** the value of a double-double (as an estimate) */
const est = (c: number[]) => c[0] + c[1];

type Coeffs = Record<string, number[] | number>;
type DdCoeffs = Record<string, number[][] | number[]>;

/**
 * The coefficients of the double and double-double results in the same order
 * as pairs `[double, double-double]`.
 */
function pairs(d: Coeffs, dd: DdCoeffs): [number, number[]][] {
    const res: [number, number[]][] = [];
    for (const k of Object.keys(d)) {
        const a = d[k], b = dd[k];
        if (typeof a === 'number') {
            res.push([a, b as number[]]);
        } else {
            expect((b as number[][]).length).toEqual(a.length);
            a.forEach((c, i) => res.push([c, (b as number[][])[i]]));
        }
    }
    return res;
}


// the functions under test (with their double precision counterparts);
// `same` indicates the `SameCurve` variants that take `t` (on `ps`) instead
// of `p`
const fs = [
    { name: 'ddGetMedialPointCoeffsBez0', order: 0, d: getMedialPointCoeffsBez0, dd: ddGetMedialPointCoeffsBez0, same: false },
    { name: 'ddGetMedialPointCoeffsBez1', order: 1, d: getMedialPointCoeffsBez1, dd: ddGetMedialPointCoeffsBez1, same: false },
    { name: 'ddGetMedialPointCoeffsBez2', order: 2, d: getMedialPointCoeffsBez2, dd: ddGetMedialPointCoeffsBez2, same: false },
    { name: 'ddGetMedialPointCoeffsBez3', order: 3, d: getMedialPointCoeffsBez3, dd: ddGetMedialPointCoeffsBez3, same: false },
    { name: 'ddGetMedialPointCoeffsBez2_SameCurve', order: 2, d: getMedialPointCoeffsBez2_SameCurve, dd: ddGetMedialPointCoeffsBez2_SameCurve, same: true },
    { name: 'ddGetMedialPointCoeffsBez3_SameCurve', order: 3, d: getMedialPointCoeffsBez3_SameCurve, dd: ddGetMedialPointCoeffsBez3_SameCurve, same: true },
] as const;


/** calls the double and double-double versions with the same inputs */
function call(
        f: typeof fs[number],
        p: number[], t: number, v: number[], ps: number[][]): [Coeffs, DdCoeffs] {

    const f_ = f as any;
    if (f.order === 0) {
        return [f_.d(p, v, ps[0]), f_.dd(toDd(p), toDd(v), ps[0])];
    }
    if (f.same) {
        return [f_.d(t, v, ps), f_.dd(t, toDd(v), ps)];
    }
    return [f_.d(p, v, ps), f_.dd(toDd(p), toDd(v), ps)];
}


for (const f of fs) {
    describe(f.name, function() {
        it('should equal the double precision version exactly when all calculations are exact (small integer inputs)',
        function() {
            for (let i=0; i<200; i++) {
                const p = [ri(-8,8), ri(-8,8)];
                const v = [ri(-8,8), ri(-8,8)];
                const ps = Array.from({ length: f.order + 1 }, () => [ri(-8,8), ri(-8,8)]);
                const t = ri(0,4)/4;  // exact (dyadic) for the `SameCurve` variants

                const [d, dd] = call(f, p, t, v, ps);
                for (const [c, cc] of pairs(d, dd)) {
                    // the double-double result is the exact value, i.e. it has
                    // no low order part and equals the double result
                    expect(cc[0] === 0).toBe(true);
                    expect(cc[1] === c).toBe(true);
                }
            }
        });

        it('should agree closely with the double precision version for general inputs', function() {
            for (let i=0; i<200; i++) {
                const p = [r(-10,10), r(-10,10)];
                const v = [r(-1,1), r(-1,1)];
                const ps = Array.from({ length: f.order + 1 }, () => [r(-10,10), r(-10,10)]);
                const t = r(0,1);

                const [d, dd] = call(f, p, t, v, ps);
                const ps_ = pairs(d, dd);
                // the double-double coefficients are much more accurate so the
                // differences are (essentially) the double precision errors
                const scale = max(...ps_.map(([c]) => abs(c)));
                for (const [c, cc] of ps_) {
                    expect(abs(est(cc) - c)).toBeLessThanOrEqual(scale*2**-40);
                }
            }
        });
    });
}


describe('ddGetMedialPointCoeffsBez1/2/3', function() {
    it('should give medial points (equidistant from `p` and the curve) at the roots of `H`', function() {
        const dds = [ddGetMedialPointCoeffsBez1, ddGetMedialPointCoeffsBez2, ddGetMedialPointCoeffsBez3];
        let checked = 0;
        for (let i=0; i<300; i++) {
            const order = 1 + (i % 3);
            const p = [r(-1,1), r(-1,1)];
            const v = [r(-1,1), r(-1,1)];
            const ps = Array.from({ length: order + 1 }, () => [r(-10,10), r(-10,10)]);

            const { A, B, H } = dds[order-1](toDd(p), toDd(v), ps);
            const ss = (roots(H.map(est), 0, 1) || []).map(r => r.t);
            for (const s of ss) {
                const As = Horner(A.map(est), s);
                const Bs = Horner(B.map(est), s);
                if (abs(As) < 1e-6) { continue; }  // (nearly) no solution
                const t = -Bs/As;
                const q = [p[0] + t*v[0], p[1] + t*v[1]];
                const b = evaluate(ps, s);
                const dP = hypot(q[0] - p[0], q[1] - p[1]);
                const dB = hypot(q[0] - b[0], q[1] - b[1]);
                // `q` is equidistant from `p` and `b(s)`
                expect(abs(dP - dB)).toBeLessThanOrEqual(1e-8*max(1, dP));
                checked++;
            }
        }
        expect(checked).toBeGreaterThan(50);
    });
});


describe('ddGetMedialPointCoeffs dispatch', function() {
    it('should dispatch to the correct specialized implementation', function() {
        const p = toDd([0.4, -0.3]);
        const v = toDd([1.1, 0.2]);

        {
            const ps = [[2.2, -1.7]];
            const { a0, b0 } = ddGetMedialPointCoeffsBez0(p, v, ps[0]);
            expect(ddGetMedialPointCoeffs(p, v, ps)).toEqual({ A: [a0], B: [b0], C: [], D: [], H: [] });
        }
        {
            const ps = [[-1, 0.5], [3.3, -2.1]];
            expect(ddGetMedialPointCoeffs(p, v, ps)).toEqual(ddGetMedialPointCoeffsBez1(p, v, ps));
        }
        {
            const ps = [[-1, 0.5], [3.3, -2.1], [2.4, 1.8]];
            expect(ddGetMedialPointCoeffs(p, v, ps)).toEqual(ddGetMedialPointCoeffsBez2(p, v, ps));
        }
        {
            const ps = [[-1, 0.5], [3.3, -2.1], [2.4, 1.8], [0.1, -0.7]];
            expect(ddGetMedialPointCoeffs(p, v, ps)).toEqual(ddGetMedialPointCoeffsBez3(p, v, ps));
        }
    });
});
