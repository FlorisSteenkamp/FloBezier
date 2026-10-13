import { eMult, eAdd } from "big-float-ts";
import { toPowerBasis3Exact } from "../../../../to-power-basis/to-power-basis/exact/to-power-basis-exact.js";
import { getImplicitForm1AtStartExact } from "./get-implicit-form1-at-start-exact.js";
const eme = eMult;
const eae = eAdd;
/**
 * Returns a polynomial in 1 variable (exactly)
 * whose roots are the parameter values of the intersection points of an order
 * 1 and 3 bezier curve (i.e. a line and a cubic bezier curve) *starting
 * at the same point*, with the (known) root at `t = 0` divided out.
 *
 * The returned polynomial degree will be 2 (i.e. one less than given by
 * [Bézout's theorem](https://en.wikipedia.org/wiki/B%C3%A9zout%27s_theorem))
 *
 * The returned polynomial coefficients are given densely as an array of
 * [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 * expansions from highest to lowest power.
 * * with the implicit form of `ps1` relative to its start point, `P`, (see
 * [[getImplicitForm1AtStartExact]]) and `ps2(t) - P = t(u(t), w(t))` the polynomial is
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
function getCoeffsBez1Bez3SharedStartExact(ps1, ps2) {
    const { vₓ, vᵧ } = getImplicitForm1AtStartExact(ps1);
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
    return [f12, f11, f10];
}
export { getCoeffsBez1Bez3SharedStartExact };
//# sourceMappingURL=get-coeffs-bez1-bez3-shared-start-exact.js.map