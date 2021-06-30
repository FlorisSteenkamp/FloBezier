import { getImplicitForm3 } from "../../implicit-form/double/get-implicit-form3";
import { getImplicitForm3ErrorCounters } from "../../implicit-form/get-error-counters/get-implicit-form3-error-counters";
import { getImplicitForm3DdWithRunningError } from "../../implicit-form/double-double/get-implicit-form3-dd-with-running-error";
import { getImplicitForm3Exact } from "../../implicit-form/exact/get-implicit-form3-exact";
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
 * Returns `true` if the given point is on the given cubic bezier curve where the 
 * parameter `t` is allowed to extend to `±∞`, i.e. if `t ∈ (-∞, +∞)`, 
 * `false` otherwise.
 * 
 * * **precondition:** TODO - underflow/overflow
 * 
 * @internal
 */
 function isPointOnBezierExtension3(ps: number[][], p: number[]): boolean {
    const [x,y] = p;

    //---- first pre-filter
    {
        // The below takes about 1.2 micro-seconds on a 1st gen i7 and Chrome 79
        const { vₓₓₓ, vₓₓᵧ, vₓᵧᵧ, vᵧᵧᵧ, vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v } = 
            getImplicitForm3(ps);

        const { 
            vₓₓₓ_,  // <11>
            vₓₓᵧ_,  // <12>
            vₓᵧᵧ_,  // <12>
            vᵧᵧᵧ_,  // <11>
            vₓₓ_,   // <19>
            vₓᵧ_,   // <18>
            vᵧᵧ_,   // <19>
            vₓ_,    // <22>
            vᵧ_,    // <22>
            v_      // <24>
        } = getImplicitForm3ErrorCounters(ps);
        
        // In the below a a postfix underscore means 
        // an error bound (>= absolute value)
        
        // h (say height) is the the result of evaluating the implicit equation; if
        // it is 0 we are on the curve, else we're not.

        // const h =
        //   vₓₓₓ*x*x*x + vₓₓᵧ*x*x*y + vₓᵧᵧ*x*y*y + vᵧᵧᵧ*y*y*y + 
        //   vₓₓ*x*x + vₓᵧ*x*y + vᵧᵧ*y*y + vₓ*x + vᵧ*y + v;


        // group the terms to reduce error, e.g. v usually has the highest bitlength
        // const h = 
        //    (
        //        ((vₓₓₓxxx + vₓₓᵧxxy) + (vₓᵧᵧxyy + vᵧᵧᵧyyy)) + 
        //        (vₓₓxx + vₓᵧxy + vᵧᵧyy)
        //    ) + 
        //    (
        //        (vₓx + vᵧy) + 
        //        v
        //    );

        const xx = x*x;
        const yy = y*y;

        const h =
            (
                (vₓₓₓ*(xx*x) + vₓₓᵧ*(xx*y)) + 
                (vₓᵧᵧ*(x*yy) + vᵧᵧᵧ*(yy*y)) + 
                ((vₓₓ*xx + vₓᵧ*(x*y)) + vᵧᵧ*yy)
            ) +
            (
                (vₓ*x + vᵧ*y) + 
                v
            );


        //-------------------
        // Error calculation
        //-------------------

        const x_ = abs(x);  // <0>x
        const y_ = abs(y);  // <0>y
        const xx_ = x_*x_;  // <1>xx
        const yy_ = y_*y_;  // <1>yy

        // <26>h <-- <26>(<24>(<17>(<16> + <16>) + <23>) + <25>(<24> + <24>))
        const h_ =
            (
                // <16> <-- <16>((<14>(<11>vₓₓₓ*<2>(xx*x)) + <15>(<12>vₓₓᵧ*<2>(xx*y)))) +
                (vₓₓₓ_*(xx_*x_) + vₓₓᵧ_*(xx_*y_)) +
                // <16> <-- 16((<15>(<12>vₓᵧᵧ*<2>(x*yy)) + <14>(<11>vᵧᵧᵧ*<2>(yy*y)))) +
                (vₓᵧᵧ_*(x_*yy_) + vᵧᵧᵧ_*(yy_*y_)) + 
                // <23> <-- <23>(<22>((<21>(<19>vₓₓ*<1>xx) + <20>(<18>vₓᵧ*<1>(x*y))) + <19>(<18>vᵧᵧ*<1>yy)))
                ((vₓₓ_*xx_ + vₓᵧ_*(x_*y_)) + vᵧᵧ_*yy_)
            ) +
            (
                // <24> <-- <24>(<23>(<22>vₓ*x) + <23>(<22>vᵧ*y))
                (vₓ_*x_ + vᵧ_*y_) + 
                // <24>
                v_
            );


        // if the error is not too high too discern h away from zero
        if (26*γ1*h_ < abs(h)) {
            return false; // <-- prefilter applied
        }
    }

    // error too high - const's try quad precision
    {
        // The below takes about 15 micro-seconds on a 1st gen i7 and Chrome 79
        const { 
            coeffs: { vₓₓₓ, vₓₓᵧ, vₓᵧᵧ, vᵧᵧᵧ, vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v },
            errorBound: { vₓₓₓ_, vₓₓᵧ_, vₓᵧᵧ_, vᵧᵧᵧ_, vₓₓ_, vₓᵧ_, vᵧᵧ_, vₓ_, vᵧ_, v_ }
        } = getImplicitForm3DdWithRunningError(ps);
        
        const _vₓₓₓ = abs(vₓₓₓ[1]);
        const _vₓₓᵧ = abs(vₓₓᵧ[1]);
        const _vₓᵧᵧ = abs(vₓᵧᵧ[1]);
        const _vᵧᵧᵧ = abs(vᵧᵧᵧ[1]);
        
        // In the below a prefix underscore on a variable means absolute value, 
        // a postfix underscore means error bound (before multiplication by gamma).
        
        // h (say height) is the the result of evaluating the implicit equation; if
        // it is 0 we are on the curve, else we're not.
        // const h =
        //   vₓₓₓ*x*x*x + vₓₓᵧ*x*x*y + vₓᵧᵧ*x*y*y + vᵧᵧᵧ*y*y*y + 
        //   vₓₓ*x*x + vₓᵧ*x*y + vᵧᵧ*y*y + vₓ*x + vᵧ*y + v;

        const _x = abs(x);
        const xx = tp(x,x);  // <= error free
        const _xx = xx[1];
        const xxx = qmd(x,xx);
        const _xxx_ = abs(xxx[1]);
        const _y = abs(y);
        const yy = tp(y,y);  // <= error free
        const _yy = yy[1];
        const yyy = qmd(y,yy);
        const _yyy_ = abs(yyy[1]);
        const xxy = qmd(y,xx);
        const _xxy_ = abs(xxy[1]);
        const xyy = qmd(x,yy);
        const _xyy_ = abs(xyy[1]);
        const xy = tp(x,y);  // <= error free
        const _xy = abs(xy[1]);
        const vₓₓₓxxx = qmq(vₓₓₓ,xxx);
        const vₓₓₓxxx_ = (vₓₓₓ_ + _vₓₓₓ)*_xxx_ + 2*abs(vₓₓₓxxx[1]);
        const vₓₓᵧxxy = qmq(vₓₓᵧ,xxy);
        const vₓₓᵧxxy_ = (vₓₓᵧ_ + _vₓₓᵧ)*_xxy_ + 2*abs(vₓₓᵧxxy[1]);
        const vₓᵧᵧxyy = qmq(vₓᵧᵧ,xyy);
        const vₓᵧᵧxyy_ = (vₓᵧᵧ_ + _vₓᵧᵧ)*_xyy_ + 2*abs(vₓᵧᵧxyy[1]);
        const vᵧᵧᵧyyy = qmq(vᵧᵧᵧ,yyy);
        const vᵧᵧᵧyyy_ = (vᵧᵧᵧ_ + _vᵧᵧᵧ)*_yyy_ + 2*abs(vᵧᵧᵧyyy[1]);
        const vₓₓxx = qmq(vₓₓ,xx);
        const vₓₓxx_ = vₓₓ_*_xx + 2*abs(vₓₓxx[1]);
        const vₓᵧxy = qmq(vₓᵧ,xy);
        const vₓᵧxy_ = vₓᵧ_*_xy + 2*abs(vₓᵧxy[1]);
        const vᵧᵧyy = qmq(vᵧᵧ,yy);
        const vᵧᵧyy_ = vᵧᵧ_*_yy + 2*abs(vᵧᵧyy[1]);
        const vₓx = qmd(x,vₓ);
        const vₓx_ = vₓ_*_x + abs(vₓx[1]);
        const vᵧy = qmd(y,vᵧ);
        const vᵧy_ = vᵧ_*_y + abs(vᵧy[1]);

        // group the terms to reduce error, e.g. v usually has the highest bitlength
        //const h = 
        //    (
        //        ((vₓₓₓxxx + vₓₓᵧxxy) + (vₓᵧᵧxyy + vᵧᵧᵧyyy)) + 
        //        (vₓₓxx + vₓᵧxy + vᵧᵧyy)
        //    ) + 
        //    (
        //        (vₓx + vᵧy) + 
        //        v
        //    );

        const q1 = qaq(vₓₓₓxxx,vₓₓᵧxxy);
        const q1_ = vₓₓₓxxx_ + vₓₓᵧxxy_ + abs(q1[1]);
        const q2 = qaq(vₓᵧᵧxyy,vᵧᵧᵧyyy);
        const q2_ = vₓᵧᵧxyy_ + vᵧᵧᵧyyy_ + abs(q2[1]);
        const q3 = qaq(q1,q2);
        const q3_ = q1_ + q2_ + abs(q3[1]);
        const q4 = qaq(vₓₓxx,vₓᵧxy);
        const q4_ = vₓₓxx_ + vₓᵧxy_ + abs(q4[1]);
        const q5 = qaq(q4,vᵧᵧyy);
        const q5_ = q4_ + vᵧᵧyy_ + abs(q5[1]);
        const q6 = qaq(q3,q5);
        const q6_ = q3_ + q5_ + abs(q6[1]);
        const q7 = qaq(vₓx,vᵧy);
        const q7_ = vₓx_ + vᵧy_ + abs(q7[1]);
        const q8 = qaq(q7,v);
        const q8_ = q7_ + v_ + abs(q8[1]);
        const h = qaq(q6,q8);
        const h_ = q6_ + q8_ + abs(h[1]);

        // if the error is not too high too discern h away from zero
        if (γγ3*h_ < abs(estimate(h))) {
            return false; // <-- prefilter applied
        }
    }

    // error still too high - const's go exact
    {
        // TODO - the type coercion below indicates we need to handle the case
        // where the cubic is really a quadratic or a line or a point

        // The below takes about 155 micro-seconds on a 1st gen i7 and Chrome 79
        const { vₓₓₓ, vₓₓᵧ, vₓᵧᵧ, vᵧᵧᵧ, vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v } = 
            getImplicitForm3Exact(ps) as 
                & ImplicitFormExact3   // vₓₓₓ, vₓₓᵧ, vₓᵧᵧ, vᵧᵧᵧ possibly `undefined`
                & ImplicitFormExact2   // vₓₓ, vₓᵧ, vᵧᵧ possibly `undefined`
                & ImplicitFormExact1;  // vₓ, vᵧ possibly `undefined`
        
        // h (say height) is the the result of evaluating the implicit equation; if
        // it is 0 we are on the curve, else we're not.
        // const h =
        //   vₓₓₓ*x*x*x + vₓₓᵧ*x*x*y + vₓᵧᵧ*x*y*y + vᵧᵧᵧ*y*y*y + 
        //   vₓₓ*x*x + vₓᵧ*x*y + vᵧᵧ*y*y + vₓ*x + vᵧ*y + v;

        const xx = tp(x,x);  // <= error free
        const xxx = sce(x,xx);
        const yy = tp(y,y);  // <= error free
        const yyy = sce(y,yy);
        const xxy = sce(y,xx);
        const xyy = sce(x,yy);
        const xy = tp(x,y);  // <= error free
        const vₓₓₓxxx = epr(vₓₓₓ,xxx);
        const vₓₓᵧxxy = epr(vₓₓᵧ,xxy);
        const vₓᵧᵧxyy = epr(vₓᵧᵧ,xyy);
        const vᵧᵧᵧyyy = epr(vᵧᵧᵧ,yyy);
        const vₓₓxx = epr(vₓₓ,xx);
        const vₓᵧxy = epr(vₓᵧ,xy);
        const vᵧᵧyy = epr(vᵧᵧ,yy);
        const vₓx = sce(x,vₓ);
        const vᵧy = sce(y,vᵧ);

        const q1 = fes(vₓₓₓxxx,vₓₓᵧxxy);
        const q2 = fes(vₓᵧᵧxyy,vᵧᵧᵧyyy);
        const q3 = fes(q1,q2);
        const q4 = fes(vₓₓxx,vₓᵧxy);
        const q5 = fes(q4,vᵧᵧyy);
        const q6 = fes(q3,q5);
        const q7 = fes(vₓx,vᵧy);
        const q8 = fes(q7,v);
        const h = fes(q6,q8);

        return sign(h) === 0;  // <= calculation was exact
    }
}


export { isPointOnBezierExtension3 }
