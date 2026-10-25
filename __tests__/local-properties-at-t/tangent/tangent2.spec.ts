import { describe, expect, it } from '@jest/globals';
import { generateCuspAtHalf3 } from '../../../src/create/generate-cusp-at-half-t.js';
import { tangent } from '../../../src/local-properties-at-t/tangent/double/tangent.js';
import { tangent2 } from '../../../src/local-properties-at-t/tangent/double/tangent2.js';
import { normal2 } from '../../../src/local-properties-at-t/normal/double/normal2.js';

// `-0` and `0` are treated as equal
const z = (v: number[]) => v.map(x => x + 0);


describe('tangent2', function() {
    it('should equal `tangent` for non-degenerate curves', function() {
        const ps = [[0,0],[1,2],[3,2],[4,0]];
        for (const t of [0, 0.3, 1]) {
            expect(tangent2(ps, t)).toEqual(tangent(ps, t));
        }
    });

    it('should return the fallback direction at exactly degenerate end points', function() {
        // exact end, cubic
        expect(z(tangent2([[260,650],[260,646],[257,646],[257,646]], 1))).toEqual([-3,0]);
        // exact start, cubic
        expect(z(tangent2([[0,0],[0,0],[1,2],[4,0]], 0))).toEqual([1,2]);
        // second fallback (`P1 === P2 === P3`)
        expect(z(tangent2([[0,0],[5,5],[5,5],[5,5]], 1))).toEqual([5,5]);
        // quadratic end
        expect(z(tangent2([[0,0],[1,1],[1,1]], 1))).toEqual([1,1]);
        // all points coincide
        expect(z(tangent2([[1,1],[1,1],[1,1],[1,1]], 0))).toEqual([0,0]);
        expect(z(tangent2([[1,1],[1,1],[1,1],[1,1]], 1))).toEqual([0,0]);
        expect(z(tangent2([[1,1],[1,1],[1,1]], 0.5))).toEqual([0,0]);
    });

    it('should keep the real (tiny) tangent of nearly (but not exactly) degenerate curves', function() {
        const ps = [[260,650],[260,646],[257.0000000000291,646],[257,646]];
        const v = tangent2(ps, 1);
        expect(v).toEqual(tangent(ps, 1));
        expect(v[0]).not.toBe(0);
    });

    it('should equal `normal2` rotated back by 90 degrees at interior cusps', function() {
        const pss = [
            [[0,0],[1,0],[0,0]],
            [[0,0],[0,0],[1,0],[-1,0]],
            generateCuspAtHalf3([0,0], [6,2], [3,0])
        ];
        for (const ps of pss) {
            const n = normal2(ps, 0.5);
            const v = tangent2(ps, 0.5);
            expect(z(v)).toEqual(z([n[1], -n[0]]));
            expect(v).not.toEqual([0,0]);
        }
    });
});
