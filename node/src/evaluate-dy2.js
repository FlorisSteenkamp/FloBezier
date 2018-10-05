"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flo_poly_1 = require("flo-poly");
const get_dy2_1 = require("./get-dy2");
function evaluateDy2(ps, t) {
    const dPs = get_dy2_1.getDy2(ps); // Speed optimizing cache
    const f = flo_poly_1.default.evaluate(dPs);
    return t === undefined ? f : f(t); // Curry
}
exports.evaluateDy2 = evaluateDy2;

//# sourceMappingURL=evaluate-dy2.js.map
