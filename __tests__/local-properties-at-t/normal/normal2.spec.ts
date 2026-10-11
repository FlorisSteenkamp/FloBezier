import { describe, expect, it } from '@jest/globals';
import { generateCuspAtHalf3 } from '../../../src/create/generate-cusp-at-half-t.js';
import { normal } from '../../../src/local-properties-at-t/normal/double/normal.js';
import { normal2 } from '../../../src/local-properties-at-t/normal/double/normal2.js';
import { tangent } from '../../../src/local-properties-at-t/tangent/double/tangent.js';
import { getRandomBezier } from "../../helpers/get-random-bezier.js";

const { abs } = Math;


function degenerate_bezier(ps: number[][], mutation_idx: number) {
    // The mutation index specifies which case of degenerate bezier the curve will be modified to:
    // 0. cuspAtStart (point 0 and 1 equal)
    // 1. cuspAtEnd (point 3 and 2 equal (or 2 and 1 for cubic curves))
    // 2. cuspAtStartExtreme (point 0, 1, and 2 equal)
    // 3. cuspAtEndExtreme (point 3, 2 and 1 equal)
    // 4. selfOverlapping (points 0 and 1 equal, and points 2 and 3 equal)
    // 5. allCoincident (points 0, 1, 2, and 3 equal (or 0, 1 and 2 for cubic))
    switch (mutation_idx) {
        case 0:
            // cuspAtStart, modify point 1 to be equal to point 0
            ps[1] = [...ps[0]];
            break;
        case 1:
            // cuspAtEnd, modify second to last point to be equal to last
            ps[ps.length - 2] = [...ps[ps.length - 1]];
            break;
        case 2:
            // cuspAtStartExtreme, modify points 1 and 2 to be equal to 0
            ps[1] = [...ps[0]];
            ps[2] = [...ps[0]];
            break;
        case 3:
            // cuspAtEndExtreme, modify second to last and last point to be equal to third to last.
            ps[ps.length - 2] = [...ps[ps.length - 3]];
            ps[ps.length - 1] = [...ps[ps.length - 3]];
            break;
        case 4:
            // selfOverlapping, modify point 1 to be equal to 0, and last to be equal to second to last
            ps[1] = [...ps[0]];
            ps[ps.length - 1] = [...ps[ps.length - 2]];
            break;
        case 5:
            // allCoincident, modify all points to be equal
            ps[1] = [...ps[0]];
            ps[2] = [...ps[0]];
            if (ps.length > 3) {
                ps[3] = [...ps[0]];
            }
            break;
    }

    return ps;
}

describe("normal2", function () {
    it(
        "it should accurately calculate the normal of some bezier curves, including degenerate bezier curves, at some `t` values",
        function () {
            for (let i=0; i<10; i++) {
                for (let order = 2; order <= 3; order++) {
                    for (let mutation=0; mutation<5; mutation++) {
                        let ps = getRandomBezier(128, 53)(order as 0 | 1 | 2 | 3)(i);
                        // Make the bezier degenerate
                        ps = degenerate_bezier(ps, mutation);

                        let ts = [0, 0.3, 0.9, 1];

                        for (let t of ts) {
                        let norm2 = normal2(ps, t);
                        let norm = normal(ps, abs(t - 0.0001));

                        // expect(norm2).toBeNearly(2 ** 2, norm);
                        }
                    }
                }
            }

            // a non-degenerate case must agree with `normal`
            {
                const ps = [[0,0],[1,1],[2,1],[3,0]];
                expect(normal2(ps, 0.3)).toEqual(normal(ps, 0.3));
            }

            // Below only the *direction* of the returned normal is checked
            // (its magnitude is not specified)
            const dir = (v: number[]) => {
                const l = Math.hypot(v[0], v[1]);
                return l === 0 ? [0,0] : [v[0]/l, v[1]/l];
            }

            // quadratic that goes 'there and back' - the tangent vanishes 
            // at `t === 0.5` where the curve turns back towards `P0`
            {
                const ps = [[0,0],[1,0],[0,0]];
                expect(normal(ps, 0.5)).toEqual([-0,0]);  // tangent vanishes
                expect(dir(normal2(ps, 0.5))).toBeNearly(2**2, [0,-1]);
            }

            // quadratic whose control polygon folds back (but `P0 !== P2`) -
            // after the cusp (at `t === 0.6`) the curve moves in the -x 
            // direction
            {
                const ps = [[0,0],[3,0],[1,0]];
                expect(normal(ps, 0.6)).toEqual([-0,0]);  // tangent vanishes
                expect(dir(normal2(ps, 0.6))).toBeNearly(2**2, [0,-1]);
            }

            // quadratic with coincident endpoint control points
            {
                expect(dir(normal2([[0,0],[0,0],[2,1]], 0))).toBeNearly(2**2, dir([-1,2]));
                expect(dir(normal2([[0,0],[2,1],[2,1]], 1))).toBeNearly(2**2, dir([-1,2]));
                expect(normal2([[1,1],[1,1],[1,1]], 0.5)).toEqual([-0,0]);
            }

            // cubic with `P0 === P1` *and* an interior cusp at `t === 0.5`
            // (`x(t) = 3t² - 4t³`) - at the cusp the curve leaves in the -x
            // direction (previously the `t === 0` direction was returned)
            {
                const ps = [[0,0],[0,0],[1,0],[-1,0]];
                expect(dir(normal2(ps, 0))).toBeNearly(2**2, [0,1]);
                expect(normal(ps, 0.5)).toEqual([-0,0]);  // tangent vanishes
                expect(dir(normal2(ps, 0.5))).toBeNearly(2**2, [0,-1]);
            }

            // cubics with coincident endpoint control points
            {
                expect(dir(normal2([[0,0],[0,0],[0,0],[1,0]], 0))).toBeNearly(2**2, [0,1]);
                expect(dir(normal2([[0,0],[1,0],[1,0],[1,0]], 1))).toBeNearly(2**2, [0,1]);
                expect(normal2([[1,1],[1,1],[1,1],[1,1]], 0.5)).toEqual([-0,0]);
            }

            // cubic cusp generated at `t === 0.5`
            {
                const ps = generateCuspAtHalf3([0,0], [6,2], [3,0]);
                expect(normal(ps, 0.5)).toBeNearly(2**4, [-0,0]);  // tangent vanishes
                // the tangent just after the cusp gives the direction (to 
                // within the small angle the curve turns through in `2**-20`)
                const tanAfter = tangent(ps, 0.5 + 2**-20);
                const expected = dir([-tanAfter[1], tanAfter[0]]);
                const actual = dir(normal2(ps, 0.5));
                expect(abs(actual[0] - expected[0])).toBeLessThan(1e-5);
                expect(abs(actual[1] - expected[1])).toBeLessThan(1e-5);
            }

            // {
            //   const ps = generateCuspAtHalf3([0, 0], [6, 2], [3, 0]);
            //   const t = 0.5;
            //   let r = normal(ps, t);
            //   // at cusp the normal vanishes
            //   expect(r).toEqual([-0, 0]);
            // }
        },
    );
});
