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
exports.geoClip = void 0;
var to_hybrid_quadratic_js_1 = require("./to-hybrid-quadratic.js");
var __debug__ = (typeof globalThis !== 'undefined' && globalThis.__debug__)
    ? globalThis.__debug__
    : undefined;
var toHybridQuadratic = to_hybrid_quadratic_js_1.toHybridQuadratic;
var min = Math.min;
var max = Math.max;
var abs = Math.abs;
var eps = Number.EPSILON;
var u = eps / 2;
var onemin = 1 - eps;
var onemax = 1 + eps;
var noIntersection = undefined;
var noClip = [0, 1];
/**
 * Performs geometric clipping of the given bezier curve and returns the new
 * minimum and maximum `t` parameter values.
 *
 * * helper function to the geometric interval bezier-bezier intersection
 * algorithm
 * * the returned min and max `t` values has the following guarantees:
 *   * `Number.EPSILON | t`
 *   * `0 <= t <= 1`
 *
 * @param G the bezier curve to be geo clipped - coordinate error bounds are
 * assumed to have counters of `[[<6>,<6>], [<6>,<6>], [<10>,<10>], [<11>,<11>]]`
 * @param dF function to calculate a min and max distance to the fat line's 'baseline'
 * @param dMin fat line min signed distance
 * @param dMax fat line max signed distance
 *
 * @internal
 */
