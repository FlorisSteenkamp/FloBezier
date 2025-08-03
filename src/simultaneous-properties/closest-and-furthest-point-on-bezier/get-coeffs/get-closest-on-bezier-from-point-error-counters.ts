
const abs = Math.abs;


/**
 * Returns a representation of the error when calculating the polynomial whose
 * roots are all the `t` values on the given bezier curve such that the line
 * from the given point to the point on the bezier evaluated at `t` is tangent
 * to the bezier at `t`.
 * 
 * @param ps a cubic bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 * @param p a point, e.g. `[1,2]`
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
 * 
 * @internal
 */
function getClosestOnBezier3FromPointErrorCounters(ps: number[][], p: number[]) {
    //const [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = ps;
    //const [xp, yp] = p;

    const p0 = ps[0];
    const p1 = ps[1];
    const p2 = ps[2];
    const p3 = ps[3];

    const x0_ = abs(p0[0]);  // <0>  (error counters)
    const y0_ = abs(p0[1]);  // <0>
    const x1_ = abs(p1[0]);  // <0>
    const y1_ = abs(p1[1]);  // <0>
    const x2_ = abs(p2[0]);  // <0>
    const y2_ = abs(p2[1]);  // <0>
    const x3_ = abs(p3[0]);  // <0>
    const y3_ = abs(p3[1]);  // <0>

    const xp_ = abs(p[0]);   // <0>
    const yp_ = abs(p[1]);   // <0>

    // <1>xx0 <-- <1>(x0 - xp);
    const xx0_ = x0_ + xp_;
    // <1>xx1 <-- <1>(x1 - xp);
    const xx1_ = x1_ + xp_;
    // <1>xx2 <-- <1>(x2 - xp);
    const xx2_ = x2_ + xp_;
    // <1>xx3 <-- <1>(x3 - xp);
    const xx3_ = x3_ + xp_;
    // <1>yy0 <-- <1>(y0 - yp);
    const yy0_ = y0_ + yp_;
    // <1>yy1 <-- <1>(y1 - yp);
    const yy1_ = y1_ + yp_;
    // <1>yy2 <-- <1>(y2 - yp);
    const yy2_ = y2_ + yp_;
    // <1>yy3 <-- <1>(y3 - yp);
    const yy3_ = y3_ + yp_;

    // <3>x00 <-- <3>(<1>xx0*<1>xx0);
    const x00_ =    xx0_*xx0_;
    // <4>x01 <-- <4>(6 *<3>(<1>xx0*<1>xx1));
    const x01_ =  6*xx0_*xx1_;
    // <4>x02 <-- <4>(6 *<3>(<1>xx0*<1>xx2));
    const x02_ =  6*xx0_*xx2_;
    // <3>x03 <-- 2 *<3>(<1>xx0*<1>xx3);
    const x03_ =  2*xx0_*xx3_;
    // <4>x11 <-- <4>(9 *<3>(<1>xx1*<1>xx1));
    const x11_ =  9*xx1_*xx1_;
    // <4>x12 <-- <4>(18*<3>(<1>xx1*<1>xx2));
    const x12_ = 18*xx1_*xx2_;
    // <4>x13 <-- <4>(6 *<3>(<1>xx1*<1>xx3));
    const x13_ =  6*xx1_*xx3_;
    // <4>x22 <-- <4>(9 *<3>(<1>xx2*<1>xx2));
    const x22_ =  9*xx2_*xx2_;
    // <4>x23 <-- <4>(6 *<3>(<1>xx2*<1>xx3));
    const x23_ =  6*xx2_*xx3_;
    // <3>x33 <--    <3>(<1>xx3*<1>xx3);
    const x33_ =    xx3_*xx3_;

    const y00_ =    yy0_*yy0_;
    const y01_ = 6 *yy0_*yy1_;
    const y02_ = 6 *yy0_*yy2_;
    const y03_ = 2 *yy0_*yy3_;
    const y11_ = 9 *yy1_*yy1_;
    const y12_ = 18*yy1_*yy2_;
    const y13_ = 6 *yy1_*yy3_;
    const y22_ = 9 *yy2_*yy2_;
    const y23_ = 6 *yy2_*yy3_;
    const y33_ =    yy3_*yy3_;

    // <5>q1 <-- (5>(<4>x13 + <4>x22);
    const q1_ = x13_ + x22_;
    // <5>q2 <-- (5>(<3>x03 + <4>x12);
    const q2_ = x03_ + x12_;
    // <5>q3 <-- (5>(<4>x02 + <4>x11);
    const q3_ = x02_ + x11_;

    const r1_ = y13_ + y22_;  // <5>
    const r2_ = y03_ + y12_;  // <5>
    const r3_ = y02_ + y11_;  // <5>

    // <9>t5 <-- <9>(6*<8>(<7>(<6>(<5>(<4>(x33 - x23) + <4>(x00 - x01)) + <5>q1) + <6>(q3 - q2)) + 
    //                     <7>(<6>(<5>(<4>(y33 - y23) + <4>(y00 - y01)) + <5>r1) + <6>(r3 - r2))));
    const t5_ = 6*(((((x33_ + x23_) + (x00_ + x01_)) + q1_) + (q3_ + q2_)) + 
                   ((((y33_ + y23_) + (y00_ + y01_)) + r1_) + (r3_ + r2_)));

    // <10>t4 <-- <10>(5*<9>(<8>(<7>(<6>(x23 + <5>(5*x01)) + <6>(3*q2)) - 2*<7>(<6>(q1 + 2*q3) + <5>(3*x00))) +
    //                       <8>(<7>(<6>(y23 + <5>(5*y01)) + <6>(3*r2)) - 2*<7>(<6>(r1 + 2*r3) + <5>(3*y00)))));
    const t4_ = 5*((((x23_ + 5*x01_) + 3*q2_) + 2*(q1_ + 2*q3_ + 3*x00_)) +
                   (((y23_ + 5*y01_) + 3*r2_) + 2*(r1_ + 2*r3_ + 3*y00_)));

    
    // <10>t3 <-- 4*<10>(<9>(<8>(q1 - <7>(3*<6>(q2 - 2*q3))) - <7>(5*<6>(2*x01 - <5>(3*x00)))) +
    //                 <9>(<8>(r1 - <7>(3*<6>(r2 - 2*r3))) - <7>(5*<6>(2*y01 - <5>(3*y00)))))
    const t3_ = 4*(((q1_ + 3*(q2_ + 2*q3_)) + 5*(2*x01_ + 3*x00_)) +
                   ((r1_ + 3*(r2_ + 2*r3_)) + 5*(2*y01_ + 3*y00_)));

    // <10>t2 <-- <10>(3*<9>(<8>(q2 - 2*<7>(2*q3 - <6>(5*<5>(x01 - 2*x00)))) +
    //                       <8>(r2 - 2*<7>(2*r3 - <6>(5*<5>(y01 - 2*y00))))));
    const t2_ = 3*((q2_ + 2*(2*q3_ + 5*(x01_ + 2*x00_))) +
                   (r2_ + 2*(2*r3_ + 5*(y01_ + 2*y00_))));

    // <9>t1 <-- 2*<9>(<8>(q3 - <7>(5*<6>(x01 - <5>(3*x00)))) +
    //                 <8>(r3 - <7>(5*<6>(y01 - <5>(3*y00)))));
    const t1_ = 2*((q3_ + 5*(x01_ + 3*x00_)) +
                   (r3_ + 5*(y01_ + 3*y00_)));

    
    // <7>t0 <-- <7>(<6>(x01 - <5>(6*x00)) +
    //              <6>(y01 - <5>(6*y00)));
    const t0_ =   ((x01_ + 6*x00_) +
                   (y01_ + 6*y00_));


    return [
        t5_,  // <9>
        t4_,  // <10>
        t3_,  // <10>
        t2_,  // <10>
        t1_,  // <9>
        t0_   // <7>
    ];
}


