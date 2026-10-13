import { ddAddDd, ddMultDd } from "double-double";
import { toPowerBasis2DdWithRunningError } from "../../../../to-power-basis/to-power-basis/double-double/to-power-basis-dd-with-running-error.js";
import { getImplicitForm1AtStartDd } from "./get-implicit-form1-at-start-dd.js";

const qmq = ddMultDd;
const qaq = ddAddDd;

const { abs } = Math;


/**
 * Returns a polynomial in 1 variable (including coefficientwise error bound)
 * whose roots are the parameter values of the intersection points of an order
 * 1 and 2 bezier curve (i.e. a line and a quadratic bezier curve) *starting
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
function getCoeffsBez1Bez2SharedStartDd(
        ps1: number[][],
        ps2: number[][]): { coeffs: number[][]; errBound: number[]; } {

    const { coeffs: { vₓ, vᵧ } } = getImplicitForm1AtStartDd(ps1);  // exact

    const {
        coeffs: [[c2,c1],[d2,d1]],
        errorBound: [[c2_],[d2_]]  // `c1` and `d1` are error free
    } = toPowerBasis2DdWithRunningError(ps2);

    const _vₓ = abs(vₓ[1]);
    const _vᵧ = abs(vᵧ[1]);
    const xu0 = qmq(vₓ,c1);
    const _xu0 = abs(xu0[1]);
    const xu0_ = 2*_xu0;
    const xu1 = qmq(vₓ,c2);
    const _xu1 = abs(xu1[1]);
    const xu1_ = _vₓ*c2_ + 2*_xu1;
    const yw0 = qmq(vᵧ,d1);
    const _yw0 = abs(yw0[1]);
    const yw0_ = 2*_yw0;
    const yw1 = qmq(vᵧ,d2);
    const _yw1 = abs(yw1[1]);
    const yw1_ = _vᵧ*d2_ + 2*_yw1;
    const f10 = qaq(xu0,yw0);
    const _f10 = abs(f10[1]);
    const f10_ = xu0_ + yw0_ + _f10;
    const f11 = qaq(xu1,yw1);
    const _f11 = abs(f11[1]);
    const f11_ = xu1_ + yw1_ + _f11;


    return {
        coeffs:   [f11, f10],
        errBound: [f11_, f10_]  // still to be multiplied by `γγ3`
    };
}


export { getCoeffsBez1Bez2SharedStartDd }
