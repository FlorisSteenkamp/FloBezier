
import { getXExact } from '../../../to-power-basis/get-x';
import { getYExact } from '../../../to-power-basis/get-y';

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
import { operators as bigFloatOperators } from "big-float-ts";
const { eNegativeOf, eDiff, expansionProduct } = bigFloatOperators;



/**
 * Returns the exact implicit form of the given linear bezier.
 * Adapted from http://www.mare.ee/indrek/misc/2d.pdf
 * @param ps 
 */
function getImplicitForm1Exact(ps: number[][]) {
    // The implicit form is given by:
    // vₓx + vᵧy + v = 0

    let [a1, a0] = getXExact(ps);
    let [b1, b0] = getYExact(ps);

    let vₓ = b1;
    let vᵧ = eNegativeOf(a1);
    let v = eDiff(
        expansionProduct(a1,b0),
        expansionProduct(a0,b1)
    );

    return { vₓ, vᵧ, v };
}


export { getImplicitForm1Exact }
