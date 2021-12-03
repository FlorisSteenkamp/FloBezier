"use strict";
exports.__esModule = true;
exports.splitByMaxCurveLength = void 0;
var length_upper_bound_js_1 = require("../../global-properties/length/length-upper-bound.js");
var from_to_js_1 = require("./from-to.js");
/**
 * Split the order 1, 2 or 3 bezier into pieces (given as an array of parameter
 * (t) values) such that the longest curve length is guaranteed to be lower than
 * the given max length.
 *
 * @param ps
 * @param maxLength
 *
 * @doc
 */
function splitByMaxCurveLength(ps, maxLength) {
    var ts = [0, 1]; // include endpoints
    var tStack = [[0, 1]];
    var fromTo_ = (0, from_to_js_1.fromTo)(ps);
    while (tStack.length) {
        var ts_ = tStack.pop();
        var ps_ = fromTo_(ts_[0], ts_[1]);
        if ((0, length_upper_bound_js_1.lengthUpperBound)(ps_) > maxLength) {
            var t = (ts_[0] + ts_[1]) / 2;
            tStack.push([ts_[0], t]);
            tStack.push([t, ts_[1]]);
            ts.push(t);
        }
    }
    ts.sort(function (a, b) { return a - b; });
    return ts;
}
exports.splitByMaxCurveLength = splitByMaxCurveLength;
