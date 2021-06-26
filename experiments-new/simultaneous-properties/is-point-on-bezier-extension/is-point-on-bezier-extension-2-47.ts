import { getImplicitForm2WithRunningError47 } from "../../implicit-form/double/get-implicit-form2-with-running-error-47";
import { getImplicitForm2DdWithRunningError47 } from "../../implicit-form/double-double/get-implicit-form2-dd-with-running-error-47";
import { getImplicitForm2Exact47 } from "../../implicit-form/exact/get-implicit-form2-exact-47";
import { γ, γγ } from '../../../src/error-analysis/error-analysis';

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
import { twoProduct, ddMultDd, ddAddDd, ddMultDouble2 } from "double-double";
import { expansionProduct, fastExpansionSum, eSign, scaleExpansion2, eEstimate } from 'big-float-ts';
import { ImplicitFormExact1, ImplicitFormExact2 } from "../../../src/implicit-form/implicit-form-types";

const tp  = twoProduct;
const qmq = ddMultDd;
const qaq = ddAddDd;
const qmd = ddMultDouble2;
const sce = scaleExpansion2;
const epr = expansionProduct;
const fes = fastExpansionSum;
const sign = eSign;
const estimate = eEstimate;

const abs = Math.abs;
const γ1 = γ(1);
const γγ3 = γγ(3);


