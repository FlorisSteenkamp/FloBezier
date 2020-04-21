
import { twoProduct, qDiffQuad } from 'flo-numerical';
import { getXY } from '../../to-power-basis/get-xy';


const tp = twoProduct;
const qdq = qDiffQuad;


/**
 * Returns the exact implicit form of the given linear bezier.
 * Adapted from http://www.mare.ee/indrek/misc/2d.pdf
 * @param ps 
 */
function getImplicitForm1Exact_(ps: number[][]) {
    // The implicit form is given by:
    // vₓx + vᵧy + v = 0

    let [[a1,a0], [b1,b0]] = getXY(ps);

    let vₓ = -b1;
    let vᵧ = a1;
    let v = qdq(
        tp(a0,b1),
        tp(a1,b0)
    );

    return { vₓ, vᵧ, v };
}


export { getImplicitForm1Exact_ }
