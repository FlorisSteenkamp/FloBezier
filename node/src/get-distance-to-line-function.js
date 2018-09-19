"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_line_equation_1 = require("./get-line-equation");
/**
 * @private
 * @param l
 */
function getDistanceToLineFunction(l) {
    let [a, b, c] = get_line_equation_1.getLineEquation(l);
    return function (p) {
        return a * p[0] + b * p[1] + c;
    };
}
exports.getDistanceToLineFunction = getDistanceToLineFunction;

//# sourceMappingURL=get-distance-to-line-function.js.map
