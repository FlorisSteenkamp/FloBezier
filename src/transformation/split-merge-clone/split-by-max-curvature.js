"use strict";
exports.__esModule = true;
exports.splitByMaxCurvature = void 0;
var from_to_js_1 = require("./from-to.js");
var flatness_js_1 = require("../../global-properties/flatness.js");
/**
 * Split the order 1, 2 or 3 bezier into pieces (given as an array of parameter
 * (t) values) such that each piece is flat within a given tolerance given by
 * the flatness function.
 *
 * @param ps
 * @param tolerance maximum tolerance (must be > 1) for flatness measure.
 *
 * @doc
 */
function splitByMaxCurvature(ps, tolerance) {
    if (tolerance === void 0) { tolerance = 1.1; }
    var ts = [0, 1]; // include endpoints
    var tStack = [[0, 1]];
    var fromTo_ = (0, from_to_js_1.fromTo)(ps);
    while (tStack.length) {
        var ts_ = tStack.pop();
        var ps_ = fromTo_(ts_[0], ts_[1]);
        //lengthUpperBound(ps) / distanceBetween(ps[0], ps[ps.length-1])
        if ((0, flatness_js_1.flatness)(ps_) > tolerance) {
            var t = (ts_[0] + ts_[1]) / 2;
            tStack.push([ts_[0], t]);
            tStack.push([t, ts_[1]]);
            ts.push(t);
        }
    }
    ts.sort(function (a, b) { return a - b; });
    return ts;
}
exports.splitByMaxCurvature = splitByMaxCurvature;
