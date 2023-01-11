import { len, toLength, translate, fromTo as fromToVec } from "flo-vector2d";
/**
 * For the given bernstein basis cubic bezier curve return a new cubic bezier
 * curve with its initial and terminal speeds modified.
 *
 * * only the 2nd and 3rd control points are modified
 * * call the original curve `A` and the returned curve `B` then it will be
 * true that `A[0] === B[0]` and `A[3] === B[3]`
 *
 * @param ps an order 3 (cubic) bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 */
function setCubicSpeeds(ps, s0, s1) {
    const p0 = ps[0];
    const p1 = ps[1];
    const p2 = ps[2];
    const p3 = ps[3];
    const v = [p3[0] - p0[0], p3[1] - p0[1]]; // vector from 1st to last point
    const L = len(v);
    const v01 = fromToVec(p0, p1);
    const v32 = fromToVec(p3, p2);
    const v01_ = toLength(v01, s0 / 3 * L);
    const p1_ = translate(p0, v01_);
    const v32_ = toLength(v32, s1 / 3 * L);
    const p2_ = translate(p3, v32_);
    return [p0, p1_, p2_, p3]; // keep reference to first and last points
}
export { setCubicSpeeds };
//# sourceMappingURL=set-cubic-speeds.js.map