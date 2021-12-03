"use strict";
exports.__esModule = true;
exports.splitByCurvatureAndLength = void 0;
var from_to_js_1 = require("./from-to.js");
var length_upper_bound_js_1 = require("../../global-properties/length/length-upper-bound.js");
var flo_vector2d_1 = require("flo-vector2d");
/**
 * Split the order 1, 2 or 3 bezier into pieces (given as an array of parameter
 * (t) values) such that each piece is flat within a given tolerance given by
 * maxFlatness and maxLength.
 *
 * @param ps
 * @param maxFlatness
 * @param maxLength
 *
 * @doc
 */
function splitByCurvatureAndLength(ps, maxFlatness, maxLength) {
    if (maxFlatness === void 0) { maxFlatness = 1.001; }
    if (maxLength === void 0) { maxLength = 10; }
    var ts = [0, 1]; // include endpoints
    var tStack = [[0, 1]];
    var fromTo_ = (0, from_to_js_1.fromTo)(ps);
    while (tStack.length) {
        // Tell TypeScript there *is* something in the stack.
        var ts_ = tStack.pop();
        var ps_ = fromTo_(ts_[0], ts_[1]);
        var l1 = (0, length_upper_bound_js_1.lengthUpperBound)(ps_);
        var l2 = (0, flo_vector2d_1.distanceBetween)(ps_[0], ps_[ps_.length - 1]);
        var flatness_ = 1 + (l1 / l2 - 1) * (l1 / maxLength);
        if (flatness_ > maxFlatness) {
            var t = (ts_[0] + ts_[1]) / 2;
            tStack.push([ts_[0], t]);
            tStack.push([t, ts_[1]]);
            ts.push(t);
        }
    }
    ts.sort(function (a, b) { return a - b; });
    return ts;
}
exports.splitByCurvatureAndLength = splitByCurvatureAndLength;
