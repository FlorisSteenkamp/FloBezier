"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluateDxy = void 0;
const flo_poly_1 = require("flo-poly");
const get_dxy_1 = require("../../to-power-basis/get-dxy");
function evaluateDxy(ps, t) {
    const [dX, dY] = get_dxy_1.getDxy(ps);
    const f = (t) => [flo_poly_1.Horner(dX, t), flo_poly_1.Horner(dY, t)];
    return t === undefined ? f : f(t); // Curry
}
exports.evaluateDxy = evaluateDxy;
//# sourceMappingURL=evaluate-dxy.js.map