/**
 * Returns a representation of the error when calculating the polynomial whose
 * roots are all the `t` values on the given bezier curve such that the line
 * from the given point to the point on the bezier evaluated at `t` is tangent
 * to the bezier at `t`.
 * 
 * @param ps a quadratic bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1]]`
 * @param p a point, e.g. `[1,2]`
 * ```
 * return [
 *      t3_,  // <7>
 *      t2_,  // <8>
 *      t1_,  // <7>
 *      t0_   // <5>
 * ];
 * ```
 * 
 * @internal
 */
function getClosestOnBezier2FromPointErrorCounters(ps: number[][], p: number[]) {
    //const [[x0, y0], [x1, y1], [x2, y2]] = ps;
    //const [xp, yp] = p;

    const p0 = ps[0];
    const p1 = ps[1];
    const p2 = ps[2];

    const x0_ = abs(p0[0]);  // <0>
    const y0_ = abs(p0[1]);  // <0>
    const x1_ = abs(p1[0]);  // <0>
    const y1_ = abs(p1[1]);  // <0>
    const x2_ = abs(p2[0]);  // <0>
    const y2_ = abs(p2[1]);  // <0>

    const xp_ = abs(p[0]);   // <0>
    const yp_ = abs(p[1]);   // <0>

    // <1>xx0 <-- <1>(x0 - xp);
    const xx0_ = x0_ + xp_;
    // <1>xx1 <-- <1>(x1 - xp);
    const xx1_ = x1_ + xp_;
    // <1>xx2 <-- <1>(x2 - xp);
    const xx2_ = x2_ + xp_;
    // <1>yy0 <-- <1>(y0 - yp);
    const yy0_ = y0_ + yp_;
    // <1>yy1 <-- <1>(y1 - yp);
    const yy1_ = y1_ + yp_;
    // <1>yy2 <-- <1>(y2 - yp);
    const yy2_ = y2_ + yp_;

    // <3>x00 <-- <3>(xx0*xx0);
    const x00_ = xx0_*xx0_;
    // <3>x01 <-- <3>(xx0*xx1);
    const x01_ = xx0_*xx1_;
    // <3>x02 <-- <3>(xx0*xx2);
    const x02_ = xx0_*xx2_;
    // <3>x11 <-- <3>(xx1*xx1);
    const x11_ = xx1_*xx1_;
    // <3>x12 <-- <3>(xx1*xx2);
    const x12_ = xx1_*xx2_;
    // <3>x22 <-- <3>(xx2*xx2);
    const x22_ = xx2_*xx2_;


    const y00_ = yy0_*yy0_;
    const y01_ = yy0_*yy1_;
    const y02_ = yy0_*yy2_;
    const y11_ = yy1_*yy1_;
    const y12_ = yy1_*yy2_;
    const y22_ = yy2_*yy2_;

    // <4>q1 <-- <4>(y02 + 2*y11);
    const q1_ = y02_ + 2*y11_;
    // <4>r1 <-- <4>(x02 + 2*x11);
    const r1_ = x02_ + 2*x11_;

    // <7>t3 <-- <7>(<6>(<5>(<4>(y22 + y00) + 2*q1) - 4*<4>(y12 + y01))) + 
    //              (<6>(<5>(<4>(x22 + x00) + 2*r1) - 4*<4>(x12 + x01)));
    const t3_ = ((y22_ + y00_) + 2*q1_ + 4*(y12_ + y01_)) + 
                ((x22_ + x00_) + 2*r1_ + 4*(x12_ + x01_));

    // <8>t2 <-- <8>(3*<7>(<6>(<5>(y12 - q1) + <5>(<4>(3*y01) - y00)) + 
    //                     <6>(<5>(x12 - r1) + <5>(<4>(3*x01) - x00))));
    const t2_ = 3*(((y12_ + q1_) + (3*y01_ + y00_)) + 
                   ((x12_ + r1_) + (3*x01_ + x00_)));

    // <7>t1 <-- <7>(<6>(<4>q1 - <5>(3*<4>(2*y01 - y00))) + 
    //               <6>(<4>r1 - <5>(3*<4>(2*x01 - x00))));
    const t1_ = (q1_ + 3*(2*y01_ + y00_)) + 
                (r1_ + 3*(2*x01_ + x00_));

    // <5>t0 <-- <5>(<4>(y01 - y00) + 
    //              <4>(x01 - x00));
    const t0_ = (y01_ + y00_) + 
                (x01_ + x00_);

    return [
        t3_,  // <7>
        t2_,  // <8>
        t1_,  // <7>
        t0_   // <5>
    ];
}


