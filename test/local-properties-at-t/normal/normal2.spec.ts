import { assert, expect, use } from "chai";
import { describe } from "mocha";
import {
  generateCuspAtHalf3,
  normal,
  normal2,
  tangent,
} from "../../../src/index.js";
import { nearly } from "../../helpers/chai-extend-nearly.js";
import { getRandomBezier } from "../../helpers/get-random-bezier.js";

use(nearly);

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
                        let norm = normal(ps, Math.abs(t - 0.0001));

                        // @ts-ignore - otherwise TypeScript gives an error on nearly
                        expect(norm2).to.be.nearly(2 ** 2, norm);
                        }
                    }
                }
            }

            // {
            //   const ps = [[0, 0], [3, 0]];
            //   const t = 0.5;
            //   let r = normal(ps, t);
            //   // for lines there should still be a normal defined
            //   expect(r).to.eql([-0, 3]);
            // }

            // {
            //   const ps = generateCuspAtHalf3([0, 0], [6, 2], [3, 0]);
            //   const t = 0.5;
            //   let r = normal(ps, t);
            //   // at cusp the normal vanishes
            //   expect(r).to.eql([-0, 0]);
            // }
        },
    );
});
