import { getImplicitForm2 } from "../../implicit-form/double/get-implicit-form2";
import { getImplicitForm2ErrorCounters } from "../../implicit-form/get-error-counters/get-implicit-form2-error-counters";
import { getImplicitForm2DdWithRunningError } from "../../implicit-form/double-double/get-implicit-form2-dd-with-running-error";
import { getImplicitForm2Exact } from "../../implicit-form/exact/get-implicit-form2-exact";
import { γ, γγ } from '../../../src/error-analysis/error-analysis';

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
import { twoProduct, ddMultDd, ddAddDd, ddMultDouble2 } from "double-double";
import { expansionProduct, fastExpansionSum, eSign, scaleExpansion2, eEstimate } from 'big-float-ts';
import { ImplicitFormExact1, ImplicitFormExact2, ImplicitFormExact3 } from "../../../src/implicit-form/implicit-form-types";

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
 function isPointOnBezierExtension2(
        ps: number[][], p: number[]): boolean {

    const [x,y] = p;

    const x_ = abs(x);
    const y_ = abs(y);

    //---- first pre-filter
    {
        const { vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v } = getImplicitForm2(ps);
        const { 
            vₓₓ_,  // <5>
            vₓᵧ_,  // <5>
            vᵧᵧ_,  // <5>
            vₓ_,   // <8>
            vᵧ_,   // <8>
            v_     // <10>
        } = getImplicitForm2ErrorCounters(ps);
        
        // In the below a a postfix underscore means 
        // an error bound (>= absolute value)
        
        // `h` (say height) is the the result of evaluating the implicit equation; if
        // it is 0 we are on the curve, else we're not.

        // group the terms to reduce error, e.g. v usually has the highest bitlength
        const h = (((vₓₓ*x*x + vₓᵧ*x*y) + vᵧᵧ*y*y) + (vₓ*x + vᵧ*y)) + v;

        // <12>h <-- <12>(<11>(<9>(<8>(<7>(<5>vₓₓ*<1>(x*x)) + <7>(<5>vₓᵧ*<1>(x*y))) + <7>(<5>vᵧᵧ*<1>(y*y))) + 
        //         <10>(<9>(<8>vₓ*x) + <9>(<8>vᵧ*y))) + <10>v);
        const h_ = (((vₓₓ_*x_*x_ + vₓᵧ_*x_*y_) + vᵧᵧ_*y_*y_) + (vₓ_*x_ + vᵧ_*y_)) + v_;


        // if the error is not too high too discern h away from zero
        if (12*γ1*h_ < abs(h)) {
            return false; // <-- prefilter applied
        }
    }

    // error too high - const's try quad precision
    {
        const { 
            coeffs: { vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v },
            errorBound: { vₓ_, vᵧ_, v_ }
        } = getImplicitForm2DdWithRunningError(ps);
        
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
            getImplicitForm2Exact(ps) as 
                & ImplicitFormExact2   // vₓₓ, vₓᵧ, vᵧᵧ possibly `undefined`
                & ImplicitFormExact1;  // vₓ, vᵧ possibly `undefined`
        
        // h (say height) is the the result of evaluating the implicit equation; 
        // if it is 0 we are on the curve, else we're not.
        // const h =
        //   vₓₓ*x*x + vₓᵧ*x*y + vᵧᵧ*y*y + vₓ*x + vᵧ*y + v;

        const h = fes(
            fes(
                fes(
                    epr(vₓₓ,tp(x,x)),
                    epr(vₓᵧ,tp(x,y))
                ),
                epr(vᵧᵧ,tp(y,y))
            ),
            fes(
                fes(
                    sce(x,vₓ),
                    sce(y,vᵧ)
                ),
                v
            )
        );

        return sign(h) === 0;  // <= calculation was exact
    }
}


export { isPointOnBezierExtension2 }
