import { fromTo as fromToVec, dot } from 'flo-vector2d';
/**
 * Returns `true` if the given cubic bezier is obtuse, `false` otherwise (i.e.
 * `false` if acute).
 *
 * Obtuse here is defined as follows: let the cubic form triangles through its
 * control points P0, P1, P3 where P0 and P3 are the endpoints. If both interior
 * angles ∠P0 and ∠P2 are <= 90 degrees then the cubic is considered acute,
 * otherwise it is considered obtuse. The same should be true for P0, P2, P3.
 */
function isCubicObtuse(ps) {
    const v0 = fromToVec(ps[0], ps[1]);
    const v1 = fromToVec(ps[1], ps[3]);
    const v2 = fromToVec(ps[3], ps[0]);
    const v3 = fromToVec(ps[0], ps[2]);
    const v4 = fromToVec(ps[2], ps[3]);
    return (dot(v2, v0) > 0 ||
        dot(v1, v2) > 0 ||
        dot(v2, v3) > 0 ||
        dot(v4, v2) > 0);
}
export { isCubicObtuse };
//# sourceMappingURL=is-cubic-obtuse.js.map