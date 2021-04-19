"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluateDdxy = void 0;
const get_ddxy_1 = require("../../to-power-basis/get-ddxy");
const flo_poly_1 = require("flo-poly");
function evaluateDdxy(ps, t) {
    const [ddPsX, ddPsY] = get_ddxy_1.getDdxy(ps);
    const f = (t) => [flo_poly_1.Horner(ddPsX, t), flo_poly_1.Horner(ddPsY, t)];
    return t === undefined ? f : f(t); // Curry
}
exports.evaluateDdxy = evaluateDdxy;
//# sourceMappingURL=evaluate-ddxy.js.map