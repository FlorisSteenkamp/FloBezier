"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normal = void 0;
const get_dxy_1 = require("../to-power-basis/get-dxy");
const flo_poly_1 = require("flo-poly");
function normal(ps, t) {
    const [dX, dY] = get_dxy_1.getDxy(ps);
    function f(t) {
        return [
            flo_poly_1.Horner(dY, t),
            -flo_poly_1.Horner(dX, t)
        ];
    }
    // Curry
    return t === undefined ? f : f(t);
}
exports.normal = normal;
//# sourceMappingURL=normal.js.map