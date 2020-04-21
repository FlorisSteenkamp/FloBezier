"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_x_1 = require("../../../to-power-basis/get-x");
const get_y_1 = require("../../../to-power-basis/get-y");
const flo_numerical_1 = require("flo-numerical");
/**
 * Returns the self-intersection poly to solve of the given cubic bezier curve.
 * see http://www.mare.ee/indrek/misc/2d.pdf
 * @param ps An order 3 bezier curve.
 */
function getCoeffs3Exact(ps) {
    let [a3, a2, a1] = get_x_1.getXExact(ps);
    let [b3, b2, b1] = get_y_1.getYExact(ps);
    //let u2 = -2*a2*a3*b2*b3 + a2*a2*b3*b3 + a3*a3*b2*b2
    let u2 = flo_numerical_1.calculate([
        [[-2], a2, a3, b2, b3], [a2, a2, b3, b3], [a3, a3, b2, b2]
    ]);
    //let u1 = -a1*a3*b2*b3 - a2*a3*b1*b3 + a1*a2*b3*b3 + b1*b2*a3*a3
    let u1 = flo_numerical_1.calculate([
        [[-1], a1, a3, b2, b3], [[-1], a2, a3, b1, b3], [a1, a2, b3, b3], [b1, b2, a3, a3]
    ]);
    //let u0 = -a1*a2*b2*b3 - a2*a3*b1*b2 - 2*a1*a3*b1*b3 + a1*a1*b3*b3 + a3*a3*b1*b1 + a1*a3*b2*b2 + b1*b3*a2*a2
    let u0 = flo_numerical_1.calculate([
        [[-1], a1, a2, b2, b3], [[-1], a2, a3, b1, b2], [[-2], a1, a3, b1, b3],
        [a1, a1, b3, b3], [a3, a3, b1, b1], [a1, a3, b2, b2],
        [b1, b3, a2, a2]
    ]);
    // Solve: u2*t**2 + u1*t + u0 = 0
    return [u2, u1, u0];
}
exports.getCoeffs3Exact = getCoeffs3Exact;
//# sourceMappingURL=get-coeffs-3.js.map