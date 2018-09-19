"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flo_poly_1 = require("flo-poly");
const get_y_1 = require("./get-y");
function evaluateY(ps, t) {
    const yPs = get_y_1.getY(ps); // Speed optimizing cache
    const evPs = flo_poly_1.default.evaluate(yPs);
    function f(t) {
        if (t === 0) {
            return ps[0][1];
        }
        if (t === 1) {
            return ps[3][1];
        }
        return evPs(t);
    }
    return t === undefined ? f : f(t); // Curry
}
exports.evaluateY = evaluateY;

//# sourceMappingURL=evaluate-y.js.map
