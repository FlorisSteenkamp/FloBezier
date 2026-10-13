import { ddAddDd, ddMultDd } from "double-double";
import { toPowerBasis1DdWithRunningError } from "../../../../to-power-basis/to-power-basis/double-double/to-power-basis-dd-with-running-error.js";
import { γγ3 } from "../../../../error-analysis/error-analysis.js";
import { getImplicitForm2AtStartDd } from "./get-implicit-form2-at-start-dd.js";

const qmq = ddMultDd;
const qaq = ddAddDd;

const { abs } = Math;


/**
 * Returns a polynomial in 1 variable (including coefficientwise error bound)
 * whose roots are the parameter values of the intersection points of an order
 * 2 and 1 bezier curve (i.e. a quadratic bezier curve and a line) *starting
 * at the same point*, with the (known) root at `t = 0` divided out.
 *
 * The returned polynomial degree will be 1 (i.e. one less than given by
 * [Bézout's theorem](https://en.wikipedia.org/wiki/B%C3%A9zout%27s_theorem))
 *
 * The returned polynomial coefficients are given densely as an array of
 * double-double precision floating point numbers from highest to lowest power,
 * e.g. `[[0,5],[0,-3],[0,0]]` represents the polynomial `5x^2 - 3x`.
 *
 * * intermediate calculations are done in double-double precision
 * * the error bound returned still needs to be multiplied by `γγ3`
 * * with the implicit form of `ps1` relative to its start point, `P`, (see
 * [[getImplicitForm2AtStartDd]]) and `ps2(t) - P = t(u(t), w(t))` the polynomial is
 * given by `F₁(u,w) + tF₂(u,w)` where `Fₖ` is the degree `k` part
 * of the implicit form:
 *   * `F₁ = vₓu + vᵧw`
 *   * `F₂ = vₓₓu² + vₓᵧuw + vᵧᵧw²`
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
function getCoeffsBez2Bez1SharedStartDd(
        ps1: number[][],
        ps2: number[][]): { coeffs: number[][]; errBound: number[]; } {

    const {
        coeffs: { vₓ, vᵧ, vₓₓ, vₓᵧ, vᵧᵧ },
        errorBound: { vₓ_, vᵧ_, vₓₓ_, vₓᵧ_, vᵧᵧ_ }
    } = getImplicitForm2AtStartDd(ps1);

    const [[c1],[d1]] = toPowerBasis1DdWithRunningError(ps2);  // exact

    const _vₓₓ = abs(vₓₓ[1]);
    const _vₓᵧ = abs(vₓᵧ[1]);
    const _vᵧᵧ = abs(vᵧᵧ[1]);
    const _c1 = abs(c1[1]);
    const _d1 = abs(d1[1]);
    const xu0 = qmq(vₓ,c1);
    const _xu0 = abs(xu0[1]);
    const xu0_ = vₓ_*_c1 + 2*_xu0;
    const yw0 = qmq(vᵧ,d1);
    const _yw0 = abs(yw0[1]);
    const yw0_ = vᵧ_*_d1 + 2*_yw0;
    const f10 = qaq(xu0,yw0);
    const _f10 = abs(f10[1]);
    const f10_ = xu0_ + yw0_ + _f10;
    const uu0a = qmq(c1,c1);
    const _uu0a = abs(uu0a[1]);
    const uu0a_ = 2*_uu0a;
    const uw0a = qmq(c1,d1);
    const _uw0a = abs(uw0a[1]);
    const uw0a_ = 2*_uw0a;
    const ww0a = qmq(d1,d1);
    const _ww0a = abs(ww0a[1]);
    const ww0a_ = 2*_ww0a;
    const xxuu0 = qmq(vₓₓ,uu0a);
    const _xxuu0 = abs(xxuu0[1]);
    const xxuu0_ = _vₓₓ*uu0a_ + vₓₓ_*(_uu0a + γγ3*uu0a_) + 2*_xxuu0;
    const xyuw0 = qmq(vₓᵧ,uw0a);
    const _xyuw0 = abs(xyuw0[1]);
    const xyuw0_ = _vₓᵧ*uw0a_ + vₓᵧ_*(_uw0a + γγ3*uw0a_) + 2*_xyuw0;
    const f2a0 = qaq(xxuu0,xyuw0);
    const _f2a0 = abs(f2a0[1]);
    const f2a0_ = xxuu0_ + xyuw0_ + _f2a0;
    const yyww0 = qmq(vᵧᵧ,ww0a);
    const _yyww0 = abs(yyww0[1]);
    const yyww0_ = _vᵧᵧ*ww0a_ + vᵧᵧ_*(_ww0a + γγ3*ww0a_) + 2*_yyww0;
    const f2b0 = qaq(f2a0,yyww0);
    const _f2b0 = abs(f2b0[1]);
    const f2b0_ = f2a0_ + yyww0_ + _f2b0;


    return {
        coeffs:   [f2b0, f10],
        errBound: [f2b0_, f10_]  // still to be multiplied by `γγ3`
    };
}


export { getCoeffsBez2Bez1SharedStartDd }
