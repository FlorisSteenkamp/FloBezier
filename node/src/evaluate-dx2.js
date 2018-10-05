"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flo_poly_1 = require("flo-poly");
const get_dx2_1 = require("./get-dx2");
function evaluateDx2(ps, t) {
    const dPs = get_dx2_1.getDx2(ps); // Speed optimizing cache
    const f = flo_poly_1.default.evaluate(dPs);
    return t === undefined ? f : f(t); // Curry
}
exports.evaluateDx2 = evaluateDx2;

//# sourceMappingURL=evaluate-dx2.js.map
