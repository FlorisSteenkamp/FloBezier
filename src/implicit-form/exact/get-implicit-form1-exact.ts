import { twoProduct, ddDiffDd } from 'double-double';
import { getXY } from '../../to-power-basis/get-xy';

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const tp = twoProduct;
const qdq = ddDiffDd;


/**
 * Returns the exact implicit form of the given linear bezier curve (a line).
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
function getImplicitForm1Exact(ps: number[][]) {
    const [[a1,a0], [b1,b0]] = getXY(ps);

    const vₓ = -b1;
    const vᵧ = a1;
    const v = qdq(
        tp(a0,b1),
        tp(a1,b0)
    );  // 48-bit aligned => error free

    return { vₓ, vᵧ, v };
}


export { getImplicitForm1Exact }
