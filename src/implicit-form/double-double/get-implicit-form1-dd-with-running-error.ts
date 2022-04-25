import { ddDiffDd, ddMultDouble2 } from 'double-double';
import { eNegativeOf } from 'big-float-ts';
import { toPowerBasis1DdWithRunningError } from '../../to-power-basis/to-power-basis/double-double/to-power-basis-dd-with-running-error.js';

// We *have* to do the below to improve performance with bundlers❗ The assignee is a getter❗ The assigned is a pure function❗
const qdq = ddDiffDd;       // error -> 3*γ²
const qmd = ddMultDouble2;
const eno = eNegativeOf;
const abs = Math.abs;


/**
 * Returns a double-double precision implicit form of the given quadratic 
 * bezier and a coefficientwise error bound.
 * 
 * Returned coefficients are subscripted to match their monomial's variables,
 * e.g. `vₓᵧ` is the coefficient of the monomial `vₓᵧxy`
 * 
 * * the implicit form is given by: `vₓx + vᵧy + v = 0`
 * * intermediate calculations are done in double-double precision and this is
 * reflected in the output error bound
 * * the error bound returned first needs to be scaled by `γγ3 === (3*u*u) / (1 - 3*u*u)`,
 * where `u === Number.EPSILON / 2` before use
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 * 
 * @param ps 
 * 
 * @doc mdx
 */
function getImplicitForm1DdWithRunningError(ps: number[][]) {
    // The implicit form is given by:
    // vₓx + vᵧy + v = 0

    const [[a1,[,a0]], [b1,[,b0]]] = toPowerBasis1DdWithRunningError(ps);

    const vₓ = eno(b1);  // exact
    const vᵧ = a1;       // exact

    //const v = a1*b0 - a0*b1;
    const a1b0 = qmd(b0,a1);
    const _a1b0_ = abs(a1b0[1]);
    const a0b1 = qmd(a0,b1);
    const _a0b1_ = abs(a0b1[1]);
    const v = qdq(a0b1,a1b0);
    const v_ = _a1b0_ + _a0b1_ + abs(v[1]);

    return {
        coeffs: { vₓ, vᵧ, v },
        errorBound: { v_ }  // vₓ_, vᵧ_ === 0
    }
}


export { getImplicitForm1DdWithRunningError }
