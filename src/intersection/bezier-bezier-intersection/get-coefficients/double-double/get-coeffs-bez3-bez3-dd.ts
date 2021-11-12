import { getImplicitForm3DdWithRunningError } from "../../../../implicit-form/double-double/get-implicit-form3-dd-with-running-error.js";import { getImplicitForm3DdWithRunningError } from "../../../../implicit-form/double-double/get-implicit-form3-dd-with-running-error.jsimport { getImplicitForm3DdWithRunningError } from "../../../../implicit-form/double-double/get-implicit-form3-dd-with-running-error.js
import { γγ } from "../../../../error-analysis/error-analysis";
import { getXY3DdWithRunningError } from '../../../../to-power-basis/get-xy/double-double/get-xy-dd-with-running-error';
import { twoProduct, ddMultBy2, ddMultDouble2, ddMultDd, ddAddDd } from "double-double";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const tp  = twoProduct;
const qm2 = ddMultBy2;
const qmd = ddMultDouble2;
const qmq = ddMultDd;
const qaq = ddAddDd;

const abs = Math.abs;
const γγ3 = γγ(3);


/**
 * Returns a polynomial in 1 variable (including coefficientwise error bound)
 * whose roots are the parameter values of the intersection points of 2 order 
 * 3 bezier curves (i.e. 2 cubic bezier curves).
 * 
 * The returned polynomial degree will be 9
 * (see [Bézout's theorem](https://en.wikipedia.org/wiki/B%C3%A9zout%27s_theorem))
 * 
 * The returned polynomial coefficients are given densely as an array of 
 * double-double precision floating point numbers from highest to lowest power, 
 * e.g. `[[0,5],[0,-3],[0,0]]` represents the polynomial `5x^2 - 3x`.
 * 
 * * **precondition:** TODO
 * * intermediate calculations are done in double-double precision and this is
 * reflected in the output error bound (which is approximately 
 * `n * (Number.EPSILON**2) * the condition number`, where roughly `1 < n < 100` and 
 * depends on the specific calculation)
 * * the error bound returned need **not** be scaled before use
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 * 
 * @param ps1 
 * @param ps2 
 * 
 * @doc
 */
