import { ddAddDd, ddMultDd } from "double-double";
import { toPowerBasis1DdWithRunningError } from "../../../../to-power-basis/to-power-basis/double-double/to-power-basis-dd-with-running-error.js";
import { γγ3 } from "../../../../error-analysis/error-analysis.js";
import { getImplicitForm3AtStartDd } from "./get-implicit-form3-at-start-dd.js";
const qmq = ddMultDd;
const qaq = ddAddDd;
const { abs } = Math;
/**
 * Returns a polynomial in 1 variable (including coefficientwise error bound)
 * whose roots are the parameter values of the intersection points of an order
 * 3 and 1 bezier curve (i.e. a cubic bezier curve and a line) *starting
 * at the same point*, with the (known) root at `t = 0` divided out.
 *
 * The returned polynomial degree will be 2 (i.e. one less than given by
 * [Bézout's theorem](https://en.wikipedia.org/wiki/B%C3%A9zout%27s_theorem))
 *
 * The returned polynomial coefficients are given densely as an array of
 * double-double precision floating point numbers from highest to lowest power,
 * e.g. `[[0,5],[0,-3],[0,0]]` represents the polynomial `5x^2 - 3x`.
 *
 * * intermediate calculations are done in double-double precision
 * * the error bound returned still needs to be multiplied by `γγ3`
 * * with the implicit form of `ps1` relative to its start point, `P`, (see
 * [[getImplicitForm3AtStartDd]]) and `ps2(t) - P = t(u(t), w(t))` the polynomial is
 * given by `F₁(u,w) + tF₂(u,w) + t²F₃(u,w)` where `Fₖ` is the degree `k` part
 * of the implicit form:
 *   * `F₁ = vₓu + vᵧw`
 *   * `F₂ = vₓₓu² + vₓᵧuw + vᵧᵧw²`
 *   * `F₃ = vₓₓₓu³ + vₓₓᵧu²w + vₓᵧᵧuw² + vᵧᵧᵧw³`
 * * if the curves are tangent at `P` the constant term is exactly zero
 * * this code was generated (see `research/gen-shared-start.py`)
 *
 * * **precondition:** `ps1[0]` and `ps2[0]` must be exactly equal
 *
 * @param ps1
 * @param ps2
 *
 * @internal
 */
