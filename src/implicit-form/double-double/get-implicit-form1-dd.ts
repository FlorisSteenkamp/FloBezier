import { ddDiffDd, ddMultDouble2, ddNegativeOf } from 'double-double';
import { getXY1Dd } from '../../to-power-basis/get-xy/double-double/get-xy-dd.js';

// We *have* to do the below to improve performance with bundlers❗ The assignee is a getter❗ The assigned is a pure function❗
const qdq = ddDiffDd;       // error -> 3*γ²
const qmd = ddMultDouble2;
const qno = ddNegativeOf;


/**
 * Returns a double-double precision implicit form of the given 
 * linear bezier.
 * 
 * Returned coefficients are subscripted to match their monomial's variables,
 * e.g. `vₓᵧ` is the coefficient of the monomial `vₓᵧxy`
 * 
 * * the implicit form is given by: `vₓx + vᵧy + v = 0`
 * * intermediate calculations are performed in double-double precision
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 * 
 * @param ps 
 * 
 * @doc mdx
 */
function getImplicitForm1Dd(ps: number[][]) {
    // The implicit form is given by:
    // vₓx + vᵧy + v = 0

    const [[a1, a0], [b1, b0]] = getXY1Dd(ps);

    const vₓ = qno(b1);  // exact
    const vᵧ = a1;       // exact

    //const v = a0*b1 - a1*b0;
    const v = qdq(qmd(a0,b1),qmd(b0,a1));

    return { vₓ, vᵧ, v };
}


export { getImplicitForm1Dd }
