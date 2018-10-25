"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flo_poly_1 = require("flo-poly");
const get_x_1 = require("./get-x");
function evaluateX(ps, t) {
    const xPs = get_x_1.getX(ps); // Speed optimizing cache
    const evPs = flo_poly_1.default.evaluate(xPs);
    function f(t) {
        if (t === 0) {
            return ps[0][0];
        }
        if (t === 1) {
            return ps[3][0];
        }
        return evPs(t);
    }
    return t === undefined ? f : f(t); // Curry
}
exports.evaluateX = evaluateX;
//# sourceMappingURL=evaluate-x.js.map