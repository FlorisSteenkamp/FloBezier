"use strict";
exports.__esModule = true;
exports.bezierSelfIntersection = void 0;
var get_coeffs_bez3_with_running_error_js_1 = require("./get-coefficients/double/get-coeffs-bez3-with-running-error.js");
var get_coeffs_bez3_exact_js_1 = require("./get-coefficients/exact/get-coeffs-bez3-exact.js");
var error_analysis_js_1 = require("../../error-analysis/error-analysis.js");
var big_float_ts_1 = require("big-float-ts");
var double_double_1 = require("double-double");
var big_float_ts_2 = require("big-float-ts");
var double_double_2 = require("double-double");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
var eSign = big_float_ts_1.operators.eSign, eAbs = big_float_ts_1.operators.eAbs, eToDd = big_float_ts_1.operators.eToDd, eMultByNeg2 = big_float_ts_1.operators.eMultByNeg2, eEstimate = big_float_ts_1.operators.eEstimate, eCompare = big_float_ts_1.operators.eCompare;
var sqrtWithErr = double_double_1.operators.sqrtWithErr, divWithErr = double_double_1.operators.divWithErr, ddSqrt = double_double_1.operators.ddSqrt;
var edif = big_float_ts_2.eDiff;
var epr = big_float_ts_2.expansionProduct;
var sce = big_float_ts_2.scaleExpansion2;
var td = double_double_2.twoDiff;
var ts = double_double_2.twoSum;
var qno = double_double_2.ddNegativeOf;
var qaq = double_double_2.ddAddDd;
var qm2 = double_double_2.ddMultBy2;
var qdivq = double_double_2.ddDivDd;
var fes = big_float_ts_2.fastExpansionSum;
var ge = big_float_ts_2.growExpansion;
var eps = Number.EPSILON;
var eps2 = 2 * eps;
var abs = Math.abs;
var γ1 = (0, error_analysis_js_1.γ)(1);
/**
 * Returns the unique self-intersection parameter `t` values of the given
 * bezier curve if they exist, else return `[]` (see also the `inRange`
 * parameter below).
 *
 * * only cubic (or higher order) bezier curves can have unique self-intersections
 * * * **precondition:** TODO - underflow/overflow
 * * this algorithm is mathematically guaranteed accurate to within an absolute
 * error of `4 * Number.EPSILON` for the returned `t` values satisfying `|t| <= 1`
 * or a relative error of the same `4 * Number.EPSILON` otherwise.
 * * **special case:** a cusp is considered a degenerate self-intersection and
 * the (duplicate) `t` values *will* be returned (if they're in [0,1])
 *
 * @param ps a bezier curve given as an array of its control points
 * @param inRange If `inRange === true` (the default) then return the 2 `t`
 * parameter values only if both are in [0,1] else return `[]`.
 * If `inRange === false` then return the (0, 1 or 2) `t` values in [0,1].
 *
 * @doc mdx
 */
