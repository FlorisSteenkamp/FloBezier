import { describe, expect, it } from '@jest/globals';
import { tFromXY, combineRoots } from '../../src/local-properties-to-t/t-from-xy.js';

// capture the `getPExact` callbacks passed to `roots` so that they can be
// called more than once (as `roots` may do) - the global `jest` and the `mock`
// prefix are required for the mock to be hoisted
const mockGetPExacts: (() => number[][])[] = [];
jest.mock('flo-poly', () => {
    const actual: any = jest.requireActual('flo-poly');
    return {
        ...actual,
        roots: (...args: any[]) => {
            if (typeof args[4] === 'function') { mockGetPExacts.push(args[4]); }
            return actual.roots(...args);
        }
    };
});


describe('combineRoots', function() {
    const ri = (tS: number, tE: number, t = (tS + tE)/2, multiplicity = 1) => ({ t, tS, tE, multiplicity });

    it('should return the intersection of overlapping root intervals', function() {
        // previously the union's end (`max(tE)`) was used
        expect(combineRoots(ri(0.1, 0.3), ri(0.2, 0.5))).toEqual(ri(0.2, 0.3, 0.25));
        expect(combineRoots(ri(0.2, 0.5), ri(0.1, 0.3))).toEqual(ri(0.2, 0.3, 0.25));
        // one inside the other
        expect(combineRoots(ri(0.1, 0.5), ri(0.2, 0.3))).toEqual(ri(0.2, 0.3, 0.25));
        // touching
        expect(combineRoots(ri(0.1, 0.2), ri(0.2, 0.3))).toEqual(ri(0.2, 0.2, 0.2));
        // the minimum multiplicity
        expect(combineRoots(ri(0.1, 0.3, 0.2, 2), ri(0.2, 0.5, 0.3, 1))!.multiplicity).toEqual(1);
    });

    it('should return a best estimate `t` inside the intersection', function() {
        // previously `s.t` (here `0.45`) was returned, outside the intersection
        const r = combineRoots(ri(0.1, 0.3), ri(0.2, 0.5, 0.45))!;
        expect(r.t).toBeGreaterThanOrEqual(r.tS);
        expect(r.t).toBeLessThanOrEqual(r.tE);
    });

    it('should return `undefined` for non-overlapping root intervals', function() {
        expect(combineRoots(ri(0.1, 0.2), ri(0.3, 0.5))).toBeUndefined();
        expect(combineRoots(ri(0.3, 0.5), ri(0.1, 0.2))).toBeUndefined();
    });
});


describe('tFromXY', function() {
    it('should return the same exact polynomials on repeated calls of `getPExact` (as `roots` may do)',
    function() {
        // points exactly on the curves (at `t = 1/4`)
        const cases = [
            { ps: [[0,0],[3,4],[8,0]], p: [1.625,1.5] },
            { ps: [[0,0],[3,4],[8,1],[9,9]], p: [2.53125,1.96875] }
        ];
        for (const { ps, p } of cases) {
            mockGetPExacts.length = 0;
            const ris = tFromXY(ps, p);
            expect(ris.some(r => r.tS <= 0.25 && 0.25 <= r.tE)).toBe(true);

            // one callback for each of the `x` and `y` coordinates
            expect(mockGetPExacts.length).toEqual(2);
            for (const getPExact of mockGetPExacts) {
                const first = getPExact();
                // previously the quadratic version popped the cached exact
                // coefficients in place so that each call lost a coefficient
                expect(getPExact()).toEqual(first);
                expect(getPExact()).toEqual(first);
                expect(first.length).toEqual(ps.length);
            }
        }
    });
});
