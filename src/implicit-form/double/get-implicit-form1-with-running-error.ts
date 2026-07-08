import { toPowerBasis1WithRunningError } from '../../to-power-basis/to-power-basis/double/to-power-basis-with-running-error.js';

const { abs } = Math;


/**
 * Returns a double precision implicit form of the given line segment 
 * and a coefficientwise error bound.
 * 
 * Returned coefficients are subscripted to match their monomial's variables,
 * e.g. `vₓᵧ` is the coefficient of the monomial `vₓᵧxy`
 * 
 * * the implicit form is given by: `vₓx + vᵧy + v = 0`
 * * intermediate calculations are done in double-double precision and this is
 *   reflected in the error bound
 * * the error bound returned still need to be scaled by `γ1`,
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 * 
 * @param ps a line segment given as an array of its control points, 
 * e.g. `[[1,2],[3,4]]`
 * 
 * @doc mdx
 */
function getImplicitForm1WithRunningError(
        ps: number[][]): {
            coeffs: { vₓ: number; vᵧ: number; v: number; };
            errorBound: { vₓ_: number; vᵧ_: number; v_: number; };
        } {

    //--------------------------------------------------------------------------
    // See: error-analysis-double.txt
    //--------------------------------------------------------------------------

    // The implicit form is given by:
    // vₓx + vᵧy + v = 0

    const {
        coeffs: [[a1,a0], [b1,b0]],
        errorBound: [[a1_], [b1_]]  // error bounds on `xx0` and `yy0` is `0`
    } = toPowerBasis1WithRunningError(ps);

    const vₓ = -b1;
    const vₓ_ = b1_;

    const vᵧ = a1;
    const vᵧ_ = a1_;

    const _a0 = abs(a0);
    const _b0 = abs(b0);

    //const v = a1*b0 - a0*b1;
    const a1b0 = b0*a1;
    const _a1b0 = abs(a1b0);
    const a1b0_ = _b0*a1_ + _a1b0;
    const a0b1 = a0*b1;
    const _a0b1 = abs(a0b1);
    const a0b1_ = _a0*b1_ + _a0b1;

    const v = a0b1 - a1b0;
    const v_ = a0b1_ + a1b0_ + abs(v);

    return {
        coeffs: { vₓ, vᵧ, v },
        errorBound: { vₓ_, vᵧ_, v_ }
    }
}


export { getImplicitForm1WithRunningError }
