"use strict";
exports.__esModule = true;
exports.getCoeffsLinearErrorCounters = exports.getCoeffsQuadraticErrorCounters = exports.getCoeffsCubicErrorCounters = void 0;
var get_xy_error_counters_js_1 = require("../../to-power-basis/get-xy/get-xy-error-counters.js");
var abs = Math.abs;
/**
 * * **precondition** TODO - underflow/overflow conditions
 *
 * @param circle a circle
 * @param ps a cubic bezier curve
 *
 * ```
 * // (1 x γ) the error counters for double precision!
 * // (6 x γγ) the error counters for double-double precision!
 * return [
 *      t6_,  // <8>
 *      t5_,  // <8>
 *      t4_,  // <9>
 *      t3_,  // <9>
 *      t2_,  // <8>
 *      t1_,  // <5>
 *      t0_   // <5>
 * ];
 * ```
 *
 * @internal
 */
function getCoeffsCubicErrorCounters(circle, ps) {
    var r = circle.radius, _a = circle.center, cx = _a[0], cy = _a[1];
    var _b = (0, get_xy_error_counters_js_1.getXY3ErrorCounters)(ps), _c = _b[0], a3_ = _c[0], a2_ = _c[1], a1_ = _c[2], // <3>a3_, <3>a2_, <2>a1_, <0>a0_  (a0_ is just abs(a0))
    _d = _b[1] // <3>b3_, <3>b2_, <2>b1_, <0>b0_  (b0_ is just abs(b0))
    , b3_ = _d[0], b2_ = _d[1], b1_ = _d[2];
    var p0 = ps[0];
    var a0_ = abs(p0[0]);
    var b0_ = abs(p0[1]);
    var cx_ = abs(cx);
    var cy_ = abs(cy);
    // a3*a3 + b3*b3
    // <8> <-- <8>(<7>(<3>a3*<3>a3) + <7>(<3>b3*<3>b3))
    var t6_ = a3_ * a3_ + b3_ * b3_;
    // 2*a2*a3 + 2*b2*b3
    // <8> <-- 2*a2*a3 + 2*b2*b3
    var t5_ = 2 * (a2_ * a3_ + b2_ * b3_);
    // (2*a1*a3 + 2*b1*b3) + (a2*a2 + b2*b2)
    // <9> <-- <9>(<7>(2*(<6>a1*a3 + <6>b1*b3)) + <8>(<7>a2*a2 + <7>b2*b2))
    var t4_ = 2 * (a1_ * a3_ + b1_ * b3_) + (a2_ * a2_ + b2_ * b2_);
    // ((2*a0*a3 + 2*a1*a2) + (2*b0*b3 + 2*b1*b2)) + (-2*a3*cx + -2*b3*cy)
    // 2*(((a0*a3 + a1*a2) + (b0*b3 + b1*b2)) + (a3*cx + b3*cy))
    // <9> <-- 2*<9>(<8>(<7>(<4>a0*a3 + <6>a1*a2) + <7>(<4>b0*b3 + <6>b1*b2)) + <5>(<4>(a3*cx) + <4>(b3*cy)))
    var t3_ = 2 * (((a0_ * a3_ + a1_ * a2_) + (b0_ * b3_ + b1_ * b2_)) + (a3_ * cx_ + b3_ * cy_));
    // ((2*a0*a2 + 2*b0*b2) + (a1*a1 + b1*b1)) + (-2*a2*cx + -2*b2*cy)
    // (2*(a0*a2 + b0*b2) + (a1*a1 + b1*b1)) + -2*(a2*cx + b2*cy)
    // <8> <-- <8>(<7>(2*<5>(<4>(a0*a2) + <4>(b0*b2)) + <6>(<5>(a1*a1) + <5>(b1*b1))) + <5>(-2*(<4>(a2*cx) + <4>(b2*cy))))
    var t2_ = (2 * (a0_ * a2_ + b0_ * b2_) + (a1_ * a1_ + b1_ * b1_)) + 2 * (a2_ * cx_ + b2_ * cy_);
    // (2*a0*a1 + 2*b0*b1) - (2*a1*cx + 2*b1*cy)
    // 2*(a0*a1 + b0*b1) - 2*(a1*cx + b1*cy);
    // <5> <-- <5>(<4>(2*(<3>(a0*a1) + <3>b0*b1)) - <4>(2*(<3>(a1*cx) + <3>(b1*cy))));
    var t1_ = 2 * ((a0_ * a1_ + b0_ * b1_) + (a1_ * cx_ + b1_ * cy_));
    // - 2*(a0*cx + b0*cy) + (((a0**2 + b0**2) + (cx**2 + cy**2)) - r**2)
    // <5> <--  <5>(<2>(-2*(<1>(a0*cx) + <1>(b0*cy))) + <4>(<3>(<2>(<1>(a0**2) + <1>(b0**2)) + <2>(<1>(cx**2) + <1>(cy**2))) - <1>(r**2)));
    var t0_ = 2 * (a0_ * cx_ + b0_ * cy_) + (((a0_ * a0_ + b0_ * b0_) + (cx_ * cx_ + cy_ * cy_)) + r * r);
    return [
        t6_,
        t5_,
        t4_,
        t3_,
        t2_,
        t1_,
        t0_ // <5>
    ];
}
exports.getCoeffsCubicErrorCounters = getCoeffsCubicErrorCounters;
/**
 * * **precondition** TODO - underflow/overflow conditions
 *
 * @param circle a circle
 * @param ps a quadratic bezier curve
 *
 * @internal
 *
 * ```
 * return [
 *      t4_,  // <6>
 *      t3_,  // <5>
 *      t2_,  // <6>
 *      t1_,  // <4>
 *      t0_   // <4>
 * ];
 * ```
 */
