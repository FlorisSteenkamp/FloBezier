import { normal } from "./normal.js";
import { fromTo as fromToVec } from "flo-vector2d";
import { fromTo as fromToBezier } from "../../../transformation/split/from-to.js";
/**
 * Returns a normal vector (not necessarily of unit length) of a bezier curve
 * at a specific given parameter value `t` by simply taking the `tangent` at
 * that point and rotating it by 90 degrees.
 *
 * * uses double precision calculations internally
 * * unlike [[normal]], if the tangent vanishes at `t` (e.g. at a cusp or
 * where control points coincide) a normal is still returned (based on the
 * direction the curve leaves the point in; or arrives at the point in if
 * `t === 1`); only if all control points coincide is `[0,0]` returned
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
    // Degenerate cases - the tangent vanishes at `t`
    const v = getDirection(ps, t);
    return [-v[1], v[0]]; // tangent === [v[0], v[1]]
}
/**
 * Returns the direction the given curve leaves the point at `t` in (or arrives
 * in if `t === 1`) given that the tangent vanishes at `t`; returns `[0,0]` if
 * all control points coincide.
 *
 * @internal
 */
function getDirection(ps, t) {
    if (ps.length === 4) {
        const [p0, p1, p2, p3] = ps;
        if (t === 0) {
            // Points 0 and 1 (necessarily) coincide; use the first point that
            // does not coincide with point 0 (if any) for the direction.
            if (!pointsCoincide(p0, p2)) {
                return fromToVec(p0, p2);
            }
            if (!pointsCoincide(p0, p3)) {
                return fromToVec(p0, p3);
            }
            return [0, 0]; // All four points coincide. No normal possible.
        }
        if (t === 1) {
            // Points 2 and 3 (necessarily) coincide; use the last point that
            // does not coincide with point 3 (if any) for the direction.
            if (!pointsCoincide(p1, p3)) {
                return fromToVec(p1, p3);
            }
            if (!pointsCoincide(p0, p3)) {
                return fromToVec(p0, p3);
            }
            return [0, 0]; // All four points coincide. No normal possible.
        }
        // An interior cusp is the only remaining cause of the degenerate
        // normal. Split the curve at the cusp and use the direction from the
        // cusp to the 3rd control point of the right piece (the 2nd control
        // point coincides with the cusp since the tangent vanishes there).
        const ps_ = fromToBezier(ps, t, 1);
        return fromToVec(ps_[0], ps_[2]);
    }
    if (ps.length === 3) {
        const [p0, , p2] = ps;
        if (t === 0 || t === 1) {
            // Points 0 and 1 coincide (if `t === 0`) or points 1 and 2
            // coincide (if `t === 1`) - the direction is from point 0 to
            // point 2 in both cases (and `[0,0]` if all three coincide)
            return fromToVec(p0, p2);
        }
        // An interior cusp is the only remaining cause of the degenerate
        // normal (the control polygon 'folds back' on itself, e.g.
        // `[[0,0],[1,0],[0,0]]`). Split the curve at the cusp and use the
        // direction from the cusp to the last control point of the right
        // piece (its 2nd control point coincides with the cusp).
        const ps_ = fromToBezier(ps, t, 1);
        return fromToVec(ps_[0], ps_[2]);
    }
    return [0, 0];
}
/** @internal */
function pointsCoincide(p, q) {
    return p[0] === q[0] && p[1] === q[1];
}
export { normal2 };
//# sourceMappingURL=normal2.js.map