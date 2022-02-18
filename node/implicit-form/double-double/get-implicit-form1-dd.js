import { ddDiffDd, ddMultDouble2, ddNegativeOf } from 'double-double';
import { getXY1Dd } from '../../to-power-basis/get-xy/double-double/get-xy-dd.js';
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const qdq = ddDiffDd; // error -> 3*γ²
const qmd = ddMultDouble2;
const qno = ddNegativeOf;
// TODO - modify
/**
 * Returns a double-double precision implicit form of the given
 * linear bezier.
 *
 * Returned coefficients are subscripted to match their monomial's variables,
 * e.g. `vₓᵧ` is the coefficient of the monomial `vₓᵧxy`
 *
 * * the implicit form is given by: `vₓx + vᵧy + v = 0`
 * * **precondition:** TODO - add underflow / overflow conditions + docs below
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 *
 * @param ps
 *
 * @doc mdx
 */
function getImplicitForm1Dd(ps) {
    // The implicit form is given by:
    // vₓx + vᵧy + v = 0
    const [[a1, a0], [b1, b0]] = getXY1Dd(ps);
    const vₓ = qno(b1); // exact
    const vᵧ = a1; // exact
    //const v = a0*b1 - a1*b0;
    const v = qdq(qmd(a0, b1), qmd(b0, a1));
    return { vₓ, vᵧ, v };
}
export { getImplicitForm1Dd };
//# sourceMappingURL=get-implicit-form1-dd.js.map