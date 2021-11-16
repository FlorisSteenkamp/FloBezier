"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.tFromXY = exports.tFromXY1 = exports.tFromXY2 = exports.tFromXY3 = void 0;
var flo_poly_1 = require("flo-poly");
var get_xy_exact_js_1 = require("../to-power-basis/get-xy/exact/get-xy-exact.js");
var get_xy_dd_with_running_error_js_1 = require("../to-power-basis/get-xy/double-double/get-xy-dd-with-running-error.js");
var big_float_ts_1 = require("big-float-ts");
var twoDiff = big_float_ts_1.twoDiff;
var min = Math.min;
/**
 * Performs certified inversion, i.e. returns the `t` parameter value
 * interval(s) for the given `x` and `y` coordinates on the specified bezier
 * curve. Only `t` values in `[0,1]` are returned.
 *
 * Returns `undefined` if the point is on the curve and the curve is a point.
 *
 * **precondition:** `p` must be *exactly* on the curve
 * * **certified** here means no `t` value can be missed but (in rare cases)
 * an extra 1 or 2 `t`s could be returned (e.g. for self-overlapping curves
 * and when the point is exactly on the point of self-intersection of the curve)
 *
 * @param ps
 * @param p
 */
function tFromXY(ps, p) {
    if (ps.length === 4) {
        return tFromXY3(ps, p);
    }
    if (ps.length === 3) {
        return tFromXY2(ps, p);
    }
    if (ps.length === 2) {
        return tFromXY1(ps, p);
    }
    // TODO - add case of degenerate point
    throw new Error('The given bezier curve is invalid.');
}
exports.tFromXY = tFromXY;
// TODO docs
/**
 * Performs certified inversion, i.e. returns the `t` parameter value
 * interval(s) for the given `x` and `y` coordinates on the specified bezier
 * curve.
 *
 * Returns `undefined` if the point is on the curve and the curve is a point.
 *
 * **precondition:** `p` must be *exactly* on the curve
 * * **certified** here means no `t` value can be missed but (in rare cases)
 * an extra 1 or 2 `t`s could be returned (e.g. for self-overlapping curves
 * and when the point is exactly on the point of self-intersection of the curve)
 *
 * @param ps
 * @param p
 */
