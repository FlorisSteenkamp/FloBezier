"use strict";
exports.__esModule = true;
exports.getClosestOnBezier1FromPointErrorCounters = exports.getClosestOnBezier2FromPointErrorCounters = exports.getClosestOnBezier3FromPointErrorCounters = void 0;
var abs = Math.abs;
/**
 * Returns the polynomial whose roots are all the t values on the given bezier
 * curve such that the line from the given point to the point on the bezier
 * evaluated at t is tangent to the bezier at t.
 *
 * @param ps An order 1, 2 or 3 bezier curve given by its control points.
 * @param p
 *
 * @doc
 */
//function getClosestOnBezierFromPointErrorCounters(
//        ps: number[][], p: number[]) {
//
//    if (ps.length === 4) {
//        return getClosestOnBezier3FromPointErrorCounters(ps, p);
//    } else if (ps.length === 3) {
//        return getClosestOnBezier2FromPointErrorCounters(ps, p);
//    } else if (ps.length === 2) {
//        return getClosestOnBezier1FromPointErrorCounters(ps, p);
//    }
//}
/**
 *
 * @param ps
 * @param p
 *
 * ```
 * return [
 *      t5_,  // <9>
 *      t4_,  // <10>
 *      t3_,  // <10>
 *      t2_,  // <10>
 *      t1_,  // <9>
 *      t0_   // <7>
 * ];
 * ```
 */
