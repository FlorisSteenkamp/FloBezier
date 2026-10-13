import { ddAddDd, ddDiffDd, ddMultDd, ddMultDouble2, ddMultBy2, ddNegativeOf } from "double-double";
import { toPowerBasis3DdWithRunningError } from "../../../../to-power-basis/to-power-basis/double-double/to-power-basis-dd-with-running-error.js";
import { γγ3 } from "../../../../error-analysis/error-analysis.js";
const qmq = ddMultDd;
const qaq = ddAddDd;
const qdq = ddDiffDd;
const qmd = ddMultDouble2;
const qm2 = ddMultBy2;
const qno = ddNegativeOf;
const { abs } = Math;
/**
 * Returns the implicit form (including a coefficientwise error bound) of the
 * given cubic bezier curve *relative to its start point*, i.e. of the curve translated
 * so that it starts at the origin (so that the constant coefficient `v` is
 * zero and not returned).
 *
 * * with the power basis `x(t) - x₀ = a₃t³ + a₂t² + a₁t`,
 * `y(t) - y₀ = b₃t³ + b₂t² + b₁t`, the cross products `×ᵢⱼ = aᵢbⱼ - aⱼbᵢ` and
 * `K = ×₁₃² - ×₁₂×₂₃` the implicit form
 * `vₓₓₓx³ + vₓₓᵧx²y + vₓᵧᵧxy² + vᵧᵧᵧy³ + vₓₓx² + vₓᵧxy + vᵧᵧy² + vₓx + vᵧy = 0`
 * is given by
 *   * `vₓₓₓ = b₃³`, `vₓₓᵧ = -3a₃b₃²`, `vₓᵧᵧ = 3a₃²b₃`, `vᵧᵧᵧ = -a₃³`
 *   * `vₓₓ = b₂b₃×₁₃ + (2b₁b₃ - b₂²)×₂₃`
 *   * `vₓᵧ = -(a₂b₃ + a₃b₂)×₁₃ - 2(a₁b₃ + a₃b₁ - a₂b₂)×₂₃`
 *   * `vᵧᵧ = a₂a₃×₁₃ + (2a₁a₃ - a₂²)×₂₃`
 *   * `vₓ = b₁K`, `vᵧ = -a₁K`
 * * no translation is actually done (the power basis coefficients, apart from
 * the constant terms, are coordinate differences)
 * * intermediate calculations are done in double-double precision
 * * the error bound returned still needs to be multiplied by `γγ3`
 * * this code was generated (see `research/gen-shared-start.py`)
 *
 * @param ps an order 3 bezier curve given as an ordered array of its control
 * point coordinates
 *
 * @internal
 */
