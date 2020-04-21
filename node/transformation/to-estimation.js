"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flo_numerical_1 = require("flo-numerical");
function toEstimation(ps) {
    return ps.map(p => p.map(c => flo_numerical_1.estimate(c)));
}
exports.toEstimation = toEstimation;
//# sourceMappingURL=to-estimation.js.map