function getClosestOnBezier3FromPointErrorCounters(ps, p) {
    //const [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = ps;
    //const [xp, yp] = p;
    var p0 = ps[0];
    var p1 = ps[1];
    var p2 = ps[2];
    var p3 = ps[3];
    var x0_ = abs(p0[0]); // <0>  (error counters)
    var y0_ = abs(p0[1]); // <0>
    var x1_ = abs(p1[0]); // <0>
    var y1_ = abs(p1[1]); // <0>
    var x2_ = abs(p2[0]); // <0>
    var y2_ = abs(p2[1]); // <0>
    var x3_ = abs(p3[0]); // <0>
    var y3_ = abs(p3[1]); // <0>
    var xp_ = abs(p[0]); // <0>
    var yp_ = abs(p[1]); // <0>
    // <1>xx0 <-- <1>(x0 - xp);
    var xx0_ = x0_ + xp_;
    // <1>xx1 <-- <1>(x1 - xp);
    var xx1_ = x1_ + xp_;
    // <1>xx2 <-- <1>(x2 - xp);
    var xx2_ = x2_ + xp_;
    // <1>xx3 <-- <1>(x3 - xp);
    var xx3_ = x3_ + xp_;
    // <1>yy0 <-- <1>(y0 - yp);
    var yy0_ = y0_ + yp_;
    // <1>yy1 <-- <1>(y1 - yp);
    var yy1_ = y1_ + yp_;
    // <1>yy2 <-- <1>(y2 - yp);
    var yy2_ = y2_ + yp_;
    // <1>yy3 <-- <1>(y3 - yp);
    var yy3_ = y3_ + yp_;
    // <3>x00 <-- <3>(<1>xx0*<1>xx0);
    var x00_ = xx0_ * xx0_;
    // <4>x01 <-- <4>(6 *<3>(<1>xx0*<1>xx1));
    var x01_ = 6 * xx0_ * xx1_;
    // <4>x02 <-- <4>(6 *<3>(<1>xx0*<1>xx2));
    var x02_ = 6 * xx0_ * xx2_;
    // <3>x03 <-- 2 *<3>(<1>xx0*<1>xx3);
    var x03_ = 2 * xx0_ * xx3_;
    // <4>x11 <-- <4>(9 *<3>(<1>xx1*<1>xx1));
    var x11_ = 9 * xx1_ * xx1_;
    // <4>x12 <-- <4>(18*<3>(<1>xx1*<1>xx2));
    var x12_ = 18 * xx1_ * xx2_;
    // <4>x13 <-- <4>(6 *<3>(<1>xx1*<1>xx3));
    var x13_ = 6 * xx1_ * xx3_;
    // <4>x22 <-- <4>(9 *<3>(<1>xx2*<1>xx2));
    var x22_ = 9 * xx2_ * xx2_;
    // <4>x23 <-- <4>(6 *<3>(<1>xx2*<1>xx3));
    var x23_ = 6 * xx2_ * xx3_;
    // <3>x33 <--    <3>(<1>xx3*<1>xx3);
    var x33_ = xx3_ * xx3_;
    var y00_ = yy0_ * yy0_;
    var y01_ = 6 * yy0_ * yy1_;
    var y02_ = 6 * yy0_ * yy2_;
    var y03_ = 2 * yy0_ * yy3_;
    var y11_ = 9 * yy1_ * yy1_;
    var y12_ = 18 * yy1_ * yy2_;
    var y13_ = 6 * yy1_ * yy3_;
    var y22_ = 9 * yy2_ * yy2_;
    var y23_ = 6 * yy2_ * yy3_;
    var y33_ = yy3_ * yy3_;
    // <5>q1 <-- (5>(<4>x13 + <4>x22);
    var q1_ = x13_ + x22_;
    // <5>q2 <-- (5>(<3>x03 + <4>x12);
    var q2_ = x03_ + x12_;
    // <5>q3 <-- (5>(<4>x02 + <4>x11);
    var q3_ = x02_ + x11_;
    var r1_ = y13_ + y22_; // <5>
    var r2_ = y03_ + y12_; // <5>
    var r3_ = y02_ + y11_; // <5>
    // <9>t5 <-- <9>(6*<8>(<7>(<6>(<5>(<4>(x33 - x23) + <4>(x00 - x01)) + <5>q1) + <6>(q3 - q2)) + 
    //                     <7>(<6>(<5>(<4>(y33 - y23) + <4>(y00 - y01)) + <5>r1) + <6>(r3 - r2))));
    var t5_ = 6 * (((((x33_ + x23_) + (x00_ + x01_)) + q1_) + (q3_ + q2_)) +
        ((((y33_ + y23_) + (y00_ + y01_)) + r1_) + (r3_ + r2_)));
    // <10>t4 <-- <10>(5*<9>(<8>(<7>(<6>(x23 + <5>(5*x01)) + <6>(3*q2)) - 2*<7>(<6>(q1 + 2*q3) + <5>(3*x00))) +
    //                       <8>(<7>(<6>(y23 + <5>(5*y01)) + <6>(3*r2)) - 2*<7>(<6>(r1 + 2*r3) + <5>(3*y00)))));
    var t4_ = 5 * ((((x23_ + 5 * x01_) + 3 * q2_) + 2 * (q1_ + 2 * q3_ + 3 * x00_)) +
        (((y23_ + 5 * y01_) + 3 * r2_) + 2 * (r1_ + 2 * r3_ + 3 * y00_)));
    // <10>t3 <-- 4*<10>(<9>(<8>(q1 - <7>(3*<6>(q2 - 2*q3))) - <7>(5*<6>(2*x01 - <5>(3*x00)))) +
    //                 <9>(<8>(r1 - <7>(3*<6>(r2 - 2*r3))) - <7>(5*<6>(2*y01 - <5>(3*y00)))))
    var t3_ = 4 * (((q1_ + 3 * (q2_ + 2 * q3_)) + 5 * (2 * x01_ + 3 * x00_)) +
        ((r1_ + 3 * (r2_ + 2 * r3_)) + 5 * (2 * y01_ + 3 * y00_)));
    // <10>t2 <-- <10>(3*<9>(<8>(q2 - 2*<7>(2*q3 - <6>(5*<5>(x01 - 2*x00)))) +
    //                       <8>(r2 - 2*<7>(2*r3 - <6>(5*<5>(y01 - 2*y00))))));
    var t2_ = 3 * ((q2_ + 2 * (2 * q3_ + 5 * (x01_ + 2 * x00_))) +
        (r2_ + 2 * (2 * r3_ + 5 * (y01_ + 2 * y00_))));
    // <9>t1 <-- 2*<9>(<8>(q3 - <7>(5*<6>(x01 - <5>(3*x00)))) +
    //                 <8>(r3 - <7>(5*<6>(y01 - <5>(3*y00)))));
    var t1_ = 2 * ((q3_ + 5 * (x01_ + 3 * x00_)) +
        (r3_ + 5 * (y01_ + 3 * y00_)));
    // <7>t0 <-- <7>(<6>(x01 - <5>(6*x00)) +
    //              <6>(y01 - <5>(6*y00)));
    var t0_ = ((x01_ + 6 * x00_) +
        (y01_ + 6 * y00_));
    return [
        t5_,
        t4_,
        t3_,
        t2_,
        t1_,
        t0_ // <7>
    ];
}
exports.getClosestOnBezier3FromPointErrorCounters = getClosestOnBezier3FromPointErrorCounters;
/**
 *
 * @param ps
 * @param p
 * ```
 * return [
 *      t3_,  // <7>
 *      t2_,  // <8>
 *      t1_,  // <7>
 *      t0_   // <5>
 * ];
 * ```
 */
