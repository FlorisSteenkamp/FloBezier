import { eMult, eAdd } from "big-float-ts";
import { toPowerBasis3Exact } from "../../../../to-power-basis/to-power-basis/exact/to-power-basis-exact.js";
import { getImplicitForm2AtStartExact } from "./get-implicit-form2-at-start-exact.js";
const eme = eMult;
const eae = eAdd;
/**
 * Returns a polynomial in 1 variable (exactly)
 * whose roots are the parameter values of the intersection points of an order
 * 2 and 3 bezier curve (i.e. a quadratic bezier curve and a cubic bezier curve) *starting
 * at the same point*, with the (known) root at `t = 0` divided out.
 *
 * The returned polynomial degree will be 5 (i.e. one less than given by
 * [Bézout's theorem](https://en.wikipedia.org/wiki/B%C3%A9zout%27s_theorem))
 *
 * The returned polynomial coefficients are given densely as an array of
 * [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 * expansions from highest to lowest power.
 * * with the implicit form of `ps1` relative to its start point, `P`, (see
 * [[getImplicitForm2AtStartExact]]) and `ps2(t) - P = t(u(t), w(t))` the polynomial is
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
function getCoeffsBez2Bez3SharedStartExact(ps1, ps2) {
    const { vₓ, vᵧ, vₓₓ, vₓᵧ, vᵧᵧ } = getImplicitForm2AtStartExact(ps1);
    const [[c3, c2, c1], [d3, d2, d1]] = toPowerBasis3Exact(ps2);
    const xu0 = eme(vₓ, c1);
    const xu1 = eme(vₓ, c2);
    const xu2 = eme(vₓ, c3);
    const yw0 = eme(vᵧ, d1);
    const yw1 = eme(vᵧ, d2);
    const yw2 = eme(vᵧ, d3);
    const f10 = eae(xu0, yw0);
    const f11 = eae(xu1, yw1);
    const f12 = eae(xu2, yw2);
    const uu0a = eme(c1, c1);
    const uu1a = eme(c1, c2);
    const uu2a = eme(c1, c3);
    const uu1b = eme(c2, c1);
    const uu1bs = eae(uu1a, uu1b);
    const uu2b = eme(c2, c2);
    const uu2bs = eae(uu2a, uu2b);
    const uu3a = eme(c2, c3);
    const uu2c = eme(c3, c1);
    const uu2cs = eae(uu2bs, uu2c);
    const uu3b = eme(c3, c2);
    const uu3bs = eae(uu3a, uu3b);
    const uu4a = eme(c3, c3);
    const uw0a = eme(c1, d1);
    const uw1a = eme(c1, d2);
    const uw2a = eme(c1, d3);
    const uw1b = eme(c2, d1);
    const uw1bs = eae(uw1a, uw1b);
    const uw2b = eme(c2, d2);
    const uw2bs = eae(uw2a, uw2b);
    const uw3a = eme(c2, d3);
    const uw2c = eme(c3, d1);
    const uw2cs = eae(uw2bs, uw2c);
    const uw3b = eme(c3, d2);
    const uw3bs = eae(uw3a, uw3b);
    const uw4a = eme(c3, d3);
    const ww0a = eme(d1, d1);
    const ww1a = eme(d1, d2);
    const ww2a = eme(d1, d3);
    const ww1b = eme(d2, d1);
    const ww1bs = eae(ww1a, ww1b);
    const ww2b = eme(d2, d2);
    const ww2bs = eae(ww2a, ww2b);
    const ww3a = eme(d2, d3);
    const ww2c = eme(d3, d1);
    const ww2cs = eae(ww2bs, ww2c);
    const ww3b = eme(d3, d2);
    const ww3bs = eae(ww3a, ww3b);
    const ww4a = eme(d3, d3);
    const xxuu0 = eme(vₓₓ, uu0a);
    const xxuu1 = eme(vₓₓ, uu1bs);
    const xxuu2 = eme(vₓₓ, uu2cs);
    const xxuu3 = eme(vₓₓ, uu3bs);
    const xxuu4 = eme(vₓₓ, uu4a);
    const xyuw0 = eme(vₓᵧ, uw0a);
    const xyuw1 = eme(vₓᵧ, uw1bs);
    const xyuw2 = eme(vₓᵧ, uw2cs);
    const xyuw3 = eme(vₓᵧ, uw3bs);
    const xyuw4 = eme(vₓᵧ, uw4a);
    const f2a0 = eae(xxuu0, xyuw0);
    const f2a1 = eae(xxuu1, xyuw1);
    const f2a2 = eae(xxuu2, xyuw2);
    const f2a3 = eae(xxuu3, xyuw3);
    const f2a4 = eae(xxuu4, xyuw4);
    const yyww0 = eme(vᵧᵧ, ww0a);
    const yyww1 = eme(vᵧᵧ, ww1bs);
    const yyww2 = eme(vᵧᵧ, ww2cs);
    const yyww3 = eme(vᵧᵧ, ww3bs);
    const yyww4 = eme(vᵧᵧ, ww4a);
    const f2b0 = eae(f2a0, yyww0);
    const f2b1 = eae(f2a1, yyww1);
    const f2b2 = eae(f2a2, yyww2);
    const f2b3 = eae(f2a3, yyww3);
    const f2b4 = eae(f2a4, yyww4);
    const r1 = eae(f11, f2b0);
    const r2 = eae(f12, f2b1);
    return [f2b4, f2b3, f2b2, r2, r1, f10];
}
export { getCoeffsBez2Bez3SharedStartExact };
//# sourceMappingURL=get-coeffs-bez2-bez3-shared-start-exact.js.map