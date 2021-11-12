import { getXY3ErrorCounters } from '../../to-power-basis/get-xy/get-xy-error-counters.js';
const abs = Math.abs;
// TODO - docs
/**
 * Returns the implicit form of the given cubic bezier and a coefficientwise
 * error bound.
 *
 * Returned coefficients are subscripted to match their monomial's variables,
 * e.g. `vₓᵧ` is the coefficient of the monomial `vₓᵧxy`
 *
 * * the implicit form is given by: `vₓₓₓx³ + vₓₓᵧx²y + vₓᵧᵧxy² + vᵧᵧᵧy³ + vₓₓx² +vₓᵧxy + vᵧᵧy² + vₓx + vᵧy + v = 0`
 * * **precondition:** TODO - add underflow / overflow conditions + docs below
 * * intermediate calculations are done in **double** precision and this is
 * reflected in the output error bound (which is approximately
 * `n * Number.EPSILON * the condition number`, where roughly `1 < n < 100` and
 * depends on the specific calculation)
 * * the error bound returned first needs to be scaled by `γ === u/(1 - u)`,
 * where `u === Number.EPSILON / 2` before use
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 * * takes about 1.2 micro-seconds on a 3rd gen i7 and Chrome 79
 *
 *  * TODO
 * ```
 * errorBound: {
 *      vₓₓₓ_,  // <11>
 *      vₓₓᵧ_,  // <12>
 *      vₓᵧᵧ_,  // <12>
 *      vᵧᵧᵧ_,  // <11>
 *      vₓₓ_,   // <19>
 *      vₓᵧ_,   // <18>
 *      vᵧᵧ_,   // <19>
 *      vₓ_,    // <22>
 *      vᵧ_,    // <22>
 *      v_      // <24>
 * }
 * ```
 * @param ps
 *
 * @doc mdx
 */
