"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ds = void 0;
const get_dxy_1 = require("../to-power-basis/get-dxy");
const flo_poly_1 = require("flo-poly");
function ds(ps, t) {
    const [dX, dY] = get_dxy_1.getDxy(ps);
    function f(t) {
        let dx = flo_poly_1.Horner(dX, t);
        let dy = flo_poly_1.Horner(dY, t);
        return Math.sqrt(dx * dx + dy * dy);
    }
    // Curry
    return t === undefined ? f : f(t);
}
exports.ds = ds;
//# sourceMappingURL=ds.js.map