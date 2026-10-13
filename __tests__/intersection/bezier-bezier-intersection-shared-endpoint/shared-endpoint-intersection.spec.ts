import { describe, expect, it } from '@jest/globals';
import type { RootInterval } from 'flo-poly';
import type { X } from '../../../src/intersection/bezier-bezier-intersection/x.js';
import { bezierBezierIntersection } from '../../../src/intersection/bezier-bezier-intersection/bezier-bezier-intersection.js';
import { bezierBezierIntersectionBoundless } from '../../../src/intersection/bezier-bezier-intersection/bezier-bezier-intersection-boundless.js';
import { bezierBezierIntersectionBoundlessBoth } from '../../../src/intersection/bezier-bezier-intersection/bezier-bezier-intersection-boundless-both.js';
import { reduceOrderIfPossible } from '../../../src/transformation/reduce-order-if-possible.js';
// frozen copies of the general algorithm (without the special handling of
// shared endpoints)
import { bezierBezierIntersection as generalBezierBezierIntersection } from '../../helpers/intersection/general/bezier-bezier-intersection.js';
import { bezierBezierIntersectionBoundless as generalBoundless } from '../../helpers/intersection/general/bezier-bezier-intersection-boundless.js';
import { bezierBezierIntersectionBoundlessBoth as generalBoundlessBoth } from '../../helpers/intersection/general/bezier-bezier-intersection-boundless-both.js';


const overlaps = (a: { tS: number, tE: number }, b: { tS: number, tE: number }) =>
    a.tS <= b.tE && b.tS <= a.tE;

/**
 * Returns `true` if the two sets of intersections represent the same
 * intersections (i.e. their root intervals overlap pairwise).
 */
function sameXs(xs: X[], ys: X[]) {
    const matches = (x: X, y: X) => overlaps(x.ri1, y.ri1) && overlaps(x.ri2, y.ri2);
    return xs.every(x => ys.some(y => matches(x, y))) &&
           ys.every(y => xs.some(x => matches(x, y)));
}

/**
 * Returns `true` if the two sets of root intervals represent the same roots
 * (i.e. their root intervals overlap pairwise).
 */
function sameRoots(rs: RootInterval[] | undefined, ss: RootInterval[] | undefined) {
    if (rs === undefined || ss === undefined) { return rs === ss; }
    return rs.every(r => ss.some(s => overlaps(r, s))) &&
           ss.every(s => rs.some(r => overlaps(r, s)));
}


type Kind = 'shared' | 'tangent' | 'tangent opposite' | 'zero velocity' | 'both ends shared';
const kinds: Kind[] = ['shared', 'tangent', 'tangent opposite', 'zero velocity', 'both ends shared'];

let s = 1357;
const rnd = () => { s = (s*1103515245 + 12345) % 2147483648; return s/2147483648; };
const ri = () => Math.round(rnd()*200 - 100);
const pt = () => [ri(), ri()];

/** returns a pair of curves (of the given orders) sharing an endpoint */
function mkPair(n1: number, n2: number, kind: Kind): [number[][], number[][]] {
    const A = Array.from({ length: n1 + 1 }, pt);
    const B = Array.from({ length: n2 + 1 }, pt);
    B[0] = A[0].slice();
    if (kind === 'tangent' || kind === 'tangent opposite') {
        const k = (kind === 'tangent' ? 1 : -1)*(1 + (ri() & 1));
        B[1] = [A[0][0] + k*(A[1][0] - A[0][0]), A[0][1] + k*(A[1][1] - A[0][1])];
    }
    if (kind === 'zero velocity' && n2 > 1) { B[1] = A[0].slice(); }
    if (kind === 'both ends shared') { B[n2] = A[n1].slice(); }
    // move the shared point to one of the 4 endpoint combinations
    const r = ri() & 3;
    return [r & 1 ? A.reverse() : A, r & 2 ? B.reverse() : B];
}


