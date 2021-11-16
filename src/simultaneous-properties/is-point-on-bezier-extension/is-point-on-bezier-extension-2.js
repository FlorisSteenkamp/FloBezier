"use strict";
exports.__esModule = true;
exports.isPointOnBezierExtension2 = void 0;
var get_implicit_form2_js_1 = require("../../implicit-form/double/get-implicit-form2.js");
var get_implicit_form2_error_counters_js_1 = require("../../implicit-form/get-error-counters/get-implicit-form2-error-counters.js");
var get_implicit_form2_dd_with_running_error_js_1 = require("../../implicit-form/double-double/get-implicit-form2-dd-with-running-error.js");
var get_implicit_form2_exact_js_1 = require("../../implicit-form/exact/get-implicit-form2-exact.js");
var error_analysis_js_1 = require("../../../src/error-analysis/error-analysis.js");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
var double_double_1 = require("double-double");
var big_float_ts_1 = require("big-float-ts");
var tp = double_double_1.twoProduct;
var qmq = double_double_1.ddMultDd;
var qaq = double_double_1.ddAddDd;
var sce = big_float_ts_1.scaleExpansion2;
var epr = big_float_ts_1.expansionProduct;
var fes = big_float_ts_1.fastExpansionSum;
var sign = big_float_ts_1.eSign;
var estimate = big_float_ts_1.eEstimate;
var etodd = big_float_ts_1.eToDd;
var abs = Math.abs;
var γ1 = (0, error_analysis_js_1.γ)(1);
var γγ3 = (0, error_analysis_js_1.γγ)(3);
/**
 * Returns true if the given point is on the given quadratic bezier curve where
 * the parameter t is allowed to extend to +-infinity, i.e. t is an element of
 * [-inf, +inf], false otherwise.
 *
 * * **Precondition:** TODO - underflow/overflow
 *
 * @param ps a quadratic bezier curve
 * @param p A point with coordinates given as Shewchuk expansions. If only
 * double precision coordinates need to be provided then wrap it in an array,
 * e.g. for a point with x and y coordinates given as 1 and 2 set
 * `p === [[1],[2]]`. TODO - link to Schewchuk
 *
 * @internal
 */
