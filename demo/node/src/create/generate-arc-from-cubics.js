import { lengthSquared, rotate, scale, translate, toLength } from "flo-vector2d";
import { bezierBezierIntersection } from "../intersection/bezier-bezier-intersection/bezier-bezier-intersection.js";
import { fromTo } from "../transformation/split/from-to.js";
import { getInterfaceRotation } from "../simultaneous-properties/get-interface-rotation.js";
const { sqrt, atan2, PI: π, sin, cos } = Math;
// the control point offset that best approximates a quarter circle with a cubic
// bezier curve, see: https://spencermortensen.com/articles/bezier-circle/
const c = 0.5519150244935105707435627;
/**
 * Cubic bezier curves that are an approximation of the unit circle starting
 * from the x-axis (each curve approximates a quarter circle).
 *
 * @doc mdx
 */
const circle = [
    [[1, 0], [1, c], [c, 1], [0, 1]],
    [[0, 1], [-c, 1], [-1, c], [-1, 0]],
    [[-1, 0], [-1, -c], [-c, -1], [0, -1]],
    [[0, -1], [c, -1], [1, -c], [1, 0]]
];
/**
 * Returns an arc approximation using unit quarter circle cubic bezier
 * curves. The result is returned as an array of cubic bezier curves.
 *
 * * if the last returned arc is approximately smaller than 2**-40 of a quarter
 * circle it is not added to the returned value
 * * if the last returned arc is approximately (1 - 2**-40) of a quarter
 * circle a full quarter circle is added to the returned value
 *
 * @param c arc circle center
 * @param p1 arc goes from this point
 * @param p2 to a point on a line from c to this point (since the problem is over-specified)
 * (if `p1` and `p2` lies on a line through c a full circle is generated using
 * 4 cubic bezier curves)
 *
 * @doc mdx
 */
function generateArcFromCubics(c, p1, p2) {
    const c0 = c[0];
    const c1 = c[1];
    const p10 = p1[0];
    const p11 = p1[1];
    const p20 = p2[0];
    const p21 = p2[1];
    if (p10 === c0 && p11 === c1) {
        return [];
    }
    // move to origin
    const p1_ = [p10 - c0, p11 - c1];
    const p2_ = [p20 - c0, p21 - c1];
    const θ = (getInterfaceRotation(p1_, p2_) + 2 * π) % (2 * π);
    const φ = atan2(p1_[1], p1_[0]);
    const sinφ = sin(φ);
    const cosφ = cos(φ);
    const rad = sqrt(lengthSquared(p1_));
    const rot = rotate(sinφ, cosφ);
    const trans = translate(c);
    let Φ = 0;
    let i = 0;
    let pss = [];
    while (Φ < θ) {
        Φ += π / 2;
        const ps = circle[i];
        pss.push(ps);
        i++;
    }
    const ps_ = pss[pss.length - 1];
    const ray = toLength(rotate(-sinφ, cosφ, p2_), 2);
    const r = bezierBezierIntersection([[0, 0], ray], ps_);
    if (r.length === 0) { // just missed
        const _pss = pss.map(ps => ps.map(p => trans(rot(scale(p, rad)))));
        _pss[0][0][0] = p1[0];
        _pss[0][0][1] = p1[1];
        return _pss;
    }
    let t = r[0].t2;
    if (t < 2 ** -40) { // last piece is too small
        pss.pop();
        if (pss.length === 0) {
            return [];
        }
        const _pss = pss.map(ps => ps.map(p => trans(rot(scale(p, rad)))));
        _pss[0][0][0] = p1[0];
        _pss[0][0][1] = p1[1];
        return _pss;
    }
    if (t > 1 - 2 ** -40) {
        t = 1;
    }
    const _ps_ = fromTo(ps_, 0, t);
    pss.pop();
    pss.push(_ps_);
    const _pss = pss.map(ps => ps.map(p => trans(rot(scale(p, rad)))));
    _pss[0][0][0] = p1[0];
    _pss[0][0][1] = p1[1];
    return _pss;
}
export { generateArcFromCubics };
//# sourceMappingURL=generate-arc-from-cubics.js.map