function getClosestOnBezier2FromPointErrorCounters(ps, p) {
    //const [[x0, y0], [x1, y1], [x2, y2]] = ps;
    //const [xp, yp] = p;
    var p0 = ps[0];
    var p1 = ps[1];
    var p2 = ps[2];
    var x0_ = abs(p0[0]); // <0>
    var y0_ = abs(p0[1]); // <0>
    var x1_ = abs(p1[0]); // <0>
    var y1_ = abs(p1[1]); // <0>
    var x2_ = abs(p2[0]); // <0>
    var y2_ = abs(p2[1]); // <0>
    var xp_ = abs(p[0]); // <0>
    var yp_ = abs(p[1]); // <0>
    // <1>xx0 <-- <1>(x0 - xp);
    var xx0_ = x0_ + xp_;
    // <1>xx1 <-- <1>(x1 - xp);
    var xx1_ = x1_ + xp_;
    // <1>xx2 <-- <1>(x2 - xp);
    var xx2_ = x2_ + xp_;
    // <1>yy0 <-- <1>(y0 - yp);
    var yy0_ = y0_ + yp_;
    // <1>yy1 <-- <1>(y1 - yp);
    var yy1_ = y1_ + yp_;
    // <1>yy2 <-- <1>(y2 - yp);
    var yy2_ = y2_ + yp_;
    // <3>x00 <-- <3>(xx0*xx0);
    var x00_ = xx0_ * xx0_;
    // <3>x01 <-- <3>(xx0*xx1);
    var x01_ = xx0_ * xx1_;
    // <3>x02 <-- <3>(xx0*xx2);
    var x02_ = xx0_ * xx2_;
    // <3>x11 <-- <3>(xx1*xx1);
    var x11_ = xx1_ * xx1_;
    // <3>x12 <-- <3>(xx1*xx2);
    var x12_ = xx1_ * xx2_;
    // <3>x22 <-- <3>(xx2*xx2);
    var x22_ = xx2_ * xx2_;
    var y00_ = yy0_ * yy0_;
    var y01_ = yy0_ * yy1_;
    var y02_ = yy0_ * yy2_;
    var y11_ = yy1_ * yy1_;
    var y12_ = yy1_ * yy2_;
    var y22_ = yy2_ * yy2_;
    // <4>q1 <-- <4>(y02 + 2*y11);
    var q1_ = y02_ + 2 * y11_;
    // <4>r1 <-- <4>(x02 + 2*x11);
    var r1_ = x02_ + 2 * x11_;
    // <7>t3 <-- <7>(<6>(<5>(<4>(y22 + y00) + 2*q1) - 4*<4>(y12 + y01))) + 
    //              (<6>(<5>(<4>(x22 + x00) + 2*r1) - 4*<4>(x12 + x01)));
    var t3_ = ((y22_ + y00_) + 2 * q1_ + 4 * (y12_ + y01_)) +
        ((x22_ + x00_) + 2 * r1_ + 4 * (x12_ + x01_));
    // <8>t2 <-- <8>(3*<7>(<6>(<5>(y12 - q1) + <5>(<4>(3*y01) - y00)) + 
    //                     <6>(<5>(x12 - r1) + <5>(<4>(3*x01) - x00))));
    var t2_ = 3 * (((y12_ + q1_) + (3 * y01_ + y00_)) +
        ((x12_ + r1_) + (3 * x01_ + x00_)));
    // <7>t1 <-- <7>(<6>(<4>q1 - <5>(3*<4>(2*y01 - y00))) + 
    //               <6>(<4>r1 - <5>(3*<4>(2*x01 - x00))));
    var t1_ = (q1_ + 3 * (2 * y01_ + y00_)) +
        (r1_ + 3 * (2 * x01_ + x00_));
    // <5>t0 <-- <5>(<4>(y01 - y00) + 
    //              <4>(x01 - x00));
    var t0_ = (y01_ + y00_) +
        (x01_ + x00_);
    return [
        t3_,
        t2_,
        t1_,
        t0_ // <5>
    ];
}
exports.getClosestOnBezier2FromPointErrorCounters = getClosestOnBezier2FromPointErrorCounters;
/**
 *
 * @param ps
 * @param p
 *
 * ```
 * return [
 *     t1,  // <6>
 *     t0   // <5>
 * ];
 * ```
 */
