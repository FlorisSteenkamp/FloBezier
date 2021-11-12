import { getXY2ErrorCounters } from '../../to-power-basis/get-xy/get-xy-error-counters.js';

const abs = Math.abs;


// TODO - docs
/**
 * Returns the implicit form of the given quadratic bezier and a coefficientwise 
 * error bound.
 * 
 * Returned coefficients are subscripted to match their monomial's variables,
 * e.g. `vₓᵧ` is the coefficient of the monomial `vₓᵧxy`
 * 
 * * the implicit form is given by: `vₓₓx² +vₓᵧxy + vᵧᵧy² + vₓx + vᵧy + v = 0`
 * * **precondition:** TODO - add underflow / overflow conditions + docs below
 * * intermediate calculations are done in **double** precision and this is
 * reflected in the output error bound (which is approximately 
 * `n * Number.EPSILON * the condition number`, where roughly `1 < n < 100` and 
 * depends on the specific calculation)
 * * the error bound returned first needs to be scaled by `γ === u/(1 - u)`,
 * where `u === Number.EPSILON / 2` before use
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 * TODO
 * ```
 * return { 
 *      vₓₓ_,  // <5>
 *      vₓᵧ_,  // <5>
 *      vᵧᵧ_,  // <5>
 *      vₓ_,   // <8>
 *      vᵧ_,   // <8>
 *      v_     // <10>
 * }
 * ```
 * 
 * @param ps 
 * 
 * @doc mdx
 */
function getImplicitForm2ErrorCounters(ps: number[][]) {
    // The implicit form is given by:
    // vₓₓx² +vₓᵧxy + vᵧᵧy² + vₓx + vᵧy + v = 0
    
    //const [[,,a0],[,,b0]] = getXY(ps);
    const [a0,b0] = ps[0];

    const [
        [a2_, a1_],   // <2>a2_, <1>a1_, <0>a0_  (a0_ is just abs(a0))
        [b2_, b1_]    // <2>b2_, <1>b1_, <0>b0_  (b0_ is just abs(b0))
    ] = getXY2ErrorCounters(ps);

    //-------------------
    // Error calculation
    //-------------------

    const a0_ = abs(a0);
    const b0_ = abs(b0);

    // <5>q1 <-- <5>(<4>(<2>a2*<1>b1) - <4>(a1*b2))
    const q1_ = a2_*b1_ + a1_*b2_;
    // <4>q2 <-- <4>(<3>(a2*b0) - <3>(a0*b2))
    const q2_ = a2_*b0_ + a0_*b2_;

    // <5>vₓₓ <-- <5>(-<2>b2*<2>b2)
    const vₓₓ_ = b2_*b2_;
    // <5>vₓᵧ <-- 2*a2*b2
    const vₓᵧ_ = 2*a2_*b2_;
    // <5>vᵧᵧ <-- -a2*a2
    const vᵧᵧ_ = a2_*a2_;
    // <8>vₓ <-- <8>(<7>(<1>b1*<5>q1) - <7>(2*<2>b2*<4>q2))
    const vₓ_ = b1_*q1_ + 2*b2_*q2_;
    // <8>vᵧ <-- <8>(<7>(2*<2>a2<4>q2) - <7>(<1>a1<5>q1))
    const vᵧ_ = 2*a2_*q2_ + a1_*q1_;
    // <10>v <-- <10>(<9>(<5>q1*<3>(<2>(a1*b0) - <2>(a0*b1))) - <9>(<4>q2*<4>q2))
    const v_ = q1_*(a1_*b0_ + a0_*b1_) + q2_*q2_;


    return { 
        vₓₓ_,  // <5>
        vₓᵧ_,  // <5>
        vᵧᵧ_,  // <5>
        vₓ_,   // <8>
        vᵧ_,   // <8>
        v_     // <10>
    };
}


export { getImplicitForm2ErrorCounters }
