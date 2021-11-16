"use strict";
exports.__esModule = true;
exports.isPointOnBezierExtension3 = void 0;
var get_implicit_form3_js_1 = require("../../implicit-form/double/get-implicit-form3.js");
var get_implicit_form3_error_counters_js_1 = require("../../implicit-form/get-error-counters/get-implicit-form3-error-counters.js");
var get_implicit_form3_dd_with_running_error_js_1 = require("../../implicit-form/double-double/get-implicit-form3-dd-with-running-error.js");
var get_implicit_form3_exact_js_1 = require("../../implicit-form/exact/get-implicit-form3-exact.js");
var error_analysis_js_1 = require("../../../src/error-analysis/error-analysis.js");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
var double_double_1 = require("double-double");
var big_float_ts_1 = require("big-float-ts");
var qmq = double_double_1.ddMultDd;
var qaq = double_double_1.ddAddDd;
var epr = big_float_ts_1.expansionProduct;
var fes = big_float_ts_1.fastExpansionSum;
var sign = big_float_ts_1.eSign;
var estimate = big_float_ts_1.eEstimate;
var etodd = big_float_ts_1.eToDd;
var abs = Math.abs;
var γ1 = (0, error_analysis_js_1.γ)(1);
var γγ3 = (0, error_analysis_js_1.γγ)(3);
/**
 * Returns `true` if the given point is on the given cubic bezier curve where
 * the parameter, `t`, is allowed to extend to `±∞`, i.e. if `t ∈ (-∞, +∞)`,
 * `false` otherwise.
 *
 * * **precondition:** TODO - underflow/overflow
 *
 * @param ps a cubic bezier curve
 * @param p A point with coordinates given as Shewchuk expansions. If only
 * double precision coordinates need to be provided then wrap it in an array,
 * e.g. for a point with x and y coordinates given as 1 and 2 set
 * `p === [[1],[2]]`. TODO - link to Schewchuk
 *
 * @internal
 */
