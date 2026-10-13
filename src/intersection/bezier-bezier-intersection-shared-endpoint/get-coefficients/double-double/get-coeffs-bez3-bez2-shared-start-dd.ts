import { ddAddDd, ddMultDd } from "double-double";
import { toPowerBasis2DdWithRunningError } from "../../../../to-power-basis/to-power-basis/double-double/to-power-basis-dd-with-running-error.js";
import { γγ3 } from "../../../../error-analysis/error-analysis.js";
import { getImplicitForm3AtStartDd } from "./get-implicit-form3-at-start-dd.js";

const qmq = ddMultDd;
const qaq = ddAddDd;

const { abs } = Math;


/**
 * Returns a polynomial in 1 variable (including coefficientwise error bound)
 * whose roots are the parameter values of the intersection points of an order
 * 3 and 2 bezier curve (i.e. a cubic bezier curve and a quadratic bezier curve) *starting
 * at the same point*, with the (known) root at `t = 0` divided out.
 *
 * The returned polynomial degree will be 5 (i.e. one less than given by
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
function getCoeffsBez3Bez2SharedStartDd(
        ps1: number[][],
        ps2: number[][]): { coeffs: number[][]; errBound: number[]; } {

    const {
        coeffs: { vₓ, vᵧ, vₓₓ, vₓᵧ, vᵧᵧ, vₓₓₓ, vₓₓᵧ, vₓᵧᵧ, vᵧᵧᵧ },
        errorBound: { vₓ_, vᵧ_, vₓₓ_, vₓᵧ_, vᵧᵧ_, vₓₓₓ_, vₓₓᵧ_, vₓᵧᵧ_, vᵧᵧᵧ_ }
    } = getImplicitForm3AtStartDd(ps1);

    const {
        coeffs: [[c2,c1],[d2,d1]],
        errorBound: [[c2_],[d2_]]  // `c1` and `d1` are error free
    } = toPowerBasis2DdWithRunningError(ps2);

    const _vₓ = abs(vₓ[1]);
    const _vᵧ = abs(vᵧ[1]);
    const _vₓₓ = abs(vₓₓ[1]);
    const _vₓᵧ = abs(vₓᵧ[1]);
    const _vᵧᵧ = abs(vᵧᵧ[1]);
    const _vₓₓₓ = abs(vₓₓₓ[1]);
    const _vₓₓᵧ = abs(vₓₓᵧ[1]);
    const _vₓᵧᵧ = abs(vₓᵧᵧ[1]);
    const _vᵧᵧᵧ = abs(vᵧᵧᵧ[1]);
    const _c1 = abs(c1[1]);
    const _c2 = abs(c2[1]);
    const _d1 = abs(d1[1]);
    const _d2 = abs(d2[1]);
    const xu0 = qmq(vₓ,c1);
    const _xu0 = abs(xu0[1]);
    const xu0_ = vₓ_*_c1 + 2*_xu0;
    const xu1 = qmq(vₓ,c2);
    const _xu1 = abs(xu1[1]);
    const xu1_ = _vₓ*c2_ + vₓ_*(_c2 + γγ3*c2_) + 2*_xu1;
    const yw0 = qmq(vᵧ,d1);
    const _yw0 = abs(yw0[1]);
    const yw0_ = vᵧ_*_d1 + 2*_yw0;
    const yw1 = qmq(vᵧ,d2);
    const _yw1 = abs(yw1[1]);
    const yw1_ = _vᵧ*d2_ + vᵧ_*(_d2 + γγ3*d2_) + 2*_yw1;
    const f10 = qaq(xu0,yw0);
    const _f10 = abs(f10[1]);
    const f10_ = xu0_ + yw0_ + _f10;
    const f11 = qaq(xu1,yw1);
    const _f11 = abs(f11[1]);
    const f11_ = xu1_ + yw1_ + _f11;
    const uu0a = qmq(c1,c1);
    const _uu0a = abs(uu0a[1]);
    const uu0a_ = 2*_uu0a;
    const uu1a = qmq(c1,c2);
    const _uu1a = abs(uu1a[1]);
    const uu1a_ = _c1*c2_ + 2*_uu1a;
    const uu1b = qmq(c2,c1);
    const _uu1b = abs(uu1b[1]);
    const uu1b_ = c2_*_c1 + 2*_uu1b;
    const uu1bs = qaq(uu1a,uu1b);
    const _uu1bs = abs(uu1bs[1]);
    const uu1bs_ = uu1a_ + uu1b_ + _uu1bs;
    const uu2a = qmq(c2,c2);
    const _uu2a = abs(uu2a[1]);
    const uu2a_ = _c2*c2_ + c2_*(_c2 + γγ3*c2_) + 2*_uu2a;
    const uw0a = qmq(c1,d1);
    const _uw0a = abs(uw0a[1]);
    const uw0a_ = 2*_uw0a;
    const uw1a = qmq(c1,d2);
    const _uw1a = abs(uw1a[1]);
    const uw1a_ = _c1*d2_ + 2*_uw1a;
    const uw1b = qmq(c2,d1);
    const _uw1b = abs(uw1b[1]);
    const uw1b_ = c2_*_d1 + 2*_uw1b;
    const uw1bs = qaq(uw1a,uw1b);
    const _uw1bs = abs(uw1bs[1]);
    const uw1bs_ = uw1a_ + uw1b_ + _uw1bs;
    const uw2a = qmq(c2,d2);
    const _uw2a = abs(uw2a[1]);
    const uw2a_ = _c2*d2_ + c2_*(_d2 + γγ3*d2_) + 2*_uw2a;
    const ww0a = qmq(d1,d1);
    const _ww0a = abs(ww0a[1]);
    const ww0a_ = 2*_ww0a;
    const ww1a = qmq(d1,d2);
    const _ww1a = abs(ww1a[1]);
    const ww1a_ = _d1*d2_ + 2*_ww1a;
    const ww1b = qmq(d2,d1);
    const _ww1b = abs(ww1b[1]);
    const ww1b_ = d2_*_d1 + 2*_ww1b;
    const ww1bs = qaq(ww1a,ww1b);
    const _ww1bs = abs(ww1bs[1]);
    const ww1bs_ = ww1a_ + ww1b_ + _ww1bs;
    const ww2a = qmq(d2,d2);
    const _ww2a = abs(ww2a[1]);
    const ww2a_ = _d2*d2_ + d2_*(_d2 + γγ3*d2_) + 2*_ww2a;
    const xxuu0 = qmq(vₓₓ,uu0a);
    const _xxuu0 = abs(xxuu0[1]);
    const xxuu0_ = _vₓₓ*uu0a_ + vₓₓ_*(_uu0a + γγ3*uu0a_) + 2*_xxuu0;
    const xxuu1 = qmq(vₓₓ,uu1bs);
    const _xxuu1 = abs(xxuu1[1]);
    const xxuu1_ = _vₓₓ*uu1bs_ + vₓₓ_*(_uu1bs + γγ3*uu1bs_) + 2*_xxuu1;
    const xxuu2 = qmq(vₓₓ,uu2a);
    const _xxuu2 = abs(xxuu2[1]);
    const xxuu2_ = _vₓₓ*uu2a_ + vₓₓ_*(_uu2a + γγ3*uu2a_) + 2*_xxuu2;
    const xyuw0 = qmq(vₓᵧ,uw0a);
    const _xyuw0 = abs(xyuw0[1]);
    const xyuw0_ = _vₓᵧ*uw0a_ + vₓᵧ_*(_uw0a + γγ3*uw0a_) + 2*_xyuw0;
    const xyuw1 = qmq(vₓᵧ,uw1bs);
    const _xyuw1 = abs(xyuw1[1]);
    const xyuw1_ = _vₓᵧ*uw1bs_ + vₓᵧ_*(_uw1bs + γγ3*uw1bs_) + 2*_xyuw1;
    const xyuw2 = qmq(vₓᵧ,uw2a);
    const _xyuw2 = abs(xyuw2[1]);
    const xyuw2_ = _vₓᵧ*uw2a_ + vₓᵧ_*(_uw2a + γγ3*uw2a_) + 2*_xyuw2;
    const f2a0 = qaq(xxuu0,xyuw0);
    const _f2a0 = abs(f2a0[1]);
    const f2a0_ = xxuu0_ + xyuw0_ + _f2a0;
    const f2a1 = qaq(xxuu1,xyuw1);
    const _f2a1 = abs(f2a1[1]);
    const f2a1_ = xxuu1_ + xyuw1_ + _f2a1;
    const f2a2 = qaq(xxuu2,xyuw2);
    const _f2a2 = abs(f2a2[1]);
    const f2a2_ = xxuu2_ + xyuw2_ + _f2a2;
    const yyww0 = qmq(vᵧᵧ,ww0a);
    const _yyww0 = abs(yyww0[1]);
    const yyww0_ = _vᵧᵧ*ww0a_ + vᵧᵧ_*(_ww0a + γγ3*ww0a_) + 2*_yyww0;
    const yyww1 = qmq(vᵧᵧ,ww1bs);
    const _yyww1 = abs(yyww1[1]);
    const yyww1_ = _vᵧᵧ*ww1bs_ + vᵧᵧ_*(_ww1bs + γγ3*ww1bs_) + 2*_yyww1;
    const yyww2 = qmq(vᵧᵧ,ww2a);
    const _yyww2 = abs(yyww2[1]);
    const yyww2_ = _vᵧᵧ*ww2a_ + vᵧᵧ_*(_ww2a + γγ3*ww2a_) + 2*_yyww2;
    const f2b0 = qaq(f2a0,yyww0);
    const _f2b0 = abs(f2b0[1]);
    const f2b0_ = f2a0_ + yyww0_ + _f2b0;
    const f2b1 = qaq(f2a1,yyww1);
    const _f2b1 = abs(f2b1[1]);
    const f2b1_ = f2a1_ + yyww1_ + _f2b1;
    const f2b2 = qaq(f2a2,yyww2);
    const _f2b2 = abs(f2b2[1]);
    const f2b2_ = f2a2_ + yyww2_ + _f2b2;
    const r1 = qaq(f11,f2b0);
    const _r1 = abs(r1[1]);
    const r1_ = f11_ + f2b0_ + _r1;
    const uuu0a = qmq(uu0a,c1);
    const _uuu0a = abs(uuu0a[1]);
    const uuu0a_ = uu0a_*_c1 + 2*_uuu0a;
    const uuu1a = qmq(uu0a,c2);
    const _uuu1a = abs(uuu1a[1]);
    const uuu1a_ = _uu0a*c2_ + uu0a_*(_c2 + γγ3*c2_) + 2*_uuu1a;
    const uuu1b = qmq(uu1bs,c1);
    const _uuu1b = abs(uuu1b[1]);
    const uuu1b_ = uu1bs_*_c1 + 2*_uuu1b;
    const uuu1bs = qaq(uuu1a,uuu1b);
    const _uuu1bs = abs(uuu1bs[1]);
    const uuu1bs_ = uuu1a_ + uuu1b_ + _uuu1bs;
    const uuu2a = qmq(uu1bs,c2);
    const _uuu2a = abs(uuu2a[1]);
    const uuu2a_ = _uu1bs*c2_ + uu1bs_*(_c2 + γγ3*c2_) + 2*_uuu2a;
    const uuu2b = qmq(uu2a,c1);
    const _uuu2b = abs(uuu2b[1]);
    const uuu2b_ = uu2a_*_c1 + 2*_uuu2b;
    const uuu2bs = qaq(uuu2a,uuu2b);
    const _uuu2bs = abs(uuu2bs[1]);
    const uuu2bs_ = uuu2a_ + uuu2b_ + _uuu2bs;
    const uuu3a = qmq(uu2a,c2);
    const _uuu3a = abs(uuu3a[1]);
    const uuu3a_ = _uu2a*c2_ + uu2a_*(_c2 + γγ3*c2_) + 2*_uuu3a;
    const uuw0a = qmq(uu0a,d1);
    const _uuw0a = abs(uuw0a[1]);
    const uuw0a_ = uu0a_*_d1 + 2*_uuw0a;
    const uuw1a = qmq(uu0a,d2);
    const _uuw1a = abs(uuw1a[1]);
    const uuw1a_ = _uu0a*d2_ + uu0a_*(_d2 + γγ3*d2_) + 2*_uuw1a;
    const uuw1b = qmq(uu1bs,d1);
    const _uuw1b = abs(uuw1b[1]);
    const uuw1b_ = uu1bs_*_d1 + 2*_uuw1b;
    const uuw1bs = qaq(uuw1a,uuw1b);
    const _uuw1bs = abs(uuw1bs[1]);
    const uuw1bs_ = uuw1a_ + uuw1b_ + _uuw1bs;
    const uuw2a = qmq(uu1bs,d2);
    const _uuw2a = abs(uuw2a[1]);
    const uuw2a_ = _uu1bs*d2_ + uu1bs_*(_d2 + γγ3*d2_) + 2*_uuw2a;
    const uuw2b = qmq(uu2a,d1);
    const _uuw2b = abs(uuw2b[1]);
    const uuw2b_ = uu2a_*_d1 + 2*_uuw2b;
    const uuw2bs = qaq(uuw2a,uuw2b);
    const _uuw2bs = abs(uuw2bs[1]);
    const uuw2bs_ = uuw2a_ + uuw2b_ + _uuw2bs;
    const uuw3a = qmq(uu2a,d2);
    const _uuw3a = abs(uuw3a[1]);
    const uuw3a_ = _uu2a*d2_ + uu2a_*(_d2 + γγ3*d2_) + 2*_uuw3a;
    const uww0a = qmq(uw0a,d1);
    const _uww0a = abs(uww0a[1]);
    const uww0a_ = uw0a_*_d1 + 2*_uww0a;
    const uww1a = qmq(uw0a,d2);
    const _uww1a = abs(uww1a[1]);
    const uww1a_ = _uw0a*d2_ + uw0a_*(_d2 + γγ3*d2_) + 2*_uww1a;
    const uww1b = qmq(uw1bs,d1);
    const _uww1b = abs(uww1b[1]);
    const uww1b_ = uw1bs_*_d1 + 2*_uww1b;
    const uww1bs = qaq(uww1a,uww1b);
    const _uww1bs = abs(uww1bs[1]);
    const uww1bs_ = uww1a_ + uww1b_ + _uww1bs;
    const uww2a = qmq(uw1bs,d2);
    const _uww2a = abs(uww2a[1]);
    const uww2a_ = _uw1bs*d2_ + uw1bs_*(_d2 + γγ3*d2_) + 2*_uww2a;
    const uww2b = qmq(uw2a,d1);
    const _uww2b = abs(uww2b[1]);
    const uww2b_ = uw2a_*_d1 + 2*_uww2b;
    const uww2bs = qaq(uww2a,uww2b);
    const _uww2bs = abs(uww2bs[1]);
    const uww2bs_ = uww2a_ + uww2b_ + _uww2bs;
    const uww3a = qmq(uw2a,d2);
    const _uww3a = abs(uww3a[1]);
    const uww3a_ = _uw2a*d2_ + uw2a_*(_d2 + γγ3*d2_) + 2*_uww3a;
    const www0a = qmq(ww0a,d1);
    const _www0a = abs(www0a[1]);
    const www0a_ = ww0a_*_d1 + 2*_www0a;
    const www1a = qmq(ww0a,d2);
    const _www1a = abs(www1a[1]);
    const www1a_ = _ww0a*d2_ + ww0a_*(_d2 + γγ3*d2_) + 2*_www1a;
    const www1b = qmq(ww1bs,d1);
    const _www1b = abs(www1b[1]);
    const www1b_ = ww1bs_*_d1 + 2*_www1b;
    const www1bs = qaq(www1a,www1b);
    const _www1bs = abs(www1bs[1]);
    const www1bs_ = www1a_ + www1b_ + _www1bs;
    const www2a = qmq(ww1bs,d2);
    const _www2a = abs(www2a[1]);
    const www2a_ = _ww1bs*d2_ + ww1bs_*(_d2 + γγ3*d2_) + 2*_www2a;
    const www2b = qmq(ww2a,d1);
    const _www2b = abs(www2b[1]);
    const www2b_ = ww2a_*_d1 + 2*_www2b;
    const www2bs = qaq(www2a,www2b);
    const _www2bs = abs(www2bs[1]);
    const www2bs_ = www2a_ + www2b_ + _www2bs;
    const www3a = qmq(ww2a,d2);
    const _www3a = abs(www3a[1]);
    const www3a_ = _ww2a*d2_ + ww2a_*(_d2 + γγ3*d2_) + 2*_www3a;
    const xxxuuu0 = qmq(vₓₓₓ,uuu0a);
    const _xxxuuu0 = abs(xxxuuu0[1]);
    const xxxuuu0_ = _vₓₓₓ*uuu0a_ + vₓₓₓ_*(_uuu0a + γγ3*uuu0a_) + 2*_xxxuuu0;
    const xxxuuu1 = qmq(vₓₓₓ,uuu1bs);
    const _xxxuuu1 = abs(xxxuuu1[1]);
    const xxxuuu1_ = _vₓₓₓ*uuu1bs_ + vₓₓₓ_*(_uuu1bs + γγ3*uuu1bs_) + 2*_xxxuuu1;
    const xxxuuu2 = qmq(vₓₓₓ,uuu2bs);
    const _xxxuuu2 = abs(xxxuuu2[1]);
    const xxxuuu2_ = _vₓₓₓ*uuu2bs_ + vₓₓₓ_*(_uuu2bs + γγ3*uuu2bs_) + 2*_xxxuuu2;
    const xxxuuu3 = qmq(vₓₓₓ,uuu3a);
    const _xxxuuu3 = abs(xxxuuu3[1]);
    const xxxuuu3_ = _vₓₓₓ*uuu3a_ + vₓₓₓ_*(_uuu3a + γγ3*uuu3a_) + 2*_xxxuuu3;
    const xxyuuw0 = qmq(vₓₓᵧ,uuw0a);
    const _xxyuuw0 = abs(xxyuuw0[1]);
    const xxyuuw0_ = _vₓₓᵧ*uuw0a_ + vₓₓᵧ_*(_uuw0a + γγ3*uuw0a_) + 2*_xxyuuw0;
    const xxyuuw1 = qmq(vₓₓᵧ,uuw1bs);
    const _xxyuuw1 = abs(xxyuuw1[1]);
    const xxyuuw1_ = _vₓₓᵧ*uuw1bs_ + vₓₓᵧ_*(_uuw1bs + γγ3*uuw1bs_) + 2*_xxyuuw1;
    const xxyuuw2 = qmq(vₓₓᵧ,uuw2bs);
    const _xxyuuw2 = abs(xxyuuw2[1]);
    const xxyuuw2_ = _vₓₓᵧ*uuw2bs_ + vₓₓᵧ_*(_uuw2bs + γγ3*uuw2bs_) + 2*_xxyuuw2;
    const xxyuuw3 = qmq(vₓₓᵧ,uuw3a);
    const _xxyuuw3 = abs(xxyuuw3[1]);
    const xxyuuw3_ = _vₓₓᵧ*uuw3a_ + vₓₓᵧ_*(_uuw3a + γγ3*uuw3a_) + 2*_xxyuuw3;
    const f3a0 = qaq(xxxuuu0,xxyuuw0);
    const _f3a0 = abs(f3a0[1]);
    const f3a0_ = xxxuuu0_ + xxyuuw0_ + _f3a0;
    const f3a1 = qaq(xxxuuu1,xxyuuw1);
    const _f3a1 = abs(f3a1[1]);
    const f3a1_ = xxxuuu1_ + xxyuuw1_ + _f3a1;
    const f3a2 = qaq(xxxuuu2,xxyuuw2);
    const _f3a2 = abs(f3a2[1]);
    const f3a2_ = xxxuuu2_ + xxyuuw2_ + _f3a2;
    const f3a3 = qaq(xxxuuu3,xxyuuw3);
    const _f3a3 = abs(f3a3[1]);
    const f3a3_ = xxxuuu3_ + xxyuuw3_ + _f3a3;
    const xyyuww0 = qmq(vₓᵧᵧ,uww0a);
    const _xyyuww0 = abs(xyyuww0[1]);
    const xyyuww0_ = _vₓᵧᵧ*uww0a_ + vₓᵧᵧ_*(_uww0a + γγ3*uww0a_) + 2*_xyyuww0;
    const xyyuww1 = qmq(vₓᵧᵧ,uww1bs);
    const _xyyuww1 = abs(xyyuww1[1]);
    const xyyuww1_ = _vₓᵧᵧ*uww1bs_ + vₓᵧᵧ_*(_uww1bs + γγ3*uww1bs_) + 2*_xyyuww1;
    const xyyuww2 = qmq(vₓᵧᵧ,uww2bs);
    const _xyyuww2 = abs(xyyuww2[1]);
    const xyyuww2_ = _vₓᵧᵧ*uww2bs_ + vₓᵧᵧ_*(_uww2bs + γγ3*uww2bs_) + 2*_xyyuww2;
    const xyyuww3 = qmq(vₓᵧᵧ,uww3a);
    const _xyyuww3 = abs(xyyuww3[1]);
    const xyyuww3_ = _vₓᵧᵧ*uww3a_ + vₓᵧᵧ_*(_uww3a + γγ3*uww3a_) + 2*_xyyuww3;
    const yyywww0 = qmq(vᵧᵧᵧ,www0a);
    const _yyywww0 = abs(yyywww0[1]);
    const yyywww0_ = _vᵧᵧᵧ*www0a_ + vᵧᵧᵧ_*(_www0a + γγ3*www0a_) + 2*_yyywww0;
    const yyywww1 = qmq(vᵧᵧᵧ,www1bs);
    const _yyywww1 = abs(yyywww1[1]);
    const yyywww1_ = _vᵧᵧᵧ*www1bs_ + vᵧᵧᵧ_*(_www1bs + γγ3*www1bs_) + 2*_yyywww1;
    const yyywww2 = qmq(vᵧᵧᵧ,www2bs);
    const _yyywww2 = abs(yyywww2[1]);
    const yyywww2_ = _vᵧᵧᵧ*www2bs_ + vᵧᵧᵧ_*(_www2bs + γγ3*www2bs_) + 2*_yyywww2;
    const yyywww3 = qmq(vᵧᵧᵧ,www3a);
    const _yyywww3 = abs(yyywww3[1]);
    const yyywww3_ = _vᵧᵧᵧ*www3a_ + vᵧᵧᵧ_*(_www3a + γγ3*www3a_) + 2*_yyywww3;
    const f3b0 = qaq(xyyuww0,yyywww0);
    const _f3b0 = abs(f3b0[1]);
    const f3b0_ = xyyuww0_ + yyywww0_ + _f3b0;
    const f3b1 = qaq(xyyuww1,yyywww1);
    const _f3b1 = abs(f3b1[1]);
    const f3b1_ = xyyuww1_ + yyywww1_ + _f3b1;
    const f3b2 = qaq(xyyuww2,yyywww2);
    const _f3b2 = abs(f3b2[1]);
    const f3b2_ = xyyuww2_ + yyywww2_ + _f3b2;
    const f3b3 = qaq(xyyuww3,yyywww3);
    const _f3b3 = abs(f3b3[1]);
    const f3b3_ = xyyuww3_ + yyywww3_ + _f3b3;
    const f3c0 = qaq(f3a0,f3b0);
    const _f3c0 = abs(f3c0[1]);
    const f3c0_ = f3a0_ + f3b0_ + _f3c0;
    const f3c1 = qaq(f3a1,f3b1);
    const _f3c1 = abs(f3c1[1]);
    const f3c1_ = f3a1_ + f3b1_ + _f3c1;
    const f3c2 = qaq(f3a2,f3b2);
    const _f3c2 = abs(f3c2[1]);
    const f3c2_ = f3a2_ + f3b2_ + _f3c2;
    const f3c3 = qaq(f3a3,f3b3);
    const _f3c3 = abs(f3c3[1]);
    const f3c3_ = f3a3_ + f3b3_ + _f3c3;
    const s2 = qaq(f2b1,f3c0);
    const _s2 = abs(s2[1]);
    const s2_ = f2b1_ + f3c0_ + _s2;
    const s3 = qaq(f2b2,f3c1);
    const _s3 = abs(s3[1]);
    const s3_ = f2b2_ + f3c1_ + _s3;


    return {
        coeffs:   [f3c3, f3c2, s3, s2, r1, f10],
        errBound: [f3c3_, f3c2_, s3_, s2_, r1_, f10_]  // still to be multiplied by `γγ3`
    };
}


export { getCoeffsBez3Bez2SharedStartDd }
