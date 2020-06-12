"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tangent = void 0;
const evaluate_dx_1 = require("./t-to-dxy/evaluate-dx");
const evaluate_dy_1 = require("./t-to-dxy/evaluate-dy");
function tangent(ps, t) {
    const evDx = evaluate_dx_1.evaluateDx(ps);
    const evDy = evaluate_dy_1.evaluateDy(ps);
    function f(t) {
        return [evDx(t), evDy(t)];
    }
    // Curry
    return t === undefined ? f : f(t);
}
exports.tangent = tangent;
//# sourceMappingURL=tangent.js.map