describe('bezier-bezier intersection of curves sharing an endpoint', function() {
    it('should return the same intersections as the general algorithm (with the shared point exact)',
    function() {
        for (const kind of kinds) {
            for (const n1 of [1,2,3]) {
                for (const n2 of [1,2,3]) {
                    for (let i=0; i<20; i++) {
                        const [A, B] = mkPair(n1, n2, kind);
                        const xs = generalBezierBezierIntersection(A, B);
                        const ys = bezierBezierIntersection(A, B);
                        if (!sameXs(xs, ys)) {
                            throw new Error(`${kind}, orders ${n1}-${n2}: different intersections; A: ${JSON.stringify(A)}, B: ${JSON.stringify(B)}`);
                        }
                        // ordered by `t1`
                        for (let j=1; j<ys.length; j++) {
                            expect(ys[j].t1).toBeGreaterThanOrEqual(ys[j-1].t1);
                        }
                        // the shared point is returned exactly (unless there
                        // are an infinite number of intersections)
                        if (!xs.some(x => x.kind === 5)) {
                            const shared = ys.filter(y => y.kind === 4);
                            expect(shared.length).toBeGreaterThanOrEqual(1);
                            for (const x of shared) {
                                expect([0,1]).toContain(x.t1);
                                expect([0,1]).toContain(x.t2);
                                expect(x.ri1.tS).toEqual(x.ri1.tE);
                                expect(x.ri2.tS).toEqual(x.ri2.tE);
                                expect(x.box[0]).toEqual(x.box[1]);
                                expect(x.p).toEqual(x.box[0]);
                            }
                        }
                    }
                }
            }
        }
    });

    it('should return the same root intervals as the general boundless algorithms', function() {
        for (const kind of kinds) {
            for (const n1 of [1,2,3]) {
                for (const n2 of [1,2,3]) {
                    for (let i=0; i<10; i++) {
                        const [A, B] = mkPair(n1, n2, kind).map(reduceOrderIfPossible);
                        if (A.length === 1 || B.length === 1) { continue; }
                        if (!sameRoots(generalBoundless(A, B), bezierBezierIntersectionBoundless(A, B))) {
                            throw new Error(`boundless, ${kind}, orders ${n1}-${n2}: different roots; A: ${JSON.stringify(A)}, B: ${JSON.stringify(B)}`);
                        }
                        if (!sameRoots(generalBoundlessBoth(A, B), bezierBezierIntersectionBoundlessBoth(A, B))) {
                            throw new Error(`boundless both, ${kind}, orders ${n1}-${n2}: different roots; A: ${JSON.stringify(A)}, B: ${JSON.stringify(B)}`);
                        }
                    }
                }
            }
        }
    });

    it('should return results identical to the general algorithm for curves not sharing an endpoint', function() {
        for (const n1 of [1,2,3]) {
            for (const n2 of [1,2,3]) {
                for (let i=0; i<10; i++) {
                    const A = Array.from({ length: n1 + 1 }, pt);
                    const B = Array.from({ length: n2 + 1 }, pt);
                    expect(bezierBezierIntersection(A, B)).toEqual(generalBezierBezierIntersection(A, B));
                    const [A_, B_] = [A, B].map(reduceOrderIfPossible);
                    if (A_.length === 1 || B_.length === 1) { continue; }
                    expect(bezierBezierIntersectionBoundless(A_, B_)).toEqual(generalBoundless(A_, B_));
                    expect(bezierBezierIntersectionBoundlessBoth(A_, B_)).toEqual(generalBoundlessBoth(A_, B_));
                }
            }
        }
    });

    it('should handle some special cases', function() {
        // collinear lines that are tangent (i.e. overlap) at the shared point
        // (an infinite number of intersections)
        {
            const A = [[-88,-18],[74,-25]];
            const B = [[74,-25],[-88,-18]];
            expect(bezierBezierIntersection(A, B)).toEqual(generalBezierBezierIntersection(A, B));
        }
        // a (degenerate, collinear) quadratic passing through the shared point
        // a 2nd time (at `t = 14/15`), i.e. where the other curve's parameter
        // value is that of the shared point
        {
            const A = [[45,-37],[73,75],[41,-53]];
            const B = [[-62,7],[45,-37],[45,-37]];
            const xs = bezierBezierIntersection(A, B);
            expect(sameXs(xs, generalBezierBezierIntersection(A, B))).toBe(true);
            expect(xs.some(x => x.kind === 1 && x.t2 === 1 && Math.abs(x.t1 - 14/15) < 1e-14)).toBe(true);
        }
        // cubics tangent at the shared point (a smooth join)
        {
            const A = [[0,0],[1,2],[3,3],[4,0]];
            const B = [[4,0],[5,-3],[7,1],[6,4]];
            const xs = bezierBezierIntersection(A, B);
            expect(sameXs(xs, generalBezierBezierIntersection(A, B))).toBe(true);
            expect(xs).toContainEqual({
                p: [4,0], kind: 4, box: [[4,0],[4,0]],
                t1: 1, ri1: { t: 1, tS: 1, tE: 1, multiplicity: 2 },
                t2: 0, ri2: { t: 0, tS: 0, tE: 0, multiplicity: 2 }
            });
        }
    });
});
