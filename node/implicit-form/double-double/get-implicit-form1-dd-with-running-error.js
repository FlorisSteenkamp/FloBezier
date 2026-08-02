import { ddDiffDd, ddMultDouble2, ddNegativeOf } from 'double-double';
import { toPowerBasis1DdWithRunningError } from '../../to-power-basis/to-power-basis/double-double/to-power-basis-dd-with-running-error.js';
const qdq = ddDiffDd; // error -> 3*γ²
const qmd = ddMultDouble2;
const ddn = ddNegativeOf;
const { abs } = Math;
const ddGetImplicitForm1_WithRunningError = getImplicitForm1DdWithRunningError;
/**
 * * use `ddGetImplicitForm1_WithRunningError` instead (it is the same function but with a better name)
 *
 * Returns a double-double precision implicit form of the given line segment
 * and a coefficientwise error bound.
 *
 * Returned coefficients are subscripted to match their monomial's variables,
 * e.g. `vₓᵧ` is the coefficient of the monomial `vₓᵧxy`
 *
 * * the implicit form is given by: `vₓx + vᵧy + v = 0`
 * * intermediate calculations are done in double-double precision and this is
 * reflected in the error bound
 * * the error bound returned first needs to be scaled by `γγ3 === (3*u*u) / (1 - 3*u*u) === 3.697785493223493e-32`,
 * where `u === Number.EPSILON / 2` before use
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 *
 * @param ps a line segment given as an array of its control points,
 * e.g. `[[1,2],[3,4]]`
 *
 * @doc mdx
 */
function getImplicitForm1DdWithRunningError(ps) {
    //--------------------------------------------------------------------------
    // See: error-analysis-double-double.txt
    //--------------------------------------------------------------------------
    // The implicit form is given by:
    // vₓx + vᵧy + v = 0
    const [[a1, [, a0]], [b1, [, b0]]] = toPowerBasis1DdWithRunningError(ps);
    const vₓ = ddn(b1); // exact
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
export { ddGetImplicitForm1_WithRunningError, getImplicitForm1DdWithRunningError };
//# sourceMappingURL=get-implicit-form1-dd-with-running-error.js.map