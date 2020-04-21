"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const evaluate_dx_1 = require("./t-to-dxy/evaluate-dx");
const evaluate_dy_1 = require("./t-to-dxy/evaluate-dy");
function ds(ps, t) {
    const evDx = evaluate_dx_1.evaluateDx(ps);
    const evDy = evaluate_dy_1.evaluateDy(ps);
    function f(t) {
        let dx = evDx(t);
        let dy = evDy(t);
        return Math.sqrt(dx * dx + dy * dy);
    }
    // Curry
    return t === undefined ? f : f(t);
}
exports.ds = ds;
//# sourceMappingURL=ds.js.map