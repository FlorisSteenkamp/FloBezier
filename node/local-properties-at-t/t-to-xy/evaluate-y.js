"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluateY = void 0;
const flo_poly_1 = require("flo-poly");
const get_y_1 = require("../../to-power-basis/get-y");
function evaluateY(ps, t) {
    const yPs = get_y_1.getY(ps);
    const evPs = flo_poly_1.evaluate(yPs);
    const len = ps.length;
    function f(t) {
        if (t === 0) {
            return ps[0][1];
        }
        if (t === 1) {
            return ps[len - 1][1];
        }
        return evPs(t);
    }
    return t === undefined ? f : f(t); // Curry
}
exports.evaluateY = evaluateY;
//# sourceMappingURL=evaluate-y.js.map