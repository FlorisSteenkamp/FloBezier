import { γγ } from '../../../src/error-analysis/error-analysis';
import { getImplicitForm1DdWithRunningError } from "../../implicit-form/double-double/get-implicit-form1-dd-with-running-error";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
import { ddAddDd, ddMultDouble2 } from "double-double";
import { expansionProduct, fastExpansionSum, eSign, eEstimate, scaleExpansion2 } from 'big-float-ts';
import { getImplicitForm1Exact } from '../../implicit-form/exact/get-implicit-form1-exact';

const qaq = ddAddDd;
const epr = expansionProduct;
const fes = fastExpansionSum;
const sign = eSign;
const estimate = eEstimate;
const qmd = ddMultDouble2;
const sce = scaleExpansion2;

const abs = Math.abs;
const γγ3 = γγ(3);


/**
 * Returns true if the given point is on the given line where 
 * the parameter t is allowed to extend to +-infinity, i.e. t is an element of 
 * [-inf, +inf], false otherwise.
 * 
 * * **Precondition:** TODO - underflow/overflow
 * * there are many alternative implementations to this function, e.g. ccw, etc;
 * it is just kept for symmetry.
 * 
 * @internal
 */
 function isPointOnBezierExtension1(
        ps: number[][], p: number[]): boolean {

    const [x,y] = p;

    {
        //---- pre-filter - note all coefficients below vₓ, vᵧ, v are exact
        const { 
            coeffs: { vₓ, vᵧ, v },
            errorBound: { v_ }
        } = getImplicitForm1DdWithRunningError(ps);
        
        // In the below a prefix underscore on a variable means absolute value, 
        // a postfix underscore means error bound (before multiplication by gamma).
        
        // h (say height) is the the result of evaluating the implicit equation; if
        // it is 0 we are on the curve, else we're not.
        // const h = vₓ*x + vᵧ*y + v;

        const $vₓx = vₓ[1]*x;
        const vₓx = qmd(x,vₓ);
        const _vₓx_ = abs($vₓx);
        const $vᵧy = vᵧ[1]*y;
        const vᵧy = qmd(y,vᵧ);
        const _vᵧy_ = abs($vᵧy);

        // group the terms to reduce error, e.g. `v` usually has the highest bitlength
        //const h = (vₓx + vᵧy) + v;

        const q7 = qaq(vₓx,vᵧy);
        const q7_ = 2*(_vₓx_*_vᵧy_) + abs(q7[1]);
        const h = qaq(q7,v);
        const h_ = q7_ + v_ + abs(h[1]);

        // if the error is not too high too discern h away from zero
        if (γγ3*h_ < abs(estimate(h))) {
            return false; // <-- prefilter applied
        }
    }

    {
        const { vₓ, vᵧ, v } = 
            getImplicitForm1Exact(ps);  // vₓ, vᵧ possibly `undefined`

        const vₓx = sce(x,vₓ);
        const vᵧy = sce(y,vᵧ);

        const hh = fes(epr(vₓx,vᵧy),v);

        return sign(hh) === 0;  // <= calculation was exact
    }
}


export { isPointOnBezierExtension1 }