function isPointOnBezierExtension2(ps, p) {
    var xe = p[0], ye = p[1];
    var lenX = xe.length;
    var lenY = ye.length;
    var x = xe[lenX - 1]; // get higest order double
    var y = ye[lenY - 1]; // ...
    var isDouble = (lenX === 1 && lenY === 1);
    //const x_ = abs(x);
    //const y_ = abs(y);
    //---- first pre-filter
    {
        var _a = (0, get_implicit_form2_js_1.getImplicitForm2)(ps), v = _a.v, v = _a.v, v = _a.v, v = _a.v, v = _a.v, v = _a.v;
        var _b = (0, get_implicit_form2_error_counters_js_1.getImplicitForm2ErrorCounters)(ps), v = _b.v, _ = _b._, // <5>
        v = _b.v, _ = _b._, // <5>
        v = _b.v, _ = _b._, // <5>
        v = _b.v, _ = _b._, // <8>
        v = _b.v, _ = _b._, // <8>
        v_ = _b.v_ // <10>
        ;
        // In the below a a postfix underscore means 
        // an error bound (>= absolute value)
        // `h` (say height) is the the result of evaluating the implicit equation; if
        // it is 0 we are on the curve, else we're not.
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
        // group the terms to reduce error, e.g. v usually has the highest bitlength
        var h = (((v)));
         * x * x + v;
         * x * y;
        +v;
         * y * y;
        +(v);
         * x + v;
         * y;
        +v;
        // <D+12>h <-- <D+12>(<D+11>(<2D+9>(<2D+8> + <2D+7>) + <D+10>) + <10>);
        var h_ = ((
        // <2D+8>(<2D+7>(<5>vₓₓ*<2D+1>(xx)) + <2D+7>(<5>vₓᵧ*<2D+1>(xy)))
        (v))), _;
         * xx_ + v;
        _ * xy_;
        +
        // <2D+7>(<5>vᵧᵧ*<2D+1>(xy))
        v;
        _ * yy_;
        +(
        // <D+10>(<D+9>(<8>vₓ*<D>x) + <D+9>(<8>vᵧ*<D>y))
        v);
        _ * x_ + v;
        _ * y_;
        +
        // <10>v
        v_;
        // if the error is not too high too discern h away from zero
        if ((D + 12) * γ1 * h_ < abs(h)) {
            return false; // <-- prefilter applied
        }
    }
    // error too high - const's try double-double precision
    {
        var _c = (0, get_implicit_form2_dd_with_running_error_js_1.getImplicitForm2DdWithRunningError)(ps), _d = _c.coeffs, v = _d.v, v = _d.v, v = _d.v, v = _d.v, v = _d.v, v = _d.v, _e = _c.errorBound, v = _e.v, _ = _e._, v = _e.v, _ = _e._, v = _e.v, _ = _e._, v = _e.v, _ = _e._, v = _e.v, _ = _e._, v_ = _e.v_;
        // In the below a prefix underscore on a variable means absolute value, 
        // a postfix underscore means error bound (before multiplication by gamma).
        // h (say height) is the the result of evaluating the implicit equation; if
        // it is 0 we are on the curve, else we're not.
        // const h =
        //   vₓₓ*x*x + vₓᵧ*x*y + vᵧᵧ*y*y + vₓ*x + vᵧ*y + v;
        var xd = etodd(xe);
        var yd = etodd(ye);
        var _x = abs(x_1);
        var _y = abs(y_1);
        // we're multiplying by `γγ3` at the end but the error `x_` is only `γγ1`
        // and hence we need to divide the error by 3.
        var x_ = _x / 3;
        var y_ = _y / 3;
        var xx = qmq(xd, xd);
        var _xx = xx[1];
        var xx_ = 2 * (_x * x_ + _xx);
        var yy = qmq(yd, yd);
        var _yy = yy[1];
        var yy_ = 2 * (_y * y_ + _yy);
        var xy = qmq(xd, yd);
        var _xy = abs(xy[1]);
        var xy_ = _x * y_ + x_ * _y + 2 * _xy;
        var v, xx = qmq(v, xx);
        var v, xx_ = abs(v, [1]) * xx_ + v, _;
         * _xx + 2 * abs(v, xx[1]);
        var v, xy = qmq(v, xy);
        var v, xy_ = abs(v, [1]) * xy_ + v, _;
         * _xy + 2 * abs(v, xy[1]);
        var v, yy = qmq(v, yy);
        var v, yy_ = abs(v, [1]) * yy_ + v, _;
         * _yy + 2 * abs(v, yy[1]);
        var v, x_1 = qmq(xd, v);
        var v, x_ = abs(v, [1]) * x_ + v, _;
         * _x + 2 * abs(v, x_1[1]);
        var v, y_1 = qmq(yd, v);
        var v, y_ = abs(v, [1]) * y_ + v, _;
         * _y + 2 * abs(v, y_1[1]);
        // group the terms to reduce error, e.g. v usually has the highest bitlength
        //const h = 
        //    (
        //      ((vₓₓxx + vₓᵧxy) + vᵧᵧyy) + 
        //      (vₓx + vᵧy)
        //    ) + 
        //    v;
        var q4 = qaq(v, xx, v, xy);
        var q4_ = v, xx_;
        +v;
        xy_ + abs(q4[1]);
        var q5 = qaq(q4, v, yy);
        var q5_ = q4_ + v, yy_;
        +abs(q5[1]);
        var q7 = qaq(v, x_1, v, y_1);
        var q7_ = v, x_;
        +v;
        y_ + abs(q7[1]);
        var q8 = qaq(q5, q7);
        var q8_ = q5_ + q7_ + abs(q8[1]);
        var h = qaq(q8, v);
        var h_ = q8_ + v_ + abs(h[1]);
        // if the error is not too high too discern h away from zero
        if (γγ3 * h_ < abs(estimate(h))) {
            return false; // <-- prefilter applied
        }
    }
    // error still too high - const's go exact
    {
        var implictForm = (0, get_implicit_form2_exact_js_1.getImplicitForm2Exact)(ps);
        if (implictForm === undefined) {
            // all ps are the same point
            return isDouble && x === ps[0][0] && y === ps[0][1];
        }
        var v = implictForm.v, v = implictForm.v, v = implictForm.v, v = implictForm.v, v = implictForm.v, v = implictForm.v;
        // h (say height) is the the result of evaluating the implicit equation; 
        // if it is 0 we are on the curve, else we're not.
        // const h =
        //   vₓₓ*x*x + vₓᵧ*x*y + vᵧᵧ*y*y + vₓ*x + vᵧ*y + v;
        var h = fes(fes(fes(epr(v, tp(x, x)), epr(v, tp(x, y))), epr(v, tp(y, y))), fes(fes(sce(x, v), sce(y, v)), v));
        return sign(h) === 0; // <= calculation was exact
    }
}
exports.isPointOnBezierExtension2 = isPointOnBezierExtension2;