function getCoeffsQuadraticErrorCounters(circle, ps) {
    var r = circle.radius, _a = circle.center, cx = _a[0], cy = _a[1];
    var _b = (0, get_xy_error_counters_js_1.getXY2ErrorCounters)(ps), _c = _b[0], a2_ = _c[0], a1_ = _c[1], // <2>a2_, <1>a1_, <0>a0_  (a0_ is just abs(a0))
    _d = _b[1] // <2>b2_, <1>b1_, <0>b0_  (b0_ is just abs(b0))
    , b2_ = _d[0], b1_ = _d[1];
    var p0 = ps[0];
    var a0_ = abs(p0[0]);
    var b0_ = abs(p0[1]);
    var cx_ = abs(cx);
    var cy_ = abs(cy);
    // <6> <-- <6>(<5>(a2*a2) + <5>(b2*b2))
    var t4_ = a2_ * a2_ + b2_ * b2_;
    // 2*a1*a2 + 2*b1*b2
    // <5> <-- <5>(2*(<4>(a1*a2) + <4>(b1*b2)))
    var t3_ = 2 * (a1_ * a2_ + b1_ * b2_);
    // <6> <-- <6>(<5>(2*<4>(<3<(a0*a2) + <3<(b0*b2)) + <4>(<3<(a1*a1) + <3<(b1*b1))) + -2*<4>(<3>(a2*cx) + <3>(b2*cy)))
    var t2_ = (2 * (a0_ * a2_ + b0_ * b2_) + (a1_ * a1_ + b1_ * b1_)) + 2 * (a2_ * cx_ + b2_ * cy_);
    // <4> <-- <4>(2*(<3>(<2>(a0*a1) + <2>(b0*b1))) + -2*<3>(<2>(a1*cx) + <2>(b1*cy)))
    var t1_ = 2 * ((a0_ * a1_ + b0_ * b1_) + (a1_ * cx_ + b1_ * cy_));
    // (a0*a0 + b0*b0) + (-2*a0*cx + -2*b0*cy) + (cx*cx + cy*cy) - r*r
    // <4> <-- <4>(<3>(<2>(<1>(a0*a0) + <1>(b0*b0)) + <2>(-2*(<1>(a0*cx) + <1>(b0*cy)))) + <3>(<2>(<1>(cx*cx) + <1>(cy*cy)) - <1>(r*r)))
    var t0_ = ((a0_ * a0_ + b0_ * b0_) + 2 * (a0_ * cx_ + b0_ * cy_)) + ((cx_ * cx_ + cy_ * cy_) + r * r);
    return [t4_, t3_, t2_, t1_, t0_];
}
exports.getCoeffsQuadraticErrorCounters = getCoeffsQuadraticErrorCounters;
/**
 * * **precondition** TODO - underflow/overflow conditions
 *
 * @param circle a circle
 * @param ps a linear bezier curve
 *
 * @internal
 *
 * ```
 * return [
 *      t2_,  // <4>
 *      t1_,  // <4>
 *      t0_   // <4>
 * ];
 * ```
 */
function getCoeffsLinearErrorCounters(circle, ps) {
    var r = circle.radius, _a = circle.center, cx = _a[0], cy = _a[1];
    var _b = (0, get_xy_error_counters_js_1.getXY1ErrorCounters)(ps), a1_ = _b[0][0], b1_ = _b[1][0];
    var p0 = ps[0];
    var a0_ = abs(p0[0]);
    var b0_ = abs(p0[1]);
    var cx_ = abs(cx);
    var cy_ = abs(cy);
    // <4> <-- <4>(<3>(a1*a1) + <3>(b1*b1))
    var t2_ = a1_ * a1_ + b1_ * b1_;
    // <4> <-- <4>(2*(<3>(<2>(a0*a1) + <2>(b0*b1)) - <3>(<2>(a1*cx) + <2>(b1*cy))))
    var t1_ = 2 * ((a0_ * a1_ + b0_ * b1_) + (a1_ * cx_ + b1_ * cy_));
    // <4> <-- <4>(<3>(-2*<2>(<1>(a0*cx) + <1>(b0*cy)) + <2>(a0*a0 + b0*b0)) + <3>(<2>(cx*cx + cy*cy) - <1>(r*r)))
    var t0_ = (2 * (a0_ * cx_ + b0_ * cy_) + (a0_ * a0_ + b0_ * b0_)) + ((cx_ * cx_ + cy_ * cy_) + r * r);
    return [t2_, t1_, t0_];
}
exports.getCoeffsLinearErrorCounters = getCoeffsLinearErrorCounters;
