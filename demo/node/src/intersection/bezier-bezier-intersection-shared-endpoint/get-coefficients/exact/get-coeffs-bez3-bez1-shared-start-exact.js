import { eMult, eAdd } from "big-float-ts";
import { toPowerBasis1Exact } from "../../../../to-power-basis/to-power-basis/exact/to-power-basis-exact.js";
import { getImplicitForm3AtStartExact } from "./get-implicit-form3-at-start-exact.js";
const eme = eMult;
const eae = eAdd;
/**
 * Returns a polynomial in 1 variable (exactly)
 * whose roots are the parameter values of the intersection points of an order
 * 3 and 1 bezier curve (i.e. a cubic bezier curve and a line) *starting
 * at the same point*, with the (known) root at `t = 0` divided out.
 *
 * The returned polynomial degree will be 2 (i.e. one less than given by
 * [Bézout's theorem](https://en.wikipedia.org/wiki/B%C3%A9zout%27s_theorem))
 *
 * The returned polynomial coefficients are given densely as an array of
 * [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 * expansions from highest to lowest power.
 * * with the implicit form of `ps1` relative to its start point, `P`, (see
 * [[getImplicitForm3AtStartExact]]) and `ps2(t) - P = t(u(t), w(t))` the polynomial is
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
function getCoeffsBez3Bez1SharedStartExact(ps1, ps2) {
    const { vₓ, vᵧ, vₓₓ, vₓᵧ, vᵧᵧ, vₓₓₓ, vₓₓᵧ, vₓᵧᵧ, vᵧᵧᵧ } = getImplicitForm3AtStartExact(ps1);
    const [[c1], [d1]] = toPowerBasis1Exact(ps2);
    const xu0 = eme(vₓ, c1);
    const yw0 = eme(vᵧ, d1);
    const f10 = eae(xu0, yw0);
    const uu0a = eme(c1, c1);
    const uw0a = eme(c1, d1);
    const ww0a = eme(d1, d1);
    const xxuu0 = eme(vₓₓ, uu0a);
    const xyuw0 = eme(vₓᵧ, uw0a);
    const f2a0 = eae(xxuu0, xyuw0);
    const yyww0 = eme(vᵧᵧ, ww0a);
    const f2b0 = eae(f2a0, yyww0);
    const uuu0a = eme(uu0a, c1);
    const uuw0a = eme(uu0a, d1);
    const uww0a = eme(uw0a, d1);
    const www0a = eme(ww0a, d1);
    const xxxuuu0 = eme(vₓₓₓ, uuu0a);
    const xxyuuw0 = eme(vₓₓᵧ, uuw0a);
    const f3a0 = eae(xxxuuu0, xxyuuw0);
    const xyyuww0 = eme(vₓᵧᵧ, uww0a);
    const yyywww0 = eme(vᵧᵧᵧ, www0a);
    const f3b0 = eae(xyyuww0, yyywww0);
    const f3c0 = eae(f3a0, f3b0);
    return [f3c0, f2b0, f10];
}
export { getCoeffsBez3Bez1SharedStartExact };
//# sourceMappingURL=get-coeffs-bez3-bez1-shared-start-exact.js.map