import { getImplicitForm3InclError } from "../implicit-form/double-incl-error/get-implicit-form3-incl-error";
import { getImplicitForm3Dd } from "../implicit-form/double-double/get-implicit-form3-dd";
import { getImplicitForm3Exact } from "../implicit-form/exact/get-implicit-form3-exact";
import { getImplicitForm2InclError } from "../implicit-form/double-incl-error/get-implicit-form2-incl-error";
import { getImplicitForm2Dd } from "../implicit-form/double-double/get-implicit-form2-dd";
import { getImplicitForm2Exact } from "../implicit-form/exact/get-implicit-form2-exact";
import { γ, γγ } from '../error-analysis/error-analysis';

import { getImplicitForm1Dd } from "../implicit-form/double-double/get-implicit-form1-dd";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
import { twoProduct, ddMultDd, ddAddDd, ddMultDouble2 } from "double-double";
import { expansionProduct, fastExpansionSum, eSign, scaleExpansion2, eEstimate } from 'big-float-ts';
import { ImplicitFormExact1, ImplicitFormExact2, ImplicitFormExact3 } from "../implicit-form/implicit-form-types";

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
 * * **precondition:** `ps` must be grid-aligned and have a maximum bitlength of 47.
 * (p may have any bitlength - no restrictions)
 * 
 * @internal
 */