/**
 * Returns a representation of the error when calculating the polynomial whose
 * roots are all the `t` values on the given bezier curve such that the line
 * from the given point to the point on the bezier evaluated at `t` is tangent
 * to the bezier at `t`.
 * 
 * @param ps a linear bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1]]`
 * @param p a point, e.g. `[1,2]`
 * 
 * ```
 * return [
 *     t1,  // <6>
 *     t0   // <5>
 * ];
 * ```
 * 
 * @internal
 */
function getClosestOnBezier1FromPointErrorCounters(ps: number[][], p: number[]) {
    //const [[x0, y0], [x1, y1]] = ps;
    //const [xp, yp] = p;

    const p0 = ps[0];
    const p1 = ps[1];

    const x0_ = abs(p0[0]);  // <0>
    const y0_ = abs(p0[1]);  // <0>
    const x1_ = abs(p1[0]);  // <0>
    const y1_ = abs(p1[1]);  // <0>

    const xp_ = abs(p[0]);   // <0>
    const yp_ = abs(p[1]);   // <0>

    // <1>xx0 <-- <1>(x0 - xp);
    const xx0_ = x0_ + xp_;
    // <1>xx1 <-- <1>(x1 - xp);
    const xx1_ = x1_ + xp_;
    // <1>yy0 <-- <1>(y0 - yp);
    const yy0_ = y0_ + yp_;
    // <1>yy1 <-- <1>(y1 - yp);
    const yy1_ = y1_ + yp_;

    // <3>x00 <-- <3>(xx0*xx0);
    const x00_ = xx0_*xx0_;
    // <3>x01 <-- <3>(xx0*xx1);
    const x01_ = xx0_*xx1_;
    // <3>x11 <-- <3>(xx1*xx1);
    const x11_ = xx1_*xx1_;
    
    const y00_ = yy0_*yy0_;
    const y01_ = yy0_*yy1_;
    const y11_ = yy1_*yy1_;

    // <4>s1 <-- <4>(x01 + y01);
    const s1_ = x01_ + y01_;
    // <4>s2 <-- <4>(y00 + x00);
    const s2_ = y00_ + x00_;

    // <6>t1 = <6>(<4>(x11 + y11) + <5>(s2 - 2*s1));
    const t1 = x11_ + y11_ + 2*s1_ + s2_;
    // <5>t0 = <5>(s1 - s2);
    const t0 = s1_ + s2_;

    return [
        t1,  // <6>
        t0   // <5>
    ];
}


export { 
    getClosestOnBezier3FromPointErrorCounters,
    getClosestOnBezier2FromPointErrorCounters,
    getClosestOnBezier1FromPointErrorCounters
}
