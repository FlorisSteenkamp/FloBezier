import { ddAddDd, ddMultDd } from "double-double";
import { toPowerBasis3DdWithRunningError } from "../../../../to-power-basis/to-power-basis/double-double/to-power-basis-dd-with-running-error.js";
import { γγ3 } from "../../../../error-analysis/error-analysis.js";
import { getImplicitForm2AtStartDd } from "./get-implicit-form2-at-start-dd.js";
const qmq = ddMultDd;
const qaq = ddAddDd;
const { abs } = Math;
/**
 * Returns a polynomial in 1 variable (including coefficientwise error bound)
 * whose roots are the parameter values of the intersection points of an order
 * 2 and 3 bezier curve (i.e. a quadratic bezier curve and a cubic bezier curve) *starting
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
function getCoeffsBez2Bez3SharedStartDd(ps1, ps2) {
    const { coeffs: { vₓ, vᵧ, vₓₓ, vₓᵧ, vᵧᵧ }, errorBound: { vₓ_, vᵧ_, vₓₓ_, vₓᵧ_, vᵧᵧ_ } } = getImplicitForm2AtStartDd(ps1);
    const { coeffs: [[c3, c2, c1], [d3, d2, d1]], errorBound: [[c3_, c2_, c1_], [d3_, d2_, d1_]] } = toPowerBasis3DdWithRunningError(ps2);
    const _vₓ = abs(vₓ[1]);
    const _vᵧ = abs(vᵧ[1]);
    const _vₓₓ = abs(vₓₓ[1]);
    const _vₓᵧ = abs(vₓᵧ[1]);
    const _vᵧᵧ = abs(vᵧᵧ[1]);
    const _c1 = abs(c1[1]);
    const _c2 = abs(c2[1]);
    const _c3 = abs(c3[1]);
    const _d1 = abs(d1[1]);
    const _d2 = abs(d2[1]);
    const _d3 = abs(d3[1]);
    const xu0 = qmq(vₓ, c1);
    const _xu0 = abs(xu0[1]);
    const xu0_ = _vₓ * c1_ + vₓ_ * (_c1 + γγ3 * c1_) + 2 * _xu0;
    const xu1 = qmq(vₓ, c2);
    const _xu1 = abs(xu1[1]);
    const xu1_ = _vₓ * c2_ + vₓ_ * (_c2 + γγ3 * c2_) + 2 * _xu1;
    const xu2 = qmq(vₓ, c3);
    const _xu2 = abs(xu2[1]);
    const xu2_ = _vₓ * c3_ + vₓ_ * (_c3 + γγ3 * c3_) + 2 * _xu2;
    const yw0 = qmq(vᵧ, d1);
    const _yw0 = abs(yw0[1]);
    const yw0_ = _vᵧ * d1_ + vᵧ_ * (_d1 + γγ3 * d1_) + 2 * _yw0;
    const yw1 = qmq(vᵧ, d2);
    const _yw1 = abs(yw1[1]);
    const yw1_ = _vᵧ * d2_ + vᵧ_ * (_d2 + γγ3 * d2_) + 2 * _yw1;
    const yw2 = qmq(vᵧ, d3);
    const _yw2 = abs(yw2[1]);
    const yw2_ = _vᵧ * d3_ + vᵧ_ * (_d3 + γγ3 * d3_) + 2 * _yw2;
    const f10 = qaq(xu0, yw0);
    const _f10 = abs(f10[1]);
    const f10_ = xu0_ + yw0_ + _f10;
    const f11 = qaq(xu1, yw1);
    const _f11 = abs(f11[1]);
    const f11_ = xu1_ + yw1_ + _f11;
    const f12 = qaq(xu2, yw2);
    const _f12 = abs(f12[1]);
    const f12_ = xu2_ + yw2_ + _f12;
    const uu0a = qmq(c1, c1);
    const _uu0a = abs(uu0a[1]);
    const uu0a_ = _c1 * c1_ + c1_ * (_c1 + γγ3 * c1_) + 2 * _uu0a;
    const uu1a = qmq(c1, c2);
    const _uu1a = abs(uu1a[1]);
    const uu1a_ = _c1 * c2_ + c1_ * (_c2 + γγ3 * c2_) + 2 * _uu1a;
    const uu2a = qmq(c1, c3);
    const _uu2a = abs(uu2a[1]);
    const uu2a_ = _c1 * c3_ + c1_ * (_c3 + γγ3 * c3_) + 2 * _uu2a;
    const uu1b = qmq(c2, c1);
    const _uu1b = abs(uu1b[1]);
    const uu1b_ = _c2 * c1_ + c2_ * (_c1 + γγ3 * c1_) + 2 * _uu1b;
    const uu1bs = qaq(uu1a, uu1b);
    const _uu1bs = abs(uu1bs[1]);
    const uu1bs_ = uu1a_ + uu1b_ + _uu1bs;
    const uu2b = qmq(c2, c2);
    const _uu2b = abs(uu2b[1]);
    const uu2b_ = _c2 * c2_ + c2_ * (_c2 + γγ3 * c2_) + 2 * _uu2b;
    const uu2bs = qaq(uu2a, uu2b);
    const _uu2bs = abs(uu2bs[1]);
    const uu2bs_ = uu2a_ + uu2b_ + _uu2bs;
    const uu3a = qmq(c2, c3);
    const _uu3a = abs(uu3a[1]);
    const uu3a_ = _c2 * c3_ + c2_ * (_c3 + γγ3 * c3_) + 2 * _uu3a;
    const uu2c = qmq(c3, c1);
    const _uu2c = abs(uu2c[1]);
    const uu2c_ = _c3 * c1_ + c3_ * (_c1 + γγ3 * c1_) + 2 * _uu2c;
    const uu2cs = qaq(uu2bs, uu2c);
    const _uu2cs = abs(uu2cs[1]);
    const uu2cs_ = uu2bs_ + uu2c_ + _uu2cs;
    const uu3b = qmq(c3, c2);
    const _uu3b = abs(uu3b[1]);
    const uu3b_ = _c3 * c2_ + c3_ * (_c2 + γγ3 * c2_) + 2 * _uu3b;
    const uu3bs = qaq(uu3a, uu3b);
    const _uu3bs = abs(uu3bs[1]);
    const uu3bs_ = uu3a_ + uu3b_ + _uu3bs;
    const uu4a = qmq(c3, c3);
    const _uu4a = abs(uu4a[1]);
    const uu4a_ = _c3 * c3_ + c3_ * (_c3 + γγ3 * c3_) + 2 * _uu4a;
    const uw0a = qmq(c1, d1);
    const _uw0a = abs(uw0a[1]);
    const uw0a_ = _c1 * d1_ + c1_ * (_d1 + γγ3 * d1_) + 2 * _uw0a;
    const uw1a = qmq(c1, d2);
    const _uw1a = abs(uw1a[1]);
    const uw1a_ = _c1 * d2_ + c1_ * (_d2 + γγ3 * d2_) + 2 * _uw1a;
    const uw2a = qmq(c1, d3);
    const _uw2a = abs(uw2a[1]);
    const uw2a_ = _c1 * d3_ + c1_ * (_d3 + γγ3 * d3_) + 2 * _uw2a;
    const uw1b = qmq(c2, d1);
    const _uw1b = abs(uw1b[1]);
    const uw1b_ = _c2 * d1_ + c2_ * (_d1 + γγ3 * d1_) + 2 * _uw1b;
    const uw1bs = qaq(uw1a, uw1b);
    const _uw1bs = abs(uw1bs[1]);
    const uw1bs_ = uw1a_ + uw1b_ + _uw1bs;
    const uw2b = qmq(c2, d2);
    const _uw2b = abs(uw2b[1]);
    const uw2b_ = _c2 * d2_ + c2_ * (_d2 + γγ3 * d2_) + 2 * _uw2b;
    const uw2bs = qaq(uw2a, uw2b);
    const _uw2bs = abs(uw2bs[1]);
    const uw2bs_ = uw2a_ + uw2b_ + _uw2bs;
    const uw3a = qmq(c2, d3);
    const _uw3a = abs(uw3a[1]);
    const uw3a_ = _c2 * d3_ + c2_ * (_d3 + γγ3 * d3_) + 2 * _uw3a;
    const uw2c = qmq(c3, d1);
    const _uw2c = abs(uw2c[1]);
    const uw2c_ = _c3 * d1_ + c3_ * (_d1 + γγ3 * d1_) + 2 * _uw2c;
    const uw2cs = qaq(uw2bs, uw2c);
    const _uw2cs = abs(uw2cs[1]);
    const uw2cs_ = uw2bs_ + uw2c_ + _uw2cs;
    const uw3b = qmq(c3, d2);
    const _uw3b = abs(uw3b[1]);
    const uw3b_ = _c3 * d2_ + c3_ * (_d2 + γγ3 * d2_) + 2 * _uw3b;
    const uw3bs = qaq(uw3a, uw3b);
    const _uw3bs = abs(uw3bs[1]);
    const uw3bs_ = uw3a_ + uw3b_ + _uw3bs;
    const uw4a = qmq(c3, d3);
    const _uw4a = abs(uw4a[1]);
    const uw4a_ = _c3 * d3_ + c3_ * (_d3 + γγ3 * d3_) + 2 * _uw4a;
    const ww0a = qmq(d1, d1);
    const _ww0a = abs(ww0a[1]);
    const ww0a_ = _d1 * d1_ + d1_ * (_d1 + γγ3 * d1_) + 2 * _ww0a;
    const ww1a = qmq(d1, d2);
    const _ww1a = abs(ww1a[1]);
    const ww1a_ = _d1 * d2_ + d1_ * (_d2 + γγ3 * d2_) + 2 * _ww1a;
    const ww2a = qmq(d1, d3);
    const _ww2a = abs(ww2a[1]);
    const ww2a_ = _d1 * d3_ + d1_ * (_d3 + γγ3 * d3_) + 2 * _ww2a;
    const ww1b = qmq(d2, d1);
    const _ww1b = abs(ww1b[1]);
    const ww1b_ = _d2 * d1_ + d2_ * (_d1 + γγ3 * d1_) + 2 * _ww1b;
    const ww1bs = qaq(ww1a, ww1b);
    const _ww1bs = abs(ww1bs[1]);
    const ww1bs_ = ww1a_ + ww1b_ + _ww1bs;
    const ww2b = qmq(d2, d2);
    const _ww2b = abs(ww2b[1]);
    const ww2b_ = _d2 * d2_ + d2_ * (_d2 + γγ3 * d2_) + 2 * _ww2b;
    const ww2bs = qaq(ww2a, ww2b);
    const _ww2bs = abs(ww2bs[1]);
    const ww2bs_ = ww2a_ + ww2b_ + _ww2bs;
    const ww3a = qmq(d2, d3);
    const _ww3a = abs(ww3a[1]);
    const ww3a_ = _d2 * d3_ + d2_ * (_d3 + γγ3 * d3_) + 2 * _ww3a;
    const ww2c = qmq(d3, d1);
    const _ww2c = abs(ww2c[1]);
    const ww2c_ = _d3 * d1_ + d3_ * (_d1 + γγ3 * d1_) + 2 * _ww2c;
    const ww2cs = qaq(ww2bs, ww2c);
    const _ww2cs = abs(ww2cs[1]);
    const ww2cs_ = ww2bs_ + ww2c_ + _ww2cs;
    const ww3b = qmq(d3, d2);
    const _ww3b = abs(ww3b[1]);
    const ww3b_ = _d3 * d2_ + d3_ * (_d2 + γγ3 * d2_) + 2 * _ww3b;
    const ww3bs = qaq(ww3a, ww3b);
    const _ww3bs = abs(ww3bs[1]);
    const ww3bs_ = ww3a_ + ww3b_ + _ww3bs;
    const ww4a = qmq(d3, d3);
    const _ww4a = abs(ww4a[1]);
    const ww4a_ = _d3 * d3_ + d3_ * (_d3 + γγ3 * d3_) + 2 * _ww4a;
    const xxuu0 = qmq(vₓₓ, uu0a);
    const _xxuu0 = abs(xxuu0[1]);
    const xxuu0_ = _vₓₓ * uu0a_ + vₓₓ_ * (_uu0a + γγ3 * uu0a_) + 2 * _xxuu0;
    const xxuu1 = qmq(vₓₓ, uu1bs);
    const _xxuu1 = abs(xxuu1[1]);
    const xxuu1_ = _vₓₓ * uu1bs_ + vₓₓ_ * (_uu1bs + γγ3 * uu1bs_) + 2 * _xxuu1;
    const xxuu2 = qmq(vₓₓ, uu2cs);
    const _xxuu2 = abs(xxuu2[1]);
    const xxuu2_ = _vₓₓ * uu2cs_ + vₓₓ_ * (_uu2cs + γγ3 * uu2cs_) + 2 * _xxuu2;
    const xxuu3 = qmq(vₓₓ, uu3bs);
    const _xxuu3 = abs(xxuu3[1]);
    const xxuu3_ = _vₓₓ * uu3bs_ + vₓₓ_ * (_uu3bs + γγ3 * uu3bs_) + 2 * _xxuu3;
    const xxuu4 = qmq(vₓₓ, uu4a);
    const _xxuu4 = abs(xxuu4[1]);
    const xxuu4_ = _vₓₓ * uu4a_ + vₓₓ_ * (_uu4a + γγ3 * uu4a_) + 2 * _xxuu4;
    const xyuw0 = qmq(vₓᵧ, uw0a);
    const _xyuw0 = abs(xyuw0[1]);
    const xyuw0_ = _vₓᵧ * uw0a_ + vₓᵧ_ * (_uw0a + γγ3 * uw0a_) + 2 * _xyuw0;
    const xyuw1 = qmq(vₓᵧ, uw1bs);
    const _xyuw1 = abs(xyuw1[1]);
    const xyuw1_ = _vₓᵧ * uw1bs_ + vₓᵧ_ * (_uw1bs + γγ3 * uw1bs_) + 2 * _xyuw1;
    const xyuw2 = qmq(vₓᵧ, uw2cs);
    const _xyuw2 = abs(xyuw2[1]);
    const xyuw2_ = _vₓᵧ * uw2cs_ + vₓᵧ_ * (_uw2cs + γγ3 * uw2cs_) + 2 * _xyuw2;
    const xyuw3 = qmq(vₓᵧ, uw3bs);
    const _xyuw3 = abs(xyuw3[1]);
    const xyuw3_ = _vₓᵧ * uw3bs_ + vₓᵧ_ * (_uw3bs + γγ3 * uw3bs_) + 2 * _xyuw3;
    const xyuw4 = qmq(vₓᵧ, uw4a);
    const _xyuw4 = abs(xyuw4[1]);
    const xyuw4_ = _vₓᵧ * uw4a_ + vₓᵧ_ * (_uw4a + γγ3 * uw4a_) + 2 * _xyuw4;
    const f2a0 = qaq(xxuu0, xyuw0);
    const _f2a0 = abs(f2a0[1]);
    const f2a0_ = xxuu0_ + xyuw0_ + _f2a0;
    const f2a1 = qaq(xxuu1, xyuw1);
    const _f2a1 = abs(f2a1[1]);
    const f2a1_ = xxuu1_ + xyuw1_ + _f2a1;
    const f2a2 = qaq(xxuu2, xyuw2);
    const _f2a2 = abs(f2a2[1]);
    const f2a2_ = xxuu2_ + xyuw2_ + _f2a2;
    const f2a3 = qaq(xxuu3, xyuw3);
    const _f2a3 = abs(f2a3[1]);
    const f2a3_ = xxuu3_ + xyuw3_ + _f2a3;
    const f2a4 = qaq(xxuu4, xyuw4);
    const _f2a4 = abs(f2a4[1]);
    const f2a4_ = xxuu4_ + xyuw4_ + _f2a4;
    const yyww0 = qmq(vᵧᵧ, ww0a);
    const _yyww0 = abs(yyww0[1]);
    const yyww0_ = _vᵧᵧ * ww0a_ + vᵧᵧ_ * (_ww0a + γγ3 * ww0a_) + 2 * _yyww0;
    const yyww1 = qmq(vᵧᵧ, ww1bs);
    const _yyww1 = abs(yyww1[1]);
    const yyww1_ = _vᵧᵧ * ww1bs_ + vᵧᵧ_ * (_ww1bs + γγ3 * ww1bs_) + 2 * _yyww1;
    const yyww2 = qmq(vᵧᵧ, ww2cs);
    const _yyww2 = abs(yyww2[1]);
    const yyww2_ = _vᵧᵧ * ww2cs_ + vᵧᵧ_ * (_ww2cs + γγ3 * ww2cs_) + 2 * _yyww2;
    const yyww3 = qmq(vᵧᵧ, ww3bs);
    const _yyww3 = abs(yyww3[1]);
    const yyww3_ = _vᵧᵧ * ww3bs_ + vᵧᵧ_ * (_ww3bs + γγ3 * ww3bs_) + 2 * _yyww3;
    const yyww4 = qmq(vᵧᵧ, ww4a);
    const _yyww4 = abs(yyww4[1]);
    const yyww4_ = _vᵧᵧ * ww4a_ + vᵧᵧ_ * (_ww4a + γγ3 * ww4a_) + 2 * _yyww4;
    const f2b0 = qaq(f2a0, yyww0);
    const _f2b0 = abs(f2b0[1]);
    const f2b0_ = f2a0_ + yyww0_ + _f2b0;
    const f2b1 = qaq(f2a1, yyww1);
    const _f2b1 = abs(f2b1[1]);
    const f2b1_ = f2a1_ + yyww1_ + _f2b1;
    const f2b2 = qaq(f2a2, yyww2);
    const _f2b2 = abs(f2b2[1]);
    const f2b2_ = f2a2_ + yyww2_ + _f2b2;
    const f2b3 = qaq(f2a3, yyww3);
    const _f2b3 = abs(f2b3[1]);
    const f2b3_ = f2a3_ + yyww3_ + _f2b3;
    const f2b4 = qaq(f2a4, yyww4);
    const _f2b4 = abs(f2b4[1]);
    const f2b4_ = f2a4_ + yyww4_ + _f2b4;
    const r1 = qaq(f11, f2b0);
    const _r1 = abs(r1[1]);
    const r1_ = f11_ + f2b0_ + _r1;
    const r2 = qaq(f12, f2b1);
    const _r2 = abs(r2[1]);
    const r2_ = f12_ + f2b1_ + _r2;
    return {
        coeffs: [f2b4, f2b3, f2b2, r2, r1, f10],
        errBound: [f2b4_, f2b3_, f2b2_, r2_, r1_, f10_] // still to be multiplied by `γγ3`
    };
}
export { getCoeffsBez2Bez3SharedStartDd };
//# sourceMappingURL=get-coeffs-bez2-bez3-shared-start-dd.js.map