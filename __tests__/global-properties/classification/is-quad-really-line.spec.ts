import { describe, expect, it } from '@jest/globals';
import { eDiff, eSign, twoSum } from 'big-float-ts';
import { getRandomQuad } from '../../helpers/get-random-bezier.js';
import { isQuadReallyLine } from '../../../src/global-properties/classification/is-quad-really-line.js';

// count the calls to the exact (slow) path of `isQuadReallyLine` (the global
// `jest` and the `mock` prefix are required for the mock to be hoisted)
const mockCounter = { eDiffCalls: 0 };
jest.mock('big-float-ts', () => {
    const actual: any = jest.requireActual('big-float-ts');
    return { ...actual, eDiff: (a: number[], b: number[]) => { mockCounter.eDiffCalls++; return actual.eDiff(a, b); } };
});


describe('isQuadReallyLine', function() {
    it('it should check correctly if a quadratic bezier is really a line in disguise',
    function() {
        for (let i=0; i<100; i++) {
            const ps = getRandomQuad(i);
            expect(isQuadReallyLine(ps)).toEqual(false);
        }

        {
            const ps = [[0,0],[1,1],[2,2]];
            expect(isQuadReallyLine(ps)).toEqual(true);
        }

        {
            const ps = [[0,0],[1,1],[3,3]];
            expect(isQuadReallyLine(ps)).toEqual(false);
        }

        {
            const ps = [[0,0],[1,1],[2,2.000000000000001]];
            expect(isQuadReallyLine(ps)).toEqual(false);
        }
    });

    it('it should agree with exact arithmetic and resolve non-lines with the fast filter',
    function() {
        let s = 28;
        const rnd = () => { s = (s*1103515245 + 12345) % 2147483648; return s/2147483648; };
        const r = (a: number, b: number) => a + (b - a)*rnd();
        const pt = () => [r(-100, 100), r(-100, 100)];
        const exact = (ps: number[][]) => {
            const [[x0,y0],[x1,y1],[x2,y2]] = ps;
            return eSign(eDiff(twoSum(x0, x2), [2*x1])) === 0 && 
                   eSign(eDiff(twoSum(y0, y2), [2*y1])) === 0;
        };
        const mid = (a: number[], b: number[]) => [(a[0] + b[0])/2, (a[1] + b[1])/2];

        const lines: (() => number[][])[] = [
            () => { const a = pt(), b = pt(); return [a, mid(a,b), b]; },
            () => { const a = [Math.round(r(-99,99)), 3], b = [Math.round(r(-99,99))+2, 5]; return [a, mid(a,b), b]; }
        ];
        const nonLines: (() => number[][])[] = [
            () => [pt(), pt(), pt()],
            // the middle control point 1 ulp off the midpoint
            () => { const a = pt(), b = pt(), m = mid(a,b); return [a, [m[0]*(1 + 2**-52), m[1]], b]; },
            // collinear but not a line in disguise (the 't' parametrization differs)
            () => { const a = pt(), b = pt(), t = r(0.1, 0.4); return [a, [a[0] + (b[0] - a[0])*t, a[1] + (b[1] - a[1])*t], b]; },
            // x-coordinates match a line, y-coordinates don't
            () => [[2, r(-9,9)], [4, r(-9,9)], [6, r(-9,9)]]
        ];

        for (const mk of lines) {
            for (let i=0; i<200; i++) {
                const ps = mk();
                const e = exact(ps);
                mockCounter.eDiffCalls = 0;
                expect(isQuadReallyLine(ps)).toEqual(e);
                // (sanity check that the mock works) the exact path is needed
                expect(mockCounter.eDiffCalls).toBeGreaterThan(0);
            }
        }

        for (const mk of nonLines) {
            for (let i=0; i<200; i++) {
                const ps = mk();
                expect(exact(ps)).toEqual(false);
                mockCounter.eDiffCalls = 0;
                expect(isQuadReallyLine(ps)).toEqual(false);
                // the fast filter should resolve all of these (previously the
                // error bound wasn't multiplied by `u` so that the fast filter
                // never passed)
                expect(mockCounter.eDiffCalls).toEqual(0);
            }
        }
    });
});