function getImplicitForm3AtStartDd(ps) {
    const { coeffs: [[a3, a2, a1], [b3, b2, b1]], errorBound: [[a3_, a2_, a1_], [b3_, b2_, b1_]] } = toPowerBasis3DdWithRunningError(ps);
    const _a1 = abs(a1[1]);
    const _b1 = abs(b1[1]);
    const _a2 = abs(a2[1]);
    const _b2 = abs(b2[1]);
    const _a3 = abs(a3[1]);
    const _b3 = abs(b3[1]);
    const a1b2 = qmq(a1, b2);
    const _a1b2 = abs(a1b2[1]);
    const a1b2_ = _a1 * b2_ + a1_ * (_b2 + γγ3 * b2_) + 2 * _a1b2;
    const a2b1 = qmq(a2, b1);
    const _a2b1 = abs(a2b1[1]);
    const a2b1_ = _a2 * b1_ + a2_ * (_b1 + γγ3 * b1_) + 2 * _a2b1;
    const a1b3 = qmq(a1, b3);
    const _a1b3 = abs(a1b3[1]);
    const a1b3_ = _a1 * b3_ + a1_ * (_b3 + γγ3 * b3_) + 2 * _a1b3;
    const a3b1 = qmq(a3, b1);
    const _a3b1 = abs(a3b1[1]);
    const a3b1_ = _a3 * b1_ + a3_ * (_b1 + γγ3 * b1_) + 2 * _a3b1;
    const a2b3 = qmq(a2, b3);
    const _a2b3 = abs(a2b3[1]);
    const a2b3_ = _a2 * b3_ + a2_ * (_b3 + γγ3 * b3_) + 2 * _a2b3;
    const a3b2 = qmq(a3, b2);
    const _a3b2 = abs(a3b2[1]);
    const a3b2_ = _a3 * b2_ + a3_ * (_b2 + γγ3 * b2_) + 2 * _a3b2;
    const x12 = qdq(a1b2, a2b1);
    const _x12 = abs(x12[1]);
    const x12_ = a1b2_ + a2b1_ + _x12;
    const x13 = qdq(a1b3, a3b1);
    const _x13 = abs(x13[1]);
    const x13_ = a1b3_ + a3b1_ + _x13;
    const x23 = qdq(a2b3, a3b2);
    const _x23 = abs(x23[1]);
    const x23_ = a2b3_ + a3b2_ + _x23;
    const a3a3 = qmq(a3, a3);
    const _a3a3 = abs(a3a3[1]);
    const a3a3_ = _a3 * a3_ + a3_ * (_a3 + γγ3 * a3_) + 2 * _a3a3;
    const b3b3 = qmq(b3, b3);
    const _b3b3 = abs(b3b3[1]);
    const b3b3_ = _b3 * b3_ + b3_ * (_b3 + γγ3 * b3_) + 2 * _b3b3;
    const vₓₓₓ = qmq(b3b3, b3);
    const _vₓₓₓ = abs(vₓₓₓ[1]);
    const vₓₓₓ_ = _b3b3 * b3_ + b3b3_ * (_b3 + γγ3 * b3_) + 2 * _vₓₓₓ;
    const a3b3b3 = qmq(a3, b3b3);
    const _a3b3b3 = abs(a3b3b3[1]);
    const a3b3b3_ = _a3 * b3b3_ + a3_ * (_b3b3 + γγ3 * b3b3_) + 2 * _a3b3b3;
    const vₓₓᵧ = qmd(-3, a3b3b3);
    const _vₓₓᵧ = abs(vₓₓᵧ[1]);
    const vₓₓᵧ_ = 3 * a3b3b3_ + _vₓₓᵧ;
    const a3a3b3 = qmq(a3a3, b3);
    const _a3a3b3 = abs(a3a3b3[1]);
    const a3a3b3_ = _a3a3 * b3_ + a3a3_ * (_b3 + γγ3 * b3_) + 2 * _a3a3b3;
    const vₓᵧᵧ = qmd(3, a3a3b3);
    const _vₓᵧᵧ = abs(vₓᵧᵧ[1]);
    const vₓᵧᵧ_ = 3 * a3a3b3_ + _vₓᵧᵧ;
    const a3a3a3 = qmq(a3a3, a3);
    const _a3a3a3 = abs(a3a3a3[1]);
    const a3a3a3_ = _a3a3 * a3_ + a3a3_ * (_a3 + γγ3 * a3_) + 2 * _a3a3a3;
    const vᵧᵧᵧ = qno(a3a3a3);
    const vᵧᵧᵧ_ = a3a3a3_;
    const b2b3 = qmq(b2, b3);
    const _b2b3 = abs(b2b3[1]);
    const b2b3_ = _b2 * b3_ + b2_ * (_b3 + γγ3 * b3_) + 2 * _b2b3;
    const b2b3x13 = qmq(b2b3, x13);
    const _b2b3x13 = abs(b2b3x13[1]);
    const b2b3x13_ = _b2b3 * x13_ + b2b3_ * (_x13 + γγ3 * x13_) + 2 * _b2b3x13;
    const b1b3 = qmq(b1, b3);
    const _b1b3 = abs(b1b3[1]);
    const b1b3_ = _b1 * b3_ + b1_ * (_b3 + γγ3 * b3_) + 2 * _b1b3;
    const b1b3x2 = qm2(b1b3);
    const b1b3x2_ = 2 * b1b3_;
    const b2b2 = qmq(b2, b2);
    const _b2b2 = abs(b2b2[1]);
    const b2b2_ = _b2 * b2_ + b2_ * (_b2 + γγ3 * b2_) + 2 * _b2b2;
    const q1 = qdq(b1b3x2, b2b2);
    const _q1 = abs(q1[1]);
    const q1_ = b1b3x2_ + b2b2_ + _q1;
    const q1x23 = qmq(q1, x23);
    const _q1x23 = abs(q1x23[1]);
    const q1x23_ = _q1 * x23_ + q1_ * (_x23 + γγ3 * x23_) + 2 * _q1x23;
    const vₓₓ = qaq(b2b3x13, q1x23);
    const _vₓₓ = abs(vₓₓ[1]);
    const vₓₓ_ = b2b3x13_ + q1x23_ + _vₓₓ;
    const q2 = qaq(a2b3, a3b2);
    const _q2 = abs(q2[1]);
    const q2_ = a2b3_ + a3b2_ + _q2;
    const q2x13 = qmq(q2, x13);
    const _q2x13 = abs(q2x13[1]);
    const q2x13_ = _q2 * x13_ + q2_ * (_x13 + γγ3 * x13_) + 2 * _q2x13;
    const q6 = qaq(a1b3, a3b1);
    const _q6 = abs(q6[1]);
    const q6_ = a1b3_ + a3b1_ + _q6;
    const a2b2 = qmq(a2, b2);
    const _a2b2 = abs(a2b2[1]);
    const a2b2_ = _a2 * b2_ + a2_ * (_b2 + γγ3 * b2_) + 2 * _a2b2;
    const q3 = qdq(q6, a2b2);
    const _q3 = abs(q3[1]);
    const q3_ = q6_ + a2b2_ + _q3;
    const q3x23 = qmq(q3, x23);
    const _q3x23 = abs(q3x23[1]);
    const q3x23_ = _q3 * x23_ + q3_ * (_x23 + γγ3 * x23_) + 2 * _q3x23;
    const q3x23x2 = qm2(q3x23);
    const q3x23x2_ = 2 * q3x23_;
    const q4 = qaq(q2x13, q3x23x2);
    const _q4 = abs(q4[1]);
    const q4_ = q2x13_ + q3x23x2_ + _q4;
    const vₓᵧ = qno(q4);
    const vₓᵧ_ = q4_;
    const a2a3 = qmq(a2, a3);
    const _a2a3 = abs(a2a3[1]);
    const a2a3_ = _a2 * a3_ + a2_ * (_a3 + γγ3 * a3_) + 2 * _a2a3;
    const a2a3x13 = qmq(a2a3, x13);
    const _a2a3x13 = abs(a2a3x13[1]);
    const a2a3x13_ = _a2a3 * x13_ + a2a3_ * (_x13 + γγ3 * x13_) + 2 * _a2a3x13;
    const a1a3 = qmq(a1, a3);
    const _a1a3 = abs(a1a3[1]);
    const a1a3_ = _a1 * a3_ + a1_ * (_a3 + γγ3 * a3_) + 2 * _a1a3;
    const a1a3x2 = qm2(a1a3);
    const a1a3x2_ = 2 * a1a3_;
    const a2a2 = qmq(a2, a2);
    const _a2a2 = abs(a2a2[1]);
    const a2a2_ = _a2 * a2_ + a2_ * (_a2 + γγ3 * a2_) + 2 * _a2a2;
    const q5 = qdq(a1a3x2, a2a2);
    const _q5 = abs(q5[1]);
    const q5_ = a1a3x2_ + a2a2_ + _q5;
    const q5x23 = qmq(q5, x23);
    const _q5x23 = abs(q5x23[1]);
    const q5x23_ = _q5 * x23_ + q5_ * (_x23 + γγ3 * x23_) + 2 * _q5x23;
    const vᵧᵧ = qaq(a2a3x13, q5x23);
    const _vᵧᵧ = abs(vᵧᵧ[1]);
    const vᵧᵧ_ = a2a3x13_ + q5x23_ + _vᵧᵧ;
    const x13x13 = qmq(x13, x13);
    const _x13x13 = abs(x13x13[1]);
    const x13x13_ = _x13 * x13_ + x13_ * (_x13 + γγ3 * x13_) + 2 * _x13x13;
    const x12x23 = qmq(x12, x23);
    const _x12x23 = abs(x12x23[1]);
    const x12x23_ = _x12 * x23_ + x12_ * (_x23 + γγ3 * x23_) + 2 * _x12x23;
    const K = qdq(x13x13, x12x23);
    const _K = abs(K[1]);
    const K_ = x13x13_ + x12x23_ + _K;
    const vₓ = qmq(b1, K);
    const _vₓ = abs(vₓ[1]);
    const vₓ_ = _b1 * K_ + b1_ * (_K + γγ3 * K_) + 2 * _vₓ;
    const a1K = qmq(a1, K);
    const _a1K = abs(a1K[1]);
    const a1K_ = _a1 * K_ + a1_ * (_K + γγ3 * K_) + 2 * _a1K;
    const vᵧ = qno(a1K);
    const vᵧ_ = a1K_;
    return {
        coeffs: { vₓₓₓ, vₓₓᵧ, vₓᵧᵧ, vᵧᵧᵧ, vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ },
        errorBound: { vₓₓₓ_, vₓₓᵧ_, vₓᵧᵧ_, vᵧᵧᵧ_, vₓₓ_, vₓᵧ_, vᵧᵧ_, vₓ_, vᵧ_ } // still to be multiplied by `γγ3`
    };
}
export { getImplicitForm3AtStartDd };
//# sourceMappingURL=get-implicit-form3-at-start-dd.js.map