function isPointOnBezierExtension3(ps: number[][], p: number[]): boolean {
    const [x,y] = p;

    //---- first pre-filter
    {
        // The below takes about 1.2 micro-seconds on a 1st gen i7 and Chrome 79
        const { 
            coeffs: { vₓₓₓ, vₓₓᵧ, vₓᵧᵧ, vᵧᵧᵧ, vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v },
            errorBound: { vₓₓₓ_, vₓₓᵧ_, vₓᵧᵧ_, vᵧᵧᵧ_, vₓₓ_, vₓᵧ_, vᵧᵧ_, vₓ_, vᵧ_, v_ }
        } = getImplicitForm3InclError(ps);
        
        const _vₓₓₓ = abs(vₓₓₓ);
        const _vₓₓᵧ = abs(vₓₓᵧ);
        const _vₓᵧᵧ = abs(vₓᵧᵧ);
        const _vᵧᵧᵧ = abs(vᵧᵧᵧ);
        const _vₓₓ = abs(vₓₓ);
        const _vₓᵧ = abs(vₓᵧ);
        const _vᵧᵧ = abs(vᵧᵧ);
        
        // In the below a prefix underscore on a variable means absolute value, 
        // a postfix underscore means error bound (before multiplication by gamma).
        
        // h (say height) is the the result of evaluating the implicit equation; if
        // it is 0 we are on the curve, else we're not.
        // const h =
        //   vₓₓₓ*x*x*x + vₓₓᵧ*x*x*y + vₓᵧᵧ*x*y*y + vᵧᵧᵧ*y*y*y + 
        //   vₓₓ*x*x + vₓᵧ*x*y + vᵧᵧ*y*y + vₓ*x + vᵧ*y + v;

        const _x = abs(x);
        const xx = x*x;
        const _xx_ = xx;
        const xxx = xx*x;
        const _xxx = abs(xxx);
        const xxx_ = _xx_*_x + _xxx;
        const _y = abs(y);
        const yy = y*y;
        const _yy_ = yy;
        const yyy = yy*y;
        const _yyy = abs(yyy);
        const yyy_ = _yy_*_y + _yyy;
        const xxy = xx*y;
        const _xxy = abs(xxy);
        const xxy_ = _xx_*_y + _xxy;
        const xyy = x*yy;
        const _xyy = abs(xyy);
        const xyy_ = _x*_yy_ + _xyy;
        const xy = x*y;
        const _xy_ = abs(xy);
        const vₓₓₓxxx = vₓₓₓ*xxx;
        const vₓₓₓxxx_ = vₓₓₓ_*_xxx + _vₓₓₓ*xxx_ + abs(vₓₓₓxxx);
        const vₓₓᵧxxy = vₓₓᵧ*xxy;
        const vₓₓᵧxxy_ = vₓₓᵧ_*_xxy + _vₓₓᵧ*xxy_ + abs(vₓₓᵧxxy);
        const vₓᵧᵧxyy = vₓᵧᵧ*xyy;
        const vₓᵧᵧxyy_ = vₓᵧᵧ_*_xyy + _vₓᵧᵧ*xyy_ + abs(vₓᵧᵧxyy);
        const vᵧᵧᵧyyy = vᵧᵧᵧ*yyy;
        const vᵧᵧᵧyyy_ = vᵧᵧᵧ_*_yyy + _vᵧᵧᵧ*yyy_ + abs(vᵧᵧᵧyyy);
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
        // const h = 
        //    (
        //        ((vₓₓₓxxx + vₓₓᵧxxy) + (vₓᵧᵧxyy + vᵧᵧᵧyyy)) + 
        //        (vₓₓxx + vₓᵧxy + vᵧᵧyy)
        //    ) + 
        //    (
        //        (vₓx + vᵧy) + 
        //        v
        //    );

        const q1 = vₓₓₓxxx + vₓₓᵧxxy;
        const q1_ = vₓₓₓxxx_ + vₓₓᵧxxy_ + abs(q1);
        const q2 = vₓᵧᵧxyy + vᵧᵧᵧyyy;
        const q2_ = vₓᵧᵧxyy_ + vᵧᵧᵧyyy_ + abs(q2);
        const q3 = q1 + q2;
        const q3_ = q1_ + q2_ + abs(q3);
        const q4 = vₓₓxx + vₓᵧxy;
        const q4_ = vₓₓxx_ + vₓᵧxy_ + abs(q4);
        const q5 = q4 + vᵧᵧyy;
        const q5_ = q4_ + vᵧᵧyy_ + abs(q5);
        const q6 = q3 + q5;
        const q6_ = q3_ + q5_ + abs(q6);
        const q7 = vₓx + vᵧy;
        const q7_ = vₓx_ + vᵧy_ + abs(q7);
        const q8 = q7 + v;
        const q8_ = q7_ + v_ + abs(q8);
        const h = q6 + q8;
        const h_ = q6_ + q8_ + abs(h);

        // if the error is not too high too discern h away from zero
        if (γ1*h_ < abs(h)) {
            return false; // <-- prefilter applied
        }
    }

    // error too high - const's try quad precision
    {
        // The below takes about 15 micro-seconds on a 1st gen i7 and Chrome 79
        const { 
            coeffs: { vₓₓₓ, vₓₓᵧ, vₓᵧᵧ, vᵧᵧᵧ, vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v },
            errorBound: { vₓₓₓ_, vₓₓᵧ_, vₓᵧᵧ_, vᵧᵧᵧ_, vₓₓ_, vₓᵧ_, vᵧᵧ_, vₓ_, vᵧ_, v_ }
        } = getImplicitForm3Dd(ps);
        
        const _vₓₓₓ = abs(vₓₓₓ[1]);
        const _vₓₓᵧ = abs(vₓₓᵧ[1]);
        const _vₓᵧᵧ = abs(vₓᵧᵧ[1]);
        const _vᵧᵧᵧ = abs(vᵧᵧᵧ[1]);
        const _vₓₓ = abs(vₓₓ[1]);
        const _vₓᵧ = abs(vₓᵧ[1]);
        const _vᵧᵧ = abs(vᵧᵧ[1]);
        
        // In the below a prefix underscore on a variable means absolute value, 
        // a postfix underscore means error bound (before multiplication by gamma).
        
        // h (say height) is the the result of evaluating the implicit equation; if
        // it is 0 we are on the curve, else we're not.
        // const h =
        //   vₓₓₓ*x*x*x + vₓₓᵧ*x*x*y + vₓᵧᵧ*x*y*y + vᵧᵧᵧ*y*y*y + 
        //   vₓₓ*x*x + vₓᵧ*x*y + vᵧᵧ*y*y + vₓ*x + vᵧ*y + v;

        const _x = abs(x);
        const xx = tp(x,x);  // <= error free
        const _xx = abs(xx[1]);
        const xxx = qmd(x,xx);
        const _xxx_ = abs(xxx[1]);
        const _y = abs(y);
        const yy = tp(y,y);  // <= error free
        const _yy = abs(yy[1]);
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
function isPointOnBezierExtension2(ps: number[][], p: number[]): boolean {
    const [x,y] = p;

    //---- first pre-filter
    {
        const { 
            coeffs: { vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v },
            errorBound: { vₓₓ_, vₓᵧ_, vᵧᵧ_, vₓ_, vᵧ_, v_ }
        } = getImplicitForm2InclError(ps);
        
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
        } = getImplicitForm2Dd(ps);
        
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
function isPointOnBezierExtension1(ps: number[][], p: number[]): boolean {
    const [x,y] = p;

    //---- pre-filter - note all coefficients below vₓ, vᵧ, v are exact
    const { coeffs: { vₓ, vᵧ, v } } = 
        getImplicitForm1Dd(ps);
    
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


/**
 * Returns `true` if the given point is on the given bezier curve where the 
 * parameter `t` is allowed to extend to ±∞, i.e. `t` is an element of 
 * `(-∞, +∞)`, `false` otherwise.
 * 
 * * **precondition**: `ps` and `p` must be bit-aligned with a maximum 
 * bitlength of 47.
 * 
 * @param ps 
 * @param p 
 */
function isPointOnBezierExtension(ps: number[][], p: number[]): boolean {
    if (ps.length === 4) {
        return isPointOnBezierExtension3(ps, p);
    }
    if (ps.length === 3) {
        return isPointOnBezierExtension2(ps, p);
    }

    return isPointOnBezierExtension1(ps, p);
}


export { isPointOnBezierExtension }
