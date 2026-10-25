import { twoDiff } from 'double-double';
import { ddTangent } from './dd-tangent.js';
import { getDegenerateDirection, pointsCoincide } from '../double/get-degenerate-direction.js';
const td = twoDiff;
/**
 * Returns the tangent vector (in double-double precision not necessarily of
 * unit length) of an order 0,1,2 or 3 bezier curve at a specific given
 * parameter value `t`.
 *
 * * uses double-double precision calculations internally
 * * unlike [[ddTangent]], if the tangent vanishes at `t` (e.g. at a cusp or
 * where control points coincide) a tangent is still returned (based on the
 * direction the curve leaves the point in; or arrives at the point in if
 * `t === 1`); only if all control points coincide is `[0,0]` returned
 * * at `t === 0` and `t === 1` degeneracy is decided by *exact* equality of
 * the end control points and the fallback direction is calculated exactly;
 * at an interior cusp the fallback direction is calculated in double
 * precision only (by splitting the curve at `t`)
 *
 * @param ps a linear, quadratic or cubic bezier, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param t the `t` parameter
 *
 * @doc mdx
 */
function ddTangent2(ps, t) {
    const len = ps.length;
    if (len < 3) {
        return ddTangent(ps, t);
    }
    if (t === 0) {
        if (!pointsCoincide(ps[0], ps[1])) {
            return ddTangent(ps, t);
        }
        // Points 0 and 1 coincide; use the first point that does not
        // coincide with point 0 (if any) for the direction.
        const p0 = ps[0];
        const q = len === 4 && pointsCoincide(p0, ps[2]) ? ps[3] : ps[2];
        return fromTo(p0, q);
    }
    if (t === 1) {
        if (!pointsCoincide(ps[len - 2], ps[len - 1])) {
            return ddTangent(ps, t);
        }
        // The last 2 points coincide; use the last point that does not
        // coincide with the last point (if any) for the direction.
        const p = ps[len - 1];
        const q = len === 4 && pointsCoincide(ps[1], p) ? ps[0] : ps[len - 3];
        return fromTo(q, p);
    }
    const v = ddTangent(ps, t);
    if (v[0][1] !== 0 || v[1][1] !== 0) {
        // Non-degenerate cases
        return v;
    }
    // An interior cusp - the tangent vanishes at `t`
    const [x, y] = getDegenerateDirection(ps, t);
    return [[0, x], [0, y]];
}
/**
 * Returns the exact vector from `p` to `q` as a double-double vector.
 *
 * @internal
 */
function fromTo(p, q) {
    return [
        td(q[0], p[0]),
        td(q[1], p[1])
    ];
}
export { ddTangent2 };
//# sourceMappingURL=dd-tangent2.js.map