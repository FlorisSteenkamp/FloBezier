"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const evaluate_dx_1 = require("./evaluate-dx");
const evaluate_dy_1 = require("./evaluate-dy");
function tangent(ps, t) {
    const evDx = evaluate_dx_1.evaluateDx(ps);
    const evDy = evaluate_dy_1.evaluateDy(ps);
    function f(t) {
        let dx = evDx(t);
        let dy = evDy(t);
        let d = Math.sqrt(dx * dx + dy * dy);
        return [dx / d, dy / d];
    }
    // Curry
    return t === undefined ? f : f(t);
}
exports.tangent = tangent;

//# sourceMappingURL=tangent.js.map
