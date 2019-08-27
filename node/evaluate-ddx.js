"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_ddx_1 = require("./get-ddx");
const flo_poly_1 = require("flo-poly");
function evaluateDdx(ps, t) {
    const ddPs = get_ddx_1.getDdx(ps); // Speed optimizing cache
    const f = flo_poly_1.evaluate(ddPs);
    return t === undefined ? f : f(t); // Curry
}
exports.evaluateDdx = evaluateDdx;
//# sourceMappingURL=evaluate-ddx.js.map