import { eMult, eAdd } from "big-float-ts";
import { toPowerBasis1Exact } from "../../../../to-power-basis/to-power-basis/exact/to-power-basis-exact.js";
import { getImplicitForm2AtStartExact } from "./get-implicit-form2-at-start-exact.js";

const eme = eMult;
const eae = eAdd;


/**
 * Returns a polynomial in 1 variable (exactly)
 * whose roots are the parameter values of the intersection points of an order
 * 2 and 1 bezier curve (i.e. a quadratic bezier curve and a line) *starting
 * at the same point*, with the (known) root at `t = 0` divided out.
 *
 * The returned polynomial degree will be 1 (i.e. one less than given by
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
function getCoeffsBez2Bez1SharedStartExact(
        ps1: number[][],
        ps2: number[][]): number[][] {

    const { vₓ, vᵧ, vₓₓ, vₓᵧ, vᵧᵧ } = getImplicitForm2AtStartExact(ps1);

    const [[c1],[d1]] = toPowerBasis1Exact(ps2);

    const xu0 = eme(vₓ,c1);
    const yw0 = eme(vᵧ,d1);
    const f10 = eae(xu0,yw0);
    const uu0a = eme(c1,c1);
    const uw0a = eme(c1,d1);
    const ww0a = eme(d1,d1);
    const xxuu0 = eme(vₓₓ,uu0a);
    const xyuw0 = eme(vₓᵧ,uw0a);
    const f2a0 = eae(xxuu0,xyuw0);
    const yyww0 = eme(vᵧᵧ,ww0a);
    const f2b0 = eae(f2a0,yyww0);


    return [f2b0, f10];
}


export { getCoeffsBez2Bez1SharedStartExact }
