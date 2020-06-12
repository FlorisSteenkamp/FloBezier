"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCoeffsLinearExact = exports.getCoeffsQuadraticExact = exports.getCoeffsCubicExact = void 0;
const get_x_1 = require("../../../to-power-basis/get-x");
const get_y_1 = require("../../../to-power-basis/get-y");
const flo_numerical_1 = require("flo-numerical");
/**
 *
 * @param circle a circle
 * @param ps a cubic bezier curve
 */
function getCoeffsCubicExact(circle, ps) {
    let { radius: r, center: c } = circle;
    let [cx, cy] = c;
    let [a3, a2, a1, a0] = get_x_1.getXExact(ps);
    let [b3, b2, b1, b0] = get_y_1.getYExact(ps);
    // (a3**2 + b3**2)*t**6 + 
    let t6 = flo_numerical_1.calculate([
        [a3, a3],
        [b3, b3]
    ]);
    // (2*a2*a3 + 2*b2*b3)*t**5 + 
    let t5 = flo_numerical_1.scaleExpansion(flo_numerical_1.calculate([
        [a2, a3],
        [b2, b3]
    ]), 2);
    // (2*a1*a3 + a2**2 + 2*b1*b3 + b2**2)*t**4 + 
    let t4 = flo_numerical_1.calculate([
        [[2], a1, a3], [a2, a2], [[2], b1, b3], [b2, b2]
    ]);
    // (2*a0*a3 + 2*a1*a2 - 2*a3*cx + 2*b0*b3 + 2*b1*b2 - 2*b3*cy)*t**3 + 
    let t3 = flo_numerical_1.scaleExpansion(flo_numerical_1.calculate([
        [a0, a3], [a1, a2], [[-1], a3, [cx]], [b0, b3], [b1, b2], [[-1], b3, [cy]]
    ]), 2);
    // (2*a0*a2 + a1**2 - 2*a2*cx + 2*b0*b2 + b1**2 - 2*b2*cy)*t**2 + 
    let t2 = flo_numerical_1.calculate([
        [[2], a0, a2], [a1, a1], [[-2], a2, [cx]], [[2], b0, b2], [b1, b1], [[-2], b2, [cy]]
    ]);
    // (2*a0*a1 - 2*a1*cx + 2*b0*b1 - 2*b1*cy)*t + 
    let t1 = flo_numerical_1.scaleExpansion(flo_numerical_1.calculate([
        [a0, a1], [[-1], a1, [cx]], [b0, b1], [[-1], b1, [cy]]
    ]), 2);
    // a0**2 - 2*a0*cx + b0**2 - 2*b0*cy + cx**2 + cy**2 - r**2
    let t0 = flo_numerical_1.calculate([
        [a0, a0], [[-2], a0, [cx]], [b0, b0], [[-2], b0, [cy]],
        [flo_numerical_1.twoProduct(cx, cx)], [flo_numerical_1.twoProduct(cy, cy)], [flo_numerical_1.twoProduct(-r, r)]
    ]);
    return [t6, t5, t4, t3, t2, t1, t0];
}
exports.getCoeffsCubicExact = getCoeffsCubicExact;
/**
 *
 * @param circle a circle
 * @param ps a quadratic bezier curve
 */
function getCoeffsQuadraticExact(circle, ps) {
    let { radius: r, center: c } = circle;
    let [cx, cy] = c;
    let [a2, a1, a0] = get_x_1.getXExact(ps);
    let [b2, b1, b0] = get_y_1.getYExact(ps);
    // (a2**2 + b2**2)*t**4 + 
    let t4 = flo_numerical_1.calculate([
        [a2, a2],
        [b2, b2]
    ]);
    // (2*a1*a2 + 2*b1*b2)*t**3 + 
    let t3 = flo_numerical_1.scaleExpansion(flo_numerical_1.calculate([
        [a1, a2],
        [b1, b2]
    ]), 2);
    // (2*a0*a2 + a1**2 - 2*a2*cx + 2*b0*b2 + b1**2 - 2*b2*cy)*t**2 + 
    let t2 = flo_numerical_1.calculate([
        [[2], a0, a2], [a1, a1], [[-2], a2, [cx]], [[2], b0, b2], [b1, b1], [[-2], b2, [cy]]
    ]);
    // (2*a0*a1 - 2*a1*cx + 2*b0*b1 - 2*b1*cy)*t + 
    let t1 = flo_numerical_1.scaleExpansion(flo_numerical_1.calculate([
        [a0, a1], [[-1], a1, [cx]], [b0, b1], [[-1], b1, [cy]]
    ]), 2);
    // a0**2 - 2*a0*cx + b0**2 - 2*b0*cy + cx**2 + cy**2 - r**2
    let t0 = flo_numerical_1.calculate([
        [a0, a0], [[-2], a0, [cx]], [b0, b0], [[-2], b0, [cy]],
        [flo_numerical_1.twoProduct(cx, cx)], [flo_numerical_1.twoProduct(cy, cy)], [flo_numerical_1.twoProduct(-r, r)]
    ]);
    return [t4, t3, t2, t1, t0];
}
exports.getCoeffsQuadraticExact = getCoeffsQuadraticExact;
/**
 *
 * @param circle a circle
 * @param ps a linear bezier curve
 */
function getCoeffsLinearExact(circle, ps) {
    let { radius: r, center: c } = circle;
    let [cx, cy] = c;
    let [a1, a0] = get_x_1.getXExact(ps);
    let [b1, b0] = get_y_1.getYExact(ps);
    // (a1**2 + b1**2)*t**2 +
    let t2 = flo_numerical_1.calculate([
        [a1, a1],
        [b1, b1]
    ]);
    // (2*a0*a1 - 2*a1*cx + 2*b0*b1 - 2*b1*cy)*t + 
    let t1 = flo_numerical_1.scaleExpansion(flo_numerical_1.calculate([
        [a0, a1], [[-1], a1, [cx]], [b0, b1], [[-1], b1, [cy]]
    ]), 2);
    // a0**2 - 2*a0*cx + b0**2 - 2*b0*cy + cx**2 + cy**2 - r**2
    let t0 = flo_numerical_1.calculate([
        [a0, a0], [[-2], a0, [cx]], [b0, b0], [[-2], b0, [cy]],
        [flo_numerical_1.twoProduct(cx, cx)], [flo_numerical_1.twoProduct(cy, cy)], [flo_numerical_1.twoProduct(-r, r)]
    ]);
    return [t2, t1, t0];
}
exports.getCoeffsLinearExact = getCoeffsLinearExact;
//# sourceMappingURL=get-coeffs-exact.js.map