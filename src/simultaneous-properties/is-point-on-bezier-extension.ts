
import { getImplicitForm3 } from "../implicit-form/naive/get-implicit-form3";
import { getImplicitForm3Quad } from "../implicit-form/quad/get-implicit-form3";
import { γ1, γγ3 } from '../error-analysis/error-analysis';
import { twoProduct, qMultDouble2, qMultQuad, qAddQuad, estimate, sign, scaleExpansion2, expansionProduct, fastExpansionSum } from "flo-numerical";
import { getImplicitForm3Exact_ } from "../implicit-form/exact/get-implicit-form3-";
import { getImplicitForm2 } from "../implicit-form/naive/get-implicit-form2";
import { getImplicitForm2Quad } from "../implicit-form/quad/get-implicit-form2";
import { getImplicitForm2Exact_ } from "../implicit-form/exact/get-implicit-form2-";
import { getImplicitForm1 } from "../implicit-form/naive/get-implicit-form1";
import { getImplicitForm1Quad } from "../implicit-form/quad/get-implicit-form1";


const abs = Math.abs;
const tp = twoProduct;
const qmd = qMultDouble2;
const qmq = qMultQuad;
const qaq = qAddQuad;
const sce = scaleExpansion2;
const epr = expansionProduct;
const fes = fastExpansionSum;


/**
 * Returns true if the given point is on the given cubic bezier curve where the 
 * parameter t is allowed to extend to +-infinity, i.e. t is an element of 
 * [-inf, +inf], false otherwise.
 * 
 * * Precondition: ps must be grid-aligned and have a maximum bitlength of 47.
 * (p may have any bitlength - no restrictions)
 */
