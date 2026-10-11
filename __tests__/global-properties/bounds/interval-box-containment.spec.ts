import { describe, expect, it } from '@jest/globals';
import { eEstimate, eDiff, eAdd, eMult, eMultDouble2, twoDiff, eCompare } from 'big-float-ts';
import { u } from '../../../src/error-analysis/error-analysis.js';
import { fromTo2InclErrorBound } from '../../../src/transformation/split/from-to/from-to-2-incl-error-bound.js';
import { getIntervalBox } from '../../../src/global-properties/bounds/get-interval-box/get-interval-box.js';
import { getIntervalBoxDd } from '../../../src/global-properties/bounds/get-interval-box/get-interval-box-dd.js';
import { evaluateExact } from '../../../src/local-properties-at-t/evaluate/exact/evaluate-exact.js';

const { abs, round, min, max } = Math;


function getGenerators(seed: number) {
    let s = seed;
    const rnd = () => { s = (s*1103515245 + 12345) % 2147483648; return s/2147483648; };
    const r = (a: number, b: number) => a + (b - a)*rnd();
    const pt = (k = 100) => [r(-k, k), r(-k, k)];
    const pts = (n: number, f = () => pt()) => Array.from({ length: n }, f);

    // negative coordinates in particular previously caused error bounds to be
    // too small (or even negative)
    const curves: [string, () => number[][]][] = [
        ['grid', () => pts(3, () => [round(r(-128,128)*2**10)/2**10, round(r(-128,128)*2**10)/2**10])],
        ['mixed signs', () => pts(3)],
        ['all negative', () => pts(3, () => [r(-100,-1), r(-100,-1)])],
        ['large negative offset', () => {
            const o = [r(-1e6,-5e5), r(-1e6,-5e5)];
            return pts(3, () => pt(1)).map(p => [p[0]+o[0], p[1]+o[1]]);
        }],
        ['nearly a line', () => {
            const [p0,p2] = pts(2);
            return [p0, [(p0[0]+p2[0])/2 + r(-1e-9,1e-9), (p0[1]+p2[1])/2 + r(-1e-9,1e-9)], p2];
        }],
    ];
    const intervals: [string, () => number[]][] = [
        ['tS = 0', () => [0, r(0.01, 1)]],
        ['tE = 1', () => [r(0, 0.99), 1]],
        ['inner', () => { const a = r(0, 1), b = r(0, 1); return [min(a,b), max(a,b)]; }],
    ];

    return { curves, intervals };
}


/** the exact control points of the quadratic `ps` restricted to `[tS,tE]` (as expansions) */
function exactSplit2(ps: number[][], tS: number, tE: number): number[][][] {
    const sS = twoDiff(1, tS);  // 1 - tS (exact)
    const sE = twoDiff(1, tE);  // 1 - tE (exact)
    const res: number[][][] = [[], [], []];
    for (let k=0; k<2; k++) {
        const [p0, p1, p2] = ps.map(p => p[k]);
        // B(t) = (1-t)²p0 + 2(1-t)t p1 + t² p2  (all products below are exact)
        const B = (s_: number[], t: number) => eAdd(eAdd(
            eMultDouble2(p0, eMult(s_, s_)),
            eMultDouble2(2*p1, eMultDouble2(t, s_))),
            eMultDouble2(p2, eMultDouble2(t, [t])));
        res[0][k] = B(sS, tS);
        // Q1 = (1-tS)(1-tE)p0 + ((1-tS)tE + tS(1-tE))p1 + tS tE p2
        res[1][k] = eAdd(eAdd(
            eMultDouble2(p0, eMult(sS, sE)),
            eMultDouble2(p1, eAdd(eMultDouble2(tE, sS), eMultDouble2(tS, sE)))),
            eMultDouble2(p2, eMultDouble2(tS, [tE])));
        res[2][k] = B(sE, tE);
    }
    return res;
}


describe('quadratic interval error bounds and boxes', function() {
    it('should give a valid error bound for the control points of a quadratic bezier curve restricted to an interval',
    function() {
        const { curves, intervals } = getGenerators(20);
        for (const [cname, mkC] of curves) {
            for (const [iname, mkI] of intervals) {
                for (let i=0; i<100; i++) {
                    const ps = mkC();
                    const [tS, tE] = mkI();
                    const exact = exactSplit2(ps, tS, tE);
                    const r = fromTo2InclErrorBound(ps, tS, tE);
                    for (let j=0; j<3; j++) {
                        for (let k=0; k<2; k++) {
                            const err = abs(eEstimate(eDiff(exact[j][k], [r.ps[j][k]])));
                            // the error bound needs to be multiplied by `5u` for quadratics
                            const bound = 5*u*r._ps[j][k];
                            if (!(err <= bound)) {
                                throw new Error(`${cname}, ${iname}, control point ${j}, coordinate ${k}: error ${err} > bound ${bound}; ps: ${JSON.stringify(ps)}, tS: ${tS}, tE: ${tE}`);
                            }
                        }
                    }
                }
            }
        }
    });

    it('should return interval boxes that contain the (exact) quadratic bezier curve on the interval',
    function() {
        const { curves, intervals } = getGenerators(21);
        for (const [cname, mkC] of curves) {
            for (const [iname, mkI] of intervals) {
                let checked = 0;
                for (let i=0; i<100; i++) {
                    const ps = mkC();
                    const [t1, t2] = mkI();
                    if (!(t1 < t2)) { continue; }
                    const box = getIntervalBox(ps, [t1, t2]);
                    const boxDd = getIntervalBoxDd(ps, [[0, t1], [0, t2]]);
                    for (let j=0; j<=8; j++) {
                        const t = t1 + (t2 - t1)*j/8;
                        if (t < t1 || t > t2) { continue; }
                        checked++;
                        const p = evaluateExact(ps, t);
                        for (let k=0; k<2; k++) {
                            const inside =
                                eCompare(p[k], [box[0][k]]) >= 0 && eCompare(p[k], [box[1][k]]) <= 0;
                            const insideDd =
                                eCompare(p[k], boxDd[0][k]) >= 0 && eCompare(p[k], boxDd[1][k]) <= 0;
                            if (!inside || !insideDd) {
                                throw new Error(`${cname}, ${iname}: the exact point at t = ${t} is not inside the ${!inside ? 'double' : 'double-double'} interval box; ps: ${JSON.stringify(ps)}, t1: ${t1}, t2: ${t2}`);
                            }
                        }
                    }
                }
                expect(checked).toBeGreaterThan(500);
            }
        }
    });
});