function getCoeffsBez3Bez1SharedStartDd(ps1, ps2) {
    const { coeffs: { vₓ, vᵧ, vₓₓ, vₓᵧ, vᵧᵧ, vₓₓₓ, vₓₓᵧ, vₓᵧᵧ, vᵧᵧᵧ }, errorBound: { vₓ_, vᵧ_, vₓₓ_, vₓᵧ_, vᵧᵧ_, vₓₓₓ_, vₓₓᵧ_, vₓᵧᵧ_, vᵧᵧᵧ_ } } = getImplicitForm3AtStartDd(ps1);
    const [[c1], [d1]] = toPowerBasis1DdWithRunningError(ps2); // exact
    const _vₓₓ = abs(vₓₓ[1]);
    const _vₓᵧ = abs(vₓᵧ[1]);
    const _vᵧᵧ = abs(vᵧᵧ[1]);
    const _vₓₓₓ = abs(vₓₓₓ[1]);
    const _vₓₓᵧ = abs(vₓₓᵧ[1]);
    const _vₓᵧᵧ = abs(vₓᵧᵧ[1]);
    const _vᵧᵧᵧ = abs(vᵧᵧᵧ[1]);
    const _c1 = abs(c1[1]);
    const _d1 = abs(d1[1]);
    const xu0 = qmq(vₓ, c1);
    const _xu0 = abs(xu0[1]);
    const xu0_ = vₓ_ * _c1 + 2 * _xu0;
    const yw0 = qmq(vᵧ, d1);
    const _yw0 = abs(yw0[1]);
    const yw0_ = vᵧ_ * _d1 + 2 * _yw0;
    const f10 = qaq(xu0, yw0);
    const _f10 = abs(f10[1]);
    const f10_ = xu0_ + yw0_ + _f10;
    const uu0a = qmq(c1, c1);
    const _uu0a = abs(uu0a[1]);
    const uu0a_ = 2 * _uu0a;
    const uw0a = qmq(c1, d1);
    const _uw0a = abs(uw0a[1]);
    const uw0a_ = 2 * _uw0a;
    const ww0a = qmq(d1, d1);
    const _ww0a = abs(ww0a[1]);
    const ww0a_ = 2 * _ww0a;
    const xxuu0 = qmq(vₓₓ, uu0a);
    const _xxuu0 = abs(xxuu0[1]);
    const xxuu0_ = _vₓₓ * uu0a_ + vₓₓ_ * (_uu0a + γγ3 * uu0a_) + 2 * _xxuu0;
    const xyuw0 = qmq(vₓᵧ, uw0a);
    const _xyuw0 = abs(xyuw0[1]);
    const xyuw0_ = _vₓᵧ * uw0a_ + vₓᵧ_ * (_uw0a + γγ3 * uw0a_) + 2 * _xyuw0;
    const f2a0 = qaq(xxuu0, xyuw0);
    const _f2a0 = abs(f2a0[1]);
    const f2a0_ = xxuu0_ + xyuw0_ + _f2a0;
    const yyww0 = qmq(vᵧᵧ, ww0a);
    const _yyww0 = abs(yyww0[1]);
    const yyww0_ = _vᵧᵧ * ww0a_ + vᵧᵧ_ * (_ww0a + γγ3 * ww0a_) + 2 * _yyww0;
    const f2b0 = qaq(f2a0, yyww0);
    const _f2b0 = abs(f2b0[1]);
    const f2b0_ = f2a0_ + yyww0_ + _f2b0;
    const uuu0a = qmq(uu0a, c1);
    const _uuu0a = abs(uuu0a[1]);
    const uuu0a_ = uu0a_ * _c1 + 2 * _uuu0a;
    const uuw0a = qmq(uu0a, d1);
    const _uuw0a = abs(uuw0a[1]);
    const uuw0a_ = uu0a_ * _d1 + 2 * _uuw0a;
    const uww0a = qmq(uw0a, d1);
    const _uww0a = abs(uww0a[1]);
    const uww0a_ = uw0a_ * _d1 + 2 * _uww0a;
    const www0a = qmq(ww0a, d1);
    const _www0a = abs(www0a[1]);
    const www0a_ = ww0a_ * _d1 + 2 * _www0a;
    const xxxuuu0 = qmq(vₓₓₓ, uuu0a);
    const _xxxuuu0 = abs(xxxuuu0[1]);
    const xxxuuu0_ = _vₓₓₓ * uuu0a_ + vₓₓₓ_ * (_uuu0a + γγ3 * uuu0a_) + 2 * _xxxuuu0;
    const xxyuuw0 = qmq(vₓₓᵧ, uuw0a);
    const _xxyuuw0 = abs(xxyuuw0[1]);
    const xxyuuw0_ = _vₓₓᵧ * uuw0a_ + vₓₓᵧ_ * (_uuw0a + γγ3 * uuw0a_) + 2 * _xxyuuw0;
    const f3a0 = qaq(xxxuuu0, xxyuuw0);
    const _f3a0 = abs(f3a0[1]);
    const f3a0_ = xxxuuu0_ + xxyuuw0_ + _f3a0;
    const xyyuww0 = qmq(vₓᵧᵧ, uww0a);
    const _xyyuww0 = abs(xyyuww0[1]);
    const xyyuww0_ = _vₓᵧᵧ * uww0a_ + vₓᵧᵧ_ * (_uww0a + γγ3 * uww0a_) + 2 * _xyyuww0;
    const yyywww0 = qmq(vᵧᵧᵧ, www0a);
    const _yyywww0 = abs(yyywww0[1]);
    const yyywww0_ = _vᵧᵧᵧ * www0a_ + vᵧᵧᵧ_ * (_www0a + γγ3 * www0a_) + 2 * _yyywww0;
    const f3b0 = qaq(xyyuww0, yyywww0);
    const _f3b0 = abs(f3b0[1]);
    const f3b0_ = xyyuww0_ + yyywww0_ + _f3b0;
    const f3c0 = qaq(f3a0, f3b0);
    const _f3c0 = abs(f3c0[1]);
    const f3c0_ = f3a0_ + f3b0_ + _f3c0;
    return {
        coeffs: [f3c0, f2b0, f10],
        errBound: [f3c0_, f2b0_, f10_] // still to be multiplied by `γγ3`
    };
}
export { getCoeffsBez3Bez1SharedStartDd };
//# sourceMappingURL=get-coeffs-bez3-bez1-shared-start-dd.js.map