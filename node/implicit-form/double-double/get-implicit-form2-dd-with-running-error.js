import { ddNegativeOf, ddMultBy2, ddMultDouble2, ddMultDd, ddDiffDd } from 'double-double';
import { toPowerBasis2DdWithRunningError } from '../../to-power-basis/to-power-basis/double-double/to-power-basis-dd-with-running-error.js';
const qno = ddNegativeOf; // error -> 0
const qm2 = ddMultBy2; // error -> 0 
//const qmd2 = qMultDouble1;  // error -> 1.5*γ²
const qmd = ddMultDouble2; // error -> 3*γ²
const qmq = ddMultDd; // error -> 7*γ² (theoretical), 5*γ² (worst found), we use 6*γ²
const qdq = ddDiffDd; // error -> 3*γ²
const abs = Math.abs;
/**
 * Returns a double-double precision implicit form of the given quadratic
 * bezier curve and a coefficientwise error bound.
 *
 * Returned coefficients are subscripted to match their monomial's variables,
 * e.g. `vₓᵧ` is the coefficient of the monomial `vₓᵧxy`
 *
 * * the implicit form is given by: `vₓₓx² +vₓᵧxy + vᵧᵧy² + vₓx + vᵧy + v = 0`
 * * intermediate calculations are done in double-double precision and this is
 * reflected in the error bound
 * * the error bound returned first needs to be scaled by `γγ3 === (3*u*u) / (1 - 3*u*u)`,
 * where `u === Number.EPSILON / 2` before use
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 *
 * @param ps a quadratic bezier curve given as an array of its control points,
 * e.g. `[[1,2],[3,4],[5,7]]`
 *
 * @doc mdx
 */
