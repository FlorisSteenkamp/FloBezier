import { getXY1ErrorCounters } from '../../to-power-basis/get-xy/get-xy-error-counters';

const abs = Math.abs;


// TODO - docs
/**
 * Returns the implicit form of the given linear bezier and a coefficientwise 
 * error bound.
 * 
 * Returned coefficients are subscripted to match their monomial's variables,
 * e.g. `vₓᵧ` is the coefficient of the monomial `vₓᵧxy`
 * 
 * * the implicit form is given by: `vₓx + vᵧy + v = 0`
 * * **precondition:** TODO - add underflow / overflow conditions + docs below
 * * intermediate calculations are done in **double** precision and this is
 * reflected in the output error bound (which is approximately equal to
 * `n * Number.EPSILON * the condition number`, where roughly `1 < n < 100` and 
 * depends on the specific calculation)
 * * the error bound returned first needs to be scaled `γ === u/(1 - u)`, 
 * where `u === Number.EPSILON / 2` before use
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 * 
 * TODO
 * 
 * ```
 * return { 
 *      vₓ_,  // <1>
 *      vᵧ_,  // <1>
 *      v_    // <3>
 * }
 * ```
 * 
 * @param ps
 * 
 * @doc mdx
 */
function getImplicitForm1ErrorCounters(ps: number[][]) {
    // The implicit form is given by:
    // vₓx + vᵧy + v = 0

    //const [[a1, a0], [b1, b0]] = getXY(ps);
    const [a0,b0] = ps[0];
    const [
        [a1_],  // <1>a1
        [b1_]   // <1>b1
    ] = getXY1ErrorCounters(ps);

    // <3>v <-- <3>(<2>(<0>a0*<1>b1) - <2>(<1>a1*<0>b0))
    const v_ = abs(a0)*b1_ + abs(b0)*a1_;  // <3>

    return { 
        vₓ_: b1_,  // <1>
        vᵧ_: a1_,  // <1>
        v_         // <3>
    };
}


export { getImplicitForm1ErrorCounters }
