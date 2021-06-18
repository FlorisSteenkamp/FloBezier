import type { ImplicitFormExact1 } from "../implicit-form-types";
import { getXYExactAnyBitlength1 } from "../../to-power-basis/any-bitlength/exact/get-xy-exact-any-bitlength";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
import { scaleExpansion2, eDiff, eNegativeOf } from "big-float-ts";
// TODO - investigate order 1 bezier curves (points!)
import { eSign as _eSign } from 'big-float-ts';


const sce = scaleExpansion2;
const edif = eDiff;
const eno = eNegativeOf;
const eSign = _eSign;

// TODO - consider adding getImplicitForm0
/**
 * Returns the exact implicit form of the given linear bezier curve (a line)
 * or `undefined` if the line is really a point.
 * 
 * Returned coefficients are subscripted to match their monomial's variables,
 * e.g. `vₓᵧ` is the coefficient of the monomial `vₓᵧxy`
 * 
 * * the implicit form is given by: `vₓx + vᵧy + v = 0`
 * * **precondition:** the coordinates of the given bezier must be 48-bit aligned
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 * 
 * @param ps 
 * 
 * @doc mdx
 */
function getImplicitForm1ExactAnyBitlength(
        ps: number[][]): ImplicitFormExact1 {

    return getImplicitForm1ExactAnyBitlengthPb(
        getXYExactAnyBitlength1(ps)
    );
}


/**
 * The power basis version of [[getImplicitForm1ExactAnyBitlength]].
 * 
 * @param pspb the power basis representation of a linear bezier curve that 
 * can be found via [[getXYExactAnyBitlength1]]
 * 
 * @internal
 */
 function getImplicitForm1ExactAnyBitlengthPb(
    pspb: [
            [number[], number], 
            [number[], number]
        ]): ImplicitFormExact1 {

    const [[a1,a0], [b1,b0]] = pspb;

    if (eSign(a1) === 0 && eSign(b1) === 0) {
        // the input bezier curve is in fact not linear but has order < 1
        // it is a point and no implicit form is possible
        return undefined;
    }

    const vₓ = eno(b1);
    const vᵧ = a1;

    //const v = a1*b0 - a0*b1;
    const v = edif(
        sce(a0,b1),
        sce(b0,a1)
    );

    return { vₓ, vᵧ, v };
}


export { getImplicitForm1ExactAnyBitlength, getImplicitForm1ExactAnyBitlengthPb }
