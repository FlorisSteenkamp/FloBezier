import { eMult, eDiff, eNegativeOf, eMultBy2 } from "big-float-ts";
import { toPowerBasis2Exact } from "../../../../to-power-basis/to-power-basis/exact/to-power-basis-exact.js";
const eme = eMult;
const ede = eDiff;
const eno = eNegativeOf;
const em2 = eMultBy2;
/**
 * Returns the *exact* implicit form of the given quadratic bezier curve
 * *relative to its start point* (see [[getImplicitForm2AtStartDd]] for
 * details).
 *
 * @param ps a quadratic bezier curve, e.g. `[[0,0],[1,1],[2,1]]`
 *
 * @internal
 */
function getImplicitForm2AtStartExact(ps) {
    const [[a2, a1], [b2, b1]] = toPowerBasis2Exact(ps);
    const x12 = ede(eme(a1, b2), eme(a2, b1));
    const vₓₓ = eme(b2, b2);
    const vₓᵧ = eno(em2(eme(a2, b2)));
    const vᵧᵧ = eme(a2, a2);
    const vₓ = eme(b1, x12);
    const vᵧ = eno(eme(a1, x12));
    return { vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ };
}
export { getImplicitForm2AtStartExact };
//# sourceMappingURL=get-implicit-form2-at-start-exact.js.map