function isPointOnBezierExtension3(ps: number[][], p: number[]): boolean {
    let [x,y] = p;

    //---- first pre-filter
    {
        // The below takes about 1.2 micro-seconds on a 1st gen i7 and Chrome 79
        let { 
            coeffs: { vₓₓₓ, vₓₓᵧ, vₓᵧᵧ, vᵧᵧᵧ, vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v },
            errorBound: { vₓₓₓ_, vₓₓᵧ_, vₓᵧᵧ_, vᵧᵧᵧ_, vₓₓ_, vₓᵧ_, vᵧᵧ_, vₓ_, vᵧ_, v_ }
        } = getImplicitForm3(ps);
        
        let _vₓₓₓ = abs(vₓₓₓ);
        let _vₓₓᵧ = abs(vₓₓᵧ);
        let _vₓᵧᵧ = abs(vₓᵧᵧ);
        let _vᵧᵧᵧ = abs(vᵧᵧᵧ);
        let _vₓₓ = abs(vₓₓ);
        let _vₓᵧ = abs(vₓᵧ);
        let _vᵧᵧ = abs(vᵧᵧ);
        
        // In the below a prefix underscore on a variable means absolute value, 
        // a postfix underscore means error bound (before multiplication by gamma).
        
        // h (say height) is the the result of evaluating the implicit equation; if
        // it is 0 we are on the curve, else we're not.
        // let h =
        //   vₓₓₓ*x*x*x + vₓₓᵧ*x*x*y + vₓᵧᵧ*x*y*y + vᵧᵧᵧ*y*y*y + 
        //   vₓₓ*x*x + vₓᵧ*x*y + vᵧᵧ*y*y + vₓ*x + vᵧ*y + v;

        let _x = abs(x);
        let xx = x*x;
        let _xx_ = xx;
        let xxx = xx*x;
        let _xxx = abs(xxx);
        let xxx_ = _xx_*_x + _xxx;
        let _y = abs(y);
        let yy = y*y;
        let _yy_ = yy;
        let yyy = yy*y;
        let _yyy = abs(yyy);
        let yyy_ = _yy_*_y + _yyy;
        let xxy = xx*y;
        let _xxy = abs(xxy);
        let xxy_ = _xx_*_y + _xxy;
        let xyy = x*yy;
        let _xyy = abs(xyy);
        let xyy_ = _x*_yy_ + _xyy;
        let xy = x*y;
        let _xy_ = abs(xy);
        let vₓₓₓxxx = vₓₓₓ*xxx;
        let vₓₓₓxxx_ = vₓₓₓ_*_xxx + _vₓₓₓ*xxx_ + abs(vₓₓₓxxx);
        let vₓₓᵧxxy = vₓₓᵧ*xxy;
        let vₓₓᵧxxy_ = vₓₓᵧ_*_xxy + _vₓₓᵧ*xxy_ + abs(vₓₓᵧxxy);
        let vₓᵧᵧxyy = vₓᵧᵧ*xyy;
        let vₓᵧᵧxyy_ = vₓᵧᵧ_*_xyy + _vₓᵧᵧ*xyy_ + abs(vₓᵧᵧxyy);
        let vᵧᵧᵧyyy = vᵧᵧᵧ*yyy;
        let vᵧᵧᵧyyy_ = vᵧᵧᵧ_*_yyy + _vᵧᵧᵧ*yyy_ + abs(vᵧᵧᵧyyy);
        let vₓₓxx = vₓₓ*xx;
        let vₓₓxx_ = (vₓₓ_ + _vₓₓ)*_xx_ + abs(vₓₓxx);
        let vₓᵧxy = vₓᵧ*xy;
        let vₓᵧxy_ = (vₓᵧ_ + _vₓᵧ)*_xy_ + abs(vₓᵧxy);
        let vᵧᵧyy = vᵧᵧ*yy;
        let vᵧᵧyy_ = (vᵧᵧ_ + _vᵧᵧ)*_yy_ + abs(vᵧᵧyy);
        let vₓx = vₓ*x;
        let vₓx_ = vₓ_*_x + abs(vₓx);
        let vᵧy = vᵧ*y;
        let vᵧy_ = vᵧ_*_y + abs(vᵧy);

        // group the terms to reduce error, e.g. v usually has the highest bitlength
        //let h = 
        //    (
        //        ((vₓₓₓxxx + vₓₓᵧxxy) + (vₓᵧᵧxyy + vᵧᵧᵧyyy)) + 
        //        (vₓₓxx + vₓᵧxy + vᵧᵧyy)
        //    ) + 
        //    (
        //        (vₓx + vᵧy) + 
        //        v
        //    );

        let q1 = vₓₓₓxxx + vₓₓᵧxxy;
        let q1_ = vₓₓₓxxx_ + vₓₓᵧxxy_ + abs(q1);
        let q2 = vₓᵧᵧxyy + vᵧᵧᵧyyy;
        let q2_ = vₓᵧᵧxyy_ + vᵧᵧᵧyyy_ + abs(q2);
        let q3 = q1 + q2;
        let q3_ = q1_ + q2_ + abs(q3);
        let q4 = vₓₓxx + vₓᵧxy;
        let q4_ = vₓₓxx_ + vₓᵧxy_ + abs(q4);
        let q5 = q4 + vᵧᵧyy;
        let q5_ = q4_ + vᵧᵧyy_ + abs(q5);
        let q6 = q3 + q5;
        let q6_ = q3_ + q5_ + abs(q6);
        let q7 = vₓx + vᵧy;
        let q7_ = vₓx_ + vᵧy_ + abs(q7);
        let q8 = q7 + v;
        let q8_ = q7_ + v_ + abs(q8);
        let h = q6 + q8;
        let h_ = q6_ + q8_ + abs(h);

        // if the error is not too high too discern h away from zero
        if (γ1*h_ < abs(h)) {
            return false; // <-- prefilter applied
        }
    }

    // error too high - let's try quad precision
    {
        // The below takes about 15 micro-seconds on a 1st gen i7 and Chrome 79
        let { 
            coeffs: { vₓₓₓ, vₓₓᵧ, vₓᵧᵧ, vᵧᵧᵧ, vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v },
            errorBound: { vₓₓₓ_, vₓₓᵧ_, vₓᵧᵧ_, vᵧᵧᵧ_, vₓₓ_, vₓᵧ_, vᵧᵧ_, vₓ_, vᵧ_, v_ }
        } = getImplicitForm3Quad(ps);
        
        let _vₓₓₓ = abs(vₓₓₓ[1]);
        let _vₓₓᵧ = abs(vₓₓᵧ[1]);
        let _vₓᵧᵧ = abs(vₓᵧᵧ[1]);
        let _vᵧᵧᵧ = abs(vᵧᵧᵧ[1]);
        let _vₓₓ = abs(vₓₓ[1]);
        let _vₓᵧ = abs(vₓᵧ[1]);
        let _vᵧᵧ = abs(vᵧᵧ[1]);
        
        // In the below a prefix underscore on a variable means absolute value, 
        // a postfix underscore means error bound (before multiplication by gamma).
        
        // h (say height) is the the result of evaluating the implicit equation; if
        // it is 0 we are on the curve, else we're not.
        // let h =
        //   vₓₓₓ*x*x*x + vₓₓᵧ*x*x*y + vₓᵧᵧ*x*y*y + vᵧᵧᵧ*y*y*y + 
        //   vₓₓ*x*x + vₓᵧ*x*y + vᵧᵧ*y*y + vₓ*x + vᵧ*y + v;

        let _x = abs(x);
        let xx = tp(x,x);  // <= error free
        let _xx = abs(xx[1]);
        let xxx = qmd(x,xx);
        let _xxx_ = abs(xxx[1]);
        let _y = abs(y);
        let yy = tp(y,y);  // <= error free
        let _yy = abs(yy[1]);
        let yyy = qmd(y,yy);
        let _yyy_ = abs(yyy[1]);
        let xxy = qmd(y,xx);
        let _xxy_ = abs(xxy[1]);
        let xyy = qmd(x,yy);
        let _xyy_ = abs(xyy[1]);
        let xy = tp(x,y);  // <= error free
        let _xy = abs(xy[1]);
        let vₓₓₓxxx = qmq(vₓₓₓ,xxx);
        let vₓₓₓxxx_ = (vₓₓₓ_ + _vₓₓₓ)*_xxx_ + 2*abs(vₓₓₓxxx[1]);
        let vₓₓᵧxxy = qmq(vₓₓᵧ,xxy);
        let vₓₓᵧxxy_ = (vₓₓᵧ_ + _vₓₓᵧ)*_xxy_ + 2*abs(vₓₓᵧxxy[1]);
        let vₓᵧᵧxyy = qmq(vₓᵧᵧ,xyy);
        let vₓᵧᵧxyy_ = (vₓᵧᵧ_ + _vₓᵧᵧ)*_xyy_ + 2*abs(vₓᵧᵧxyy[1]);
        let vᵧᵧᵧyyy = qmq(vᵧᵧᵧ,yyy);
        let vᵧᵧᵧyyy_ = (vᵧᵧᵧ_ + _vᵧᵧᵧ)*_yyy_ + 2*abs(vᵧᵧᵧyyy[1]);
        let vₓₓxx = qmq(vₓₓ,xx);
        let vₓₓxx_ = vₓₓ_*_xx + 2*abs(vₓₓxx[1]);
        let vₓᵧxy = qmq(vₓᵧ,xy);
        let vₓᵧxy_ = vₓᵧ_*_xy + 2*abs(vₓᵧxy[1]);
        let vᵧᵧyy = qmq(vᵧᵧ,yy);
        let vᵧᵧyy_ = vᵧᵧ_*_yy + 2*abs(vᵧᵧyy[1]);
        let vₓx = qmd(x,vₓ);
        let vₓx_ = vₓ_*_x + abs(vₓx[1]);
        let vᵧy = qmd(y,vᵧ);
        let vᵧy_ = vᵧ_*_y + abs(vᵧy[1]);

        // group the terms to reduce error, e.g. v usually has the highest bitlength
        //let h = 
        //    (
        //        ((vₓₓₓxxx + vₓₓᵧxxy) + (vₓᵧᵧxyy + vᵧᵧᵧyyy)) + 
        //        (vₓₓxx + vₓᵧxy + vᵧᵧyy)
        //    ) + 
        //    (
        //        (vₓx + vᵧy) + 
        //        v
        //    );

        let q1 = qaq(vₓₓₓxxx,vₓₓᵧxxy);
        let q1_ = vₓₓₓxxx_ + vₓₓᵧxxy_ + abs(q1[1]);
        let q2 = qaq(vₓᵧᵧxyy,vᵧᵧᵧyyy);
        let q2_ = vₓᵧᵧxyy_ + vᵧᵧᵧyyy_ + abs(q2[1]);
        let q3 = qaq(q1,q2);
        let q3_ = q1_ + q2_ + abs(q3[1]);
        let q4 = qaq(vₓₓxx,vₓᵧxy);
        let q4_ = vₓₓxx_ + vₓᵧxy_ + abs(q4[1]);
        let q5 = qaq(q4,vᵧᵧyy);
        let q5_ = q4_ + vᵧᵧyy_ + abs(q5[1]);
        let q6 = qaq(q3,q5);
        let q6_ = q3_ + q5_ + abs(q6[1]);
        let q7 = qaq(vₓx,vᵧy);
        let q7_ = vₓx_ + vᵧy_ + abs(q7[1]);
        let q8 = qaq(q7,v);
        let q8_ = q7_ + v_ + abs(q8[1]);
        let h = qaq(q6,q8);
        let h_ = q6_ + q8_ + abs(h[1]);

        // if the error is not too high too discern h away from zero
        if (γγ3*h_ < abs(estimate(h))) {
            return false; // <-- prefilter applied
        }
    }

    // error still too high - let's go exact
    {
        // The below takes about 155 micro-seconds on a 1st gen i7 and Chrome 79
        let { vₓₓₓ, vₓₓᵧ, vₓᵧᵧ, vᵧᵧᵧ, vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v } = 
            getImplicitForm3Exact_(ps);
        
        // h (say height) is the the result of evaluating the implicit equation; if
        // it is 0 we are on the curve, else we're not.
        // let h =
        //   vₓₓₓ*x*x*x + vₓₓᵧ*x*x*y + vₓᵧᵧ*x*y*y + vᵧᵧᵧ*y*y*y + 
        //   vₓₓ*x*x + vₓᵧ*x*y + vᵧᵧ*y*y + vₓ*x + vᵧ*y + v;

        let xx = tp(x,x);  // <= error free
        let xxx = sce(x,xx);
        let yy = tp(y,y);  // <= error free
        let yyy = sce(y,yy);
        let xxy = sce(y,xx);
        let xyy = sce(x,yy);
        let xy = tp(x,y);  // <= error free
        let vₓₓₓxxx = epr(vₓₓₓ,xxx);
        let vₓₓᵧxxy = epr(vₓₓᵧ,xxy);
        let vₓᵧᵧxyy = epr(vₓᵧᵧ,xyy);
        let vᵧᵧᵧyyy = epr(vᵧᵧᵧ,yyy);
        let vₓₓxx = epr(vₓₓ,xx);
        let vₓᵧxy = epr(vₓᵧ,xy);
        let vᵧᵧyy = epr(vᵧᵧ,yy);
        let vₓx = sce(x,vₓ);
        let vᵧy = sce(y,vᵧ);

        let q1 = fes(vₓₓₓxxx,vₓₓᵧxxy);
        let q2 = fes(vₓᵧᵧxyy,vᵧᵧᵧyyy);
        let q3 = fes(q1,q2);
        let q4 = fes(vₓₓxx,vₓᵧxy);
        let q5 = fes(q4,vᵧᵧyy);
        let q6 = fes(q3,q5);
        let q7 = fes(vₓx,vᵧy);
        let q8 = fes(q7,v);
        let h = fes(q6,q8);

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
 */
function isPointOnBezierExtension2(ps: number[][], p: number[]): boolean {
    let [x,y] = p;

    //---- first pre-filter
    {
        let { 
            coeffs: { vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v },
            errorBound: { vₓₓ_, vₓᵧ_, vᵧᵧ_, vₓ_, vᵧ_, v_ }
        } = getImplicitForm2(ps);
        
        let _vₓₓ = abs(vₓₓ);
        let _vₓᵧ = abs(vₓᵧ);
        let _vᵧᵧ = abs(vᵧᵧ);
        
        // In the below a prefix underscore on a variable means absolute value, 
        // a postfix underscore means error bound (before multiplication by gamma).
        
        // h (say height) is the the result of evaluating the implicit equation; if
        // it is 0 we are on the curve, else we're not.
        // let h =
        //   vₓₓ*x*x + vₓᵧ*x*y + vᵧᵧ*y*y + vₓ*x + vᵧ*y + v;

        let _x = abs(x);
        let xx = x*x;
        let _xx_ = xx;
        let _y = abs(y);
        let yy = y*y;
        let _yy_ = yy;
        let xy = x*y;
        let _xy_ = abs(xy);
        let vₓₓxx = vₓₓ*xx;
        let vₓₓxx_ = (vₓₓ_ + _vₓₓ)*_xx_ + abs(vₓₓxx);
        let vₓᵧxy = vₓᵧ*xy;
        let vₓᵧxy_ = (vₓᵧ_ + _vₓᵧ)*_xy_ + abs(vₓᵧxy);
        let vᵧᵧyy = vᵧᵧ*yy;
        let vᵧᵧyy_ = (vᵧᵧ_ + _vᵧᵧ)*_yy_ + abs(vᵧᵧyy);
        let vₓx = vₓ*x;
        let vₓx_ = vₓ_*_x + abs(vₓx);
        let vᵧy = vᵧ*y;
        let vᵧy_ = vᵧ_*_y + abs(vᵧy);

        // group the terms to reduce error, e.g. v usually has the highest bitlength
        //let h = 
        //    (
        //      ((vₓₓxx + vₓᵧxy) + vᵧᵧyy) + 
        //      (vₓx + vᵧy)
        //    ) + 
        //    v;

        let q4 = vₓₓxx + vₓᵧxy;
        let q4_ = vₓₓxx_ + vₓᵧxy_ + abs(q4);
        let q5 = q4 + vᵧᵧyy;
        let q5_ = q4_ + vᵧᵧyy_ + abs(q5);
        let q7 = vₓx + vᵧy;
        let q7_ = vₓx_ + vᵧy_ + abs(q7);
        let q8 = q5 + q7;
        let q8_ = q5_ + q7_ + abs(q8);
        let h = q8 + v;
        let h_ = q8_ + v_ + abs(h);

        // if the error is not too high too discern h away from zero
        if (γ1*h_ < abs(h)) {
            return false; // <-- prefilter applied
        }
    }

    // error too high - let's try quad precision
    {
        let { 
            coeffs: { vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v },
            errorBound: { vₓ_, vᵧ_, v_ }
        } = getImplicitForm2Quad(ps);
        
        // In the below a prefix underscore on a variable means absolute value, 
        // a postfix underscore means error bound (before multiplication by gamma).
        
        // h (say height) is the the result of evaluating the implicit equation; if
        // it is 0 we are on the curve, else we're not.
        // let h =
        //   vₓₓ*x*x + vₓᵧ*x*y + vᵧᵧ*y*y + vₓ*x + vᵧ*y + v;

        let _x = abs(x);
        let xx = tp(x,x);  // <= error free
        let _y = abs(y);
        let yy = tp(y,y);  // <= error free
        let xy = tp(x,y);  // <= error free
        let vₓₓxx = qmq(vₓₓ,xx);
        let vₓₓxx_ = 2*abs(vₓₓxx[1]);
        let vₓᵧxy = qmq(vₓᵧ,xy);
        let vₓᵧxy_ = 2*abs(vₓᵧxy[1]);
        let vᵧᵧyy = qmq(vᵧᵧ,yy);
        let vᵧᵧyy_ = 2*abs(vᵧᵧyy[1]);
        let vₓx = qmd(x,vₓ);
        let vₓx_ = vₓ_*_x + abs(vₓx[1]);
        let vᵧy = qmd(y,vᵧ);
        let vᵧy_ = vᵧ_*_y + abs(vᵧy[1]);

        // group the terms to reduce error, e.g. v usually has the highest bitlength
        //let h = 
        //    (
        //      ((vₓₓxx + vₓᵧxy) + vᵧᵧyy) + 
        //      (vₓx + vᵧy)
        //    ) + 
        //    v;

        let q4 = qaq(vₓₓxx,vₓᵧxy);
        let q4_ = vₓₓxx_ + vₓᵧxy_ + abs(q4[1]);
        let q5 = qaq(q4,vᵧᵧyy);
        let q5_ = q4_ + vᵧᵧyy_ + abs(q5[1]);
        let q7 = qaq(vₓx,vᵧy);
        let q7_ = vₓx_ + vᵧy_ + abs(q7[1]);
        let q8 = qaq(q5,q7);
        let q8_ = q5_ + q7_ + abs(q8[1]);
        let h = qaq(q8,v);
        let h_ = q8_ + v_ + abs(h[1]);

        // if the error is not too high too discern h away from zero
        if (γγ3*h_ < abs(estimate(h))) {
            return false; // <-- prefilter applied
        }
    }

    // error still too high - let's go exact
    {
        let { vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v } = 
            getImplicitForm2Exact_(ps);
        
        // h (say height) is the the result of evaluating the implicit equation; 
        // if it is 0 we are on the curve, else we're not.
        // let h =
        //   vₓₓ*x*x + vₓᵧ*x*y + vᵧᵧ*y*y + vₓ*x + vᵧ*y + v;

        let xx = tp(x,x);  // <= error free
        let yy = tp(y,y);  // <= error free
        let xy = tp(x,y);  // <= error free
        let vₓₓxx = epr(vₓₓ,xx);
        let vₓᵧxy = epr(vₓᵧ,xy);
        let vᵧᵧyy = epr(vᵧᵧ,yy);
        let vₓx = sce(x,vₓ);
        let vᵧy = sce(y,vᵧ);

        let q4 = fes(vₓₓxx,vₓᵧxy);
        let q5 = fes(q4,vᵧᵧyy);
        let q7 = fes(vₓx,vᵧy);
        let q8 = fes(q7,v);
        let h = fes(q5,q8);

        return sign(h) === 0;  // <= calculation was exact
    }
}


/**
 * Returns true if the given point is on the given line where 
 * the parameter t is allowed to extend to +-infinity, i.e. t is an element of 
 * [-inf, +inf], false otherwise.
 * 
 * * Precondition: ps must be grid-aligned and have a maximum bitlength of 47.
 * (p may have any bitlength - no restrictions)
 * * there are many alternative implementations to this function, e.g. ccw, etc;
 * it is just kept for symmetry.
 * o
 */
function isPointOnBezierExtension1(ps: number[][], p: number[]): boolean {
    let [x,y] = p;

    //---- pre-filter - note all coefficients below vₓ, vᵧ, v are exact
    let { coeffs: { vₓ, vᵧ, v } } = 
        getImplicitForm1Quad(ps);
    
    // In the below a prefix underscore on a variable means absolute value, 
    // a postfix underscore means error bound (before multiplication by gamma).
    
    // h (say height) is the the result of evaluating the implicit equation; if
    // it is 0 we are on the curve, else we're not.
    // let h = vₓ*x + vᵧ*y + v;

    let vₓx = tp(x,vₓ);  // <= error free
    let vᵧy = tp(y,vᵧ);

    // group the terms to reduce error, e.g. v usually has the highest bitlength
    //let h = (vₓx + vᵧy) + v;

    let q7 = qaq(vₓx,vᵧy);
    let q7_ = abs(q7[1]);
    let h = qaq(q7,v);
    let h_ = q7_ + abs(h[1]);

    // if the error is not too high too discern h away from zero
    if (γγ3*h_ < abs(estimate(h))) {
        return false; // <-- prefilter applied
    }

    q7 = epr(vₓx,vᵧy);
    h = fes(q7,v);

    return sign(h) === 0;  // <= calculation was exact
}


/**
 * Returns true if the given point is on the given bezier curve where the 
 * parameter t is allowed to extend to +-infinity, i.e. t is an element of 
 * [-inf, +inf], false otherwise.
 * 
 * * **precondition**: ps and p must be grid-aligned with a maximum bitlength of 47.
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
