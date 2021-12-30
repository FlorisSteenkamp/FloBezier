"use strict";
exports.__esModule = true;
exports.closestPointOnBezierCertified = void 0;
var get_closest_on_bezier3_from_point_dd_js_1 = require("./get-coeffs/double-double/get-closest-on-bezier3-from-point-dd.js");
var get_closest_on_bezier2_from_point_dd_js_1 = require("./get-coeffs/double-double/get-closest-on-bezier2-from-point-dd.js");
var get_closest_on_bezier1_from_point_dd_js_1 = require("./get-coeffs/double-double/get-closest-on-bezier1-from-point-dd.js");
var get_closest_on_bezier_from_point_exact_js_1 = require("./get-coeffs/exact/get-closest-on-bezier-from-point-exact.js");
var get_closest_on_bezier_from_point_exact_js_2 = require("./get-coeffs/exact/get-closest-on-bezier-from-point-exact.js");
var get_closest_on_bezier_from_point_exact_js_3 = require("./get-coeffs/exact/get-closest-on-bezier-from-point-exact.js");
var get_closest_on_bezier_from_point_error_counters_js_1 = require("./get-coeffs/get-closest-on-bezier-from-point-error-counters.js");
var get_closest_on_bezier_from_point_error_counters_js_2 = require("./get-coeffs/get-closest-on-bezier-from-point-error-counters.js");
var get_closest_on_bezier_from_point_error_counters_js_3 = require("./get-coeffs/get-closest-on-bezier-from-point-error-counters.js");
var flo_poly_1 = require("flo-poly");
var get_interval_box_js_1 = require("../../global-properties/bounds/get-interval-box/get-interval-box.js");
var error_analysis_js_1 = require("../../error-analysis/error-analysis.js");
var big_float_ts_1 = require("big-float-ts");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
var estimate = big_float_ts_1.eEstimate;
var td = big_float_ts_1.twoDiff;
var emult = big_float_ts_1.eMult;
var eadd = big_float_ts_1.eAdd;
var eps = Number.EPSILON;
var γγ6 = (0, error_analysis_js_1.γγ)(6);
/**
 * Returns the closest point(s) (and parameter `t` value(s)) on the given
 * bezier curve to the given point.
 *
 * * guaranteed accurate to 4 ulps in `t` value
 *
 * @param ps
 * @param p
 *
 * @doc
 */
function closestPointOnBezierCertified(ps, p) {
    var order = ps.length - 1;
    var ris;
    if (order === 3) {
        // keep TypeScript happy; `ris` cannot be `undefined` here
        ris = (0, flo_poly_1.allRootsCertified)((0, get_closest_on_bezier3_from_point_dd_js_1.getClosestOnBezier3FromPointDd)(ps, p), 0, 1, (0, get_closest_on_bezier_from_point_error_counters_js_3.getClosestOnBezier3FromPointErrorCounters)(ps, p).map(function (e) { return 10 * γγ6 * e; }), function () { return (0, get_closest_on_bezier_from_point_exact_js_1.getClosestOnBezier3FromPointExact)(ps, p); });
    }
    else if (order === 2) {
        // keep TypeScript happy; `ris` cannot be `undefined` here
        ris = (0, flo_poly_1.allRootsCertified)((0, get_closest_on_bezier2_from_point_dd_js_1.getClosestOnBezier2FromPointDd)(ps, p), 0, 1, (0, get_closest_on_bezier_from_point_error_counters_js_2.getClosestOnBezier2FromPointErrorCounters)(ps, p).map(function (e) { return 8 * γγ6 * e; }), function () { return (0, get_closest_on_bezier_from_point_exact_js_2.getClosestOnBezier2FromPointExact)(ps, p); });
    }
    else if (order === 1) {
        // keep TypeScript happy; `ris` cannot be `undefined` here
        ris = (0, flo_poly_1.allRootsCertified)((0, get_closest_on_bezier1_from_point_dd_js_1.getClosestOnBezier1FromPointDd)(ps, p), 0, 1, (0, get_closest_on_bezier_from_point_error_counters_js_1.getClosestOnBezier1FromPointErrorCounters)(ps, p).map(function (e) { return 6 * γγ6 * e; }), function () { return (0, get_closest_on_bezier_from_point_exact_js_3.getClosestOnBezier1FromPointExact)(ps, p); });
    }
    else if (order === 0) {
        ris = [];
    }
    else {
        throw new Error('The given bezier curve is invalid.');
    }
    ris.push({ tS: 0, tE: 0, multiplicity: 1 });
    ris.push({ tS: 1, tE: 1, multiplicity: 1 });
    var infos = ris.map(function (ri) {
        var intervalBox = (0, get_interval_box_js_1.getIntervalBox)(ps, [ri.tS, ri.tE]);
        return {
            di: rootIntervalToDistanceInterval(intervalBox, p),
            intervalBox: intervalBox,
            ri: ri
        };
    });
    /** the minimum max interval value */
    var minMax = Number.POSITIVE_INFINITY;
    for (var i = 0; i < infos.length; i++) {
        var diMax = infos[i].di[1];
        if (diMax < minMax) {
            minMax = diMax;
        }
    }
    var closestPointInfos = [];
    for (var i = 0; i < infos.length; i++) {
        var info = infos[i];
        if (info.di[0] <= minMax) {
            closestPointInfos.push(info);
        }
    }
    return closestPointInfos;
}
exports.closestPointOnBezierCertified = closestPointOnBezierCertified;
/**
 * Returns the distance interval from the given root interval (currently
 * ignoring multiplicity)
 *
 * @param ps1 the first bezier
 * @param ps2 the second bezier
 * @param ts2 the `t` values of the second bezier
 */
function rootIntervalToDistanceInterval(intervalBox, p) {
    var bl = intervalBox[0];
    var tr = intervalBox[1];
    var minX = bl[0];
    var minY = bl[1];
    var maxX = tr[0];
    var maxY = tr[1];
    var x = p[0]; // <0>
    var y = p[1]; // <0>
    var minD = Number.POSITIVE_INFINITY;
    var maxD = Number.NEGATIVE_INFINITY;
    // for each corner of the interval box
    for (var _i = 0, _a = [[minX, minY], [minX, maxY], [maxX, minY], [maxX, maxY]]; _i < _a.length; _i++) {
        var _b = _a[_i], a = _b[0], b = _b[1];
        /*
        // distance to 1st corner of interval box - `distance² = x² + y²`
        const dc1 = (a - x)**2 + (b - y)**2;
        // max absolute roundoff error of `dc1`
        // <4>dc1 <-- <4>(<3>(<1>(a - x)**2) + <3>(<1>((b - y)**2))
        const dc1E = 4*γ1*((a + x)**2 + (b + y)**2);
        const dc1Min = dc1 - dc1E;  // distance minus max error
        const dc1Max = dc1 + dc1E;  // distance plus max error
        */
        /** distance to 1st corner of interval box - `distance² = x² + y²` */
        var ax = td(a, x);
        var by = td(b, y);
        var dc1Exact = eadd(emult(ax, ax), emult(by, by));
        var dc1 = estimate(dc1Exact);
        var dc1Min = dc1 * (1 - eps); // distance minus max error
        var dc1Max = dc1 * (1 + eps); // distance plus max error
        if (dc1Min <= minD) {
            minD = dc1Min;
        }
        if (dc1Max >= maxD) {
            maxD = dc1Max;
        }
    }
    return [minD, maxD];
}
