import { γγ } from '../../../src/error-analysis/error-analysis';
import { getImplicitForm1DdWithRunningError47 } from "../../implicit-form/double-double/get-implicit-form1-dd-with-running-error-47";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
import { twoProduct, ddAddDd } from "double-double";
import { expansionProduct, fastExpansionSum, eSign, eEstimate } from 'big-float-ts';

const tp  = twoProduct;
const qaq = ddAddDd;
const epr = expansionProduct;
const fes = fastExpansionSum;
const sign = eSign;
const estimate = eEstimate;

const abs = Math.abs;
const γγ3 = γγ(3);


/**
 * Returns true if the given point is on the given line where 
 * the parameter t is allowed to extend to +-infinity, i.e. t is an element of 
 * [-inf, +inf], false otherwise.
 * 
 * * **Precondition:** `ps` must be grid-aligned and have a maximum bitlength of 47.
 * (p may have any bitlength - no restrictions)
 * * there are many alternative implementations to this function, e.g. ccw, etc;
 * it is just kept for symmetry.
 * 
 * @internal
 */
 function isPointOnBezierExtension1_47(ps: number[][], p: number[]): boolean {
    const [x,y] = p;

    //---- pre-filter - note all coefficients below vₓ, vᵧ, v are exact
    const { coeffs: { vₓ, vᵧ, v } } = 
        getImplicitForm1DdWithRunningError47(ps);
    
    // In the below a prefix underscore on a variable means absolute value, 
    // a postfix underscore means error bound (before multiplication by gamma).
    
    // h (say height) is the the result of evaluating the implicit equation; if
    // it is 0 we are on the curve, else we're not.
    // const h = vₓ*x + vᵧ*y + v;

    const vₓx = tp(x,vₓ);  // <= error free
    const vᵧy = tp(y,vᵧ);

    // group the terms to reduce error, e.g. v usually has the highest bitlength
    //const h = (vₓx + vᵧy) + v;

    let q7 = qaq(vₓx,vᵧy);
    const q7_ = abs(q7[1]);
    let h = qaq(q7,v);
    const h_ = q7_ + abs(h[1]);

    // if the error is not too high too discern h away from zero
    if (γγ3*h_ < abs(estimate(h))) {
        return false; // <-- prefilter applied
    }

    q7 = epr(vₓx,vᵧy);
    h = fes(q7,v);

    return sign(h) === 0;  // <= calculation was exact
}


export { isPointOnBezierExtension1_47 }