function tFromXY3(ps, p) {
    var x = p[0];
    var y = p[1];
    // get power basis representation in double-double precision including error
    // bound
    var _a = (0, get_xy_dd_with_running_error_js_1.getXY3DdWithRunningError)(ps), _b = _a.coeffs, _polyDdX = _b[0], _polyDdY = _b[1], _c = _a.errorBound, polyX_ = _c[0], polyY_ = _c[1];
    // pop the constant term off `x(t)`
    var txDd = _polyDdX.pop();
    // subtract the x coordinate of the point
    var polyDdX = __spreadArray(__spreadArray([], _polyDdX, true), [twoDiff(txDd, x)], false);
    // pop the constant term off `y(t)`
    var tyDd = _polyDdY.pop();
    // subtract the y coordinate of the point
    var polyDdY = __spreadArray(__spreadArray([], _polyDdY, true), [twoDiff(tyDd, y)], false);
    var pExactXY = undefined;
    var getPExactX = function () {
        if (pExactXY === undefined) {
            pExactXY = (0, get_xy_exact_js_1.getXY3Exact)(ps);
        }
        var _pExactX = pExactXY[0]; // x coordinate
        // pop the constant term off `x(t)`
        var tx = _pExactX.pop();
        var pExactX = __spreadArray(__spreadArray([], _pExactX, true), [twoDiff(tx, x)], false);
        return pExactX;
    };
    var getPExactY = function () {
        if (pExactXY === undefined) {
            pExactXY = (0, get_xy_exact_js_1.getXY3Exact)(ps);
        }
        var _pExactY = pExactXY[1]; // y coordinate
        // pop the constant term off `y(t)`
        var ty = _pExactY.pop();
        var pExactY = __spreadArray(__spreadArray([], _pExactY, true), [twoDiff(ty, y)], false);
        return pExactY;
    };
    // max 3 roots
    var xrs = (0, flo_poly_1.allRootsCertified)(polyDdX, 0, 1, polyX_, getPExactX, true);
    // max 3 roots
    var yrs = (0, flo_poly_1.allRootsCertified)(polyDdY, 0, 1, polyY_, getPExactY, true);
    if (xrs === undefined) {
        // the `x` value of the point is on the curve for all `t` values
        // the curve must be a 'line' (can also be degenerate quadratic, etc.)
        if (yrs === undefined) {
            // the `y` value of the point is on the curve for all `t` values
            // the curve must be a point
            return undefined;
        }
        return yrs; //.map(r => [r.tS, r.tE]);
    }
    if (yrs === undefined) {
        // the `y` value of the point is on the curve for all `t` values
        // the curve must be a 'line' (can also be degenerate quadratic, etc.)        
        return xrs; //.map(r => [r.tS, r.tE]);;
    }
    // check for `t` value overlap 
    // - there can be 0 or 1 overlap (the usual case), 2 overlaps (at point of 
    // self-intersection), 3 overlaps (for self-overlapping curve (that looks 
    // like a line))
    // at this point `xrs !== undefined` and `yrs !== undefined`
    var rs = [];
    for (var i = 0; i < xrs.length; i++) {
        var xr = xrs[i];
        for (var j = 0; j < yrs.length; j++) {
            var yr = yrs[j];
            var r = combineRoots(xr, yr);
            if (r !== undefined) {
                rs.push(r);
            }
        }
    }
    return rs;
}
exports.tFromXY3 = tFromXY3;
function tFromXY2(ps, p) {
    var x = p[0];
    var y = p[1];
    // get power basis representation in double-double precision including error
    // bound
    var _a = (0, get_xy_dd_with_running_error_js_1.getXY2DdWithRunningError)(ps), _b = _a.coeffs, _polyDdX = _b[0], _polyDdY = _b[1], _c = _a.errorBound, polyX_ = _c[0], polyY_ = _c[1];
    // pop the constant term off `x(t)`
    var txDd = _polyDdX.pop();
    // subtract the x coordinate of the point
    var polyDdX = __spreadArray(__spreadArray([], _polyDdX, true), [twoDiff(txDd, x)], false);
    // pop the constant term off `y(t)`
    var tyDd = _polyDdY.pop();
    // subtract the y coordinate of the point
    var polyDdY = __spreadArray(__spreadArray([], _polyDdY, true), [twoDiff(tyDd, y)], false);
    var pExactXY = undefined;
    var getPExactX = function () {
        if (pExactXY === undefined) {
            pExactXY = (0, get_xy_exact_js_1.getXY2Exact)(ps);
        }
        var _pExactX = pExactXY[0]; // x coordinate
        // pop the constant term off `x(t)`
        var tx = _pExactX.pop();
        var pExactX = __spreadArray(__spreadArray([], _pExactX, true), [twoDiff(tx, x)], false);
        return pExactX;
    };
    var getPExactY = function () {
        if (pExactXY === undefined) {
            pExactXY = (0, get_xy_exact_js_1.getXY2Exact)(ps);
        }
        var _pExactY = pExactXY[1]; // y coordinate
        // pop the constant term off `y(t)`
        var ty = _pExactY.pop();
        var pExactY = __spreadArray(__spreadArray([], _pExactY, true), [twoDiff(ty, y)], false);
        return pExactY;
    };
    // max 2 roots
    var xrs = (0, flo_poly_1.allRootsCertified)(polyDdX, 0, 1, polyX_, getPExactX, true);
    // max 2 roots
    var yrs = (0, flo_poly_1.allRootsCertified)(polyDdY, 0, 1, polyY_, getPExactY, true);
    if (xrs === undefined) {
        // the `x` value of the point is on the curve for all `t` values
        // the curve must be a 'line'
        if (yrs === undefined) {
            // the `y` value of the point is on the curve for all `t` values
            // the curve must be a point
            return undefined;
        }
        return yrs; //.map(r => ({ tS: r.tS, tE: r.tE, multiplicity: 1 }));
    }
    if (yrs === undefined) {
        // the `y` value of the point is on the curve for all `t` values
        // the curve must be a 'line'
        return xrs; //.map(r => ({ tS: r.tS, tE: r.tE, multiplicity: 1 }));
    }
    // check for `t` value overlap 
    // - there can be 0 or 1 overlap (the usual case), 2 overlaps (for 
    // self-overlapping curve (that looks like a line))
    // at this point `xrs !== undefined` and `yrs !== undefined`
    var rs = [];
    for (var i = 0; i < xrs.length; i++) {
        var xr = xrs[i];
        for (var j = 0; j < yrs.length; j++) {
            var yr = yrs[j];
            var r = combineRoots(xr, yr);
            if (r !== undefined) {
                rs.push(r);
            }
        }
    }
    return rs;
}
exports.tFromXY2 = tFromXY2;
function tFromXY1(ps, p) {
    var x = p[0];
    var y = p[1];
    // get power basis representation in double-double precision including error
    // bound
    var _a = (0, get_xy_dd_with_running_error_js_1.getXY1DdWithRunningError)(ps), _polyDdX = _a[0], _polyDdY = _a[1];
    // pop the constant term off `x(t)`
    var txDd = _polyDdX.pop();
    // subtract the x coordinate of the point
    var polyExactX = __spreadArray(__spreadArray([], _polyDdX, true), [twoDiff(txDd, x)], false);
    // pop the constant term off `y(t)`
    var tyDd = _polyDdY.pop();
    // subtract the y coordinate of the point
    var polyExactY = __spreadArray(__spreadArray([], _polyDdY, true), [twoDiff(tyDd, y)], false);
    // max 1 roots
    var xrs = (0, flo_poly_1.allRootsCertified)(polyExactX, 0, 1, undefined, undefined, true);
    // max 1 roots
    var yrs = (0, flo_poly_1.allRootsCertified)(polyExactY, 0, 1, undefined, undefined, true);
    if (xrs === undefined) {
        // the `x` value of the point is on the curve for all `t` values
        // the curve must be a vertical line
        if (yrs === undefined) {
            // the `y` value of the point is on the curve for all `t` values
            // the curve must be a point
            return undefined;
        }
        return yrs; //.map(r => ({ tS: r.tS, tE: r.tE, multiplicity: 1 }));
    }
    if (yrs === undefined) {
        // the `y` value of the point is on the curve for all `t` values
        // the curve must be horizontal line
        return xrs; //.map(r => ({ tS: r.tS, tE: r.tE, multiplicity: 1 }));
    }
    // check for `t` value overlap 
    // - there can be 0 or 1 overlap (the usual case), 2 overlaps (for 
    // self-overlapping curve (that looks like a line))
    // at this point `xrs !== undefined` and `yrs !== undefined`
    if (xrs.length === 0 || yrs.length === 0) {
        // this is actually not possible since a precondition is that the point
        // must be *exactly* on the line
        return [];
    }
    // at this point `xrs.length === 1` and `yrs.length === 1`
    var r = combineRoots(xrs[0], yrs[0]);
    if (r === undefined) {
        // this is actually not possible since a precondition is that the point
        // must be *exactly* on the line
        return undefined;
    }
    return [r];
}
exports.tFromXY1 = tFromXY1;
function combineRoots(r, s) {
    // case 1
    if (r.tS <= s.tS) {
        if (r.tE < s.tS) {
            return undefined; // no overlap
        }
        return { tS: s.tS, tE: min(r.tE, s.tE), multiplicity: r.multiplicity + s.multiplicity };
    }
    // case 2 - r.tS > s.tS
    if (s.tE < r.tS) {
        return undefined; // no overlap
    }
    return { tS: r.tS, tE: min(r.tE, s.tE), multiplicity: r.multiplicity + s.multiplicity };
}
