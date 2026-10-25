import { describe, expect, it } from '@jest/globals';
import { generateCuspAtHalf3 } from '../../../src/create/generate-cusp-at-half-t.js';
import { ddNormal } from '../../../src/local-properties-at-t/normal/double-double/dd-normal.js';
import { ddNormal2 } from '../../../src/local-properties-at-t/normal/double-double/dd-normal2.js';
import { normal2 } from '../../../src/local-properties-at-t/normal/double/normal2.js';

// `-0` and `0` are treated as equal
const z = (v: number[][]) => v.map(c => c.map(x => x + 0));


describe('ddNormal2', function() {
    it('should equal `ddNormal` for non-degenerate curves', function() {
        const ps = [[0,0],[1,2],[3,2],[4,0]];
        for (const t of [0, 0.3, 1]) {
            expect(ddNormal2(ps, t)).toEqual(ddNormal(ps, t));
        }
    });

    it('should return the exact rotated fallback direction at exactly degenerate end points', function() {
        // exact end, cubic - tangent direction `[-3,0]`
        expect(z(ddNormal2([[260,650],[260,646],[257,646],[257,646]], 1))).toEqual([[0,0],[0,-3]]);
        // exact start, cubic - tangent direction `[1,2]`
        expect(z(ddNormal2([[0,0],[0,0],[1,2],[4,0]], 0))).toEqual([[0,-2],[0,1]]);
        // second fallback (`P1 === P2 === P3`) - tangent direction `[5,5]`
        expect(z(ddNormal2([[0,0],[5,5],[5,5],[5,5]], 1))).toEqual([[0,-5],[0,5]]);
        // quadratic end - tangent direction `[1,1]`
        expect(z(ddNormal2([[0,0],[1,1],[1,1]], 1))).toEqual([[0,-1],[0,1]]);
        // all points coincide
        expect(z(ddNormal2([[1,1],[1,1],[1,1],[1,1]], 0))).toEqual([[0,0],[0,0]]);
        expect(z(ddNormal2([[1,1],[1,1],[1,1],[1,1]], 1))).toEqual([[0,0],[0,0]]);
        expect(z(ddNormal2([[1,1],[1,1],[1,1]], 0.5))).toEqual([[0,0],[0,0]]);
        // the fallback direction is exact (`0.1 - 1e-20` is not representable
        // as a double)
        expect(z(ddNormal2([[1e-20,0],[0.1,0],[0.1,0],[0.1,0]], 1))).toEqual([[0,0],[-1e-20,0.1]]);
    });

    it('should keep the real (tiny) normal of nearly (but not exactly) degenerate curves', function() {
        const ps = [[260,650],[260,646],[257.0000000000291,646],[257,646]];
        const n = ddNormal2(ps, 1);
        expect(n).toEqual(ddNormal(ps, 1));
        expect(n[1][1]).not.toBe(0);
    });

    it('should equal `normal2` at interior cusps', function() {
        const pss = [
            [[0,0],[1,0],[0,0]],
            [[0,0],[0,0],[1,0],[-1,0]],
            generateCuspAtHalf3([0,0], [6,2], [3,0])
        ];
        let checked = 0;
        for (const ps of pss) {
            if (ddNormal(ps, 0.5)[0][1] !== 0 || ddNormal(ps, 0.5)[1][1] !== 0) {
                continue;  // not an exact cusp in double-double precision
            }
            const n = normal2(ps, 0.5);
            expect(z(ddNormal2(ps, 0.5))).toEqual(z([[0,n[0]],[0,n[1]]]));
            checked++;
        }
        expect(checked).toBeGreaterThanOrEqual(2);
    });
});
