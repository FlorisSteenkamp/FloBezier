"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDistanceToLineFunction = void 0;
/**
 * @private
 * @param l
 */
function getDistanceToLineFunction(l) {
    let [a, b, c] = getLineEquation(l);
    return function (p) {
        return a * p[0] + b * p[1] + c;
    };
}
exports.getDistanceToLineFunction = getDistanceToLineFunction;
/**
 * Get the implicit line equation from two 2d points in the form f(x,y) := ax + by + c = 0
 * returned as the array [a,b,c].
 * @param l A line given by two points, e.g. [[2,0],[3,3]]
 */
function getLineEquation(l) {
    let [[x1, y1], [x2, y2]] = l;
    let a = y1 - y2;
    let b = x2 - x1;
    let c = x1 * y2 - x2 * y1;
    let d = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
    return [a / d, b / d, c / d];
}
//# sourceMappingURL=get-distance-to-line-function.js.map