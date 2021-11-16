"use strict";
exports.__esModule = true;
exports.getYBoundsTight = exports.getXBoundsTight = exports.getBounds = void 0;
var double_double_1 = require("double-double");
var flo_poly_1 = require("flo-poly");
var get_dxy_js_1 = require("../../to-power-basis/get-dxy/double/get-dxy.js");
var get_interval_box_js_1 = require("./get-interval-box/get-interval-box.js");
var error_analysis_js_1 = require("../../error-analysis/error-analysis.js");
var eval_de_casteljau_js_1 = require("../../local-properties-at-t/t-to-xy/double/eval-de-casteljau.js");
var sqrtWithErr = double_double_1.operators.sqrtWithErr, divWithErr = double_double_1.operators.divWithErr;
var abs = Math.abs;
var u = Number.EPSILON / 2;
var γ1 = (0, error_analysis_js_1.γ)(1);
/**
 * Returns a tight axis-aligned bounding box bound of the given bezier curve.
 *
 * @param ps an order 1, 2 or 3 bezier curve given as an array of control
 * points, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 *
 * @internal
 */
function getXBoundsTight(ps) {
    var pS = ps[0];
    var pE = ps[ps.length - 1];
    var minX;
    var maxX;
    if (pS[0] < pE[0]) {
        minX = { ts: [0, 0], box: [pS, pS] };
        maxX = { ts: [1, 1], box: [pE, pE] };
    }
    else {
        minX = { ts: [1, 1], box: [pE, pE] };
        maxX = { ts: [0, 0], box: [pS, pS] };
    }
    if (ps.length === 2) {
        return { minX: minX, maxX: maxX };
    }
    var dx = (0, get_dxy_js_1.getDxy)(ps)[0];
    // Roots of derivative
    var rootsX;
    if (ps.length === 4) {
        rootsX = quadRoots(dx);
    }
    else { // ps.length === 3
        rootsX = getLinearRoots(dx);
    }
    // Test points
    for (var i = 0; i < rootsX.length; i++) {
        var r = rootsX[i];
        var ts = [r.r - r.rE, r.r + r.rE];
        var box = (0, get_interval_box_js_1.getIntervalBox)(ps, ts);
        if (box[0][0] < minX.box[0][0]) {
            minX = { ts: ts, box: box };
        }
        if (box[1][0] > maxX.box[0][0]) {
            maxX = { ts: ts, box: box };
        }
    }
    return { minX: minX, maxX: maxX };
}
exports.getXBoundsTight = getXBoundsTight;
/**
 * Returns a tight axis-aligned bounding box bound of the given bezier curve.
 * @param ps an order 1, 2 or 3 bezier curve given as an array of control
 * points, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 *
 * @internal
 */
function getYBoundsTight(ps) {
    var pS = ps[0];
    var pE = ps[ps.length - 1];
    var minY;
    var maxY;
    if (pS[1] < pE[1]) {
        minY = { ts: [0, 0], box: [pS, pS] };
        maxY = { ts: [1, 1], box: [pE, pE] };
    }
    else {
        minY = { ts: [1, 1], box: [pE, pE] };
        maxY = { ts: [0, 0], box: [pS, pS] };
    }
    if (ps.length === 2) {
        return { minY: minY, maxY: maxY };
    }
    var _a = (0, get_dxy_js_1.getDxy)(ps), dy = _a[1];
    // Roots of derivative
    var rootsY;
    if (ps.length === 4) {
        rootsY = quadRoots(dy);
    }
    else { // ps.length === 3
        rootsY = getLinearRoots(dy);
    }
    // Test points
    for (var i = 0; i < rootsY.length; i++) {
        var r = rootsY[i];
        var ts = [r.r - r.rE, r.r + r.rE];
        var box = (0, get_interval_box_js_1.getIntervalBox)(ps, ts);
        if (box[0][1] < minY.box[0][1]) {
            minY = { ts: ts, box: box };
        }
        if (box[1][1] > maxY.box[0][1]) {
            maxY = { ts: ts, box: box };
        }
    }
    return { minY: minY, maxY: maxY };
}
exports.getYBoundsTight = getYBoundsTight;
/**
 * @internal
 */
