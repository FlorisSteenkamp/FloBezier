"use strict";
exports.__esModule = true;
exports.isPointOnBezierExtension1 = void 0;
var error_analysis_js_1 = require("../../../src/error-analysis/error-analysis.js");
var get_implicit_form1_dd_with_running_error_js_1 = require("../../implicit-form/double-double/get-implicit-form1-dd-with-running-error.js");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
var double_double_1 = require("double-double");
var big_float_ts_1 = require("big-float-ts");
var get_implicit_form1_exact_js_1 = require("../../implicit-form/exact/get-implicit-form1-exact.js");
var qaq = double_double_1.ddAddDd;
var epr = big_float_ts_1.expansionProduct;
var fes = big_float_ts_1.fastExpansionSum;
var sign = big_float_ts_1.eSign;
var estimate = big_float_ts_1.eEstimate;
var qmd = double_double_1.ddMultDouble2;
var sce = big_float_ts_1.scaleExpansion2;
var qmq = double_double_1.ddMultDd;
var etodd = big_float_ts_1.eToDd;
var abs = Math.abs;
var γγ3 = (0, error_analysis_js_1.γγ)(3);
/**
 * Returns true if the given point is on the given line where
 * the parameter `t` is allowed to extend to +-infinity, i.e. t is an element of
 * [-inf, +inf], false otherwise.
 *
 * * **Precondition:** TODO - underflow/overflow
 * * there are alternative implementations to this function, e.g. ccw, etc;
 * it is kept for symmetry.
 *
 * @param ps a linear bezier curve (a line)
 * @param p A point with coordinates given as Shewchuk expansions. If only
 * double precision coordinates need to be provided then wrap it in an array,
 * e.g. for a point with x and y coordinates given as 1 and 2 set
 * `p === [[1],[2]]`. TODO - link to Schewchuk
 *
 * @internal
 */
function isPointOnBezierExtension1(ps, p) {
    var xe = p[0], ye = p[1];
    var lenX = xe.length;
    var lenY = ye.length;
    var x = xe[lenX - 1]; // get higest order double
    var y = ye[lenY - 1]; // ...
    var isDouble = (lenX === 1 && lenY === 1);
    {
        //---- pre-filter - note all coefficients below vₓ, vᵧ, v are exact
        var _a = (0, get_implicit_form1_dd_with_running_error_js_1.getImplicitForm1DdWithRunningError)(ps), _b = _a.coeffs, v = _b.v, v = _b.v, v = _b.v, v_ = _a.errorBound.v_;
        // In the below a prefix underscore on a variable means absolute value, 
        // a postfix underscore means error bound (before multiplication by gamma).
        // h (say height) is the the result of evaluating the implicit equation; if
        // it is 0 we are on the curve, else we're not.
        // const h = vₓ*x + vᵧ*y + v;
        var xd = etodd(xe);
        var yd = etodd(ye);
        var _x = abs_1(x_1);
        var _y = abs_1(y_1);
        var _v, abs_1;
        (v);
        [1];
        ;
        var _v, abs_2;
        (v);
        [1];
        ;
        // we're multiplying by `γγ3` at the end but the error `x_` is only `γγ1`
        // and hence we need to divide the error by 3.
        var x_ = _x / 3;
        var y_ = _y / 3;
        var $v, x_1 = v, _c = void 0;
        1;
         * x_1;
        var v, x_2 = qmq(xd, v);
        var _v, x_3 = abs_1($v, x_1);
        var v, x_ = _v;
         * x_ + 2 * _v;
        x_1;
        var $v, y_1 = v, _d = void 0;
        1;
         * y_1;
        var v, y_2 = qmq(yd, v);
        var _v, y_3 = abs_1($v, y_1);
        var v, y_ = _v;
         * y_ + 2 * _v;
        y_1;
        // group the terms to reduce error, e.g. `v` usually has the highest bitlength
        //const h = (vₓx + vᵧy) + v;
        var q7 = qaq(v, x_1, v, y_1);
        var q7_ = v, x_;
        +v;
        y_ + abs_1(q7[1]);
        var h = qaq(q7, v);
        var h_ = q7_ + v_ + abs_1(h[1]);
        // if the error is not too high too discern h away from zero
        if (γγ3 * h_ < abs_1(estimate(h))) {
            return false; // <-- prefilter applied
        }
    }
    {
        var implictForm = (0, get_implicit_form1_exact_js_1.getImplicitForm1Exact)(ps);
        if (implictForm === undefined) {
            // both ps are the same point
            return isDouble && x_4 === ps[0][0] && y_4 === ps[0][1];
        }
        var v = implictForm.v, v = implictForm.v, v = implictForm.v;
        var v, x_4 = epr(xe, v);
        var v, y_4 = epr(ye, v);
        var hh = fes(epr(v, x_4, v, y_4), v);
        return sign(hh) === 0; // <= calculation was exact
    }
}
exports.isPointOnBezierExtension1 = isPointOnBezierExtension1;
