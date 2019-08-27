"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_ddy_1 = require("./get-ddy");
const flo_poly_1 = require("flo-poly");
function evaluateDdy(ps, t) {
    const ddPs = get_ddy_1.getDdy(ps); // Speed optimizing cache
    const f = flo_poly_1.evaluate(ddPs);
    return t === undefined ? f : f(t); // Curry
}
exports.evaluateDdy = evaluateDdy;
//# sourceMappingURL=evaluate-ddy.js.map