function isPointOnBezierExtension3(ps, p) {
    var xe = p[0], ye = p[1];
    var lenX = xe.length;
    var lenY = ye.length;
    var x = xe[lenX - 1]; // get higest order double
    var y = ye[lenY - 1]; // ...
    var isDouble = (lenX === 1 && lenY === 1);
    //---- first pre-filter
    {
        // The below takes about 1.2 micro-seconds on a 1st gen i7 and Chrome 79
        var _a = (0, get_implicit_form3_js_1.getImplicitForm3)(ps), v = _a.v, v = _a.v, v = _a.v, v = _a.v, v = _a.v, v = _a.v, v = _a.v, v = _a.v, v = _a.v, v = _a.v;
        var _b = (0, get_implicit_form3_error_counters_js_1.getImplicitForm3ErrorCounters)(ps), v = _b.v, _ = _b._, // <11>
        v = _b.v, _ = _b._, // <12>
        v = _b.v, _ = _b._, // <12>
        v = _b.v, _ = _b._, // <11>
        v = _b.v, _ = _b._, // <19>
        v = _b.v, _ = _b._, // <18>
        v = _b.v, _ = _b._, // <19>
        v = _b.v, _ = _b._, // <22>
        v = _b.v, _ = _b._, // <22>
        v_ = _b.v_ // <24>
        ;
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
        var xx = x * x;
        var yy = y * y;
        var h = (((v)));
         * (xx * x) + v;
         * (xx * y);
        +(v);
         * (x * yy) + v;
         * (yy * y);
        +((v));
         * xx + v;
         * (x * y);
        +v;
         * yy;
        +((v));
         * x + v;
         * y;
        +v;
        ;
        //-------------------
        // Error calculation
        //-------------------
        // In the below, if x is given as a double then the error counter on
        // x would be 0, i.e. <0>x, else it would be <1>x. We represent the
        // error counter with a <D> so that for a point with double precion 
        // coordinates we have <D> = <0> else <D> = <1>. Same is true for y.
        // `0` if we have only double precision coordinates, `1` otherwise
        var D = isDouble ? 0 : 1;
        var x_ = abs(x); // <D>x
        var y_ = abs(y); // <D>y
        var xx_ = x_ * x_; // <2D+1>xx
        var xy_ = x_ * y_; // <2D+1>xy
        var yy_ = y_ * y_; // <2D+1>yy
        // <D+26>h <-- <D+26>(<2D+24>(<3D+17>(<3D+16> + <3D+16>) + <2D+23>) + <D+25>(<D+24> + <24>))
        var h_ = (
        // <3D+16> <-- <3D+16>((<3D+14>(<11>vₓₓₓ*<3D+2>(xx*x)) + <3D+15>(<12>vₓₓᵧ*<3D+2>(xx*y)))) +
        (v)), _;
         * (xx_ * x_) + v;
        _ * (xx_ * y_);
        +
        // <3D+16> <-- <3D+16>((<3D+15>(<12>vₓᵧᵧ*<3D+2>(x*yy)) + <3D+14>(<11>vᵧᵧᵧ*<3D+2>(yy*y)))) +
        (v);
        _ * (x_ * yy_) + v;
        _ * (yy_ * y_);
        +
        // <2D+23> <-- <2D+23>(<2D+22>(<2D+21>(<19>vₓₓ*<2D+1>xx) + <2D+20>(<18>vₓᵧ*<2D+1>(x*y))) + <2D+20>(<18>vᵧᵧ*<2D+1>yy))
        ((v));
        _ * xx_ + v;
        _ * (xy_);
        +v;
        _ * yy_;
        +(
        // <24> <-- <D+24>(<D+23>(<22>vₓ*<D>x) + <D+23>(<22>vᵧ*<D>y))
        (v));
        _ * x_ + v;
        _ * y_;
        +
        // <24>
        v_;
        ;
        // if the error is not too high too discern `h` away from zero
        if ((D + 26) * γ1 * h_ < abs(h)) {
            return false; // <-- prefilter applied
        }
    }
    // error too high - let's try double-double precision
    {
        // The below takes about 15 micro-seconds on a 1st gen i7 and Chrome 79
        var _c = (0, get_implicit_form3_dd_with_running_error_js_1.getImplicitForm3DdWithRunningError)(ps), _d = _c.coeffs, v = _d.v, v = _d.v, v = _d.v, v = _d.v, v = _d.v, v = _d.v, v = _d.v, v = _d.v, v = _d.v, v = _d.v, _e = _c.errorBound, v = _e.v, _ = _e._, v = _e.v, _ = _e._, v = _e.v, _ = _e._, v = _e.v, _ = _e._, v = _e.v, _ = _e._, v = _e.v, _ = _e._, v = _e.v, _ = _e._, v = _e.v, _ = _e._, v = _e.v, _ = _e._, v_ = _e.v_;
        var _v, abs_1;
        (v);
        [1];
        ;
        var _v, abs_2;
        (v);
        [1];
        ;
        var _v, abs_3;
        (v);
        [1];
        ;
        var _v, abs_4;
        (v);
        [1];
        ;
        // In the below a prefix underscore on a variable means absolute value, 
        // a postfix underscore means error bound (before multiplication by gamma).
        // h (say height) is the the result of evaluating the implicit equation; if
        // it is 0 we are on the curve, else we're not.
        // const h =
        //   vₓₓₓ*x*x*x + vₓₓᵧ*x*x*y + vₓᵧᵧ*x*y*y + vᵧᵧᵧ*y*y*y + 
        //   vₓₓ*x*x + vₓᵧ*x*y + vᵧᵧ*y*y + vₓ*x + vᵧ*y + v;
        var xd = etodd(xe);
        var yd = etodd(ye);
        var _x = abs_1(x_1);
        var _y = abs_1(y_1);
        // we're multiplying by `γγ3` at the end but the error `x_` is only `γγ1`
        // and hence we need to divide the error by 3.
        var x_ = _x / 3;
        var y_ = _y / 3;
        var xx = qmq(xd, xd);
        var _xx = xx[1];
        var xx_ = 2 * (_x * x_ + _xx);
        var xxx = qmq(xd, xx);
        var _xxx = abs_1(xxx[1]);
        var xxx_ = _x * xx_ + x_ * _xx + 2 * _xxx;
        var yy = qmq(yd, yd);
        var _yy = yy[1];
        var yy_ = 2 * (_y * y_ + _yy);
        var yyy = qmq(yd, yy);
        var _yyy = abs_1(yyy[1]);
        var yyy_ = _y * yy_ + y_ * _yy + 2 * _yyy;
        var xxy = qmq(yd, xx);
        var _xxy = abs_1(xxy[1]);
        var xxy_ = _y * xx_ + y_ * _xx + 2 * _xxy;
        var xyy = qmq(xd, yy);
        var _xyy = abs_1(xyy[1]);
        var xyy_ = _x * yy_ + x_ * _yy + 2 * _xyy;
        var xy = qmq(xd, yd);
        var _xy = abs_1(xy[1]);
        var xy_ = _x * y_ + x_ * _y + 2 * _xy;
        var v, xxx = qmq(v, xxx);
        var v, xxx_ = _v;
         * xxx_ + v;
        _ * _xxx + 2 * abs_1(v, xxx[1]);
        var v, xxy = qmq(v, xxy);
        var v, xxy_ = _v;
         * xxy_ + v;
        _ * _xxy + 2 * abs_1(v, xxy[1]);
        var v, xyy = qmq(v, xyy);
        var v, xyy_ = _v;
         * xyy_ + v;
        _ * _xyy + 2 * abs_1(v, xyy[1]);
        var v, yyy = qmq(v, yyy);
        var v, yyy_ = _v;
         * yyy_ + v;
        _ * _yyy + 2 * abs_1(v, yyy[1]);
        var v, xx = qmq(v, xx);
        var v, xx_ = abs_1(v, [1]) * xx_ + v, _;
         * _xx + 2 * abs_1(v, xx[1]);
        var v, xy = qmq(v, xy);
        var v, xy_ = abs_1(v, [1]) * xy_ + v, _;
         * _xy + 2 * abs_1(v, xy[1]);
        var v, yy = qmq(v, yy);
        var v, yy_ = abs_1(v, [1]) * yy_ + v, _;
         * _yy + 2 * abs_1(v, yy[1]);
        var v, x_1 = qmq(xd, v);
        var v, x_ = abs_1(v, [1]) * x_ + v, _;
         * _x + 2 * abs_1(v, x_1[1]);
        var v, y_1 = qmq(yd, v);
        var v, y_ = abs_1(v, [1]) * y_ + v, _;
         * _y + 2 * abs_1(v, y_1[1]);
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
        var q1 = qaq(v, xxx, v, xxy);
        var q1_ = v, xxx_;
        +v;
        xxy_ + abs_1(q1[1]);
        var q2 = qaq(v, xyy, v, yyy);
        var q2_ = v, xyy_;
        +v;
        yyy_ + abs_1(q2[1]);
        var q3 = qaq(q1, q2);
        var q3_ = q1_ + q2_ + abs_1(q3[1]);
        var q4 = qaq(v, xx, v, xy);
        var q4_ = v, xx_;
        +v;
        xy_ + abs_1(q4[1]);
        var q5 = qaq(q4, v, yy);
        var q5_ = q4_ + v, yy_;
        +abs_1(q5[1]);
        var q6 = qaq(q3, q5);
        var q6_ = q3_ + q5_ + abs_1(q6[1]);
        var q7 = qaq(v, x_1, v, y_1);
        var q7_ = v, x_;
        +v;
        y_ + abs_1(q7[1]);
        var q8 = qaq(q7, v);
        var q8_ = q7_ + v_ + abs_1(q8[1]);
        var h = qaq(q6, q8);
        var h_ = q6_ + q8_ + abs_1(h[1]);
        // if the error is not too high too discern h away from zero
        if (γγ3 * h_ < abs_1(estimate(h))) {
            return false; // <-- prefilter applied
        }
    }
    // error still too high - const's go exact
    {
        // The below takes about 155 micro-seconds on a 1st gen i7 and Chrome 79
        var implictForm = (0, get_implicit_form3_exact_js_1.getImplicitForm3Exact)(ps);
        if (implictForm === undefined) {
            // all ps are the same point
            return isDouble && x_2 === ps[0][0] && y_2 === ps[0][1];
        }
        var v = implictForm.v, v = implictForm.v, v = implictForm.v, v = implictForm.v, v = implictForm.v, v = implictForm.v, v = implictForm.v, v = implictForm.v, v = implictForm.v, v = implictForm.v;
        // `h` (say height) is the the result of evaluating the implicit 
        // equation; if it is 0 we are on the curve, else we're not.
        // const h =
        //   vₓₓₓ*x*x*x + vₓₓᵧ*x*x*y + vₓᵧᵧ*x*y*y + vᵧᵧᵧ*y*y*y + 
        //   vₓₓ*x*x + vₓᵧ*x*y + vᵧᵧ*y*y + vₓ*x + vᵧ*y + v;
        var xx = epr(xe, xe); // <= error free
        var xxx = epr(xe, xx);
        var yy = epr(ye, ye); // <= error free
        var yyy = epr(ye, yy);
        var xxy = epr(ye, xx);
        var xyy = epr(xe, yy);
        var xy = epr(xe, ye); // <= error free
        var v, xxx = epr(v, xxx);
        var v, xxy = epr(v, xxy);
        var v, xyy = epr(v, xyy);
        var v, yyy = epr(v, yyy);
        var v, xx = epr(v, xx);
        var v, xy = epr(v, xy);
        var v, yy = epr(v, yy);
        var v, x_2 = epr(xe, v);
        var v, y_2 = epr(ye, v);
        var q1 = fes(v, xxx, v, xxy);
        var q2 = fes(v, xyy, v, yyy);
        var q3 = fes(q1, q2);
        var q4 = fes(v, xx, v, xy);
        var q5 = fes(q4, v, yy);
        var q6 = fes(q3, q5);
        var q7 = fes(v, x_2, v, y_2);
        var q8 = fes(q7, v);
        var h = fes(q6, q8);
        return sign(h) === 0; // <= calculation was exact
    }
}
exports.isPointOnBezierExtension3 = isPointOnBezierExtension3;
