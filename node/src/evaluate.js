"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const evaluate_x_1 = require("./evaluate-x");
const evaluate_y_1 = require("./evaluate-y");
function evaluate(ps, t) {
    const [[x0, y0], , , [x3, y3]] = ps;
    const evX = evaluate_x_1.evaluateX(ps);
    const evY = evaluate_y_1.evaluateY(ps);
    function f(t) {
        if (t === 0) {
            return [x0, y0];
        }
        else if (t === 1) {
            return [x3, y3];
        }
        return [evX(t), evY(t)];
    }
    return t === undefined ? f : f(t);
}
exports.evaluate = evaluate;
//# sourceMappingURL=evaluate.js.map