function getCoeffsBez3Bez3Dd(
        ps1: number[][], 
        ps2: number[][]) {

    //--------------------------------------------------------------------------
    // `var` -> a variable
    // `$var` -> the double precision approximation to `var`
    // `_var` -> the absolute value of $var (a prefix underscore on a variable means absolute value)
    // `var_` -> the error in var (a postfix underscore means error bound but should still be multiplied by 3*γ²)
    // `_var_` -> means both absolute value and absolute error bound
    // recall: `a*b`, where both `a` and `b` have errors |a| and |b| we get for the
    //   * error bound of (a*b) === a_|b| + |a|b_ + |a*b|   (when either of a and b is double)
    //   * error bound of (a*b) === a_|b| + |a|b_ + 2|a*b|  (when both a and b is double-double)
    //   * error bound of (a+b) === a_ + b_ + |a+b|         (when a and/or b is double or double-double)
    // * the returned errors need to be multiplied by 3γ² to get the true error
    // * can use either `$var` or `var[var.length-1]` (the approx value) in error calculations
    //   due to multiplication by 3*γ² and not 3*u²
    //--------------------------------------------------------------------------
    // examples: (all?)
    // ----------------
    // let qmd === ddMultDouble2, etc.
    //
    // ---------------
    // 1. double-double X by double
    // ---------------
    // qmd(a,b);  // both `a` and `b` is error-free
    // use: error bound of (a*b) === a_|b| + |a|b_ + |a*b| (by definition)
    //                           === 0|b| + |a|0 + |a*b|
    //                           === |a*b|
    //
    // ---------------
    // 2a. double-double +/- double-double
    // ---------------
    // qdq(a,b);  // error in a === |a|, thus call the error _a_, same with b
    // use: error bound of (a+b) === a_ + b_ + |a+b| (by definition)
    //                           === _a_ + _b_ + |a+b|
    //
    // ---------------
    // 2b. double-double +/- double-double
    // ---------------
    // qaq(a,b);  // error in a === 2|a|, thus the error is 2*_a, same with b
    // use: error bound of (a+b) === a_ + b_ + |a+b| (by definition)
    //                           === 2*_a + 2*_b + |a+b|
    //                           === 2*(_a + _b) + |a+b| OR
    //                           === a_ + b_ + |a+b|
    //
    // ---------------
    // 3a. double-double X double-double
    // ---------------
    // qmq(a,b);  // both `a` and `b` error-free
    // use: error bound of (a*b) === a_|b| + |a|b_ + |a*b| (by definition)
    //                           === 0|b| + |a|0 + 2|a*b|
    //                           === 2|a*b| 
    //
    // ---------------
    // 3b. double-double X double-double
    // ---------------
    // qmq(a,b);  // both `a` and `b` not error-free
    // use: error bound of (a*b) === a_|b| + |a|b_ + 2|a*b| (by definition)
    //
    // ---------------
    // 3b. double-double X double-double
    // ---------------
    // qmq(a,b);  // both `a` not error-free and `b` error-free
    // use: error bound of (a*b) === a_|b| + |a|b_ + 2|a*b| (by definition)
    //                           === a_|b| + 2|a*b| 
    //
    // ---------------
    // 4a. double-double +/- double
    // ---------------
    // qad(a,b);  // both `a` and `b` error-free
    // use: error bound of (a+b) === a_ + b_ + |a+b| (by definition)
    //                           === 0 + 0 + |a+b|
    //                           === |a+b| 
    //--------------------------------------------------------------------------
    
    const { 
        coeffs: { vₓₓₓ, vₓₓᵧ, vₓᵧᵧ, vᵧᵧᵧ, vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v },
        errorBound: { vₓₓₓ_, vₓₓᵧ_, vₓᵧᵧ_, vᵧᵧᵧ_, vₓₓ_, vₓᵧ_, vᵧᵧ_, vₓ_, vᵧ_, v_ }
    } = getImplicitForm3DdWithRunningError(ps1);

    const {
        coeffs: [[c3,c2,c1,c0],[d3,d2,d1,d0]],
        errorBound: [[c3_,c2_,c1_],[d3_,d2_,d1_]]  // c0 and d0 is error free
    } = getXY3DdWithRunningError(ps2);

    const $vₓₓₓ = vₓₓₓ[1];
    const $vₓₓᵧ = vₓₓᵧ[1];
    const $vₓᵧᵧ = vₓᵧᵧ[1];
    const $vᵧᵧᵧ = vᵧᵧᵧ[1];
    const $vₓₓ  = vₓₓ [1];
    const $vₓᵧ  = vₓᵧ [1];
    const $vᵧᵧ  = vᵧᵧ [1];
    const $vₓ  =  vₓ  [1];
    const $vᵧ  =  vᵧ  [1];
    const $v  =   v   [1];

    const _vₓₓₓ = abs($vₓₓₓ);
    const _vₓₓᵧ = abs($vₓₓᵧ);
    const _vₓᵧᵧ = abs($vₓᵧᵧ);
    const _vᵧᵧᵧ = abs($vᵧᵧᵧ);
    const _vₓₓ  = abs($vₓₓ );
    const _vₓᵧ  = abs($vₓᵧ );
    const _vᵧᵧ  = abs($vᵧᵧ );
    const _vₓ   = abs($vₓ  );
    const _vᵧ   = abs($vᵧ  );
    const _v    = abs($v   );

    const $c1 = c1[1];
    const $c2 = c2[1];
    const $c3 = c3[1];
    const $d1 = d1[1];
    const $d2 = d2[1];
    const $d3 = d3[1];

    const _c0 = abs(c0);
    const _c1 = abs($c1);
    const _c2 = abs($c2);
    const _c3 = abs($c3);
    const _d0 = abs(d0);
    const _d1 = abs($d1);
    const _d2 = abs($d2);
    const _d3 = abs($d3);

    const $c0c0 = c0*c0;
    const $c0c1 = c0*$c1;
    const $c0c2 = c0*$c2;
    const $c0c3 = c0*$c3;
    const $c0d0 = c0*d0;
    const $c0d1 = c0*$d1;
    const $c0d2 = c0*$d2;
    const $c0d3 = c0*$d3;
    const $c1c1 = $c1*$c1;
    const $c1c2 = $c1*$c2;
    const $c1c3 = $c1*$c3;
    const $c1d0 = $c1*d0;
    const $c1d1 = $c1*$d1;
    const $c1d2 = $c1*$d2;
    const $c1d3 = $c1*$d3;
    const $c2d1 = $c2*$d1;
    const $c2c2 = $c2*$c2;    
    const $c2c3 = $c2*$c3;
    const $c2d0 = $c2*d0;
    const $c2d2 = $c2*$d2;
    const $c2d3 = $c2*$d3;
    const $c3c3 = $c3*$c3;
    const $c3d0 = $c3*d0;
    const $c3d1 = $c3*$d1;
    const $c3d2 = $c3*$d2;
    const $c3d3 = $c3*$d3;

    const $d0d0 = d0*d0;
    const $d0d1 = d0*$d1;
    const $d0d2 = d0*$d2;
    const $d0d3 = d0*$d3;
    const $d1d1 = $d1*$d1;
    const $d1d2 = $d1*$d2;
    const $d3d3 = $d3*$d3;
    const $d2d2 = $d2*$d2;
    const $d2d3 = $d2*$d3;
    const $d1d3 = $d1*$d3;

    const c0c0 = tp(c0,c0);  // error free
    const c0c1 = qmd(c0,c1);
    const c0c1_ = _c0*c1_ + abs($c0c1);
    const c0c2 = qmd(c0,c2);
    const c0c2_ = _c0*c2_ + abs($c0c2);
    const c0c3 = qmd(c0,c3);
    const c0c3_ = _c0*c3_ + abs($c0c3);
    const c0d0 = tp(c0,d0);  // error free
    const c0d1 = qmd(c0,d1);
    const c0d1_ = _c0*d1_ + abs($c0d1);
    const c0d2 = qmd(c0,d2);
    const c0d2_ = _c0*d2_ + abs($c0d2);
    const c0d3 = qmd(c0,d3);
    const c0d3_ = _c0*d3_ + abs($c0d3);
    const c1c1 = qmq(c1,c1);
    const _c1c1 = abs($c1c1);
    const c1c1_ = 2*(c1_*_c1 + _c1c1);
    const c1c2 = qmq(c1,c2);
    const c1c2_ = c1_*_c2 + _c1*c2_ + 2*abs($c1c2);
    const c1c3 = qmq(c1,c3);
    const c1c3_ = c1_*_c3 + _c1*c3_ + 2*abs($c1c3);
    const c1d0 = qmd(d0,c1);
    const c1d0_ = _d0*c1_ + abs($c1d0);
    const c1d1 = qmq(c1,d1);
    const c1d1_ = c1_*_d1 + _c1*d1_ + 2*abs($c1d1);
    const c1d2 = qmq(c1,d2);
    const c1d2_ = c1_*_d2 + _c1*d2_ + 2*abs($c1d2);
    const c1d3 = qmq(c1,d3);
    const c1d3_ = c1_*_d3 + _c1*d3_ + 2*abs($c1d3);
    const c2d1 = qmq(c2,d1);
    const c2d1_ = c2_*_d1 + _c2*d1_ + 2*abs($c2d1);
    const c2c2 = qmq(c2,c2);    
    const _c2c2 = abs($c2c2);
    const c2c2_ = 2*(c2_*_c2 + _c2c2);
    const c2c3 = qmq(c2,c3);
    const c2c3_ = c2_*_c3 + _c2*c3_ + 2*abs($c2c3);
    const c2d0 = qmd(d0,c2);
    const c2d0_ = _d0*c2_ + abs($c2d0);
    const c2d2 = qmq(c2,d2);
    const c2d2_ = c2_*_d2 + _c2*d2_ + 2*abs($c2d2);
    const c2d3 = qmq(c2,d3);
    const c2d3_ = c2_*_d3 + _c2*d3_ + 2*abs($c2d3);
    const c3c3 = qmq(c3,c3);
    const c3c3_ = 2*(c3_*_c3 + abs($c3c3));
    const c3d0 = qmd(d0,c3);
    const c3d0_ = _d0*c3_ + abs($c3d0);
    const c3d1 = qmq(c3,d1);
    const c3d1_ = c3_*_d1 + _c3*d1_ + 2*abs($c3d1);
    const c3d2 = qmq(c3,d2);
    const _c3d2 = abs($c3d2);
    const c3d2_ = c3_*_d2 + _c3*d2_ + 2*_c3d2;
    const c3d3 = qmq(c3,d3);
    const c3d3_ = c3_*_d3 + _c3*d3_ + 2*abs($c3d3);

    
    const d0d0 = tp(d0,d0);  // error free
    const d0d1 = qmd(d0,d1);
    const d0d1_ = _d0*d1_ + abs($d0d1);
    const d0d2 = qmd(d0,d2);
    const d0d2_ = _d0*d2_ + abs($d0d2);
    const d0d3 = qmd(d0,d3);
    const d0d3_ = _d0*d3_ + abs($d0d3);
    const d1d1 = qmq(d1,d1);
    const _d1d1 = abs($d1d1);
    const d1d1_ = 2*(d1_*_d1 + _d1d1);
    const d1d2 = qmq(d1,d2);
    const d1d2_ = d1_*_d2 + _d1*d2_ + 2*abs($d1d2);
    const d3d3 = qmq(d3,d3);
    const d3d3_ = 2*(d3_*_d3 + abs($d3d3));
    const d2d2 = qmq(d2,d2);
    const _d2d2 = abs($d2d2);
    const d2d2_ = 2*(d2_*_d2 + _d2d2);
    const d2d3 = qmq(d2,d3);
    const d2d3_ = d2_*_d3 + _d2*d3_ + 2*abs($d2d3);
    const d1d3 = qmq(d1,d3);
    const _d1d3 = abs($d1d3);
    const d1d3_ = d1_*_d3 + _d1*d3_ + 2*_d1d3;

    const _c0c0 = abs($c0c0);
    const _c0c1 = abs($c0c1);
    const _c2c3 = abs($c2c3);
    const _c3c3 = abs($c3c3);
    const _c3d3 = abs($c3d3);
    const _c0d0 = abs($c0d0);

    const _d0d0 = abs($d0d0);
    const _d0d1 = abs($d0d1);
    const _d2d3 = abs($d2d3);
    const _d3d3 = abs($d3d3);
   

    //-----------------------
    //const v9 =  
    //    (c3*c3c3)*vₓₓₓ + 
    //    (c3*d3d3)*vₓᵧᵧ + 
    //    (d3*c3c3)*vₓₓᵧ + 
    //    (d3*d3d3)*vᵧᵧᵧ;
    //-----------------------
    const $g1 = $c3*$c3c3;
    const g1 = qmq(c3,c3c3);
    const _g1 = _c3*_c3c3;
    const g1_ = c3_*_c3c3 + _c3*c3c3_ + 2*_g1;
    const $g2 = $c3*$d3d3;
    const g2 = qmq(c3,d3d3);
    const _g2 = _c3*_d3d3;
    const g2_ = c3_*_d3d3 + _c3*d3d3_ + 2*_g2;
    const $g3 = $d3*$c3c3;
    const g3 = qmq(d3,c3c3);
    const _g3 = _d3*_c3c3;
    const g3_ = d3_*_c3c3 + _d3*c3c3_ + 2*_g3;
    const $g4 = $d3*$d3d3;
    const g4 = qmq(d3,d3d3);
    const _g4 = _d3*_d3d3;
    const g4_ = d3_*_d3d3 + _d3*d3d3_ + 2*_g4;
    const $g5 = $g1*$vₓₓₓ;
    const g5 = qmq(g1,vₓₓₓ);
    const g5_ = g1_*_vₓₓₓ + _g1*vₓₓₓ_ + 2*abs($g5);
    const $g6 = $g2*$vₓᵧᵧ;
    const g6 = qmq(g2,vₓᵧᵧ);
    const g6_ = g2_*_vₓᵧᵧ + _g2*vₓᵧᵧ_ + 2*abs($g6);
    const $g7 = $g3*$vₓₓᵧ;
    const g7 = qmq(g3,vₓₓᵧ);
    const g7_ = g3_*_vₓₓᵧ + _g3*vₓₓᵧ_ + 2*abs($g7);
    const $g8 = $g4*$vᵧᵧᵧ;
    const g8 = qmq(g4,vᵧᵧᵧ);
    const g8_ = g4_*_vᵧᵧᵧ + _g4*vᵧᵧᵧ_ + 2*abs($g8);
    const $g9 = $g5 + $g6;
    const g9 = qaq(g5,g6);
    const g9_ = g5_ + g6_ + abs($g9);
    const $ga = $g7 + $g8;
    const ga = qaq(g7,g8);
    const ga_ = g7_ + g8_ + abs($ga);
    const $v9 = $g9 + $ga;
    const v9 = qaq(g9,ga);
    const v9_ = g9_ + ga_ + abs($v9);


    //-----------------------
    //const v8 =  
    //    2*c2*c3d3*vₓₓᵧ + 
    //    2*c3*d2d3*vₓᵧᵧ + 
    //      c2*d3d3*vₓᵧᵧ + 
    //      d2*c3c3*vₓₓᵧ + 
    //    3*c2*c3c3*vₓₓₓ + 
    //    3*d2*d3d3*vᵧᵧᵧ;  
    //-----------------------
    const $w1 = 2*$c2d3 + $c3d2;    
    const _w1 = abs($w1);
    const w1 = qaq(qm2(c2d3),c3d2);
    const w1_ = 2*c2d3_ + c3d2_ + _w1;
    const $w2 = 2*$c3d2 + $c2d3;        
    const _w2 = abs($w2);
    const w2 = qaq(qm2(c3d2),c2d3);
    const w2_ = 2*c3d2_ + c2d3_ + abs($w2);
    const $w3 = $c3*$w1;
    const _w3 = abs($w3);
    const w3 = qmq(c3,w1);
    const w3_ = c3_*_w1 + _c3*w1_ + 2*_w3;
    const $w4 = $d3*$w2;
    const _w4 = abs($w4);
    const w4 = qmq(d3,w2);
    const w4_ = d3_*_w2 + _d3*w2_ + 2*_w4;
    const $w5 = $c2*$c3c3;
    const _w5 = abs($w5);
    const w5 = qmq(c2,c3c3);
    const w5_ = c2_*_c3c3 + _c2*c3c3_ + 2*_w5;
    const $w6 = $d2*$d3d3;
    const _w6 = abs($w6);
    const w6 = qmq(d2,d3d3);
    const w6_ = d2_*_d3d3 + _d2*d3d3_ + 2*_w6;
    const $w7 = $vₓₓₓ*$w5;
    const w7 = qmq(vₓₓₓ,w5);
    const w7_ = w5_*_vₓₓₓ + _vₓₓₓ*w5_ + 2*abs($w7);
    const $u1 = $vᵧᵧᵧ*$w6;
    const u1 = qmq(vᵧᵧᵧ,w6);
    const u1_ = w6_*_vᵧᵧᵧ + _vᵧᵧᵧ*w6_ + 2*abs($u1);
    const $u2 = $vₓₓᵧ*$w3;
    const u2 = qmq(vₓₓᵧ,w3);
    const u2_ = w3_*_vₓₓᵧ + _vₓₓᵧ*w3_ + 2*abs($u2);
    const $u3 = $vₓᵧᵧ*$w4;
    const u3 = qmq(vₓᵧᵧ,w4);
    const u3_ = w4_*_vₓᵧᵧ + _vₓᵧᵧ*w4_ + 2*abs($u3);
    const $u4 = $u2 + $u3;
    const u4 = qaq(u2,u3);
    const u4_ = u2_ + u3_ + abs($u4);
    const $u5 = 3*($w7 + $u1);
    const u5 = qmd(3,qaq(w7,u1));
    const u5_ = 3*(w7_ + u1_) + 2*abs($u5);
    const $v8 = $u4 + $u5;
    const v8 = qaq(u4,u5);
    const v8_ = u4_ + u5_ + abs($v8);


    //-----------------------
    //const v7 =  
    //    vₓₓᵧ*(2*(c1*c3d3 + c2*c3d2) + (d1*c3c3 + d3*c2c2)) +
    //    vₓᵧᵧ*(2*(c2*d2d3 + c3*d1d3) + (c1*d3d3 + d2*c3d2)) +
    //    vₓₓₓ*3*c3*(c1c3 + c2c2) +
    //    vᵧᵧᵧ*3*d3*(d1d3 + d2d2);
    //-----------------------
    const $o1 = $c1*$c3d3;
    const o1 = qmq(c1,c3d3);
    const o1_ = c1_*_c3d3 + _c1*c3d3_ + 2*abs($o1);
    const $o2 = $d1*$c3c3;
    const o2 = qmq(d1,c3c3);
    const o2_ = d1_*_c3c3 + _d1*c3c3_ + 2*abs($o2);
    const $o3 = $c2*$d2d3;
    const o3 = qmq(c2,d2d3);
    const o3_ = c2_*_d2d3 + _c2*d2d3_ + 2*abs($o3);
    const $o4 = $c1*$d3d3;
    const o4 = qmq(c1,d3d3);
    const o4_ = c1_*_d3d3 + _c1*d3d3_ + 2*abs($o4);
    const $o5 = $c2*$c3d2;
    const o5 = qmq(c2,c3d2);
    const o5_ = c2_*_c3d2 + _c2*c3d2_ + 2*abs($o5);
    const $o6 = $d3*$c2c2;
    const o6 = qmq(d3,c2c2);
    const o6_ = d3_*_c2c2 + _d3*c2c2_ + 2*abs($o6);
    const $o7 = $c3*$d1d3;
    const o7 = qmq(c3,d1d3);
    const o7_ = c3_*_d1d3 + _c3*d1d3_ + 2*abs($o7);
    const $o8 = $d2*$c3d2;
    const o8 = qmq(d2,c3d2);
    const o8_ = d2_*_c3d2 + _d2*c3d2_ + 2*abs($o8);
    const $w8 = $o1 + $o5;
    const w8 = qaq(o1,o5);
    const w8_ = o1_ + o5_ + abs($w8);
    const $w9 = $o2 + $o6;
    const w9 = qaq(o2,o6);
    const w9_ = o2_ + o6_ + abs($w9);
    const $wa = $o3 + $o7;
    const wa = qaq(o3,o7);
    const wa_ = o3_ + o7_ + abs($wa);
    const $wb = $o4 + $o8;
    const wb = qaq(o4,o8);
    const wb_ = o4_ + o8_ + abs($wb);
    const $wc = $c1c3 + $c2c2;
    const wc = qaq(c1c3,c2c2);
    const _wc = abs($wc);
    const wc_ = c1c3_ + c2c2_ + _wc;
    const $wd = $d1d3 + $d2d2;
    const _wd = abs($wd);
    const wd = qaq(d1d3,d2d2);
    const wd_ = d1d3_ + d2d2_ + _wd;
    const $we = 2*$w8 + $w9;
    const we = qaq(qm2(w8),w9);
    const _we = abs($we);
    const we_ = 2*w8_ + w9_ + _we;
    const $wf = 2*$wa + $wb;
    const wf = qaq(qm2(wa),wb);
    const _wf = abs($wf);
    const wf_ = 2*wa_ + wb_ + _wf;
    const $wg = $vₓₓᵧ*$we;
    const wg = qmq(vₓₓᵧ,we);
    const wg_ = vₓₓᵧ_*_we + _vₓₓᵧ*we_ + 2*abs($wg);
    const $wh = $vₓᵧᵧ*$wf;
    const wh = qmq(vₓᵧᵧ,wf);
    const wh_ = vₓᵧᵧ_*_wf + _vₓᵧᵧ*wf_ + 2*abs($wh);
    const $wi = $c3*$wc;
    const wi = qmq(c3,wc);
    const _wi = abs($wi);
    const wi_ = c3_*_wc + _c3*wc_ + 2*_wi;
    const $wj = $d3*$wd;
    const wj = qmq(d3,wd);
    const _wj = abs($wj);
    const wj_ = d3_*_wd + _d3*wd_ + 2*_wj;
    const $wk = $vₓₓₓ*$wi;
    const wk = qmq(vₓₓₓ,wi);
    const wk_ = vₓₓₓ_*_wi + _vₓₓₓ*wi_ + 2*abs($wk);
    const $wl = $vᵧᵧᵧ*$wj;
    const wl = qmq(vᵧᵧᵧ,wj);
    const wl_ = vᵧᵧᵧ_*_wj + _vᵧᵧᵧ*wj_ + 2*abs($wl);
    const $wm = $wg + $wh;
    const wm = qaq(wg,wh);
    const wm_ = wg_ + wh_ + abs($wm);
    const $wn = 3*($wk + $wl);
    const wn = qmd(3,qaq(wk,wl));
    const wn_ = 3*(wk_ + wl_) + 2*abs($wn);
    const $v7 = $wm + $wn;
    const v7 = qaq(wm,wn);
    const v7_ = wm_ + wn_ + abs($v7);


    //const v6 =
    //    vₓₓᵧ*(d2*c2c2 + 2*c1*(c2d3 + c3d2) + c3*(2*c0d3 + 2*c2d1 + c3d0)) +
    //    vₓᵧᵧ*(c2*d2d2 + 2*d1*(c2d3 + c3d2) + d3*(2*c1d2 + 2*c3d0 + c0d3)) +
    //    vₓₓₓ*(c2*c2c2 + 3*c3*(2*c1c2 + c0c3)) +
    //    vᵧᵧᵧ*(d2*d2d2 + 3*d3*(2*d1d2 + d0d3)) +
    //    vₓₓ *c3c3 +
    //    vᵧᵧ *d3d3 +
    //    vₓᵧ *c3d3;
    const $wo = $c2d3 + $c3d2; 
    const wo = qaq(c2d3,c3d2);
    const _wo = abs($wo);
    const wo_ = c2d3_ + c3d2_ + _wo;
    const $zc = $d2*$c2c2;
    const zc = qmq(d2,c2c2);
    const zc_ = d2_*_c2c2 + _d2*c2c2_ + 2*abs($zc);
    const $zd = 2*$c1*$wo;
    const zd = qm2(qmq(c1,wo));
    const zd_ = 2*(c1_*_wo + _c1*wo_ + 2*abs($zd));
    const $wp = $zc + $zd;
    const wp = qaq(zc,zd);
    const wp_ = zc_ + zd_ + abs($wp);
    const $wq = 2*($c0d3 + $c2d1);  
    const wq = qm2(qaq(c0d3,c2d1));
    const wq_ = 2*(c0d3_ + c2d1_) + abs($wq);
    const $wr = $wq + $c3d0; 
    const _wr = abs($wr);
    const wr = qaq(wq,c3d0);
    const wr_ = wq_ + c3d0_ + _wr;
    const $ze = $c3*$wr;
    const ze = qmq(c3,wr);
    const ze_ = c3_*_wr + _c3*wr_ + 2*abs($ze);
    const $ws = $wp + $ze;
    const ws = qaq(wp,ze);
    const _ws = abs($ws);
    const ws_ = wp_ + ze_ + _ws;
    const $zf = $c2*$d2d2;
    const zf = qmq(c2,d2d2);
    const zf_ = c2_*_d2d2 + _c2*d2d2_ + 2*abs($zf);
    const $zg = 2*$d1*$wo;
    const zg = qm2(qmq(d1,wo));
    const zg_ = 2*(d1_*_wo + _d1*wo_ + abs($zg));
    const $wt = $zf + $zg;
    const wt = qaq(zf,zg);
    const wt_ = zf_ + zg_ + abs($wt); 
    const $wu = 2*($c1d2 + $c3d0); 
    const wu = qm2(qaq(c1d2,c3d0));
    const wu_ = 2*(c1d2_ + c3d0_) + abs($wu);
    const $wv = $wu + $c0d3;
    const wv = qaq(wu,c0d3);
    const _wv = abs($wv);
    const wv_ = wu_ + c0d3_ + _wv;
    const $zh = $d3*$wv;
    const zh = qmq(d3,wv);
    const zh_ = d3_*_wv + _d3*wv_ + 2*abs($zh);
    const $ww = $wt + $zh;
    const ww = qaq(wt,zh);
    const _ww = abs($ww);
    const ww_ = wt_ + zh_ + _ww;
    const $wx = $c2*$c2c2;
    const wx = qmq(c2,c2c2);
    const wx_ = c2_*_c2c2 + _c2*c2c2_ + 2*abs($wx);
    const $wy = 2*$c1c2 + $c0c3;
    const wy = qaq(qm2(c1c2),c0c3);
    const _wy = abs($wy);
    const wy_ = 2*c1c2_ + c0c3_ + _wy;
    const $q1 = 3*$c3;
    const q1 = qmd(3,c3);
    const _q1 = abs($q1);
    const q1_ = 3*c3_ + _q1;
    const $wz = $q1*$wy;
    const wz = qmq(q1,wy);
    const wz_ = q1_*_wy + _q1*wy_ + 2*abs($wz);
    const $z1 = $wx + $wz;
    const z1 = qaq(wx,wz);
    const _z1 = abs($z1);
    const z1_ = wx_ + wz_ + _z1;
    const $z2 = $d2*$d2d2;
    const z2 = qmq(d2,d2d2);
    const z2_ = d2_*_d2d2 + _d2*d2d2_ + 2*abs($z2);
    const $z3 = 2*$d1d2 + $d0d3;
    const z3 = qaq(qm2(d1d2),d0d3);
    const _z3 = abs($z3);
    const z3_ = 2*d1d2_ + d0d3_ + _z3;
    const $q2 = 3*$d3;
    const q2 = qmd(3,d3);
    const _q2 = abs($q2);
    const q2_ = 3*d3_ + _q2;
    const $z4 = $q2*$z3;
    const z4 = qmq(q2,z3);
    const z4_ = q2_*_z3 + _q2*z3_ + 2*abs($z4);
    const $z5 = $z2 + $z4;
    const z5 = qaq(z2,z4);
    const _z5 = abs($z5);
    const z5_ = z2_ + z4_ + _z5;
    const $zi = $vₓₓᵧ*$ws;
    const zi = qmq(vₓₓᵧ,ws);
    const zi_ = vₓₓᵧ_*_ws + _vₓₓᵧ*ws_ + 2*abs($zi);
    const $zj = $vₓᵧᵧ*$ww;
    const zj = qmq(vₓᵧᵧ,ww);
    const zj_ = vₓᵧᵧ_*_ww + _vₓᵧᵧ*ww_ + 2*abs($zj);
    const $z6 = $zi + $zj;
    const z6 = qaq(zi,zj);
    const z6_ = zi_ + zj_ + abs($z6);
    const $zk = $vₓₓₓ*$z1;
    const zk = qmq(vₓₓₓ,z1);
    const zk_ = vₓₓₓ_*_z1 + _vₓₓₓ*z1_ + 2*abs($zk);
    const $zl = $vᵧᵧᵧ*$z5;
    const zl = qmq(vᵧᵧᵧ,z5);
    const zl_ = vᵧᵧᵧ_*_z5 + _vᵧᵧᵧ*z5_ + 2*abs($zl);
    const $z7 = $zk + $zl;
    const z7 = qaq(zk,zl);
    const z7_ = zk_ + zl_ + abs($z7);
    const $zm = $vₓₓ*$c3c3;
    const zm = qmq(c3c3,vₓₓ);
    const zm_ = c3c3_*_vₓₓ + _c3c3*vₓₓ_ + 2*abs($zm);
    const $zn = $vᵧᵧ*$d3d3;
    const zn = qmq(d3d3,vᵧᵧ);
    const zn_ = d3d3_*_vᵧᵧ + _d3d3*vᵧᵧ_ + 2*abs($zn);
    const $z8 = $zm + $zn;
    const z8 = qaq(zm,zn);
    const z8_ = zm_ + zn_ + abs($z8);
    const $z9 = $vₓᵧ*$c3d3;
    const z9 = qmq(c3d3,vₓᵧ);
    const z9_ = c3d3_*_vₓᵧ + _c3d3*vₓᵧ_ + 2*abs($z9);
    const $za = $z6 + $z7;
    const za = qaq(z6,z7);
    const za_ = z6_ + z7_ + abs($za);
    const $zb = $z8 + $z9;
    const zb = qaq(z8,z9);
    const zb_ = z8_ + z9_ + abs($zb);
    const $v6 = $za + $zb;
    const v6 = qaq(za,zb);
    const v6_ = za_ + zb_ + abs($v6);


    //const r4 = c2d2 + c3d1;
    //const r5 = c1d3 + c2d2;
    //const v5 =
    //    vₓₓᵧ*(2*(c0*wo + c1*r4) + d3*c1c1 + c2*(2*c3d0 + c2d1)) +
    //    vₓᵧᵧ*(2*(d0*wo + d1*r5) + c3*d1d1 + d2*(2*c0d3 + c1d2)) +
    //    3*(vₓₓₓ*(2*c0*c2c3 + c1*wc) + 
    //       vᵧᵧᵧ*(2*d0*d2d3 + d1*wd)) +
    //    vₓᵧ*wo +
    //    2*(vₓₓ*c2c3 + vᵧᵧ*d2d3);
    const $r4 = $c2d2 + $c3d1;  
    const r4 = qaq(c2d2,c3d1);
    const _r4 = abs($r4);
    const r4_ = c2d2_ + c3d1_ + _r4;
    const $r5 = $c1d3 + $c2d2;  
    const r5 = qaq(c1d3,c2d2);
    const _r5 = abs($r5);
    const r5_ = c1d3_ + c2d2_ + _r5;
    const $k1 = c0*$wo; 
    const k1 = qmd(c0,wo);
    const k1_ = _c0*wo_ + abs($k1);
    const $k2 = d0*$wo;
    const k2 = qmd(d0,wo);
    const k2_ = _d0*wo_ + abs($k2);
    const $k3 = $c1*$r4;
    const k3 = qmq(c1,r4);
    const k3_ = c1_*_r4 + _c1*r4_ + 2*abs($k3);
    const $k4 = $d1*$r5;
    const k4 = qmq(d1,r5);
    const k4_ = d1_*_r5 + _d1*r5_ + 2*abs($k4);
    const $k5 = 2*$c3d0 + $c2d1;
    const k5 = qaq(qm2(c3d0),c2d1);
    const _k5 = abs($k5);
    const k5_ = 2*c3d0_ + c2d1_ + _k5;
    const $k6 = 2*$c0d3 + $c1d2;
    const k6 = qaq(qm2(c0d3),c1d2);
    const _k6 = abs($k6);
    const k6_ = 2*c0d3_ + c1d2_ + _k6;
    const $k7 = $d3*$c1c1;
    const k7 = qmq(d3,c1c1);
    const k7_ = d3_*_c1c1 + _d3*c1c1_ + 2*abs($k7);
    const $k8 = $c3*$d1d1;
    const k8 = qmq(c3,d1d1);
    const k8_ = c3_*_d1d1 + _c3*d1d1_ + 2*abs($k8);
    const $k9 = $c2*$k5;
    const k9 = qmq(c2,k5);
    const k9_ = c2_*_k5 + _c2*k5_ + 2*abs($k9);
    const $ka = $d2*$k6;
    const ka = qmq(d2,k6);
    const ka_ = d2_*_k6 + _d2*k6_ + 2*abs($ka);
    const $kb = 2*($k1 + $k3);
    const kb = qm2(qaq(k1,k3));
    const kb_ = 2*(k1_ + k3_) + abs($kb);
    const $kc = 2*($k2 + $k4);
    const kc = qm2(qaq(k2,k4));
    const kc_ = 2*(k2_ + k4_) + abs($kc);
    const $kd = 2*c0*$c2c3;
    const kd = qm2(qmd(c0,c2c3));
    const kd_ = 2*_c0*c2c3_ + abs($kd);
    const $ke = 2*d0*$d2d3;
    const ke = qm2(qmd(d0,d2d3));
    const ke_ = 2*_d0*d2d3_ + abs($ke);
    const $kf = $c1*$wc;
    const kf = qmq(c1,wc);
    const kf_ = c1_*_wc + _c1*wc_ + 2*abs($kf);
    const $kg = $d1*$wd;
    const kg = qmq(d1,wd);
    const kg_ = d1_*_wd + _d1*wd_ + 2*abs($kg);
    const $kh = $vₓₓ*$c2c3;
    const kh = qmq(c2c3,vₓₓ);
    const kh_ = c2c3_*_vₓₓ + _c2c3*vₓₓ_ + 2*abs($kh);
    const $ki = $vᵧᵧ*$d2d3;
    const ki = qmq(d2d3,vᵧᵧ);
    const ki_ = d2d3_*_vᵧᵧ + _d2d3*vᵧᵧ_ + 2*abs($ki);
    const $kj = $kb + $k7;
    const kj = qaq(kb,k7);
    const _kj = abs($kj);
    const kj_ = kb_ + k7_ + _kj;
    const $kk = $kc + $k8;
    const kk = qaq(kc,k8);
    const _kk = abs($kk);
    const kk_ = kc_ + k8_ + _kk;
    const $kl = $kj + $k9;
    const kl = qaq(kj,k9);
    const _kl = abs($kl)
    const kl_ = kj_ + k9_ + _kl;
    const $km = $kk + $ka;
    const km = qaq(kk,ka);
    const _km = abs($km)
    const km_ = kk_ + ka_ + _km;
    const $kn = $kd + $kf;
    const kn = qaq(kd,kf);
    const _kn = abs($kn)
    const kn_ = kd_ + kf_ + _kn;
    const $ko = $ke + $kg;
    const ko = qaq(ke,kg);
    const _ko = abs($ko)
    const ko_ = ke_ + kg_ + _ko;
    const $kp = 2*($kh + $ki);
    const kp = qm2(qaq(kh,ki));
    const kp_ = 2*(kh_ + ki_) + abs($kp); 
    const $kq = $vₓₓᵧ*$kl;
    const kq = qmq(vₓₓᵧ,kl);
    const kq_ = vₓₓᵧ_*_kl + _vₓₓᵧ*kl_ + 2*abs($kq);
    const $kr = $vₓᵧᵧ*$km;
    const kr = qmq(vₓᵧᵧ,km);
    const kr_ = vₓᵧᵧ_*_km + _vₓᵧᵧ*km_ + 2*abs($kr);
    const $ks = $vₓₓₓ*$kn;
    const ks = qmq(vₓₓₓ,kn);
    const ks_ = vₓₓₓ_*_kn + _vₓₓₓ*kn_ + 2*abs($ks);
    const $kt = $vᵧᵧᵧ*$ko;
    const kt = qmq(vᵧᵧᵧ,ko);
    const kt_ = vᵧᵧᵧ_*_ko + _vᵧᵧᵧ*ko_ + 2*abs($kt);
    const $ku = $kq + $kr;
    const ku = qaq(kq,kr);
    const ku_ = kq_ + kr_ + abs($ku);
    const $kv = 3*($ks + $kt);
    const kv = qmd(3,qaq(ks,kt));
    const kv_ = 3*(ks_ + kt_) + 2*abs($kv);
    const $kw = $vₓᵧ*$wo;
    const kw = qmq(vₓᵧ,wo);
    const kw_ = vₓᵧ_*_wo + _vₓᵧ*wo_ + 2*abs($kw);
    const $kx = $ku + $kv;
    const kx = qaq(ku,kv);
    const kx_ = ku_ + kv_ + abs($kx);
    const $ky = $kw + $kp;
    const ky = qaq(kw,kp);
    const ky_ = kw_ + kp_ + abs($ky);
    const $v5 = $kx + $ky;
    const v5 = qaq(kx,ky);
    const v5_ = kx_ + ky_ + abs($v5);
    
    
    //const r1 = c1d3 + r4;
    //const r2 = 2*c1c3 + c2c2;
    //const r3 = 2*d1d3 + d2d2;
    //const v4 =
    //    vₓₓᵧ*(2*c0*r1 + d0*r2 + c1*(c1d2 + 2*c2d1)) +
    //    vₓᵧᵧ*(2*d0*r1 + c0*r3 + d1*(c2d1 + 2*c1d2)) +
    //    vₓₓₓ*3*(c0*r2 + c2*c1c1) +
    //    vᵧᵧᵧ*3*(d0*r3 + d2*d1d1) +
    //    vₓᵧ*r1 +
    //    vₓₓ*r2 +
    //    vᵧᵧ*r3;
    const $r1 = $c1d3 + $r4;
    const r1 = qaq(c1d3,r4);
    const _r1 = abs($r1);
    const r1_ = c1d3_ + r4_ + _r1;
    const $r2 = 2*$c1c3 + $c2c2;
    const r2 = qaq(qm2(c1c3),c2c2);
    const _r2 = abs($r2);
    const r2_ = 2*c1c3_ + c2c2_ + _r2;
    const $r3 = 2*$d1d3 + $d2d2;
    const r3 = qaq(qm2(d1d3),d2d2);
    const _r3 = abs($r3);
    const r3_ = 2*d1d3_ + d2d2_ + _r3;
    const $s1 = 2*c0*$r1;
    const s1 = qmd(2*c0,r1);
    const s1_ = 2*_c0*r1_ + abs($s1);
    const $s2 = 2*d0*$r1;
    const s2 = qmd(2*d0,r1);
    const s2_ = 2*_d0*r1_ + abs($s2);
    const $s5 = $c1d2 + 2*$c2d1;
    const s5 = qaq(c1d2,qm2(c2d1));
    const _s5 = abs($s5)
    const s5_ = c1d2_ + 2*c2d1_ + _s5;
    const $s6 = $c2d1 + 2*$c1d2;
    const s6 = qaq(c2d1,qm2(c1d2));
    const _s6 = abs($s6);
    const s6_ = c2d1_ + 2*c1d2_ + _s6;
    const $s3 = d0*$r2;
    const s3 = qmd(d0,r2);
    const s3_ = _d0*r2_ + abs($s3);
    const $s4 = c0*$r3;
    const s4 = qmd(c0,r3);
    const s4_ = _c0*r3_ + abs($s4);
    const $s7 = $c1*$s5;
    const s7 = qmq(c1,s5);
    const s7_ = c1_*_s5 + _c1*s5_ + 2*abs($s7);
    const $s8 = $d1*$s6;
    const s8 = qmq(d1,s6);
    const s8_ = d1_*_s6 + _d1*s6_ + 2*abs($s8);
    const $s9 = c0*$r2;
    const s9 = qmd(c0,r2);
    const s9_ = _c0*r2_ + abs($s9);
    const $sa = d0*$r3;
    const sa = qmd(d0,r3);
    const sa_ = _d0*r3_ + abs($sa);
    const $sb = $c2*$c1c1;
    const sb = qmq(c2,c1c1);
    const sb_ = c2_*_c1c1 + _c2*c1c1_ + 2*abs($sb);
    const $sc = $d2*$d1d1;
    const sc = qmq(d2,d1d1);
    const sc_ = d2_*_d1d1 + _d2*d1d1_ + 2*abs($sc);
    const $sd = $s1 + $s3;
    const sd = qaq(s1,s3);
    const sd_ = s1_ + s3_ + abs($sd);
    const $se = $s2 + $s4;
    const se = qaq(s2,s4);
    const se_ = s2_ + s4_ + abs($se);
    const $sf = $sd + $s7;
    const sf = qaq(sd,s7);
    const _sf = abs($sf);
    const sf_ = sd_ + s7_ + _sf;
    const $sg = $se + $s8;
    const sg = qaq(se,s8);
    const _sg = abs($sg);
    const sg_ = se_ + s8_ + _sg;
    const $sh = $s9 + $sb;
    const sh = qaq(s9,sb);
    const _sh = abs($sh);
    const sh_ = s9_ + sb_ + _sh;
    const $si = $sa + $sc;
    const si = qaq(sa,sc);
    const _si = abs($si);
    const si_ = sa_ + sc_ + _si;
    const $sj = $vₓₓᵧ*$sf;
    const sj = qmq(vₓₓᵧ,sf);
    const sj_ = vₓₓᵧ_*_sf + _vₓₓᵧ*sf_ + 2*abs($sj);
    const $sk = $vₓᵧᵧ*$sg;
    const sk = qmq(vₓᵧᵧ,sg);
    const sk_ = vₓᵧᵧ_*_sg + _vₓᵧᵧ*sg_ + 2*abs($sk);
    const $sl = $vₓₓₓ*$sh;
    const sl = qmq(vₓₓₓ,sh);
    const sl_ = vₓₓₓ_*_sh + _vₓₓₓ*sh_ + 2*abs($sl);
    const $sm = $vᵧᵧᵧ*$si;
    const sm = qmq(vᵧᵧᵧ,si);
    const sm_ = vᵧᵧᵧ_*_si + _vᵧᵧᵧ*si_ + 2*abs($sm);
    const $sn = $sl + $sm;
    const _sn = abs($sn);
    const sn = qaq(sl,sm);
    const sn_ = sl_ + sm_ + _sn;
    const $so = $sj + $sk;
    const so = qaq(sj,sk);
    const so_ = sj_ + sk_ + abs($so);
    const $sp = $so + 3*$sn;
    const sp = qaq(so,qmd(3,sn));
    const sp_ = so_ + 3*(sn_ + _sn) + abs($sp);
    const $ss = $vₓᵧ*$r1;
    const ss = qmq(vₓᵧ,r1);
    const ss_ = vₓᵧ_*_r1 + _vₓᵧ*r1_ + 2*abs($ss);
    const $st = $vₓₓ*$r2;
    const st = qmq(vₓₓ,r2);
    const st_ = vₓₓ_*_r2 + _vₓₓ*r2_ + 2*abs($st);
    const $sq = $ss + $st;
    const sq = qaq(ss,st);
    const sq_ = ss_ + st_ + abs($sq);
    const $su = $vᵧᵧ*$r3;
    const su = qmq(vᵧᵧ,r3);
    const su_ = vᵧᵧ_*_r3 + _vᵧᵧ*r3_ + 2*abs($su);
    const $sr = $sq + $su;
    const sr = qaq(sq,su);
    const sr_ = sq_ + su_ + abs($sr);
    const $v4 = $sp + $sr;
    const v4 = qaq(sp,sr);
    const v4_ = sp_ + sr_ + abs($v4);


    //const r6 = c1d2 + c2d1;
    //const r7 = c3d0 + c0d3;
    //const r8 = c1c2 + c0c3;
    //const r9 = d1d2 + d0d3;
    //const v3 =
    //    vₓₓᵧ*(c0*(2*r6 + c3d0 + r7) + c1*(2*c2d0 + c1d1)) +
    //    vₓᵧᵧ*(d0*(2*r6 + c0d3 + r7) + d1*(2*c0d2 + c1d1)) +
    //    vₓₓₓ*(3*c0*(r8 + c1c2) + c1*c1c1) + 
    //    vᵧᵧᵧ*(3*d0*(r9 + d1d2) + d1*d1d1) +
    //    vₓᵧ*(r7 + r6) +
    //    2*(vₓₓ*r8 + vᵧᵧ*r9) +
    //    vₓ*c3 + vᵧ*d3;
    const $r6 = $c1d2 + $c2d1;
    const r6 = qaq(c1d2,c2d1);  
    const r6_ = c1d2_ + c2d1_ + abs($r6);
    const $r7 = $c3d0 + $c0d3;
    const r7 = qaq(c3d0,c0d3);  
    const r7_ = c3d0_ + c0d3_ + abs($r7);
    const $r8 = $c1c2 + $c0c3;
    const r8 = qaq(c1c2,c0c3);  
    const r8_ = c1c2_ + c0c3_ + abs($r8);
    const _r8 = abs($r8);
    const $r9 = $d1d2 + $d0d3;
    const r9 = qaq(d1d2,d0d3);  
    const r9_ = d1d2_ + d0d3_ + abs($r9);
    const _r9 = abs($r9);
    const $m1 = 2*$r6 + $c3d0;
    const m1 = qaq(qm2(r6),c3d0);  
    const m1_ = 2*r6_ + c3d0_ + abs($m1);
    const $m2 = 2*$r6 + $c0d3;
    const m2 = qaq(qm2(r6),c0d3);  
    const m2_ = 2*r6_ + c0d3_ + abs($m2);
    const $m3 = 2*$c2d0 + $c1d1;
    const m3 = qaq(qm2(c2d0),c1d1);  
    const _m3 = abs($m3);
    const m3_ = 2*c2d0_ + c1d1_ + _m3;
    const $m4 = 2*$c0d2 + $c1d1;
    const m4 = qaq(qm2(c0d2),c1d1);  
    const _m4 = abs($m4);
    const m4_ = 2*c0d2_ + c1d1_ + _m4;
    const $m5 = $r8 + $c1c2;
    const m5 = qaq(r8,c1c2);  
    const m5_ = r8_ + c1c2_ + abs($m5);
    const $m6 = $r9 + $d1d2;
    const m6 = qaq(r9,d1d2);  
    const m6_ = r9_ + d1d2_ + abs($m6);
    const $q3 = 3*c0;
    const q3 = tp(3,c0);  // error free
    const $m7 = $q3*$m5;
    const m7 = qmq(q3,m5);
    const m7_ = abs($q3)*m5_ + 2*abs($m7);
    const $q4 = 3*d0;
    const q4 = tp(3,d0);  // error free
    const $m8 = $q4*$m6;  
    const m8 = qmq(q4,m6);
    const m8_ = abs($q4)*m6_ + 2*abs($m8);
    const $m9 = $c1*$c1c1;
    const m9 = qmq(c1,c1c1);
    const m9_ = c1_*_c1c1 + _c1*c1c1_ + 2*abs($m9);
    const $ma = $d1*$d1d1;
    const ma = qmq(d1,d1d1);
    const ma_ = d1_*_d1d1 + _d1*d1d1_ + 2*abs($ma);
    const $mb = $vₓₓ*$r8;
    const mb = qmq(vₓₓ,r8);
    const mb_ = vₓₓ_*_r8 + _vₓₓ*r8_ + abs($mb);
    const $mc = $vᵧᵧ*$r9;
    const mc = qmq(vᵧᵧ,r9);
    const mc_ = vᵧᵧ_*_r9 + _vᵧᵧ*r9_ + abs($mc);
    const $md = $m1 + $r7;
    const md = qaq(m1,r7);
    const md_ = m1_ + r7_ + abs($md);
    const $me = $m2 + $r7;
    const me = qaq(m2,r7);
    const me_ = m2_ + r7_ + abs($me);
    const $mf = c0*$md;
    const mf = qmd(c0,md);
    const mf_ = _c0*md_ + abs($mf);
    const $mg = d0*$me;
    const mg = qmd(d0,me);
    const mg_ = _d0*me_ + abs($mg);
    const $mh = $c1*$m3;
    const mh = qmq(c1,m3);
    const mh_ = c1_*_m3 + _c1*m3_ + 2*abs($mh);
    const $mi = $d1*$m4;
    const mi = qmq(d1,m4);
    const mi_ = d1_*_m4 + _d1*m4_ + 2*abs($mi);
    const $mj = $c3*$vₓ;
    const mj = qmq(c3,vₓ);
    const mj_ = c3_*_vₓ + _c3*vₓ_ + 2*abs($mj);
    const $mk = $d3*$vᵧ;
    const mk = qmq(d3,vᵧ);
    const mk_ = d3_*_vᵧ + _d3*vᵧ_ + 2*abs($mk);
    const $ml = $mf + $mh;
    const ml = qaq(mf,mh);
    const _ml = abs($ml);
    const ml_ = mf_ + mh_ + _ml;
    const $mm = $mg + $mi;
    const mm = qaq(mg,mi);
    const _mm = abs($mm);
    const mm_ = mg_ + mi_ + _mm;
    const $mn = $m7 + $m9;
    const mn = qaq(m7,m9);
    const _mn = abs($mn);
    const mn_ = m7_ + m9_ + _mn;
    const $mo = $m8 + $ma;
    const mo = qaq(m8,ma);
    const _mo = abs($mo);
    const mo_ = m8_ + ma_ + _mo;
    const $mp = $r7 + $r6; 
    const mp = qaq(r7,r6);  
    const _mp = abs($mp);
    const mp_ = r7_ + r6_ + _mp;
    const $mq = 2*($mb + $mc);
    const mq = qm2(qaq(mb,mc));
    const mq_ = 2*(mb_ + mc_) + abs($mq);
    const $mr = $vₓₓᵧ*$ml;
    const mr = qmq(vₓₓᵧ,ml);
    const mr_ = vₓₓᵧ_*_ml + _vₓₓᵧ*ml_ + 2*abs($mr);
    const $ms = $vₓᵧᵧ*$mm;
    const ms = qmq(vₓᵧᵧ,mm);
    const ms_ = vₓᵧᵧ_*_mm + _vₓᵧᵧ*mm_ + 2*abs($ms);
    const $mt = $vₓₓₓ*$mn;
    const mt = qmq(vₓₓₓ,mn);
    const mt_ = vₓₓₓ_*_mn + _vₓₓₓ*mn_ + 2*abs($mt);
    const $mu = $vᵧᵧᵧ*$mo;
    const mu = qmq(vᵧᵧᵧ,mo);
    const mu_ = vᵧᵧᵧ_*_mo + _vᵧᵧᵧ*mo_ + 2*abs($mu);
    const $mv = $vₓᵧ*$mp;
    const mv = qmq(vₓᵧ,mp);
    const mv_ = vₓᵧ_*_mp + _vₓᵧ*mp_ + 2*abs($mv);
    const $mw = $mr + $ms;
    const mw = qaq(mr,ms);
    const mw_ = mr_ + ms_ + abs($mw);
    const $mx = $mt + $mu;
    const mx = qaq(mt,mu);
    const mx_ = mt_ + mu_ + abs($mx);
    const $my = $mv + $mq;
    const my = qaq(mv,mq);
    const my_ = mv_ + mq_ + abs($my);
    const $mz = $mj + $mk;
    const mz = qaq(mj,mk);
    const mz_ = mj_ + mk_ + abs($mz);
    const $n1 = $mw + $mx;
    const n1 = qaq(mw,mx);
    const n1_ = mw_ + mx_ + abs($n1);
    const $n2 = $my + $mz;
    const n2 = qaq(my,mz);
    const n2_ = my_ + mz_ + abs($n2);
    const $v3 = $n1 + $n2;
    const v3 = qaq(n1,n2);
    const v3_ = n1_ + n2_ + abs($v3);


    //const ra = c1d1 + c2d0;
    //const rb = c1d1 + c0d2;
    //const v2 =
    //    vₓₓᵧ*(c0*(2*ra + c0d2) + d0*c1c1) +
    //    vₓᵧᵧ*(d0*(2*rb + c2d0) + c0*d1d1) +
    //    3*vₓₓₓ*(c0*c1c1 + c2*c0c0) + 
    //    3*vᵧᵧᵧ*(d0*d1d1 + d2*d0d0) +
    //    vₓᵧ*(ra + c0d2) +
    //    vₓₓ*(2*c0c2 + c1c1) + 
    //    vᵧᵧ*(2*d0d2 + d1d1) +
    //    c2*vₓ + d2*vᵧ;
    const $ra = $c1d1 + $c2d0;
    const ra = qaq(c1d1,c2d0);
    const ra_ = c1d1_ + c2d0_ + abs($ra);
    const $rb = $c1d1 + $c0d2;
    const rb = qaq(c1d1,c0d2);
    const rb_ = c1d1_ + c0d2_ + abs($rb);
    const $l1 = 2*$ra + $c0d2;
    const l1 = qaq(qm2(ra),c0d2);  
    const l1_ = 2*ra_ + c0d2_ + abs($l1);
    const $l2 = 2*$rb + $c2d0;
    const l2 = qaq(qm2(rb),c2d0);  
    const l2_ = 2*rb_ + c2d0_ + abs($l2);
    const $l3 = c0*$l1;
    const l3 = qmd(c0,l1);
    const l3_ = _c0*l1_ + abs($l3);
    const $l4 = d0*$c1c1;
    const l4 = qmd(d0,c1c1);
    const l4_ = _d0*c1c1_ + abs($l4);
    const $l5 = d0*$l2;
    const l5 = qmd(d0,l2);
    const l5_ = _d0*l2_ + abs($l5);
    const $l6 = c0*$d1d1;
    const l6 = qmd(c0,d1d1);
    const l6_ = _c0*d1d1_ + abs($l6);
    const $l7 = c0*$c1c1;
    const l7 = qmd(c0,c1c1);
    const l7_ = _c0*c1c1_ + abs($l7);
    const $l8 = $c2*$c0c0;
    const l8 = qmq(c2,c0c0);
    const l8_ = c2_*_c0c0 + 2*abs($l8);
    const $l9 = d0*$d1d1;
    const l9 = qmd(d0,d1d1);
    const l9_ = _d0*d1d1_ + abs($l9);
    const $la = $d2*$d0d0;
    const la = qmq(d2,d0d0);
    const la_ = d2_*_d0d0 + 2*abs($la);
    const $lb = $l3 + $l4;
    const lb = qaq(l3,l4);
    const _lb = l3_ + l4_ + abs($lb);
    const lb_ = l3_ + l4_ + _lb;
    const $lc = $l5 + $l6;
    const lc = qaq(l5,l6);
    const _lc = l5_ + l6_ + abs($lc);
    const lc_ = l5_ + l6_ + _lc;
    const $ld = $l7 + $l8;
    const ld = qaq(l7,l8);
    const _ld = abs($ld);
    const ld_ = l7_ + l8_ + _ld;
    const $le = $l9 + $la;
    const le = qaq(l9,la);
    const _le = abs($le);
    const le_ = l9_ + la_ + _le;
    const $lf = $vₓₓₓ*$ld;
    const lf = qmq(vₓₓₓ,ld);
    const lf_ = vₓₓₓ_*_ld + _vₓₓₓ*ld_ + 2*abs($lf);
    const $lg = $vᵧᵧᵧ*$le;
    const lg = qmq(vᵧᵧᵧ,le);
    const lg_ = vᵧᵧᵧ_*_le + _vᵧᵧᵧ*le_ + 2*abs($lg);
    const $lh = 3*($lf + $lg);
    const lh = qmd(3,qaq(lf,lg));
    const lh_ = 3*(lf_ + lg_) + 2*abs($lh);
    const $li = $ra + $c0d2; 
    const li = qaq(ra,c0d2);
    const _li = abs($li);
    const li_ = ra_ + c0d2_ + _li;
    const $lj = 2*$c0c2 + $c1c1;
    const lj = qaq(qm2(c0c2),c1c1);
    const _lj = abs($lj);
    const lj_ = 2*c0c2_ + c1c1_ + _lj;
    const $lk = 2*$d0d2 + $d1d1;
    const lk = qaq(qm2(d0d2),d1d1);
    const _lk = abs($lk);
    const lk_ = 2*d0d2_ + d1d1_ + _lk;
    const $ll = $vₓₓᵧ*$lb;
    const ll = qmq(vₓₓᵧ,lb);
    const ll_ = vₓₓᵧ_*_lb + _vₓₓᵧ*lb_ + 2*abs($ll);
    const $lm = $vₓᵧᵧ*$lc;
    const lm = qmq(vₓᵧᵧ,lc);
    const lm_ = vₓᵧᵧ_*_lc + _vₓᵧᵧ*lc_ + 2*abs($lm);
    const $ln = $vₓᵧ*$li;
    const ln = qmq(vₓᵧ,li);
    const ln_ = vₓᵧ_*_li + _vₓᵧ*li_ + 2*abs($ln);
    const $lo = $vₓₓ*$lj;
    const lo = qmq(vₓₓ,lj);
    const lo_ = vₓₓ_*_lj + _vₓₓ*lj_ + 2*abs($lo);
    const $lp = $vᵧᵧ*$lk;
    const lp = qmq(vᵧᵧ,lk);
    const lp_ = vᵧᵧ_*_lk + _vᵧᵧ*lk_ + 2*abs($lp);
    const $lq = $c2*$vₓ;
    const lq = qmq(c2,vₓ);
    const lq_ = c2_*_vₓ + _c2*vₓ_ + abs($lq);
    const $lr = $d2*$vᵧ;
    const lr = qmq(d2,vᵧ);
    const lr_ = d2_*_vᵧ + _d2*vᵧ_ + abs($lr);
    const $ls = $lq + $lr;
    const ls = qaq(lq,lr);
    const ls_ = lq_ + lr_ + abs($ls);
    const $lt = $ll + $lm;
    const lt = qaq(ll,lm);
    const lt_ = ll_ + lm_ + abs($lt);
    const $lu = $lh + $ln;
    const lu = qaq(lh,ln);
    const lu_ = lh_ + ln_ + abs($lu);
    const $lv = $lo + $lp;
    const lv = qaq(lo,lp);
    const lv_ = lo_ + lp_ + abs($lv);
    const $lw = $lt + $lu;
    const lw = qaq(lt,lu);
    const lw_ = lt_ + lu_ + abs($lw);
    const $lx = $lv + $ls;
    const lx = qaq(lv,ls);
    const lx_ = lv_ + ls_ + abs($lx);
    const $v2 = $lw + $lx;
    const v2 = qaq(lw,lx);
    const v2_ = lw_ + lx_ + abs($v2);


    //const rc = c1d0 + c0d1;
    //const v1 =
    //    vₓₓᵧ*c0*(rc + c1d0) +
    //    vₓᵧᵧ*d0*(rc + c0d1) +
    //    3*(c1*c0c0*vₓₓₓ + d1*d0d0*vᵧᵧᵧ) +
    //    vₓᵧ*rc +
    //    2*(c0c1*vₓₓ + d0d1*vᵧᵧ) +
    //    c1*vₓ + d1*vᵧ ;
    const $rc = $c1d0 + $c0d1;
    const rc = qaq(c1d0,c0d1);
    const _rc = abs($rc);
    const rc_ = c1d0_ + c0d1_ + _rc;
    const $rd = c0*$vₓₓᵧ;
    const rd = qmd(c0,vₓₓᵧ);
    const _rd = abs($rd);
    const rd_ = _c0*vₓₓᵧ_ + _rd;
    const $re = d0*$vₓᵧᵧ;
    const re = qmd(d0,vₓᵧᵧ);
    const _re = abs($re);
    const re_ = _d0*vₓᵧᵧ_ + _re;
    const $rf = $rc + $c1d0;
    const rf = qaq(rc,c1d0);
    const _rf = abs($rf);
    const rf_ = rc_ + c1d0_ + _rf;
    const $rg = $rc + $c0d1;  
    const rg = qaq(rc,c0d1);
    const _rg = abs($rg);
    const rg_ = rc_ + c0d1_ + _rg;
    const $rx = $c1*$c0c0;
    const rx = qmq(c1,c0c0);
    const _rx = abs($rx);
    const rx_ = c1_*_c0c0 + 2*_rx;
    const $rh = $rx*$vₓₓₓ;
    const rh = qmq(rx,vₓₓₓ);
    const rh_ = rx_*_vₓₓₓ + _rx*vₓₓₓ_ + 2*abs($rh);
    const $ry = $d1*$d0d0;
    const ry = qmq(d1,d0d0);
    const _ry = abs($ry);
    const ry_ = d1_*_d0d0 + 2*_ry;
    const $ri = $ry*$vᵧᵧᵧ;
    const ri = qmq(ry,vᵧᵧᵧ);
    const ri_ = ry_*_vᵧᵧᵧ + _ry*vᵧᵧᵧ_ + 2*abs($ri);
    const $rj = $vₓᵧ*$rc;
    const rj = qmq(vₓᵧ,rc);
    const rj_ = vₓᵧ_*_rc + _vₓᵧ*rc_ + 2*abs($rj);
    const $rk = $c0c1*$vₓₓ;
    const rk = qmq(c0c1,vₓₓ);
    const rk_ = c0c1_*_vₓₓ + _c0c1*vₓₓ_ + 2*abs($rk);
    const $rl = $d0d1*$vᵧᵧ;
    const rl = qmq(d0d1,vᵧᵧ);
    const rl_ = d0d1_*_vᵧᵧ + _d0d1*vᵧᵧ_ + 2*abs($rl);
    const $rm = $rk + $rl;
    const rm = qaq(rk,rl);
    const rm_ = rk_ + rl_ + abs($rm);
    const $rn = $c1*$vₓ;
    const rn = qmq(c1,vₓ);
    const rn_ = c1_*_vₓ + _c1*vₓ_ + abs($rn);
    const $ro = $d1*$vᵧ;
    const ro = qmq(d1,vᵧ);
    const ro_ = d1_*_vᵧ + _d1*vᵧ_ + abs($ro);
    const $rp = $rn + $ro;
    const rp = qaq(rn,ro);
    const rp_ = rn_ + ro_ + abs($rp);
    const $rq = $rd*$rf;
    const rq = qmq(rd,rf);
    const rq_ = rd_*_rf + _rd*rf_ + 2*abs($rq);
    const $rr = $re*$rg;
    const rr = qmq(re,rg);
    const rr_ = re_*_rg + _re*rg_ + 2*abs($rr);
    const $rs = $rq + $rr;
    const rs = qaq(rq,rr);
    const rs_ = rq_ + rr_ + abs($rs);
    const $rt = 3*($rh + $ri);
    const rt = qmd(3,qaq(rh,ri));
    const rt_ = 3*(rh_ + ri_) + 2*abs($rt);
    const $ru = $rj + 2*$rm;
    const ru = qaq(rj,qm2(rm));
    const ru_ = rj_ + 2*rm_ + abs($ru);
    const $rv = $rs + $rt;
    const rv = qaq(rs,rt);
    const rv_ = rs_ + rt_ + abs($rv);
    const $rw = $ru + $rp;
    const rw = qaq(ru,rp);
    const rw_ = ru_ + rp_ + abs($rw);
    const $v1 = $rv + $rw;
    const v1 = qaq(rv,rw);
    const v1_ = rv_ + rw_ + abs($v1);


    //-----
    // v0
    //-----
    const $t1 = c0*$vₓₓₓ;
    const t1 = qmd(c0,vₓₓₓ);
    const t1_ = _c0*vₓₓₓ_ + abs($t1);
    const $t2 = d0*$vₓₓᵧ;
    const t2 = qmd(d0,vₓₓᵧ);
    const t2_ = _d0*vₓₓᵧ_ + abs($t2);
    const $p4 = $t1 + $t2;
    const p4 = qaq(t1,t2);
    const p4_ = t1_ + t2_ + abs($p4);
    const $t3 = c0*$vₓᵧᵧ;
    const t3 = qmd(c0,vₓᵧᵧ);
    const t3_ = _c0*vₓᵧᵧ_ + abs($t3);
    const $t4 = d0*$vᵧᵧᵧ;
    const t4 = qmd(d0,vᵧᵧᵧ);
    const t4_ = _d0*vᵧᵧᵧ_ + abs($t4);
    const $p5 = $t3 + $t4;
    const p5 = qaq(t3,t4);
    const p5_ = t3_ + t4_ + abs($p5);
    const $p7 = $p4 + $vₓₓ;
    const p7 = qaq(p4,vₓₓ);
    const _p7 = abs($p7);
    const p7_ = p4_ + vₓₓ_ + _p7;
    const $p8 = $p5 + $vᵧᵧ;
    const p8 = qaq(p5,vᵧᵧ);
    const _p8 = abs($p8);
    const p8_ = p5_ + vᵧᵧ_ + _p8;
    const $pc = $c0c0*$p7;
    const pc = qmq(c0c0,p7);
    const pc_ = _c0c0*p7_ + 2*abs($pc);
    const $pd = $d0d0*$p8;
    const pd = qmq(d0d0,p8);
    const pd_ = _d0d0*p8_ + 2*abs($pd);
    const $p6 = $pc + $pd;
    const p6 = qaq(pc,pd);
    const p6_ = pc_ + pd_ + abs($p6);
    const $pe = $c0d0*$vₓᵧ;
    const pe = qmq(c0d0,vₓᵧ);
    const pe_ = _c0d0*vₓᵧ_ + abs($pe);
    const $p9 = $p6 + $pe;
    const p9 = qaq(p6,pe);
    const p9_ = p6_ + pe_ + abs($p9);
    const $pf = c0*$vₓ;
    const pf = qmd(c0,vₓ);
    const pf_ = _c0*vₓ_ + abs($pf);
    const $pg = d0*$vᵧ;
    const pg = qmd(d0,vᵧ);
    const pg_ = _d0*vᵧ_ + abs($pg);
    const $pa = $pf + $pg;
    const pa = qaq(pf,pg);
    const pa_ = pf_ + pg_ + abs($pa);
    const $pb = $p9 + $pa;
    const pb = qaq(p9,pa);
    const pb_ = p9_ + pa_ + abs($pb);
    const $v0 = $pb + $v;
    const v0 = qaq(pb,v);
    const v0_ = pb_ + v_ + abs($v0);


    return {
        coeffs:   [v9, v8, v7, v6, v5, v4, v3, v2, v1, v0],
        errBound: [γγ3*v9_, γγ3*v8_, γγ3*v7_, γγ3*v6_, γγ3*v5_, γγ3*v4_, γγ3*v3_, γγ3*v2_, γγ3*v1_, γγ3*v0_]
    };
}


export { getCoeffsBez3Bez3Dd }