function bezierSelfIntersection(ps, inRange) {
    var _a;
    if (inRange === void 0) { inRange = true; }
    if (ps.length < 4) {
        // lines and quadratics don't have uniqure self-intersections.
        return [];
    }
    // First get fast naively calculated coefficients
    var _b = (0, get_coeffs_bez3_with_running_error_js_1.getCoeffsBez3WithRunningError)(ps), _c = _b.coeffs, a = _c[0], b = _c[1], c = _c[2], _d = _b.errBound, a_ = _d[0], b_ = _d[1], c_ = _d[2];
    // if error in `a` cannot discern it from zero
    if (abs(a) <= a_) {
        // it is rare to get here 
        // check for sure if a === 0 exactly
        var _e = ps[0], x0 = _e[0], y0 = _e[1], _f = ps[1], x1 = _f[0], y1 = _f[1], _g = ps[2], x2 = _g[0], y2 = _g[1], _h = ps[3], x3 = _h[0], y3 = _h[1];
        //const a3 = (x3 - x0) + 3*(x1 - x2);
        //const a2 = (x2 + x0) - 2*x1;
        //const b3 = (y3 - y0) + 3*(y1 - y2);
        //const b2 = (y2 + y0) - 2*y1;
        var a3 = fes(td(x3, x0), sce(3, (td(x1, x2))));
        var a2 = ge(ts(x2, x0), -2 * x1);
        var b3 = fes(td(y3, y0), sce(3, (td(y1, y2))));
        var b2 = ge(ts(y2, y0), -2 * y1);
        var a2b3 = epr(a2, b3);
        var a3b2 = epr(a3, b2);
        if (eCompare(a2b3, a3b2) === 0) {
            // a === 0 => no roots possible!
            // This type of curve is usually shaped like an S where both 
            // extreme curvatures are identical or sometimes it is shaped 
            // looking similar to a quadratic bezier curve.
            return [];
        }
    }
    // `Discr` = discriminant = b^2 - 4ac
    // calculate `Discr` and its absolute error Discr_
    var bb = b * b;
    var bb_ = 2 * b_ * abs(b) + γ1 * bb; // the error in b**2
    var ac4 = 4 * a * c;
    var ac4_ = 4 * (a_ * abs(c) + abs(a) * c_) + γ1 * abs(ac4);
    var Discr = bb - ac4;
    var Discr_ = bb_ + ac4_ + γ1 * abs(Discr);
    // if the discriminant is smaller than negative the error bound then
    // certainly there are no roots, i.e. no cusp and no self-intersections
    if (Discr < -Discr_) {
        // discriminant is definitely negative
        return [];
    }
    // if the discriminant is definitely positive
    if (Discr > Discr_) {
        // calculate roots naively as a fast pre-filter
        var _j = sqrtWithErr(Discr, Discr_), D = _j.est, D_ = _j.err;
        var q1 = void 0;
        if (b >= 0) {
            // const r1 = (-b - D) / 2*a;
            // const r2 = (2*c) / (-b - D);
            q1 = -b - D;
        }
        else {
            // const r2 = (-b + D) / 2*a;
            // const r1 = (2*c) / (-b + D);
            q1 = -b + D;
        }
        var q1_ = b_ + D_ + γ1 * abs(q1);
        var _k = divWithErr(q1, 2 * a, q1_, 2 * a_), r1 = _k.est, r1_ = _k.err;
        var _l = divWithErr(2 * c, q1, 2 * c_, q1_), r2 = _l.est, r2_ = _l.err;
        // the actual 'filter' follows
        if (inRange) {
            // IF at least one root is not in [0,1]
            // THEN no self-intersection (in [0,1])
            if (r1 + r1_ < 0 || r1 - r1_ > 1 ||
                r2 + r2_ < 0 || r2 - r2_ > 1) {
                return [];
            }
        }
        else {
            // IF both roots not in [0,1] 
            // THEN no self-intersection (in [0,1])
            if ((r1 + r1_ < 0 || r1 - r1_ > 1) &&
                (r2 + r2_ < 0 || r2 - r2_ > 1)) {
                return [];
            }
        }
    }
    // we need to check exactly - (a !== 0) at this point - tested for earlier
    var _m = (0, get_coeffs_bez3_exact_js_1.getCoeffsBez3Exact)(ps), A = _m[0], B = _m[1], C = _m[2];
    // exact - Discr = b^2 - 4ac
    var eDiscr = edif(epr(B, B), sce(4, epr(A, C)));
    var sgnDiscr = eSign(eDiscr);
    if (sgnDiscr < 0) {
        // sgn < 0 => no real roots => no cusp or double point for t in [0,1]
        return [];
    }
    if (sgnDiscr > 0) {
        var D = ddSqrt(eToDd(eDiscr));
        A = eToDd(A);
        B = eToDd(B);
        C = eToDd(C);
        var nBD = void 0;
        if (eSign(B) >= 0) {
            nBD = qno(qaq(B, D));
            //t1 = (-B - D) / (2*A);
            //t2 = (2*C) / (-B - D);
        }
        else {
            nBD = qaq(qno(B), D);
            //t1 = (2*C) / (-B + D);
            //t2 = (-B + D) / (2*A);
        }
        var t1 = eEstimate(qdivq(nBD, qm2(A))); // max 1 ulps out
        var t2 = eEstimate(qdivq(qm2(C), nBD)); // max 1 ulps out
        if (inRange) {
            // if any root is outside the range => no double point for t in [0,1]
            if (t1 < -eps2 || t1 > 1 + eps2 ||
                t2 < -eps2 || t2 > 1 + eps2) {
                return [];
            }
        }
        else {
            // if both roots are outside the range => no double point for t in [0,1]
            if ((t1 < -eps2 || t1 > 1 + eps2) &&
                (t2 < -eps2 || t2 > 1 + eps2)) {
                return [];
            }
        }
        // coerce to 0/1
        //t1 = (t1 >= -eps4 && t1 < 0)
        //    ? 0
        //    : (t1 > 1 && t1 <= 1 + eps4) ? 1 : t1;
        //t2 = (t2 >= -eps4 && t2 < 0)
        //    ? 0
        //    : (t2 > 1 && t2 <= 1 + eps4) ? 1 : t2;
        _a = t1 < t2 ? [t1, t2] : [t2, t1], t1 = _a[0], t2 = _a[1];
        return t1 >= 0 - eps2 && t1 <= 1 + eps2
            ? t2 >= 0 - eps2 && t2 <= 1 + eps2
                ? [t1, t2]
                : [t1]
            : t2 >= 0 - eps2 && t2 <= 1 + eps2
                ? [t2]
                : [];
    }
    // sign === 0 => cusp
    // set t = b/d = b/-2a
    var d = eMultByNeg2(A);
    var sgnB = eSign(B);
    var sgnD = eSign(d);
    // if result is negative the cusp is outside the bezier endpoints
    var sgn_ = sgnB * sgnD;
    if (sgn_ < 0) {
        return [];
    }
    // if result is > 1 the cusp is outside the bezier endpoints
    if (eCompare(eAbs(B), eAbs(d)) > 0) {
        return [];
    }
    var qB = eToDd(B);
    var qd = eToDd(d);
    var qt = qdivq(qB, qd);
    var t = qt[1] + qt[0];
    return [t, t];
}
exports.bezierSelfIntersection = bezierSelfIntersection;