function getClosestOnBezier1FromPointErrorCounters(ps, p) {
    //const [[x0, y0], [x1, y1]] = ps;
    //const [xp, yp] = p;
    var p0 = ps[0];
    var p1 = ps[1];
    var x0_ = abs(p0[0]); // <0>
    var y0_ = abs(p0[1]); // <0>
    var x1_ = abs(p1[0]); // <0>
    var y1_ = abs(p1[1]); // <0>
    var xp_ = abs(p[0]); // <0>
    var yp_ = abs(p[1]); // <0>
    // <1>xx0 <-- <1>(x0 - xp);
    var xx0_ = x0_ + xp_;
    // <1>xx1 <-- <1>(x1 - xp);    
    var xx1_ = x1_ + xp_;
    // <1>yy0 <-- <1>(y0 - yp);    
    var yy0_ = y0_ + yp_;
    // <1>yy1 <-- <1>(y1 - yp);    
    var yy1_ = y1_ + yp_;
    // <3>x00 <-- <3>(xx0*xx0);
    var x00_ = xx0_ * xx0_;
    // <3>x01 <-- <3>(xx0*xx1);
    var x01_ = xx0_ * xx1_;
    // <3>x11 <-- <3>(xx1*xx1);
    var x11_ = xx1_ * xx1_;
    var y00_ = yy0_ * yy0_;
    var y01_ = yy0_ * yy1_;
    var y11_ = yy1_ * yy1_;
    // <4>s1 <-- <4>(x01 + y01);
    var s1_ = x01_ + y01_;
    // <4>s2 <-- <4>(y00 + x00);
    var s2_ = y00_ + x00_;
    // <6>t1 = <6>(<4>(x11 + y11) + <5>(s2 - 2*s1));
    var t1 = x11_ + y11_ + 2 * s1_ + s2_;
    // <5>t0 = <5>(s1 - s2);
    var t0 = s1_ + s2_;
    return [
        t1,
        t0 // <5>
    ];
}
exports.getClosestOnBezier1FromPointErrorCounters = getClosestOnBezier1FromPointErrorCounters;
