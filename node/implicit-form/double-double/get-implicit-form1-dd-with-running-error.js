import { ddDiffDd, ddMultDouble2 } from 'double-double';
import { eNegativeOf } from 'big-float-ts';
import { getXY1DdWithRunningError } from '../../to-power-basis/get-xy/double-double/get-xy-dd-with-running-error.js';
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const qdq = ddDiffDd; // error -> 3*γ²
const qmd = ddMultDouble2;
const eno = eNegativeOf;
const abs = Math.abs;
// TODO - modify
/**
 * Returns the error-free double-double precision implicit form of the given
 * linear bezier.
 *
 * Returned coefficients are subscripted to match their monomial's variables,
 * e.g. `vₓᵧ` is the coefficient of the monomial `vₓᵧxy`
 *
 * * the implicit form is given by: `vₓx + vᵧy + v = 0`
 * * **precondition:** TODO - add underflow / overflow conditions + docs below
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 *
 * @param ps
 *
 * @doc mdx
 */
function getImplicitForm1DdWithRunningError(ps) {
    // The implicit form is given by:
    // vₓx + vᵧy + v = 0
    const [[a1, a0], [b1, b0]] = getXY1DdWithRunningError(ps);
    const vₓ = eno(b1); // exact
    const vᵧ = a1; // exact
    //const v = a1*b0 - a0*b1;
    const a1b0 = qmd(b0, a1);
    const _a1b0_ = abs(a1b0[1]);
    const a0b1 = qmd(a0, b1);
    const _a0b1_ = abs(a0b1[1]);
    const v = qdq(a0b1, a1b0);
    const v_ = _a1b0_ + _a0b1_ + abs(v[1]);
    return {
        coeffs: { vₓ, vᵧ, v },
        errorBound: { v_ } // vₓ_, vᵧ_ === 0
    };
}
export { getImplicitForm1DdWithRunningError };
//# sourceMappingURL=get-implicit-form1-dd-with-running-error.js.map