import { ddDiffDd, ddMultDd, ddMultDouble2, ddNegativeOf } from "double-double";
import { toPowerBasis2DdWithRunningError } from "../../../../to-power-basis/to-power-basis/double-double/to-power-basis-dd-with-running-error.js";
import { γγ3 } from "../../../../error-analysis/error-analysis.js";

const qmq = ddMultDd;
const qdq = ddDiffDd;
const qmd = ddMultDouble2;
const qno = ddNegativeOf;

const { abs } = Math;


/**
 * Returns the implicit form (including a coefficientwise error bound) of the
 * given quadratic bezier curve *relative to its start point*, i.e. of the curve translated
 * so that it starts at the origin (so that the constant coefficient `v` is
 * zero and not returned).
 *
 * * with the power basis `x(t) - x₀ = a₂t² + a₁t`, `y(t) - y₀ = b₂t² + b₁t` and
 * the cross product `×₁₂ = a₁b₂ - a₂b₁` the implicit form
 * `vₓₓx² + vₓᵧxy + vᵧᵧy² + vₓx + vᵧy = 0` is given by
 *   * `vₓₓ = b₂²`, `vₓᵧ = -2a₂b₂`, `vᵧᵧ = a₂²`
 *   * `vₓ = b₁×₁₂`, `vᵧ = -a₁×₁₂`
 * * no translation is actually done (the power basis coefficients, apart from
 * the constant terms, are coordinate differences)
 * * intermediate calculations are done in double-double precision
 * * the error bound returned still needs to be multiplied by `γγ3`
 * * this code was generated (see `research/gen-shared-start.py`)
 *
 * @param ps an order 2 bezier curve given as an ordered array of its control
 * point coordinates
 *
 * @internal
 */
function getImplicitForm2AtStartDd(ps: number[][]) {
    const {
        coeffs: [[a2,a1],[b2,b1]],
        errorBound: [[a2_],[b2_]]
    } = toPowerBasis2DdWithRunningError(ps);

    const _a1 = abs(a1[1]);
    const _b1 = abs(b1[1]);
    const _a2 = abs(a2[1]);
    const _b2 = abs(b2[1]);
    const a1b2 = qmq(a1,b2);
    const _a1b2 = abs(a1b2[1]);
    const a1b2_ = _a1*b2_ + 2*_a1b2;
    const a2b1 = qmq(a2,b1);
    const _a2b1 = abs(a2b1[1]);
    const a2b1_ = a2_*_b1 + 2*_a2b1;
    const x12 = qdq(a1b2,a2b1);
    const _x12 = abs(x12[1]);
    const x12_ = a1b2_ + a2b1_ + _x12;
    const vₓₓ = qmq(b2,b2);
    const _vₓₓ = abs(vₓₓ[1]);
    const vₓₓ_ = _b2*b2_ + b2_*(_b2 + γγ3*b2_) + 2*_vₓₓ;
    const a2b2 = qmq(a2,b2);
    const _a2b2 = abs(a2b2[1]);
    const a2b2_ = _a2*b2_ + a2_*(_b2 + γγ3*b2_) + 2*_a2b2;
    const vₓᵧ = qmd(-2,a2b2);
    const vₓᵧ_ = 2*a2b2_;
    const vᵧᵧ = qmq(a2,a2);
    const _vᵧᵧ = abs(vᵧᵧ[1]);
    const vᵧᵧ_ = _a2*a2_ + a2_*(_a2 + γγ3*a2_) + 2*_vᵧᵧ;
    const vₓ = qmq(b1,x12);
    const _vₓ = abs(vₓ[1]);
    const vₓ_ = _b1*x12_ + 2*_vₓ;
    const a1x12 = qmq(a1,x12);
    const _a1x12 = abs(a1x12[1]);
    const a1x12_ = _a1*x12_ + 2*_a1x12;
    const vᵧ = qno(a1x12);
    const vᵧ_ = a1x12_;

    return {
        coeffs: { vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ },
        errorBound: { vₓₓ_, vₓᵧ_, vᵧᵧ_, vₓ_, vᵧ_ }  // still to be multiplied by `γγ3`
    };
}


export { getImplicitForm2AtStartDd }