function getImplicitForm2DdWithRunningError(ps) {
    // The implicit form is given by:
    // vₓₓx² +vₓᵧxy + vᵧᵧy² + vₓx + vᵧy + v = 0
    const { coeffs: [[a2, a1, [, a0]], [b2, b1, [, b0]]], errorBound: [[a2_], [b2_]] } = toPowerBasis2DdWithRunningError(ps);
    const $a2 = a2[1];
    const $a1 = a1[1];
    const $b2 = b2[1];
    const $b1 = b1[1];
    const _a0 = abs(a0);
    const _a1 = abs($a1);
    const _a2 = abs($a2);
    const _b0 = abs(b0);
    const _b1 = abs($b1);
    const _b2 = abs($b2);
    const a2b1 = qmq(a2, b1);
    const a2b1_ = a2_ * _b1 + 2 * abs($a2 * $b1);
    const a1b2 = qmq(a1, b2);
    const a1b2_ = _a1 * b2_ + 2 * abs($a1 * $b2);
    const a2b0 = qmd(b0, a2);
    const a2b0_ = _b0 * a2_ + abs(b0 * $a2);
    const a0b2 = qmd(a0, b2);
    const a0b2_ = _a0 * b2_ + abs(a0 * $b2);
    const a1b0 = qmd(b0, a1);
    const a1b0_ = abs(b0 * $a1);
    const a0b1 = qmd(a0, b1);
    const a0b1_ = abs(a0 * $b1);
    const a2a2 = qmq(a2, a2);
    const a2a2_ = 2 * (a2_ * _a2 + abs($a2 * $a2));
    const a2b2 = qmq(a2, b2);
    const a2b2_ = a2_ * _b2 + _a2 * b2_ + 2 * abs($a2 * $b2);
    const b2b2 = qmq(b2, b2);
    const b2b2_ = 2 * (b2_ * _b2 + abs($b2 * $b2));
    const $a2b1 = $a2 * $b1;
    const $a1b2 = $a1 * $b2;
    const $a2b0 = $a2 * b0;
    const $a0b2 = a0 * $b2;
    const $a1b0 = $a1 * b0;
    const $a0b1 = a0 * $b1;
    const $q1 = $a2b1 - $a1b2;
    const $q2 = $a2b0 - $a0b2;
    const $q3 = $a1b0 - $a0b1;
    const q1 = qdq(a2b1, a1b2);
    const _q1 = abs($q1);
    const q1_ = a2b1_ + a1b2_ + abs($q1);
    const q2 = qdq(a2b0, a0b2);
    const _q2 = abs($q2);
    const q2_ = a2b0_ + a0b2_ + abs($q2);
    const q3 = qdq(a1b0, a0b1);
    const _q3 = abs($q3);
    const q3_ = a1b0_ + a0b1_ + abs($q3);
    // -a1*q1*y - a2**2*y**2 + 2*a2*b2*x*y + 2*a2*q2*y + b1*q1*x - b2**2*x**2 - 2*b2*q2*x + q1*q3 - q2**2
    // -------------
    // b2**2 *x**2
    // -b2**2 *x**2
    // -------------
    const vₓₓ = qno(b2b2);
    const vₓₓ_ = b2b2_;
    // -------------
    // -2*a2*b2 *x*y
    // 2*a2*b2 *x*y
    // -------------
    const vₓᵧ = qm2(a2b2);
    const vₓᵧ_ = a2b2_;
    // -------------
    // a2**2 *y**2 
    // -a2**2 *y**2 
    // -------------
    const vᵧᵧ = qno(a2a2);
    const vᵧᵧ_ = a2a2_;
    // -----------------------------------------------
    // -2*a0*b2**2 + a1*b1*b2 + 2*a2*b0*b2 - a2*b1**2
    // (b1*q1 + -2*b2*q2) *x
    //const vₓ = b1*q1 - 2*b2*q2;
    // -----------------------------------------------
    const $w1 = $b1 * $q1;
    const w1 = qmq(b1, q1);
    const w1_ = _b1 * q1_ + 2 * abs($w1);
    const $w2 = 2 * $q2 * $b2;
    const w2 = qm2(qmq(b2, q2));
    const w2_ = 2 * (b2_ * _q2 + _b2 * q2_ + 2 * abs($w2));
    const $vₓ = $w1 - $w2;
    const vₓ = qdq(w1, w2);
    const vₓ_ = w1_ + w2_ + abs($vₓ);
    // -----------------------------------------------
    // 2*a0*a2*b2 - a1**2*b2 + a1*a2*b1 - 2*a2**2*b0
    // (-a1*q1 + 2*a2*q2) *y
    // -----------------------------------------------
    const $w3 = 2 * $a2 * $q2;
    const w3 = qm2(qmq(a2, q2));
    const w3_ = 2 * (a2_ * _q2 + _a2 * q2_ + 2 * abs($w3));
    const $w4 = $a1 * $q1;
    const w4 = qmq(a1, q1);
    const w4_ = _a1 * q1_ + 2 * abs($w4);
    const $vᵧ = $w3 - $w4;
    const vᵧ = qdq(w3, w4);
    const vᵧ_ = w3_ + w4_ + abs($vᵧ);
    // --------------------------------------------------------------------------------------------------
    // a0**2*b2**2 - a0*a1*b1*b2 - 2*a0*a2*b0*b2 + a0*a2*b1**2 + a1**2*b0*b2 - a1*a2*b0*b1 + a2**2*b0**2
    // q1*q3 + -q2**2
    // --------------------------------------------------------------------------------------------------
    const $w5 = $q1 * $q3;
    const w5 = qmq(q1, q3);
    const w5_ = q1_ * _q3 + _q1 * q3_ + 2 * abs($w5);
    const $w6 = $q2 * $q2;
    const w6 = qmq(q2, q2);
    const w6_ = 2 * (q2_ * _q2 + abs($w6));
    const $v = $w5 - $w6;
    const v = qdq(w5, w6);
    const v_ = w5_ + w6_ + abs($v);
    return {
        coeffs: { vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v },
        errorBound: { vₓₓ_, vₓᵧ_, vᵧᵧ_, vₓ_, vᵧ_, v_ }
    };
}
export { getImplicitForm2DdWithRunningError };
//# sourceMappingURL=get-implicit-form2-dd-with-running-error.js.map