import { describe, expect, it } from '@jest/globals';
import { generateCuspAtHalf3 } from '../../../src/create/generate-cusp-at-half-t.js';
import { ddTangent } from '../../../src/local-properties-at-t/tangent/double-double/dd-tangent.js';
import { ddTangent2 } from '../../../src/local-properties-at-t/tangent/double-double/dd-tangent2.js';
import { tangent2 } from '../../../src/local-properties-at-t/tangent/double/tangent2.js';

// `-0` and `0` are treated as equal
const z = (v: number[][]) => v.map(c => c.map(x => x + 0));


describe('ddTangent2', function() {
    it('should equal `ddTangent` for non-degenerate curves', function() {
        const ps = [[0,0],[1,2],[3,2],[4,0]];
        for (const t of [0, 0.3, 1]) {
            expect(ddTangent2(ps, t)).toEqual(ddTangent(ps, t));
        }
    });

    it('should return the exact fallback direction at exactly degenerate end points', function() {
        // exact end, cubic
        expect(z(ddTangent2([[260,650],[260,646],[257,646],[257,646]], 1))).toEqual([[0,-3],[0,0]]);
        // exact start, cubic
        expect(z(ddTangent2([[0,0],[0,0],[1,2],[4,0]], 0))).toEqual([[0,1],[0,2]]);
        // second fallback (`P1 === P2 === P3`)
        expect(z(ddTangent2([[0,0],[5,5],[5,5],[5,5]], 1))).toEqual([[0,5],[0,5]]);
        // quadratic end
        expect(z(ddTangent2([[0,0],[1,1],[1,1]], 1))).toEqual([[0,1],[0,1]]);
        // all points coincide
        expect(z(ddTangent2([[1,1],[1,1],[1,1],[1,1]], 0))).toEqual([[0,0],[0,0]]);
        expect(z(ddTangent2([[1,1],[1,1],[1,1],[1,1]], 1))).toEqual([[0,0],[0,0]]);
        expect(z(ddTangent2([[1,1],[1,1],[1,1]], 0.5))).toEqual([[0,0],[0,0]]);
        // the fallback direction is exact (`0.1 - 1e-20` is not representable
        // as a double)
        expect(z(ddTangent2([[1e-20,0],[0.1,0],[0.1,0],[0.1,0]], 1))).toEqual([[-1e-20,0.1],[0,0]]);
    });

    it('should keep the real (tiny) tangent of nearly (but not exactly) degenerate curves', function() {
        const ps = [[260,650],[260,646],[257.0000000000291,646],[257,646]];
        const v = ddTangent2(ps, 1);
        expect(v).toEqual(ddTangent(ps, 1));
        expect(v[0][1]).not.toBe(0);
    });

    it('should equal `tangent2` at interior cusps', function() {
        const pss = [
            [[0,0],[1,0],[0,0]],
            [[0,0],[0,0],[1,0],[-1,0]],
            generateCuspAtHalf3([0,0], [6,2], [3,0])
        ];
        let checked = 0;
        for (const ps of pss) {
            if (ddTangent(ps, 0.5)[0][1] !== 0 || ddTangent(ps, 0.5)[1][1] !== 0) {
                continue;  // not an exact cusp in double-double precision
            }
            const v = tangent2(ps, 0.5);
            expect(z(ddTangent2(ps, 0.5))).toEqual(z([[0,v[0]],[0,v[1]]]));
            checked++;
        }
        expect(checked).toBeGreaterThanOrEqual(2);
    });
});
