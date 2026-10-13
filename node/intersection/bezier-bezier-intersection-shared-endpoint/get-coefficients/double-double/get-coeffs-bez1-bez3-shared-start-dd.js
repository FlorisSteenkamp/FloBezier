import { ddAddDd, ddMultDd } from "double-double";
import { toPowerBasis3DdWithRunningError } from "../../../../to-power-basis/to-power-basis/double-double/to-power-basis-dd-with-running-error.js";
import { getImplicitForm1AtStartDd } from "./get-implicit-form1-at-start-dd.js";
const qmq = ddMultDd;
const qaq = ddAddDd;
const { abs } = Math;
/**
 * Returns a polynomial in 1 variable (including coefficientwise error bound)
 * whose roots are the parameter values of the intersection points of an order
 * 1 and 3 bezier curve (i.e. a line and a cubic bezier curve) *starting
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
 * [[getImplicitForm1AtStartDd]]) and `ps2(t) - P = t(u(t), w(t))` the polynomial is
 * given by `F₁(u,w)` where `Fₖ` is the degree `k` part
 * of the implicit form:
 *   * `F₁ = vₓu + vᵧw`
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
function getCoeffsBez1Bez3SharedStartDd(ps1, ps2) {
    const { coeffs: { vₓ, vᵧ } } = getImplicitForm1AtStartDd(ps1); // exact
    const { coeffs: [[c3, c2, c1], [d3, d2, d1]], errorBound: [[c3_, c2_, c1_], [d3_, d2_, d1_]] } = toPowerBasis3DdWithRunningError(ps2);
    const _vₓ = abs(vₓ[1]);
    const _vᵧ = abs(vᵧ[1]);
    const xu0 = qmq(vₓ, c1);
    const _xu0 = abs(xu0[1]);
    const xu0_ = _vₓ * c1_ + 2 * _xu0;
    const xu1 = qmq(vₓ, c2);
    const _xu1 = abs(xu1[1]);
    const xu1_ = _vₓ * c2_ + 2 * _xu1;
    const xu2 = qmq(vₓ, c3);
    const _xu2 = abs(xu2[1]);
    const xu2_ = _vₓ * c3_ + 2 * _xu2;
    const yw0 = qmq(vᵧ, d1);
    const _yw0 = abs(yw0[1]);
    const yw0_ = _vᵧ * d1_ + 2 * _yw0;
    const yw1 = qmq(vᵧ, d2);
    const _yw1 = abs(yw1[1]);
    const yw1_ = _vᵧ * d2_ + 2 * _yw1;
    const yw2 = qmq(vᵧ, d3);
    const _yw2 = abs(yw2[1]);
    const yw2_ = _vᵧ * d3_ + 2 * _yw2;
    const f10 = qaq(xu0, yw0);
    const _f10 = abs(f10[1]);
    const f10_ = xu0_ + yw0_ + _f10;
    const f11 = qaq(xu1, yw1);
    const _f11 = abs(f11[1]);
    const f11_ = xu1_ + yw1_ + _f11;
    const f12 = qaq(xu2, yw2);
    const _f12 = abs(f12[1]);
    const f12_ = xu2_ + yw2_ + _f12;
    return {
        coeffs: [f12, f11, f10],
        errBound: [f12_, f11_, f10_] // still to be multiplied by `γγ3`
    };
}
export { getCoeffsBez1Bez3SharedStartDd };
//# sourceMappingURL=get-coeffs-bez1-bez3-shared-start-dd.js.map