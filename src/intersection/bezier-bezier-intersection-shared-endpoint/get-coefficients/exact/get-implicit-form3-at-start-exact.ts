import { eMult, eAdd, eDiff, eNegativeOf, eMultBy2, eMultDouble2 } from "big-float-ts";
import { toPowerBasis3Exact } from "../../../../to-power-basis/to-power-basis/exact/to-power-basis-exact.js";

const eme = eMult;
const eae = eAdd;
const ede = eDiff;
const eno = eNegativeOf;
const em2 = eMultBy2;
const emd = eMultDouble2;


/**
 * Returns the *exact* implicit form of the given cubic bezier curve *relative
 * to its start point* (see [[getImplicitForm3AtStartDd]] for details).
 *
 * @param ps a cubic bezier curve, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 *
 * @internal
 */
function getImplicitForm3AtStartExact(ps: number[][]): {
            vₓₓₓ: number[]; vₓₓᵧ: number[]; vₓᵧᵧ: number[]; vᵧᵧᵧ: number[];
            vₓₓ: number[]; vₓᵧ: number[]; vᵧᵧ: number[];
            vₓ: number[]; vᵧ: number[];
        } {

    const [[a3,a2,a1],[b3,b2,b1]] = toPowerBasis3Exact(ps);

    // cross products
    const x12 = ede(eme(a1,b2), eme(a2,b1));
    const x13 = ede(eme(a1,b3), eme(a3,b1));
    const x23 = ede(eme(a2,b3), eme(a3,b2));

    const a3a3 = eme(a3,a3);
    const b3b3 = eme(b3,b3);

    const vₓₓₓ = eme(b3b3,b3);
    const vₓₓᵧ = emd(-3, eme(a3,b3b3));
    const vₓᵧᵧ = emd(3, eme(a3a3,b3));
    const vᵧᵧᵧ = eno(eme(a3a3,a3));

    // vₓₓ = b₂b₃×₁₃ + (2b₁b₃ - b₂²)×₂₃
    const vₓₓ = eae(
        eme(eme(b2,b3),x13),
        eme(ede(em2(eme(b1,b3)),eme(b2,b2)),x23)
    );

    // vₓᵧ = -(a₂b₃ + a₃b₂)×₁₃ - 2(a₁b₃ + a₃b₁ - a₂b₂)×₂₃
    const vₓᵧ = eno(eae(
        eme(eae(eme(a2,b3),eme(a3,b2)),x13),
        em2(eme(ede(eae(eme(a1,b3),eme(a3,b1)),eme(a2,b2)),x23))
    ));

    // vᵧᵧ = a₂a₃×₁₃ + (2a₁a₃ - a₂²)×₂₃
    const vᵧᵧ = eae(
        eme(eme(a2,a3),x13),
        eme(ede(em2(eme(a1,a3)),eme(a2,a2)),x23)
    );

    // K = ×₁₃² - ×₁₂×₂₃
    const K = ede(eme(x13,x13),eme(x12,x23));
    const vₓ = eme(b1,K);
    const vᵧ = eno(eme(a1,K));

    return { vₓₓₓ, vₓₓᵧ, vₓᵧᵧ, vᵧᵧᵧ, vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ };
}


export { getImplicitForm3AtStartExact }
