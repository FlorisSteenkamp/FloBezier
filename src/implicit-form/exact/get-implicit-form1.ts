
import { getXExact } from '../../to-power-basis/get-x';
import { getYExact } from '../../to-power-basis/get-y';
import { negativeOf, expansionDiff, expansionProduct } from 'flo-numerical';
import { TImplicitFormExact } from '../../intersection/bezier-intersection-implicit/t-implicit-form';


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
    let vᵧ = negativeOf(a1);
    let v = expansionDiff(
        expansionProduct(a1,b0),
        expansionProduct(a0,b1)
    );

    return { vₓ, vᵧ, v };
}


export { getImplicitForm1Exact }
