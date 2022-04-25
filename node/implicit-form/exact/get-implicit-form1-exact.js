import { toPowerBasis1Exact } from "../../to-power-basis/to-power-basis/exact/to-power-basis-exact.js";
// We *have* to do the below to improve performance with bundlers❗ The assignee is a getter❗ The assigned is a pure function❗
import { scaleExpansion2, eDiff, eNegativeOf } from "big-float-ts";
import { eSign as _eSign } from 'big-float-ts';
const sce = scaleExpansion2;
const edif = eDiff;
const eno = eNegativeOf;
const eSign = _eSign;
/**
 * Returns the exact implicit form of the given linear bezier curve (a line)
 * or `undefined` if the line degenerates to a point.
 *
 * Returned coefficients are subscripted to match their monomial's variables,
 * e.g. `vₓᵧ` is the coefficient of the monomial `vₓᵧxy`
 *
 * * the implicit form is given by: `vₓx + vᵧy + v = 0`
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 *
 * @param ps
 *
 * @doc mdx
 */
function getImplicitForm1Exact(ps) {
    return getImplicitForm1ExactPb(toPowerBasis1Exact(ps));
}
/**
 * The power basis version of [[getImplicitForm1ExactAnyBitlength]].
 *
 * @param pspb the power basis representation of a linear bezier curve that
 * can be found via [[toPowerBasis1Exact]]
 *
 * @internal
 */
function getImplicitForm1ExactPb(pspb) {
    const [[a1, [a0]], [b1, [b0]]] = pspb;
    if (eSign(a1) === 0 && eSign(b1) === 0) {
        // the input bezier curve is in fact not linear but has order < 1
        // it is a point and no implicit form is possible
        return undefined;
    }
    const vₓ = eno(b1);
    const vᵧ = a1;
    //const v = a1*b0 - a0*b1;
    const v = edif(sce(a0, b1), sce(b0, a1));
    return { vₓ, vᵧ, v };
}
export { getImplicitForm1Exact, getImplicitForm1ExactPb };
//# sourceMappingURL=get-implicit-form1-exact.js.map