function geoClip(G, dF, dMin, dMax) {
    // estimated bezier control points
    var Gps = G.ps;
    var lenG = Gps.length;
    var _hq_ = lenG === 4
        ? toHybridQuadratic(G)
        : { hq: [Gps[1], Gps[1]], _hq: [[0, 0], [0, 0]] }; // degenerate
    // estimated hybrid coordinates
    var hq = _hq_.hq;
    // hybrid coordinate error bounds with error counters of <8> and <12> for
    // the two points respectively (both x and y coordinates have same error
    // counters)
    var _hq = _hq_._hq;
    // coordinate error bounds are assumed to have counters 
    // of `[[<6>,<6>], [<6>,<6>], [<10>,<10>], [<11>,<11>]]`
    var G_ps = G._ps;
    /** min/max distance (from line) to hybrid quadratic (and cubic) first control point */
    var dH0 = dF(Gps[0], G_ps[0]);
    /** min/max distance (from line) to hybrid quadratic (and cubic) last control point */
    var dH2 = dF(Gps[lenG - 1], G_ps[lenG - 1]);
    /** min/max distance (from line) to hybrid quadratic's moving control point start */
    var dH10 = dF(hq[0], _hq[0]);
    /** min/max distance (from line) to hybrid quadratic's moving control point end */
    var dH11 = dF(hq[1], _hq[1]);
    var dH1min = min(dH10.dMin, dH11.dMin);
    var dH1max = max(dH10.dMax, dH11.dMax);
    if (__debug__ !== undefined && !__debug__.already) {
        var currentIter = __debug__.currentIter;
        // just for drawing purposes (not perfectle accurate)
        currentIter.hq = __spreadArray(__spreadArray([G.ps[0]], hq, true), [G.ps[lenG - 1]], false);
        if (currentIter.geo) {
            // we already did the first geoclip - assume this to be the perpendicular clip
            currentIter.geoPerp = { dH0: dH0, dH10: dH10, dH11: dH11, dH2: dH2, dMin: dMin, dMax: dMax };
        }
        else {
            currentIter.geo = { dH0: dH0, dH10: dH10, dH11: dH11, dH2: dH2, dMin: dMin, dMax: dMax };
        }
    }
    var dH0Min = dH0.dMin;
    var dH0Max = dH0.dMax;
    var dH2Min = dH2.dMin;
    var dH2Max = dH2.dMax;
    //--------------------------------------------------------------------------
    // see the paper at https://scholarsarchive.byu.edu/cgi/viewcontent.cgi?referer=&httpsredir=1&article=2206&context=etd)
    // After writing eq. (3.16) and (3.17) in power basis (by simply multiplying 
    // out and collecting terms) and taking error bounds into account:
    //--------------------------------------------------------------------------
    /** the quadratic term coefficient of the *lower* Bernstein basis polynomial */
    var a = dH0Min - 2 * dH1min + dH2Min; // t^2 
    /** the linear term coefficient of the *lower* Bernstein basis polynomial */
    var b = -2 * (dH0Min - dH1min); // t^1
    /**
     * the constant term coefficient of the *lower* Bernstein basis polynomial's
     * intersection with the lower fat line (dMin)
     */
    var c1 = dH0Min - dMin; // t^0 - dMin
    /**
     * the constant term coefficient of the *lower* Bernstein basis polynomial's
     * intersection with the upper fat line (dMax)
     */
    var c2 = dH0Min - dMax; // t^0 - dMax
    /** the quadratic term coefficient of the *upper* Bernstein basis polynomial */
    var d = dH0Max - 2 * dH1max + dH2Max;
    /** the linear term coefficient of the *upper* Bernstein basis polynomial */
    var e = -2 * (dH0Max - dH1max);
    /**
     * the constant term coefficient of the *upper* Bernstein basis polynomial's
     * intersection with the *lower* fat line (dMin)
     */
    var f1 = dH0Max - dMin;
    /**
     * the constant term coefficient of the *upper* Bernstein basis polynomial's
     * intersection with the *upper* fat line (dMax)
     */
    var f2 = dH0Max - dMax;
    //--------------------------------------------------------------------------
    var tMin = Number.POSITIVE_INFINITY;
    var tMax = Number.NEGATIVE_INFINITY;
    /** *lower* Bernstein *lower* fatline roots */
    var rootsMinBMinF = quadraticRoots(a, b, c1);
    /** *lower* Bernstein *upper* fatline roots */
    var rootsMinBMaxF = quadraticRoots(a, b, c2);
    /** *upper* Bernstein *lower* fatline roots */
    var rootsMaxBMinF = quadraticRoots(d, e, f1);
    /** *upper* Bernstein *upper* fatline roots */
    var rootsMaxBMaxF = quadraticRoots(d, e, f2);
    // if there are an infinite number of roots, i.e. if the quadratic is
    // really the zero polynomial (of negative infinite degree)
    if (rootsMinBMinF === undefined || rootsMinBMaxF === undefined ||
        rootsMaxBMinF === undefined || rootsMaxBMaxF === undefined) {
        // no clipping could happen
        return noClip;
    }
    //--------------------------------------------------------------------------
    // see the paper at https://scholarsarchive.byu.edu/cgi/viewcontent.cgi?referer=&httpsredir=1&article=2206&context=etd)
    // According to the paper we can do clipping such that 2 intervals are
    // sometimes returned. We just return the combined interval in those cases
    // which might make the algorithm slightly slower but a bit simpler.
    //--------------------------------------------------------------------------
    for (var i = 0; i < rootsMinBMinF.length; i++) {
        var r = rootsMinBMinF[i];
        if (r < tMin) {
            tMin = r;
        }
        if (r > tMax) {
            tMax = r;
        }
    }
    for (var i = 0; i < rootsMinBMaxF.length; i++) {
        var r = rootsMinBMaxF[i];
        if (r < tMin) {
            tMin = r;
        }
        if (r > tMax) {
            tMax = r;
        }
    }
    for (var i = 0; i < rootsMaxBMinF.length; i++) {
        var r = rootsMaxBMinF[i];
        if (r < tMin) {
            tMin = r;
        }
        if (r > tMax) {
            tMax = r;
        }
    }
    for (var i = 0; i < rootsMaxBMaxF.length; i++) {
        var r = rootsMaxBMaxF[i];
        if (r < tMin) {
            tMin = r;
        }
        if (r > tMax) {
            tMax = r;
        }
    }
    if (dH0Max >= dMin && dH0Min <= dMax) {
        tMin = 0;
    }
    if (dH2Max >= dMin && dH2Min <= dMax) {
        tMax = 1;
    }
    if (tMin === Number.POSITIVE_INFINITY) {
        // will have here also: `tMax === Number.NEGATIVE_INFINITY`
        return noIntersection;
    }
    return [tMin, tMax];
}
exports.geoClip = geoClip;
/**
 * Floating-point-stably calculates and returns the (ordered) quadratic roots of
 * the given quadratic polynomial in [0,1].
 *
 * * **precondition:** the input polynomial must be quadratic (given as an array
 * of exactly 3 values with the first value *unequal* to zero)
 *
 * @param p a quadratic polynomial with coefficients given as an array
 * of double floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the quadratic `5x^2 - 3x`
 *
 * @example
 * ```typescript
 * quadraticRoots([1, -3, 2]); //=> [1,2]
 * ```
 *
 * @doc
 */
