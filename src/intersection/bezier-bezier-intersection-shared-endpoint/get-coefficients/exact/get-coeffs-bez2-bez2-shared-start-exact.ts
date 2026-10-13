import { eMult, eAdd } from "big-float-ts";
import { toPowerBasis2Exact } from "../../../../to-power-basis/to-power-basis/exact/to-power-basis-exact.js";
import { getImplicitForm2AtStartExact } from "./get-implicit-form2-at-start-exact.js";

const eme = eMult;
const eae = eAdd;


/**
 * Returns a polynomial in 1 variable (exactly)
 * whose roots are the parameter values of the intersection points of an order
 * 2 and 2 bezier curve (i.e. a quadratic bezier curve and a quadratic bezier curve) *starting
 * at the same point*, with the (known) root at `t = 0` divided out.
 *
 * The returned polynomial degree will be 3 (i.e. one less than given by
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
function getCoeffsBez2Bez2SharedStartExact(
        ps1: number[][],
        ps2: number[][]): number[][] {

    const { vₓ, vᵧ, vₓₓ, vₓᵧ, vᵧᵧ } = getImplicitForm2AtStartExact(ps1);

    const [[c2,c1],[d2,d1]] = toPowerBasis2Exact(ps2);

    const xu0 = eme(vₓ,c1);
    const xu1 = eme(vₓ,c2);
    const yw0 = eme(vᵧ,d1);
    const yw1 = eme(vᵧ,d2);
    const f10 = eae(xu0,yw0);
    const f11 = eae(xu1,yw1);
    const uu0a = eme(c1,c1);
    const uu1a = eme(c1,c2);
    const uu1b = eme(c2,c1);
    const uu1bs = eae(uu1a,uu1b);
    const uu2a = eme(c2,c2);
    const uw0a = eme(c1,d1);
    const uw1a = eme(c1,d2);
    const uw1b = eme(c2,d1);
    const uw1bs = eae(uw1a,uw1b);
    const uw2a = eme(c2,d2);
    const ww0a = eme(d1,d1);
    const ww1a = eme(d1,d2);
    const ww1b = eme(d2,d1);
    const ww1bs = eae(ww1a,ww1b);
    const ww2a = eme(d2,d2);
    const xxuu0 = eme(vₓₓ,uu0a);
    const xxuu1 = eme(vₓₓ,uu1bs);
    const xxuu2 = eme(vₓₓ,uu2a);
    const xyuw0 = eme(vₓᵧ,uw0a);
    const xyuw1 = eme(vₓᵧ,uw1bs);
    const xyuw2 = eme(vₓᵧ,uw2a);
    const f2a0 = eae(xxuu0,xyuw0);
    const f2a1 = eae(xxuu1,xyuw1);
    const f2a2 = eae(xxuu2,xyuw2);
    const yyww0 = eme(vᵧᵧ,ww0a);
    const yyww1 = eme(vᵧᵧ,ww1bs);
    const yyww2 = eme(vᵧᵧ,ww2a);
    const f2b0 = eae(f2a0,yyww0);
    const f2b1 = eae(f2a1,yyww1);
    const f2b2 = eae(f2a2,yyww2);
    const r1 = eae(f11,f2b0);


    return [f2b2, f2b1, r1, f10];
}


export { getCoeffsBez2Bez2SharedStartExact }
