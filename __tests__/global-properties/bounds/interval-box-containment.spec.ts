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


describe('interval boxes at a single t value', function() {
    it('should contain the (exact) point on the bezier curve at the given t value',
    function() {
        // a case where the old (too small) error counter for lines (`2` instead
        // of `3`) caused the exact point to lie outside the box
        {
            const ps = [[-912.958703372562,37.48675391669437],[1539.897321795571,-933.9854908544563]];
            const t = 0.3426260638495196;
            const box = getIntervalBox(ps, [t, t]);
            const p = evaluateExact(ps, t);
            for (let k=0; k<2; k++) {
                expect(eCompare(p[k], [box[0][k]])).toBeGreaterThanOrEqual(0);
                expect(eCompare(p[k], [box[1][k]])).toBeLessThanOrEqual(0);
            }
        }

        let s = 26;
        const rnd = () => { s = (s*1103515245 + 12345) % 2147483648; return s/2147483648; };
        const r = (a: number, b: number) => a + (b - a)*rnd();
        const pt = (k = 100) => [r(-k, k), r(-k, k)];
        const curveClasses: [string, (n: number) => number[][]][] = [
            ['random', n => Array.from({ length: n }, () => pt())],
            ['all negative', n => Array.from({ length: n }, () => [r(-100,-1), r(-100,-1)])],
            ['large offset', n => { const o = pt(1e6); return Array.from({ length: n }, () => { const p = pt(1); return [p[0]+o[0], p[1]+o[1]]; }); }],
            ['grid', n => Array.from({ length: n }, () => [round(r(-128,128)*256)/256, round(r(-128,128)*256)/256])],
            ['tiny', n => Array.from({ length: n }, () => pt(1e-3))],
        ];

        for (const n of [2,3,4]) {
            for (const [cname, mk] of curveClasses) {
                for (let i=0; i<300; i++) {
                    const ps = mk(n);
                    const t = rnd();
                    const box = getIntervalBox(ps, [t, t]);
                    const boxDd = getIntervalBoxDd(ps, [[0, t], [0, t]]);
                    const p = evaluateExact(ps, t);
                    for (let k=0; k<2; k++) {
                        const inside =
                            eCompare(p[k], [box[0][k]]) >= 0 && eCompare(p[k], [box[1][k]]) <= 0;
                        const insideDd =
                            eCompare(p[k], boxDd[0][k]) >= 0 && eCompare(p[k], boxDd[1][k]) <= 0;
                        if (!inside || !insideDd) {
                            throw new Error(`order ${n-1}, ${cname}: the exact point at t = ${t} is not inside the ${!inside ? 'double' : 'double-double'} interval box; ps: ${JSON.stringify(ps)}`);
                        }
                    }
                }
            }
        }
    });
});


/** 
 * the exact control points (as expansions) of the bezier curve `ps` 
 * restricted to `[a,b]` (given as expansions), calculated via blossoming
 */
function exactSub(ps: number[][], a: number[], b: number[]): number[][][] {
    const n = ps.length - 1;
    const res: number[][][] = [];
    for (let i=0; i<=n; i++) {
        let P = ps.map(p => p.map(c => [c]));
        for (const t of [...Array(n - i).fill(a), ...Array(i).fill(b)]) {
            const oMt = eDiff([1], t);
            const Q: number[][][] = [];
            for (let j=0; j<P.length-1; j++) {
                Q.push([0,1].map(k => eAdd(eMult(oMt, P[j][k]), eMult(t, P[j+1][k]))));
            }
            P = Q;
        }
        res.push(P[0]);
    }
    return res;
}


describe('double-double interval boxes', function() {
    it('should contain the exact control points of the bezier curve restricted to the (double-double) interval',
    function() {
        // a case where the error bound of the cubic used `|qx0|` instead of 
        // the magnitude of its terms (that can be much larger due to 
        // cancellation) so that the exact endpoint was not inside the box
        {
            const ps = [[203680.539520112,-57746.04190695355],[-344086.7503643314,332716.0882815506],[262097.59032967733,231750.7227091072],[277808.1161644185,-200791.10591200172]];
            const t1 = [-2.2687387735140954e-17,0.43412649631500244];
            const t2 = [-2.2310843022790357e-17,0.43412649631500244];
            const box = getIntervalBoxDd(ps, [t1, t2]);
            const pE = exactSub(ps, t2, t2)[0];
            for (let k=0; k<2; k++) {
                expect(eCompare(pE[k], box[0][k])).toBeGreaterThanOrEqual(0);
                expect(eCompare(pE[k], box[1][k])).toBeLessThanOrEqual(0);
            }
        }

        let s = 290;
        const rnd = () => { s = (s*1103515245 + 12345) % 2147483648; return s/2147483648; };
        const r = (a: number, b: number) => a + (b - a)*rnd();
        const pt = (k = 100) => [r(-k, k), r(-k, k)];
        /** a random double-double in `[0,1]` */
        const dd = (t: number) => {
            const lo = t*2**-54*r(-1,1);
            const hi = t + lo;
            return [lo - (hi - t), hi];
        };
        const curveClasses: [string, (n: number) => number[][]][] = [
            ['random', n => Array.from({ length: n }, () => pt())],
            ['all negative', n => Array.from({ length: n }, () => [r(-100,-1), r(-100,-1)])],
            ['large offset', n => { const o = pt(1e6); return Array.from({ length: n }, () => { const p = pt(1); return [p[0]+o[0], p[1]+o[1]]; }); }],
            ['grid', n => Array.from({ length: n }, () => [round(r(-128,128)*256)/256, round(r(-128,128)*256)/256])],
        ];
        const intervals: [string, () => number[][]][] = [
            ['wide', () => { const a = rnd(), b = rnd(); return [dd(min(a,b)), dd(max(a,b))]; }],
            ['tiny (double-double only)', () => { const a = dd(rnd()); return [a, [a[0] + abs(a[1])*2**-60*r(0.1,1), a[1]]]; }],
            ['tS = 0', () => [[0,0], dd(rnd())]],
        ];

        for (const n of [2,3,4]) {
            for (const [cname, mkC] of curveClasses) {
                for (const [iname, mkI] of intervals) {
                    for (let i=0; i<40; i++) {
                        const ps = mkC(n);
                        const [t1, t2] = mkI();
                        if (!(eCompare(t1, t2) < 0)) { continue; }
                        const box = getIntervalBoxDd(ps, [t1, t2]);
                        const cps = exactSub(ps, t1, t2);
                        for (let k=0; k<2; k++) {
                            let scale = 0;
                            for (const p of cps) {
                                if (eCompare(p[k], box[0][k]) < 0 || eCompare(p[k], box[1][k]) > 0) {
                                    throw new Error(`order ${n-1}, ${cname}, ${iname}: an exact control point is not inside the double-double interval box; ps: ${JSON.stringify(ps)}, t1: ${JSON.stringify(t1)}, t2: ${JSON.stringify(t2)}`);
                                }
                                scale = max(scale, abs(eEstimate(p[k])), ...ps.map(p => abs(p[k])));
                            }
                            // the box should be tight, i.e. within a modest 
                            // multiple of `u²` (relative) of the exact control 
                            // points (previously the box of lines was 
                            // scaled with `u` instead of `u²`)
                            const lo = min(...cps.map(p => eEstimate(eDiff(p[k], box[0][k]))));
                            const hi = min(...cps.map(p => eEstimate(eDiff(box[1][k], p[k]))));
                            expect(max(lo, hi)).toBeLessThan(scale*2**-106*2**12);
                        }
                    }
                }
            }
        }
    });
});
