"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluateX = void 0;
const flo_poly_1 = require("flo-poly");
const get_x_1 = require("../../to-power-basis/get-x");
function evaluateX(ps, t) {
    const xPs = get_x_1.getX(ps);
    const evPs = flo_poly_1.evaluate(xPs);
    const len = ps.length;
    function f(t) {
        if (t === 0) {
            return ps[0][0];
        }
        if (t === 1) {
            return ps[len - 1][0];
        }
        return evPs(t);
    }
    return t === undefined ? f : f(t); // Curry
}
exports.evaluateX = evaluateX;
//# sourceMappingURL=evaluate-x.js.map