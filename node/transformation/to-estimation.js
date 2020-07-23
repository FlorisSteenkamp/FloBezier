"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toEstimation = void 0;
const big_float_ts_1 = require("big-float-ts");
const estimate = big_float_ts_1.eEstimate;
function toEstimation(ps) {
    return ps.map(p => p.map(c => estimate(c)));
}
exports.toEstimation = toEstimation;
//# sourceMappingURL=to-estimation.js.map