/**
 * Returns true if the given point is on the given quadratic bezier curve where 
 * the parameter t is allowed to extend to +-infinity, i.e. t is an element of 
 * [-inf, +inf], false otherwise.
 * 
 * * Precondition: ps must be grid-aligned and have a maximum bitlength of 47.
 * (p may have any bitlength - no restrictions)
 * 
 * @internal
 */
 function isPointOnBezierExtension2_47(ps: number[][], p: number[]): boolean {
    const [x,y] = p;

    //---- first pre-filter
    {
        const { 
            coeffs: { vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v },
            errorBound: { vₓₓ_, vₓᵧ_, vᵧᵧ_, vₓ_, vᵧ_, v_ }
        } = getImplicitForm2WithRunningError47(ps);
        
        const _vₓₓ = abs(vₓₓ);
        const _vₓᵧ = abs(vₓᵧ);
        const _vᵧᵧ = abs(vᵧᵧ);
        
        // In the below a prefix underscore on a variable means absolute value, 
        // a postfix underscore means error bound (before multiplication by gamma).
        
        // h (say height) is the the result of evaluating the implicit equation; if
        // it is 0 we are on the curve, else we're not.
        // const h =
        //   vₓₓ*x*x + vₓᵧ*x*y + vᵧᵧ*y*y + vₓ*x + vᵧ*y + v;

        const _x = abs(x);
        const xx = x*x;
        const _xx_ = xx;
        const _y = abs(y);
        const yy = y*y;
        const _yy_ = yy;
        const xy = x*y;
        const _xy_ = abs(xy);
        const vₓₓxx = vₓₓ*xx;
        const vₓₓxx_ = (vₓₓ_ + _vₓₓ)*_xx_ + abs(vₓₓxx);
        const vₓᵧxy = vₓᵧ*xy;
        const vₓᵧxy_ = (vₓᵧ_ + _vₓᵧ)*_xy_ + abs(vₓᵧxy);
        const vᵧᵧyy = vᵧᵧ*yy;
        const vᵧᵧyy_ = (vᵧᵧ_ + _vᵧᵧ)*_yy_ + abs(vᵧᵧyy);
        const vₓx = vₓ*x;
        const vₓx_ = vₓ_*_x + abs(vₓx);
        const vᵧy = vᵧ*y;
        const vᵧy_ = vᵧ_*_y + abs(vᵧy);

        // group the terms to reduce error, e.g. v usually has the highest bitlength
        //const h = 
        //    (
        //      ((vₓₓxx + vₓᵧxy) + vᵧᵧyy) + 
        //      (vₓx + vᵧy)
        //    ) + 
        //    v;

        const q4 = vₓₓxx + vₓᵧxy;
        const q4_ = vₓₓxx_ + vₓᵧxy_ + abs(q4);
        const q5 = q4 + vᵧᵧyy;
        const q5_ = q4_ + vᵧᵧyy_ + abs(q5);
        const q7 = vₓx + vᵧy;
        const q7_ = vₓx_ + vᵧy_ + abs(q7);
        const q8 = q5 + q7;
        const q8_ = q5_ + q7_ + abs(q8);
        const h = q8 + v;
        const h_ = q8_ + v_ + abs(h);

        // if the error is not too high too discern h away from zero
        if (γ1*h_ < abs(h)) {
            return false; // <-- prefilter applied
        }
    }

    // error too high - const's try quad precision
    {
        const { 
            coeffs: { vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v },
            errorBound: { vₓ_, vᵧ_, v_ }
        } = getImplicitForm2DdWithRunningError47(ps);
        
        // In the below a prefix underscore on a variable means absolute value, 
        // a postfix underscore means error bound (before multiplication by gamma).
        
        // h (say height) is the the result of evaluating the implicit equation; if
        // it is 0 we are on the curve, else we're not.
        // const h =
        //   vₓₓ*x*x + vₓᵧ*x*y + vᵧᵧ*y*y + vₓ*x + vᵧ*y + v;

        const _x = abs(x);
        const xx = tp(x,x);  // <= error free
        const _y = abs(y);
        const yy = tp(y,y);  // <= error free
        const xy = tp(x,y);  // <= error free
        const vₓₓxx = qmq(vₓₓ,xx);
        const vₓₓxx_ = 2*abs(vₓₓxx[1]);
        const vₓᵧxy = qmq(vₓᵧ,xy);
        const vₓᵧxy_ = 2*abs(vₓᵧxy[1]);
        const vᵧᵧyy = qmq(vᵧᵧ,yy);
        const vᵧᵧyy_ = 2*abs(vᵧᵧyy[1]);
        const vₓx = qmd(x,vₓ);
        const vₓx_ = vₓ_*_x + abs(vₓx[1]);
        const vᵧy = qmd(y,vᵧ);
        const vᵧy_ = vᵧ_*_y + abs(vᵧy[1]);

        // group the terms to reduce error, e.g. v usually has the highest bitlength
        //const h = 
        //    (
        //      ((vₓₓxx + vₓᵧxy) + vᵧᵧyy) + 
        //      (vₓx + vᵧy)
        //    ) + 
        //    v;

        const q4 = qaq(vₓₓxx,vₓᵧxy);
        const q4_ = vₓₓxx_ + vₓᵧxy_ + abs(q4[1]);
        const q5 = qaq(q4,vᵧᵧyy);
        const q5_ = q4_ + vᵧᵧyy_ + abs(q5[1]);
        const q7 = qaq(vₓx,vᵧy);
        const q7_ = vₓx_ + vᵧy_ + abs(q7[1]);
        const q8 = qaq(q5,q7);
        const q8_ = q5_ + q7_ + abs(q8[1]);
        const h = qaq(q8,v);
        const h_ = q8_ + v_ + abs(h[1]);

        // if the error is not too high too discern h away from zero
        if (γγ3*h_ < abs(estimate(h))) {
            return false; // <-- prefilter applied
        }
    }

    // error still too high - const's go exact
    {
        // TODO - the type coercion below indicates we need to handle the case
        // where the cubic is really a quadratic or a line or a point
        
        const { vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v } = 
            getImplicitForm2Exact47(ps) as 
                & ImplicitFormExact2   // vₓₓ, vₓᵧ, vᵧᵧ possibly `undefined`
                & ImplicitFormExact1;  // vₓ, vᵧ possibly `undefined`
        
        // h (say height) is the the result of evaluating the implicit equation; 
        // if it is 0 we are on the curve, else we're not.
        // const h =
        //   vₓₓ*x*x + vₓᵧ*x*y + vᵧᵧ*y*y + vₓ*x + vᵧ*y + v;

        const xx = tp(x,x);  // <= error free
        const yy = tp(y,y);  // <= error free
        const xy = tp(x,y);  // <= error free
        const vₓₓxx = epr(vₓₓ,xx);
        const vₓᵧxy = epr(vₓᵧ,xy);
        const vᵧᵧyy = epr(vᵧᵧ,yy);
        const vₓx = sce(x,vₓ);
        const vᵧy = sce(y,vᵧ);

        const q4 = fes(vₓₓxx,vₓᵧxy);
        const q5 = fes(q4,vᵧᵧyy);
        const q7 = fes(vₓx,vᵧy);
        const q8 = fes(q7,v);
        const h = fes(q5,q8);

        return sign(h) === 0;  // <= calculation was exact
    }
}


export { isPointOnBezierExtension2_47 }
