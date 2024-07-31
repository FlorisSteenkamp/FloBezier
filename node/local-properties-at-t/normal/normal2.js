import { normal } from "./normal.js";
import { fromTo as fromToVec } from "flo-vector2d";
import { fromTo as fromToBezier } from "../../transformation/split/from-to.js";
/**
 * Returns a normal vector (not necessarily of unit length) of a bezier curve
 * at a specific given parameter value `t` by simply taking the `tangent` at
 * that point and rotating it by 90 degrees.
 *
 * * uses double precision calculations internally
 *
 * @param ps a linear, quadratic or cubic bezier curve given by its ordered
 * control points, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param t the parameter value where the normal should be evaluated
 *
 * @doc mdx
 */
function normal2(ps, t) {
    const n = normal(ps, t);
    if (ps.length < 3 || n[0] !== 0 || n[1] !== 0) {
        // Non-degenerate cases
        return n;
    }
    if (ps.length === 4) {
        // Degenerate cases
        const [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = ps;
        if (x0 === x1 && y0 === y1) {
            // Points 0 and 1 coincide
            if (x1 !== x2 || y1 !== y2) {
                // Point 2 does not coincide
                const v = fromToVec(ps[0], ps[2]);
                return [-v[1], v[0]]; // tangent === [v[0], v[1]]
            }
            // Point 2 also coincides. Now, only return a normal if point 3 does not coincide.
            if (x2 !== x3 || y2 !== y3) {
                // Point 3 does not coincide
                const v = fromToVec(ps[0], ps[3]);
                return [-v[1], v[0]]; // tangent === [v[0], v[1]]
            }
            // All four points coincide. No normal possible.
            return [0, 0];
        }
        if (x2 === x3 && y2 === y3) {
            // Point 3 and 2 coincide
            if (x2 !== x1 || y2 !== y1) {
                // Point 1 does not coincide
                const v = fromToVec(ps[1], ps[3]);
                return [-v[1], v[0]]; // tangent === [v[0], v[1]]
            }
            // Point 1 also coincides. Now, only return a normal if point 0 does not coincide.
            if (x1 !== x0 || y1 !== y0) {
                // Point 0 does not coincide.
                const v = fromToVec(ps[0], ps[3]);
                return [-v[1], v[0]]; // tangent === [v[0], v[1]]
            }
            // Case that all four points coincide is already handled before.
        }
        // An interior cusp is the only remaining cause of the degenerate normal
        // Split curve at the cusp
        const ps_ = fromToBezier(ps, t, 1);
        const v = fromToVec(ps_[0], ps_[2]);
        return [-v[1], v[0]]; // tangent === [v[0], v[1]]
    }
    if (ps.length === 3) {
        const [[x0, y0], [x1, y1], [x2, y2]] = ps;
        if (x0 !== x2 || y0 !== y2) {
            // Points 0 and 1, or points 1 and 2 coincide, but not all three
            const v = fromToVec(ps[0], ps[2]);
            return [-v[1], v[0]]; // tangent === [v[0], v[1]]
        }
    }
    return [0, 0]; // All points coincident - no normal possible
}
export { normal2 };
//# sourceMappingURL=normal2.js.map