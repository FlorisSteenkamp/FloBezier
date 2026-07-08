import { toPowerBasis2WithRunningError } from '../../to-power-basis/to-power-basis/double/to-power-basis-with-running-error.js';

const { abs } = Math;


/**
 * Returns a double precision implicit form of the given quadratic 
 * bezier curve and a coefficientwise error bound.
 * 
 * Returned coefficients are subscripted to match their monomial's variables,
 * e.g. `vₓᵧ` is the coefficient of the monomial `vₓᵧxy`
 * 
 * * the implicit form is given by: `vₓₓx² +vₓᵧxy + vᵧᵧy² + vₓx + vᵧy + v = 0`
 * * intermediate calculations are done in double-double precision and this is
 *   reflected in the error bound
 * * the error bound returned still needs to be scaled by `γγ1`,
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 * 
 * @param ps a quadratic bezier curve given as an array of its control points, 
 * e.g. `[[1,2],[3,4],[5,7]]`
 * 
 * @doc mdx
 */
function getImplicitForm2WithRunningError(
        ps: number[][]): {
            coeffs: {
                vₓₓ: number; vₓᵧ: number; vᵧᵧ: number;
                vₓ: number; vᵧ: number;
                v: number;
            };
            errorBound: {
                vₓₓ_: number; vₓᵧ_: number; vᵧᵧ_: number;
                vₓ_: number; vᵧ_: number;
                v_: number;
            };
        } {

    //--------------------------------------------------------------------------
    // See: error-analysis-double.txt
    //--------------------------------------------------------------------------

    // The implicit form is given by:
    // vₓₓx² +vₓᵧxy + vᵧᵧy² + vₓx + vᵧy + v = 0
    
    const {
        coeffs: [[a2,a1,a0],[b2,b1,b0]],
        errorBound: [[a2_,a1_],[b2_,b1_]]  // `a0` and `b0` are exact
    } = toPowerBasis2WithRunningError(ps);


    const _a0 = abs(a0);
    const _a1 = abs(a1);
    const _a2 = abs(a2);
    const _b0 = abs(b0);
    const _b1 = abs(b1);
    const _b2 = abs(b2);

    const a2b1 = a2*b1;
    const _a2b1 = abs(a2*b1);
    const a2b1_ = _a2*b1_ + a2_*_b1 + _a2b1;
    const a1b2 = a1*b2;
    const _a1b2 = abs(a1b2);
    const a1b2_ = _a1*b2_ + a1_*_b2 + _a1b2;
    const a2b0 = b0*a2;
    const _a2b0 = abs(a2b0);
    const a2b0_ = _b0*a2_ + _a2b0;
    const a0b2 = a0*b2;
    const _a0b2 = abs(a0b2);
    const a0b2_ = _a0*b2_ + _a0b2;
    const a1b0 = b0*a1;
    const _a1b0 = abs(a1b0);
    const a1b0_ = _b0*a1_ + _a1b0;
    const a0b1 = a0*b1;
    const _a0b1 = abs(a0b1);
    const a0b1_ = _a0*b1_ + _a0b1;
    const a2a2 = a2*a2;
    const _a2a2 = abs(a2a2);
    const a2a2_ = 2*(_a2*a2_) + _a2a2;
    const a2b2 = a2*b2;
    const a2b2_ = a2_*_b2 + _a2*b2_ + abs(a2*b2);
    const b2b2 = b2*b2;
    const b2b2_ = 2*(b2_*_b2) + abs(b2*b2);
    const q1 = a2b1 - a1b2;
    const _q1 = abs(q1)
    const q1_ = a2b1_ + a1b2_ + _q1;
    const q2 = a2b0 - a0b2;
    const _q2 = abs(q2);
    const q2_ = a2b0_ + a0b2_ + _q2;
    const q3 = a1b0 - a0b1;
    const _q3 = abs(q3)
    const q3_ = a1b0_ + a0b1_ + _q3;


    // -a1*q1*y - a2**2*y**2 + 2*a2*b2*x*y + 2*a2*q2*y + b1*q1*x - b2**2*x**2 - 2*b2*q2*x + q1*q3 - q2**2

    // -------------
    // b2**2 *x**2
    // -b2**2 *x**2
    // -------------
    const vₓₓ = -b2b2;
    const vₓₓ_ = b2b2_;

    // -------------
    // -2*a2*b2 *x*y
    // 2*a2*b2 *x*y
    // -------------
    const vₓᵧ = 2*a2b2;
    const vₓᵧ_ = 2*a2b2_;

    // -------------
    // a2**2 *y**2 
    // -a2**2 *y**2 
    // -------------
    const vᵧᵧ = -a2a2;
    const vᵧᵧ_ = a2a2_;

    // -----------------------------------------------
    // -2*a0*b2**2 + a1*b1*b2 + 2*a2*b0*b2 - a2*b1**2
    // (b1*q1 + -2*b2*q2) *x
    //const vₓ = b1*q1 - 2*b2*q2;
    // -----------------------------------------------
    const w1 = b1*q1;
    const w1_ = _b1*q1_ + b1_*_q1 + abs(w1);
    const w2 = 2*q2*b2;
    const w2_ = 2*(b2_*_q2 + _b2*q2_) + abs(w2);
    const vₓ = w1 - w2;
    const vₓ_ = w1_ + w2_ + abs(vₓ);

    // -----------------------------------------------
    // 2*a0*a2*b2 - a1**2*b2 + a1*a2*b1 - 2*a2**2*b0
    // (-a1*q1 + 2*a2*q2) *y
    // -----------------------------------------------
    const w3 = 2*a2*q2;
    const w3_ = 2*(a2_*_q2 + _a2*q2_) + abs(w3);
    const w4 = a1*q1;
    const w4_ = _a1*q1_ + a1_*_q1 + abs(w4);
    const vᵧ = w3 - w4;
    const vᵧ_ = w3_ + w4_ + abs(vᵧ);

    // --------------------------------------------------------------------------------------------------
    // a0**2*b2**2 - a0*a1*b1*b2 - 2*a0*a2*b0*b2 + a0*a2*b1**2 + a1**2*b0*b2 - a1*a2*b0*b1 + a2**2*b0**2
    // q1*q3 + -q2**2
    // --------------------------------------------------------------------------------------------------
    const w5 = q1*q3;
    const w5_ = q1_*_q3 + _q1*q3_ + abs(w5);
    const w6 = q2*q2;
    const w6_ = 2*(q2_*_q2) + abs(w6);
    const v = w5 - w6;
    const v_ = w5_ + w6_ + abs(v);

    return { 
        coeffs: { vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v },
        errorBound: { vₓₓ_, vₓᵧ_, vᵧᵧ_, vₓ_, vᵧ_, v_ }
    }
}


export { getImplicitForm2WithRunningError }