function getLinearRoots(_a) {
    var a = _a[0], b = _a[1];
    var r = -b / a;
    var rE = u * abs(b / a);
    if (r + rE > 0 && r - rE < 1) {
        return [{ r: r, rE: rE }];
    }
    return [];
}
/**
 * Return quad roots in range [0,1] with error assuming input coefficients
 * are exact.
 *
 * @internal
 */
function quadRoots(_a) {
    var a = _a[0], b = _a[1], c = _a[2];
    // first check a !== 0, else get root of the line 'bt + c = 0'
    if (a === 0) {
        return getLinearRoots([b, c]);
    }
    // DD = discriminant = b^2 - 4ac
    // calculate DD and its absolute error DD_
    var bb = b * b;
    var bb_ = u * bb; // the error bound in b**2
    var ac4 = 4 * a * c;
    var ac4_ = 4 * u * abs(a * c);
    var DD = bb - ac4;
    var DD_ = bb_ + ac4_ + γ1 * abs(DD);
    // If the discriminant is smaller than negative the error bound then
    // certainly there are no roots.
    if (DD <= -DD_) {
        // discriminant is definitely negative
        return [];
    }
    // discriminant is definitely positive
    var _b = sqrtWithErr(DD, DD_), D = _b.est, D_ = _b.err;
    var q1;
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
    var q1_ = D_ + γ1 * abs(q1);
    var _c = divWithErr(q1, 2 * a, q1_, 0), r1 = _c.est, r1_ = _c.err;
    var _d = divWithErr(2 * c, q1, 0, q1_), r2 = _d.est, r2_ = _d.err;
    var res = [];
    if (r1 + r1_ > 0 && r1 - r1_ < 1) {
        res.push({ r: r1, rE: r1_ });
    }
    if (r2 + r2_ > 0 && r2 - r2_ < 1) {
        res.push({ r: r2, rE: r2_ });
    }
    return res;
}
/**
 * Returns the axis-aligned bounding box together with the t values where the
 * bounds on the bezier are reached.
 *
 * @param ps an order 1, 2 or 3 bezier curve given as an array of control
 * points, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 *
 * @doc mdx
 */
function getBounds(ps) {
    // Roots of derivative
    var dxy = (0, get_dxy_js_1.getDxy)(ps);
    var rootsX = (0, flo_poly_1.allRoots)(dxy[0], 0, 1);
    var rootsY = (0, flo_poly_1.allRoots)(dxy[1], 0, 1);
    // Endpoints
    rootsX.push(0, 1);
    rootsY.push(0, 1);
    var minX = Number.POSITIVE_INFINITY;
    var maxX = Number.NEGATIVE_INFINITY;
    var minY = Number.POSITIVE_INFINITY;
    var maxY = Number.NEGATIVE_INFINITY;
    var tMinX;
    var tMaxX;
    var tMinY;
    var tMaxY;
    // Test points
    for (var i = 0; i < rootsX.length; i++) {
        var t = rootsX[i];
        var x = (0, eval_de_casteljau_js_1.evalDeCasteljau)(ps, t)[0];
        if (x < minX) {
            minX = x;
            tMinX = t;
        }
        if (x > maxX) {
            maxX = x;
            tMaxX = t;
        }
    }
    for (var i = 0; i < rootsY.length; i++) {
        var t = rootsY[i];
        var _a = (0, eval_de_casteljau_js_1.evalDeCasteljau)(ps, t), y = _a[1];
        if (y < minY) {
            minY = y;
            tMinY = t;
        }
        if (y > maxY) {
            maxY = y;
            tMaxY = t;
        }
    }
    // `tMinX`, ... is guaranteed defined below - TS was (understandably) 
    // unable to follow the logic.
    var ts = [[tMinX, tMinY], [tMaxX, tMaxY]];
    var box = [[minX, minY], [maxX, maxY]];
    return { ts: ts, box: box };
}
exports.getBounds = getBounds;
