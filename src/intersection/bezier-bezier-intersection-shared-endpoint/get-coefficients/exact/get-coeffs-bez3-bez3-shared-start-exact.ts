import { eMult, eAdd } from "big-float-ts";
import { toPowerBasis3Exact } from "../../../../to-power-basis/to-power-basis/exact/to-power-basis-exact.js";
import { getImplicitForm3AtStartExact } from "./get-implicit-form3-at-start-exact.js";

const eme = eMult;
const eae = eAdd;


/**
 * Returns a polynomial in 1 variable (exactly)
 * whose roots are the parameter values of the intersection points of an order
 * 3 and 3 bezier curve (i.e. a cubic bezier curve and a cubic bezier curve) *starting
 * at the same point*, with the (known) root at `t = 0` divided out.
 *
 * The returned polynomial degree will be 8 (i.e. one less than given by
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
function getCoeffsBez3Bez3SharedStartExact(
        ps1: number[][],
        ps2: number[][]): number[][] {

    const { vₓ, vᵧ, vₓₓ, vₓᵧ, vᵧᵧ, vₓₓₓ, vₓₓᵧ, vₓᵧᵧ, vᵧᵧᵧ } = getImplicitForm3AtStartExact(ps1);

    const [[c3,c2,c1],[d3,d2,d1]] = toPowerBasis3Exact(ps2);

    const xu0 = eme(vₓ,c1);
    const xu1 = eme(vₓ,c2);
    const xu2 = eme(vₓ,c3);
    const yw0 = eme(vᵧ,d1);
    const yw1 = eme(vᵧ,d2);
    const yw2 = eme(vᵧ,d3);
    const f10 = eae(xu0,yw0);
    const f11 = eae(xu1,yw1);
    const f12 = eae(xu2,yw2);
    const uu0a = eme(c1,c1);
    const uu1a = eme(c1,c2);
    const uu2a = eme(c1,c3);
    const uu1b = eme(c2,c1);
    const uu1bs = eae(uu1a,uu1b);
    const uu2b = eme(c2,c2);
    const uu2bs = eae(uu2a,uu2b);
    const uu3a = eme(c2,c3);
    const uu2c = eme(c3,c1);
    const uu2cs = eae(uu2bs,uu2c);
    const uu3b = eme(c3,c2);
    const uu3bs = eae(uu3a,uu3b);
    const uu4a = eme(c3,c3);
    const uw0a = eme(c1,d1);
    const uw1a = eme(c1,d2);
    const uw2a = eme(c1,d3);
    const uw1b = eme(c2,d1);
    const uw1bs = eae(uw1a,uw1b);
    const uw2b = eme(c2,d2);
    const uw2bs = eae(uw2a,uw2b);
    const uw3a = eme(c2,d3);
    const uw2c = eme(c3,d1);
    const uw2cs = eae(uw2bs,uw2c);
    const uw3b = eme(c3,d2);
    const uw3bs = eae(uw3a,uw3b);
    const uw4a = eme(c3,d3);
    const ww0a = eme(d1,d1);
    const ww1a = eme(d1,d2);
    const ww2a = eme(d1,d3);
    const ww1b = eme(d2,d1);
    const ww1bs = eae(ww1a,ww1b);
    const ww2b = eme(d2,d2);
    const ww2bs = eae(ww2a,ww2b);
    const ww3a = eme(d2,d3);
    const ww2c = eme(d3,d1);
    const ww2cs = eae(ww2bs,ww2c);
    const ww3b = eme(d3,d2);
    const ww3bs = eae(ww3a,ww3b);
    const ww4a = eme(d3,d3);
    const xxuu0 = eme(vₓₓ,uu0a);
    const xxuu1 = eme(vₓₓ,uu1bs);
    const xxuu2 = eme(vₓₓ,uu2cs);
    const xxuu3 = eme(vₓₓ,uu3bs);
    const xxuu4 = eme(vₓₓ,uu4a);
    const xyuw0 = eme(vₓᵧ,uw0a);
    const xyuw1 = eme(vₓᵧ,uw1bs);
    const xyuw2 = eme(vₓᵧ,uw2cs);
    const xyuw3 = eme(vₓᵧ,uw3bs);
    const xyuw4 = eme(vₓᵧ,uw4a);
    const f2a0 = eae(xxuu0,xyuw0);
    const f2a1 = eae(xxuu1,xyuw1);
    const f2a2 = eae(xxuu2,xyuw2);
    const f2a3 = eae(xxuu3,xyuw3);
    const f2a4 = eae(xxuu4,xyuw4);
    const yyww0 = eme(vᵧᵧ,ww0a);
    const yyww1 = eme(vᵧᵧ,ww1bs);
    const yyww2 = eme(vᵧᵧ,ww2cs);
    const yyww3 = eme(vᵧᵧ,ww3bs);
    const yyww4 = eme(vᵧᵧ,ww4a);
    const f2b0 = eae(f2a0,yyww0);
    const f2b1 = eae(f2a1,yyww1);
    const f2b2 = eae(f2a2,yyww2);
    const f2b3 = eae(f2a3,yyww3);
    const f2b4 = eae(f2a4,yyww4);
    const r1 = eae(f11,f2b0);
    const r2 = eae(f12,f2b1);
    const uuu0a = eme(uu0a,c1);
    const uuu1a = eme(uu0a,c2);
    const uuu2a = eme(uu0a,c3);
    const uuu1b = eme(uu1bs,c1);
    const uuu1bs = eae(uuu1a,uuu1b);
    const uuu2b = eme(uu1bs,c2);
    const uuu2bs = eae(uuu2a,uuu2b);
    const uuu3a = eme(uu1bs,c3);
    const uuu2c = eme(uu2cs,c1);
    const uuu2cs = eae(uuu2bs,uuu2c);
    const uuu3b = eme(uu2cs,c2);
    const uuu3bs = eae(uuu3a,uuu3b);
    const uuu4a = eme(uu2cs,c3);
    const uuu3c = eme(uu3bs,c1);
    const uuu3cs = eae(uuu3bs,uuu3c);
    const uuu4b = eme(uu3bs,c2);
    const uuu4bs = eae(uuu4a,uuu4b);
    const uuu5a = eme(uu3bs,c3);
    const uuu4c = eme(uu4a,c1);
    const uuu4cs = eae(uuu4bs,uuu4c);
    const uuu5b = eme(uu4a,c2);
    const uuu5bs = eae(uuu5a,uuu5b);
    const uuu6a = eme(uu4a,c3);
    const uuw0a = eme(uu0a,d1);
    const uuw1a = eme(uu0a,d2);
    const uuw2a = eme(uu0a,d3);
    const uuw1b = eme(uu1bs,d1);
    const uuw1bs = eae(uuw1a,uuw1b);
    const uuw2b = eme(uu1bs,d2);
    const uuw2bs = eae(uuw2a,uuw2b);
    const uuw3a = eme(uu1bs,d3);
    const uuw2c = eme(uu2cs,d1);
    const uuw2cs = eae(uuw2bs,uuw2c);
    const uuw3b = eme(uu2cs,d2);
    const uuw3bs = eae(uuw3a,uuw3b);
    const uuw4a = eme(uu2cs,d3);
    const uuw3c = eme(uu3bs,d1);
    const uuw3cs = eae(uuw3bs,uuw3c);
    const uuw4b = eme(uu3bs,d2);
    const uuw4bs = eae(uuw4a,uuw4b);
    const uuw5a = eme(uu3bs,d3);
    const uuw4c = eme(uu4a,d1);
    const uuw4cs = eae(uuw4bs,uuw4c);
    const uuw5b = eme(uu4a,d2);
    const uuw5bs = eae(uuw5a,uuw5b);
    const uuw6a = eme(uu4a,d3);
    const uww0a = eme(uw0a,d1);
    const uww1a = eme(uw0a,d2);
    const uww2a = eme(uw0a,d3);
    const uww1b = eme(uw1bs,d1);
    const uww1bs = eae(uww1a,uww1b);
    const uww2b = eme(uw1bs,d2);
    const uww2bs = eae(uww2a,uww2b);
    const uww3a = eme(uw1bs,d3);
    const uww2c = eme(uw2cs,d1);
    const uww2cs = eae(uww2bs,uww2c);
    const uww3b = eme(uw2cs,d2);
    const uww3bs = eae(uww3a,uww3b);
    const uww4a = eme(uw2cs,d3);
    const uww3c = eme(uw3bs,d1);
    const uww3cs = eae(uww3bs,uww3c);
    const uww4b = eme(uw3bs,d2);
    const uww4bs = eae(uww4a,uww4b);
    const uww5a = eme(uw3bs,d3);
    const uww4c = eme(uw4a,d1);
    const uww4cs = eae(uww4bs,uww4c);
    const uww5b = eme(uw4a,d2);
    const uww5bs = eae(uww5a,uww5b);
    const uww6a = eme(uw4a,d3);
    const www0a = eme(ww0a,d1);
    const www1a = eme(ww0a,d2);
    const www2a = eme(ww0a,d3);
    const www1b = eme(ww1bs,d1);
    const www1bs = eae(www1a,www1b);
    const www2b = eme(ww1bs,d2);
    const www2bs = eae(www2a,www2b);
    const www3a = eme(ww1bs,d3);
    const www2c = eme(ww2cs,d1);
    const www2cs = eae(www2bs,www2c);
    const www3b = eme(ww2cs,d2);
    const www3bs = eae(www3a,www3b);
    const www4a = eme(ww2cs,d3);
    const www3c = eme(ww3bs,d1);
    const www3cs = eae(www3bs,www3c);
    const www4b = eme(ww3bs,d2);
    const www4bs = eae(www4a,www4b);
    const www5a = eme(ww3bs,d3);
    const www4c = eme(ww4a,d1);
    const www4cs = eae(www4bs,www4c);
    const www5b = eme(ww4a,d2);
    const www5bs = eae(www5a,www5b);
    const www6a = eme(ww4a,d3);
    const xxxuuu0 = eme(vₓₓₓ,uuu0a);
    const xxxuuu1 = eme(vₓₓₓ,uuu1bs);
    const xxxuuu2 = eme(vₓₓₓ,uuu2cs);
    const xxxuuu3 = eme(vₓₓₓ,uuu3cs);
    const xxxuuu4 = eme(vₓₓₓ,uuu4cs);
    const xxxuuu5 = eme(vₓₓₓ,uuu5bs);
    const xxxuuu6 = eme(vₓₓₓ,uuu6a);
    const xxyuuw0 = eme(vₓₓᵧ,uuw0a);
    const xxyuuw1 = eme(vₓₓᵧ,uuw1bs);
    const xxyuuw2 = eme(vₓₓᵧ,uuw2cs);
    const xxyuuw3 = eme(vₓₓᵧ,uuw3cs);
    const xxyuuw4 = eme(vₓₓᵧ,uuw4cs);
    const xxyuuw5 = eme(vₓₓᵧ,uuw5bs);
    const xxyuuw6 = eme(vₓₓᵧ,uuw6a);
    const f3a0 = eae(xxxuuu0,xxyuuw0);
    const f3a1 = eae(xxxuuu1,xxyuuw1);
    const f3a2 = eae(xxxuuu2,xxyuuw2);
    const f3a3 = eae(xxxuuu3,xxyuuw3);
    const f3a4 = eae(xxxuuu4,xxyuuw4);
    const f3a5 = eae(xxxuuu5,xxyuuw5);
    const f3a6 = eae(xxxuuu6,xxyuuw6);
    const xyyuww0 = eme(vₓᵧᵧ,uww0a);
    const xyyuww1 = eme(vₓᵧᵧ,uww1bs);
    const xyyuww2 = eme(vₓᵧᵧ,uww2cs);
    const xyyuww3 = eme(vₓᵧᵧ,uww3cs);
    const xyyuww4 = eme(vₓᵧᵧ,uww4cs);
    const xyyuww5 = eme(vₓᵧᵧ,uww5bs);
    const xyyuww6 = eme(vₓᵧᵧ,uww6a);
    const yyywww0 = eme(vᵧᵧᵧ,www0a);
    const yyywww1 = eme(vᵧᵧᵧ,www1bs);
    const yyywww2 = eme(vᵧᵧᵧ,www2cs);
    const yyywww3 = eme(vᵧᵧᵧ,www3cs);
    const yyywww4 = eme(vᵧᵧᵧ,www4cs);
    const yyywww5 = eme(vᵧᵧᵧ,www5bs);
    const yyywww6 = eme(vᵧᵧᵧ,www6a);
    const f3b0 = eae(xyyuww0,yyywww0);
    const f3b1 = eae(xyyuww1,yyywww1);
    const f3b2 = eae(xyyuww2,yyywww2);
    const f3b3 = eae(xyyuww3,yyywww3);
    const f3b4 = eae(xyyuww4,yyywww4);
    const f3b5 = eae(xyyuww5,yyywww5);
    const f3b6 = eae(xyyuww6,yyywww6);
    const f3c0 = eae(f3a0,f3b0);
    const f3c1 = eae(f3a1,f3b1);
    const f3c2 = eae(f3a2,f3b2);
    const f3c3 = eae(f3a3,f3b3);
    const f3c4 = eae(f3a4,f3b4);
    const f3c5 = eae(f3a5,f3b5);
    const f3c6 = eae(f3a6,f3b6);
    const s2 = eae(r2,f3c0);
    const s3 = eae(f2b2,f3c1);
    const s4 = eae(f2b3,f3c2);
    const s5 = eae(f2b4,f3c3);


    return [f3c6, f3c5, f3c4, s5, s4, s3, s2, r1, f10];
}


export { getCoeffsBez3Bez3SharedStartExact }