function quadraticRoots(a, b, c) {
    if (a === 0) {
        if (b === 0) {
            // degenerate constant (degree 0 polynomial)
            if (c === 0) {
                // degenerate zero polynomial (degree -infinity polynomial)
                // infinite number of roots
                return undefined;
            }
            // no roots
            return [];
        }
        // degenerate linear
        //return [-c/b];
        var r = -c / b;
        var E = abs(r * u);
        var Emin = r - E;
        var Emax = r + E;
        if (Emax < 0 || Emin > 1) {
            return [];
        }
        if (Emin < 0 && Emax > 0) {
            return [0, Emax];
        }
        if (Emin < 1 && Emax > 1) {
            return [Emin, 1];
        }
        // we return the root interval pairs inline to account for error
        return [Emin, Emax];
    }
    if (c === 0) {
        var r = -b / a;
        var E = abs(r * u);
        var Emin = r - E;
        var Emax = r + E;
        if (Emax < 0 || Emin > 1) {
            return [0];
        }
        if (Emin < 0 && Emax > 0) {
            return [0, Emax];
        }
        if (Emin < 1 && Emax > 1) {
            return [0, Emin, 1];
        }
        // we return the root interval pairs inline to account for error
        return [0, Emin, Emax];
    }
    var D1 = b * b; // <1>D1 (error counters)
    var D2 = 4 * a * c; // <1>D2
    var D = D1 - D2;
    // <2>D <= D1 - D2;  // <2>(<1>D1 + <1>D2)
    var _D = D1 + abs(D2);
    var D_ = 2 * u * _D;
    if (D + D_ < 0) {
        // no real roots possible
        return [];
    }
    // at this point `D + D_ >= 0`
    if (D + D_ === 0) {
        var r = -b / (2 * a);
        var E = abs(r * u); // single division error
        var Emin = r - E;
        var Emax = r + E;
        if (Emax < 0 || Emin > 1) {
            return [];
        }
        if (Emin < 0 && Emax > 0) {
            return [0, Emax];
        }
        if (Emin < 1 && Emax > 1) {
            return [Emin, 1];
        }
        // we return the root interval pairs inline to account for error
        return [Emin, Emax];
    }
    // at this point `D + D_ > 0`
    var Dmin = D - D_ < 0 ? 0 : D - D_;
    var DDmin = Math.sqrt(Dmin) * (onemin);
    var DDmax = Math.sqrt(D + D_) * (onemax);
    // at this point DDMax > 0
    // at this point `DDmax > 0` and `DDmin >= 0`
    var numerMaxAbs;
    var numerMinAbs;
    if (b >= 0) {
        numerMaxAbs = -b - DDmax;
        numerMinAbs = -b - DDmin;
    }
    else {
        numerMinAbs = -b + DDmin;
        numerMaxAbs = -b + DDmax;
    }
    var a2 = 2 * a;
    var c2 = 2 * c;
    //const r1 = numerMin / a2;
    //const r2 = c2 / numerMin;
    // at this point `numerMin` and `numerMax` have the same sign (or numerMin is zero)
    var r1min;
    var r1max;
    var r2min;
    var r2max;
    if (numerMaxAbs * a2 >= 0) {
        // same signs - `r1min >= 0` and `r1max > 0`
        r1min = (numerMinAbs / a2) * (onemin);
        r1max = (numerMaxAbs / a2) * (onemax);
    }
    else {
        // opposite signs - `r1min <= 0` and `r1max < 0`
        r1min = (numerMaxAbs / a2) * (onemax);
        r1max = (numerMinAbs / a2) * (onemin);
    }
    if (numerMaxAbs * c2 > 0) {
        // same signs - `r2min > 0` and `r2Max >= 0`
        r2min = (c2 / numerMaxAbs) * (onemin);
        // `r2max` cannot be a `NaN` since `c2` is > 0
        r2max = (c2 / numerMinAbs) * (onemax); // could be +-inf
    }
    else if (numerMaxAbs * c2 < 0) {
        // opposite signs - `r2min < 0` and `r2Max <= 0`
        // `r2min` cannot be a `NaN` since `c2` is > 0
        r2min = (c2 / numerMinAbs) * (onemax); // could be +-inf 
        r2max = (c2 / numerMaxAbs) * (onemin);
    }
    var rs = [];
    if (r1max < 0 || r1min > 1) {
        // root is outside of range
    }
    else {
        // we return the root interval pairs inline
        // at this stage r1min might be (slightly) < 0 and r1max > 1
        rs.push(r1min < 0 ? 0 : r1min, r1max > 1 ? 1 : r1max);
    }
    // keep TypeScript happy; `r2max` cannot be `undefined` at this point
    if (r2max < 0 || r2min > 1) {
        // root is outside of range
    }
    else {
        // we return the root interval pairs inline
        // at this stage r2min might be (slightly) < 0 and r2max > 1
        // keep TypeScript happy; `r2max` cannot be `undefined` at this point
        rs.push(r2min < 0 ? 0 : r2min, r2max > 1 ? 1 : r2max);
    }
    return rs; // not ordered
}
