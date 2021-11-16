"use strict";
exports.__esModule = true;
exports.toEstimation = void 0;
var big_float_ts_1 = require("big-float-ts");
var estimate = big_float_ts_1.eEstimate;
function toEstimation(ps) {
    return ps.map(function (p) { return p.map(function (c) { return estimate(c); }); });
}
exports.toEstimation = toEstimation;
