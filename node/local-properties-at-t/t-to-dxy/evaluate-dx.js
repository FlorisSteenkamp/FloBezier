"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluateDx = void 0;
const flo_poly_1 = require("flo-poly");
const get_dx_1 = require("../../to-power-basis/get-dx");
function evaluateDx(ps, t) {
    const dPs = get_dx_1.getDx(ps);
    const f = flo_poly_1.evaluate(dPs);
    return t === undefined ? f : f(t); // Curry
}
exports.evaluateDx = evaluateDx;
//# sourceMappingURL=evaluate-dx.js.map