function getImplicitForm3ErrorCounters(ps) {
    // The implicit form is given by:
    // vₓₓₓx³ + vₓₓᵧx²y + vₓᵧᵧxy² + vᵧᵧᵧy³ + vₓₓx² +vₓᵧxy + vᵧᵧy² + vₓx + vᵧy + v = 0
    //const [[,,,a0],[,,,b0]] = getXY(ps);
    const [a0, b0] = ps[0];
    const [[a3_, a2_, a1_], // <3>a3_, <3>a2_, <2>a1_, <0>a0_  (a0_ is just abs(a0))
    [b3_, b2_, b1_] // <3>b3_, <3>b2_, <2>b1_, <0>b0_  (b0_ is just abs(b0))
    ] = getXY3ErrorCounters(ps);
    //-------------------
    // Error calculation
    //-------------------
    const a0_ = abs(a0);
    const b0_ = abs(b0);
    // <6>a3b1 <-- <6>(<3>a3*<2>b1);
    const a3b1_ = a3_ * b1_;
    // <6>a1b3 <-- a1*b3;
    const a1b3_ = a1_ * b3_;
    // <7>a3b2 <-- <7>(<3>a3*<3>b2);
    const a3b2_ = a3_ * b2_;
    // <7>a2b3 <-- a2*b3;
    const a2b3_ = a2_ * b3_;
    // <7>a3a3 <-- a3*a3;
    const a3a3_ = a3_ * a3_;
    // <7>b3b3 <-- b3*b3;
    const b3b3_ = b3_ * b3_;
    // <5>q1 <-- <5>(<4>(a3*b0) - <4>(a0*b3));
    const q1_ = a3_ * b0_ + a0_ * b3_;
    // <7>q2 <-- <7>(<6>a3b1 - <6>a1b3);
    const q2_ = a3b1_ + a1b3_;
    // <8>q3 <-- <8>(<7>a3b2 - <7>a2b3);
    const q3_ = a3b2_ + a2b3_;
    // <5>q4 <-- a2*b0 - a0*b2;
    const q4_ = a2_ * b0_ + a0_ * b2_;
    // <7>q5 <-- a2*b1 - a1*b2;
    const q5_ = a2_ * b1_ + a1_ * b2_;
    // <4>q6 <-- <4>(<3>(<2>a1*<0>b0) - <3>(<0>a0*<2>b1));
    const q6_ = a1_ * b0_ + a0_ * b1_;
    // <7>tq2 <-- 2*q2;
    const tq2_ = 2 * q2_;
    // <11>q1q1 <-- <11>(<5>q1*<5>q1)
    const q1q1_ = q1_ * q1_;
    // <13>q1q5 <-- <13>(<5>q1*<7>q5)
    const q1q5_ = q1_ * q5_;
    // <13>tq2q4 <-- <13>(<7>tq2*<5>q4)
    const tq2q4_ = tq2_ * q4_;
    // <14>q3q4 <-- <14>(<8>q3*<5>q4)
    const q3q4_ = q3_ * q4_;
    // <8>u1 <-- <8>(<6>(-3*<5>q1) - <7>q5)
    const u1_ = 3 * q1_ + q5_;
    // <11>vₓₓₓ <-- <11>(-<3>b3*<7>b3b3)
    const vₓₓₓ_ = b3_ * b3b3_;
    // <12>vₓₓᵧ <--  <12>(3*<11>(<3>a3*<7>b3b3))
    const vₓₓᵧ_ = 3 * a3_ * b3b3_;
    // <12>vₓᵧᵧ <-- -3*b3*a3a3
    const vₓᵧᵧ_ = 3 * b3_ * a3a3_;
    // <11>vᵧᵧᵧ <--  a3*a3a3
    const vᵧᵧᵧ_ = a3_ * a3a3_;
    // <19>vₓₓ <-- <19>(<18>(<16>(<8>u1*<7>b3b3) + <17>(<8>q3*(<8>(<6>(b1*b3) - <7>(b2*b2))))) + <15>(<7>tq2*<7>(b2*b3)))
    const vₓₓ_ = (u1_ * b3b3_ + q3_ * (b1_ * b3_ + b2_ * b2_)) + tq2_ * b2_ * b3_;
    // <19>vᵧᵧ <-- <19>((<18>(<16>(<8>u1*<7>a3a3) + <17>(<8>q3*<8>(<6>(a1*a3) - <7>(a2*a2))))) + <15>(<7>tq2*<7>(a2*a3)))
    const vᵧᵧ_ = (u1_ * a3a3_ + q3_ * (a1_ * a3_ + a2_ * a2_)) + tq2_ * a2_ * a3_;
    // <18>vₓᵧ <-- <18>(2*(<17>(<8>q3*<8>(<7>(a2*b2) - <7>(<6>a1b3 + <6>a3b1)/2)) - <17>(<16>(<8>u1*<7>(a3*b3)) + <16>(<7>q2*(<8>(a2b3 + a3b2))))))
    const vₓᵧ_ = 2 * (q3_ * (a2_ * b2_ + (a1b3_ + a3b1_) / 2) + (u1_ * a3_ * b3_ + q2_ * (a2b3_ + a3b2_)));
    // <15>s1 <-- <15>(<14>(<12>(-3*q1q1) - <13>2*q1q5) + <14>(<13>tq2q4 + <13>(<8>q3*<4>q6)))
    const s1_ = (3 * q1q1_ + 2 * q1q5_) + (tq2q4_ + q3_ * q6_);
    // <15>s2 <-- <15>(2*(<13>(<5>q1*<7>q2) - <14>q3q4))
    const s2_ = 2 * (q1_ * q2_ + q3q4_);
    // <17>s3 <-- <17>(<16>(<14>(<5>q1*<8>q3) - <15>(<7>q2*<7>q2)) + <16>(<8>q3*<7>q5))
    const s3_ = q1_ * q3_ + q2_ * q2_ + q3_ * q5_;
    // <22>vₓ <-- <22>(<19>(<3>b3*<15>s1) + <21>(<19>(<3>b2*<15>s2) + <20>(<2>b1*<17>s3)))
    const vₓ_ = b3_ * s1_ + (b2_ * s2_ + b1_ * s3_);
    // <22>vᵧ <-- <22>(<19>(<3>-a3*<15>s1) - <21>(<19>(<3>a2*<15>s2) + <20>(<2>a1*<17>s3)))
    const vᵧ_ = a3_ * s1_ + (a2_ * s2_ + a1_ * s3_);
    // <24>v <-- <24>(<21>(<5>q1*<15>(<14>(<13>tq2q4 - <11>q1q1) - <13>q1q5)) + <23>(<22>(<17>s3*<4>q6) - <20>(<14>q3q4*<5>q4)))
    const v_ = (q1_ * ((tq2q4_ + q1q1_) + q1q5_)) + (s3_ * q6_ + q3q4_ * q4_);
    return {
        vₓₓₓ_,
        vₓₓᵧ_,
        vₓᵧᵧ_,
        vᵧᵧᵧ_,
        vₓₓ_,
        vₓᵧ_,
        vᵧᵧ_,
        vₓ_,
        vᵧ_,
        v_ // <24>
    };
}
export { getImplicitForm3ErrorCounters };
//# sourceMappingURL=get-implicit-form3-error-counters.js.map