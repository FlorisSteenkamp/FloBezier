import { toPowerBasis2ErrorCounters } from '../../to-power-basis/to-power-basis/to-power-basis-error-counters.js';
const abs = Math.abs;
/**
 * Returns a representation of the error (from which an absolute error bound
 * can be calculated) when calculating the implicit form of the given bezier
 * curve (using [[getImplicitForm2]] or [[getImplicitForm2Dd]]).
 *
 * Returned coefficients are subscripted to match their monomial's variables,
 * e.g. `vₓᵧ` is the coefficient of the monomial `vₓᵧxy`
 *
 * * the implicit form is given by: `vₓₓx² +vₓᵧxy + vᵧᵧy² + vₓx + vᵧy + v`
 *
 * * The returned error representation needs to be multiplied with
 * [Stewart error counters¹](https://www.amazon.ca/Introduction-Matrix-Computations-G-Stewart/dp/0126703507)
 * and an appropriate error function, `γ`, depending on the precision used (e.g. double
 * or double-double). This is explained in more detail below. See
 * also [Higham 2002](http://ftp.demec.ufpr.br/CFD/bibliografia/Higham_2002_Accuracy%20and%20Stability%20of%20Numerical%20Algorithms.pdf)
 * p. 68 near the bottom.
 *
 * (1) G. W. Stewart. Introduction to Matrix Computations. Academic Press, New York,
 *  1973. xiii+441 pp. ISBN 0-12-670350-7
 *
 * The absolute erros below can be calculated as follows (where `<E>` are the
 * error counters as indicated in the comments of the return value below):
 *  * double precision: `<E> * (γ(1)) * result_`
 *  * double-double precision: `<E> * (2*γγ(3)) * result_`
 *
 * where [[γ]] and [[γγ]] are the usual error functions (provided in this library
 * as functions with the same name).
 *
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
 * @doc
 */
function getImplicitForm2ErrorCounters(ps) {
    // The implicit form is given by:
    // vₓₓx² +vₓᵧxy + vᵧᵧy² + vₓx + vᵧy + v = 0
    //const [[,,a0],[,,b0]] = toPowerBasis2ErrorCounters(ps);
    const [a0, b0] = ps[0];
    const [[a2_, a1_], // <2>a2_, <1>a1_, <0>a0_  (a0_ is just abs(a0))
    [b2_, b1_] // <2>b2_, <1>b1_, <0>b0_  (b0_ is just abs(b0))
    ] = toPowerBasis2ErrorCounters(ps);
    //-------------------
    // Error calculation
    //-------------------
    const a0_ = abs(a0);
    const b0_ = abs(b0);
    // <5>q1 <-- <5>(<4>(<2>a2*<1>b1) - <4>(a1*b2))
    const q1_ = a2_ * b1_ + a1_ * b2_;
    // <4>q2 <-- <4>(<3>(a2*b0) - <3>(a0*b2))
    const q2_ = a2_ * b0_ + a0_ * b2_;
    // <5>vₓₓ <-- <5>(-<2>b2*<2>b2)
    const vₓₓ_ = b2_ * b2_;
    // <5>vₓᵧ <-- 2*a2*b2
    const vₓᵧ_ = 2 * a2_ * b2_;
    // <5>vᵧᵧ <-- -a2*a2
    const vᵧᵧ_ = a2_ * a2_;
    // <8>vₓ <-- <8>(<7>(<1>b1*<5>q1) - <7>(2*<2>b2*<4>q2))
    const vₓ_ = b1_ * q1_ + 2 * b2_ * q2_;
    // <8>vᵧ <-- <8>(<7>(2*<2>a2<4>q2) - <7>(<1>a1<5>q1))
    const vᵧ_ = 2 * a2_ * q2_ + a1_ * q1_;
    // <10>v <-- <10>(<9>(<5>q1*<3>(<2>(a1*b0) - <2>(a0*b1))) - <9>(<4>q2*<4>q2))
    const v_ = q1_ * (a1_ * b0_ + a0_ * b1_) + q2_ * q2_;
    return {
        vₓₓ_,
        vₓᵧ_,
        vᵧᵧ_,
        vₓ_,
        vᵧ_,
        v_ // <10>
    };
}
export { getImplicitForm2ErrorCounters };
//# sourceMappingURL=get-implicit-form2-error-counters.js.map