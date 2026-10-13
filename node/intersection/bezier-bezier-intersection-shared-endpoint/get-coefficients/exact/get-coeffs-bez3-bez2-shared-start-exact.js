import { eMult, eAdd } from "big-float-ts";
import { toPowerBasis2Exact } from "../../../../to-power-basis/to-power-basis/exact/to-power-basis-exact.js";
import { getImplicitForm3AtStartExact } from "./get-implicit-form3-at-start-exact.js";
const eme = eMult;
const eae = eAdd;
/**
 * Returns a polynomial in 1 variable (exactly)
 * whose roots are the parameter values of the intersection points of an order
 * 3 and 2 bezier curve (i.e. a cubic bezier curve and a quadratic bezier curve) *starting
 * at the same point*, with the (known) root at `t = 0` divided out.
 *
 * The returned polynomial degree will be 5 (i.e. one less than given by
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
function getCoeffsBez3Bez2SharedStartExact(ps1, ps2) {
    const { vₓ, vᵧ, vₓₓ, vₓᵧ, vᵧᵧ, vₓₓₓ, vₓₓᵧ, vₓᵧᵧ, vᵧᵧᵧ } = getImplicitForm3AtStartExact(ps1);
    const [[c2, c1], [d2, d1]] = toPowerBasis2Exact(ps2);
    const xu0 = eme(vₓ, c1);
    const xu1 = eme(vₓ, c2);
    const yw0 = eme(vᵧ, d1);
    const yw1 = eme(vᵧ, d2);
    const f10 = eae(xu0, yw0);
    const f11 = eae(xu1, yw1);
    const uu0a = eme(c1, c1);
    const uu1a = eme(c1, c2);
    const uu1b = eme(c2, c1);
    const uu1bs = eae(uu1a, uu1b);
    const uu2a = eme(c2, c2);
    const uw0a = eme(c1, d1);
    const uw1a = eme(c1, d2);
    const uw1b = eme(c2, d1);
    const uw1bs = eae(uw1a, uw1b);
    const uw2a = eme(c2, d2);
    const ww0a = eme(d1, d1);
    const ww1a = eme(d1, d2);
    const ww1b = eme(d2, d1);
    const ww1bs = eae(ww1a, ww1b);
    const ww2a = eme(d2, d2);
    const xxuu0 = eme(vₓₓ, uu0a);
    const xxuu1 = eme(vₓₓ, uu1bs);
    const xxuu2 = eme(vₓₓ, uu2a);
    const xyuw0 = eme(vₓᵧ, uw0a);
    const xyuw1 = eme(vₓᵧ, uw1bs);
    const xyuw2 = eme(vₓᵧ, uw2a);
    const f2a0 = eae(xxuu0, xyuw0);
    const f2a1 = eae(xxuu1, xyuw1);
    const f2a2 = eae(xxuu2, xyuw2);
    const yyww0 = eme(vᵧᵧ, ww0a);
    const yyww1 = eme(vᵧᵧ, ww1bs);
    const yyww2 = eme(vᵧᵧ, ww2a);
    const f2b0 = eae(f2a0, yyww0);
    const f2b1 = eae(f2a1, yyww1);
    const f2b2 = eae(f2a2, yyww2);
    const r1 = eae(f11, f2b0);
    const uuu0a = eme(uu0a, c1);
    const uuu1a = eme(uu0a, c2);
    const uuu1b = eme(uu1bs, c1);
    const uuu1bs = eae(uuu1a, uuu1b);
    const uuu2a = eme(uu1bs, c2);
    const uuu2b = eme(uu2a, c1);
    const uuu2bs = eae(uuu2a, uuu2b);
    const uuu3a = eme(uu2a, c2);
    const uuw0a = eme(uu0a, d1);
    const uuw1a = eme(uu0a, d2);
    const uuw1b = eme(uu1bs, d1);
    const uuw1bs = eae(uuw1a, uuw1b);
    const uuw2a = eme(uu1bs, d2);
    const uuw2b = eme(uu2a, d1);
    const uuw2bs = eae(uuw2a, uuw2b);
    const uuw3a = eme(uu2a, d2);
    const uww0a = eme(uw0a, d1);
    const uww1a = eme(uw0a, d2);
    const uww1b = eme(uw1bs, d1);
    const uww1bs = eae(uww1a, uww1b);
    const uww2a = eme(uw1bs, d2);
    const uww2b = eme(uw2a, d1);
    const uww2bs = eae(uww2a, uww2b);
    const uww3a = eme(uw2a, d2);
    const www0a = eme(ww0a, d1);
    const www1a = eme(ww0a, d2);
    const www1b = eme(ww1bs, d1);
    const www1bs = eae(www1a, www1b);
    const www2a = eme(ww1bs, d2);
    const www2b = eme(ww2a, d1);
    const www2bs = eae(www2a, www2b);
    const www3a = eme(ww2a, d2);
    const xxxuuu0 = eme(vₓₓₓ, uuu0a);
    const xxxuuu1 = eme(vₓₓₓ, uuu1bs);
    const xxxuuu2 = eme(vₓₓₓ, uuu2bs);
    const xxxuuu3 = eme(vₓₓₓ, uuu3a);
    const xxyuuw0 = eme(vₓₓᵧ, uuw0a);
    const xxyuuw1 = eme(vₓₓᵧ, uuw1bs);
    const xxyuuw2 = eme(vₓₓᵧ, uuw2bs);
    const xxyuuw3 = eme(vₓₓᵧ, uuw3a);
    const f3a0 = eae(xxxuuu0, xxyuuw0);
    const f3a1 = eae(xxxuuu1, xxyuuw1);
    const f3a2 = eae(xxxuuu2, xxyuuw2);
    const f3a3 = eae(xxxuuu3, xxyuuw3);
    const xyyuww0 = eme(vₓᵧᵧ, uww0a);
    const xyyuww1 = eme(vₓᵧᵧ, uww1bs);
    const xyyuww2 = eme(vₓᵧᵧ, uww2bs);
    const xyyuww3 = eme(vₓᵧᵧ, uww3a);
    const yyywww0 = eme(vᵧᵧᵧ, www0a);
    const yyywww1 = eme(vᵧᵧᵧ, www1bs);
    const yyywww2 = eme(vᵧᵧᵧ, www2bs);
    const yyywww3 = eme(vᵧᵧᵧ, www3a);
    const f3b0 = eae(xyyuww0, yyywww0);
    const f3b1 = eae(xyyuww1, yyywww1);
    const f3b2 = eae(xyyuww2, yyywww2);
    const f3b3 = eae(xyyuww3, yyywww3);
    const f3c0 = eae(f3a0, f3b0);
    const f3c1 = eae(f3a1, f3b1);
    const f3c2 = eae(f3a2, f3b2);
    const f3c3 = eae(f3a3, f3b3);
    const s2 = eae(f2b1, f3c0);
    const s3 = eae(f2b2, f3c1);
    return [f3c3, f3c2, s3, s2, r1, f10];
}
export { getCoeffsBez3Bez2SharedStartExact };
//# sourceMappingURL=get-coeffs-bez3-bez2-shared-start-exact.js.map