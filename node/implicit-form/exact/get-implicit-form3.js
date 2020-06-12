"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImplicitForm3Exact = void 0;
const get_x_1 = require("../../to-power-basis/get-x");
const get_y_1 = require("../../to-power-basis/get-y");
const flo_numerical_1 = require("flo-numerical");
/**
 * Returns the exact implicit form of the given cubic bezier.
 * Taken from http://www.mare.ee/indrek/misc/2d.pdf
 * @param ps
 */
function getImplicitForm3Exact(ps) {
    // The implicit form is given by:
    // vₓₓₓx³ + vₓₓᵧx²y + vₓᵧᵧxy² + vᵧᵧᵧy³ + vₓₓx² +vₓᵧxy + vᵧᵧy² + vₓx + vᵧy + v = 0
    let [a3, a2, a1, a0] = get_x_1.getXExact(ps);
    let [b3, b2, b1, b0] = get_y_1.getYExact(ps);
    // let vₓₓₓ = b3*b3*b3;
    let vₓₓₓ = flo_numerical_1.calculateProduct([b3, b3, b3]);
    // let vₓₓᵧ = -3*a3*b3*b3;
    let vₓₓᵧ = flo_numerical_1.calculateProduct([[-3], a3, b3, b3]);
    // let vₓᵧᵧ = 3*b3*a3*a3;
    let vₓᵧᵧ = flo_numerical_1.calculateProduct([[3], b3, a3, a3]);
    // let vᵧᵧᵧ = -a3*a3*a3;
    let vᵧᵧᵧ = flo_numerical_1.negativeOf(flo_numerical_1.calculateProduct([a3, a3, a3]));
    // let vₓₓ = -3*a3*b1*b2*b3 + a1*b2*b3*b3 - a2*b3*b2*b2 + 2*a2*b1*b3*b3 + 
    //           3*a3*b0*b3*b3 + a3*b2*b2*b2 - 3*a0*b3*b3*b3;
    let vₓₓ = flo_numerical_1.calculate([
        [[-3], a3, b1, b2, b3], [a1, b2, b3, b3], [[-1], a2, b3, b2, b2],
        [[2], a2, b1, b3, b3], [[3], a3, b0, b3, b3], [a3, b2, b2, b2],
        [[-3], a0, b3, b3, b3]
    ]);
    // let vₓᵧ = a1*a3*b2*b3 - a2*a3*b1*b3 - 6*b0*b3*a3*a3 - 3*a1*a2*b3*b3 - 
    //           2*a2*a3*b2*b2 + 2*b2*b3*a2*a2 + 3*b1*b2*a3*a3 + 6*a0*a3*b3*b3;
    let vₓᵧ = flo_numerical_1.calculate([
        [a1, a3, b2, b3], [[-1], a2, a3, b1, b3], [[-6], b0, b3, a3, a3],
        [[-3], a1, a2, b3, b3], [[-2], a2, a3, b2, b2], [[2], b2, b3, a2, a2],
        [[3], b1, b2, a3, a3], [[6], a0, a3, b3, b3]
    ]);
    // let vᵧᵧ = 3*a1*a2*a3*b3 + a3*b2*a2*a2 - a2*b1*a3*a3 - 3*a0*b3*a3*a3 - 
    //           2*a1*b2*a3*a3 - b3*a2*a2*a2 + 3*b0*a3*a3*a3;
    let vᵧᵧ = flo_numerical_1.calculate([
        [[3], a1, a2, a3, b3], [a3, b2, a2, a2], [[-1], a2, b1, a3, a3],
        [[-3], a0, b3, a3, a3], [[-2], a1, b2, a3, a3], [[-1], b3, a2, a2, a2],
        [[3], b0, a3, a3, a3]
    ]);
    // let vₓ = a2*a3*b0*b1*b3 - a1*a2*b1*b2*b3 - a1*a3*b0*b2*b3 + 
    //          6*a0*a3*b1*b2*b3 + b1*a1*a1*b3*b3 + b3*a2*a2*b1*b1 + 
    //          3*b3*a3*a3*b0*b0 + a1*a3*b1*b2*b2 - a2*a3*b2*b1*b1 - 
    //          6*a0*a3*b0*b3*b3 - 4*a0*a2*b1*b3*b3 - 3*b0*b1*b2*a3*a3 -
    //          2*a0*a1*b2*b3*b3 - 2*a1*a3*b3*b1*b1 - 2*b0*b2*b3*a2*a2 + 
    //          2*a0*a2*b3*b2*b2 + 2*a2*a3*b0*b2*b2 + 3*a1*a2*b0*b3*b3 + 
    //          a3*a3*b1*b1*b1 + 3*a0*a0*b3*b3*b3 - 2*a0*a3*b2*b2*b2;
    let vₓ = flo_numerical_1.calculate([
        [a2, a3, b0, b1, b3], [[-1], a1, a2, b1, b2, b3], [[-1], a1, a3, b0, b2, b3],
        [[6], a0, a3, b1, b2, b3], [b1, a1, a1, b3, b3], [b3, a2, a2, b1, b1],
        [[3], b3, a3, a3, b0, b0], [a1, a3, b1, b2, b2], [[-1], a2, a3, b2, b1, b1],
        [[-6], a0, a3, b0, b3, b3], [[-4], a0, a2, b1, b3, b3], [[-3], b0, b1, b2, a3, a3],
        [[-2], a0, a1, b2, b3, b3], [[-2], a1, a3, b3, b1, b1], [[-2], b0, b2, b3, a2, a2],
        [[2], a0, a2, b3, b2, b2], [[2], a2, a3, b0, b2, b2], [[3], a1, a2, b0, b3, b3],
        [a3, a3, b1, b1, b1], [[3], a0, a0, b3, b3, b3], [[-2], a0, a3, b2, b2, b2]
    ]);
    // let vᵧ = a0*a2*a3*b1*b3 + a1*a2*a3*b1*b2 - a0*a1*a3*b2*b3 - 
    //          6*a1*a2*a3*b0*b3 - a1*a1*a1*b3*b3 - 3*a3*a3*a3*b0*b0 - 
    //          a1*a3*a3*b1*b1 - a3*a1*a1*b2*b2 - 3*a3*a0*a0*b3*b3 + 
    //          a2*b2*b3*a1*a1 - a1*b1*b3*a2*a2 - 3*a0*b1*b2*a3*a3 - 
    //          2*a0*b2*b3*a2*a2 - 2*a3*b0*b2*a2*a2 + 2*a0*a2*a3*b2*b2 + 
    //          2*a2*b0*b1*a3*a3 + 2*a3*b1*b3*a1*a1 + 3*a0*a1*a2*b3*b3 + 
    //          4*a1*b0*b2*a3*a3 + 6*a0*b0*b3*a3*a3 + 2*b0*b3*a2*a2*a2;
    let vᵧ = flo_numerical_1.calculate([
        [a0, a2, a3, b1, b3], [a1, a2, a3, b1, b2], [[-1], a0, a1, a3, b2, b3],
        [[-6], a1, a2, a3, b0, b3], [[-1], a1, a1, a1, b3, b3], [[-3], a3, a3, a3, b0, b0],
        [[-1], a1, a3, a3, b1, b1], [[-1], a3, a1, a1, b2, b2], [[-3], a3, a0, a0, b3, b3],
        [a2, b2, b3, a1, a1], [[-1], a1, b1, b3, a2, a2], [[-3], a0, b1, b2, a3, a3],
        [[-2], a0, b2, b3, a2, a2], [[-2], a3, b0, b2, a2, a2], [[2], a0, a2, a3, b2, b2],
        [[2], a2, b0, b1, a3, a3], [[2], a3, b1, b3, a1, a1], [[3], a0, a1, a2, b3, b3],
        [[4], a1, b0, b2, a3, a3], [[6], a0, b0, b3, a3, a3], [[2], b0, b3, a2, a2, a2]
    ]);
    // let v = a0*a1*a2*b1*b2*b3 + a0*a1*a3*b0*b2*b3 - a0*a2*a3*b0*b1*b3 - 
    //          a1*a2*a3*b0*b1*b2 + b0*a1*a1*a1*b3*b3 - b3*a2*a2*a2*b0*b0 + 
    //          a1*b0*a3*a3*b1*b1 + a1*b2*a0*a0*b3*b3 + a3*b0*a1*a1*b2*b2 + 
    //          a3*b2*a2*a2*b0*b0 - a0*b1*a1*a1*b3*b3 - a0*b3*a2*a2*b1*b1 - 
    //          a2*b1*a3*a3*b0*b0 - a2*b3*a0*a0*b2*b2 - 3*a0*b3*a3*a3*b0*b0 - 
    //          2*a1*b2*a3*a3*b0*b0 + 2*a2*b1*a0*a0*b3*b3 + 3*a3*b0*a0*a0*b3*b3 + 
    //          a0*a2*a3*b2*b1*b1 + a1*b0*b1*b3*a2*a2 - a0*a1*a3*b1*b2*b2 - 
    //          a2*b0*b2*b3*a1*a1 - 3*a0*a1*a2*b0*b3*b3 - 3*a3*b1*b2*b3*a0*a0 - 
    //          2*a0*a2*a3*b0*b2*b2 - 2*a3*b0*b1*b3*a1*a1 + 2*a0*a1*a3*b3*b1*b1 + 
    //          2*a0*b0*b2*b3*a2*a2 + 3*a0*b0*b1*b2*a3*a3 + 3*a1*a2*a3*b3*b0*b0 + 
    //          a3*a3*a3*b0*b0*b0 - a0*a0*a0*b3*b3*b3 + a3*a0*a0*b2*b2*b2 - 
    //          a0*a3*a3*b1*b1*b1;
    let v = flo_numerical_1.calculate([
        [a0, a1, a2, b1, b2, b3], [a0, a1, a3, b0, b2, b3], [[-1], a0, a2, a3, b0, b1, b3],
        [[-1], a1, a2, a3, b0, b1, b2], [b0, a1, a1, a1, b3, b3], [[-1], b3, a2, a2, a2, b0, b0],
        [a1, b0, a3, a3, b1, b1], [a1, b2, a0, a0, b3, b3], [a3, b0, a1, a1, b2, b2],
        [a3, b2, a2, a2, b0, b0], [[-1], a0, b1, a1, a1, b3, b3], [[-1], a0, b3, a2, a2, b1, b1],
        [[-1], a2, b1, a3, a3, b0, b0], [[-1], a2, b3, a0, a0, b2, b2], [[-3], a0, b3, a3, a3, b0, b0],
        [[-2], a1, b2, a3, a3, b0, b0], [[2], a2, b1, a0, a0, b3, b3], [[3], a3, b0, a0, a0, b3, b3],
        [a0, a2, a3, b2, b1, b1], [a1, b0, b1, b3, a2, a2], [[-1], a0, a1, a3, b1, b2, b2],
        [[-1], a2, b0, b2, b3, a1, a1], [[-3], a0, a1, a2, b0, b3, b3], [[-3], a3, b1, b2, b3, a0, a0],
        [[-2], a0, a2, a3, b0, b2, b2], [[-2], a3, b0, b1, b3, a1, a1], [[2], a0, a1, a3, b3, b1, b1],
        [[2], a0, b0, b2, b3, a2, a2], [[3], a0, b0, b1, b2, a3, a3], [[3], a1, a2, a3, b3, b0, b0],
        [a3, a3, a3, b0, b0, b0], [[-1], a0, a0, a0, b3, b3, b3], [a3, a0, a0, b2, b2, b2],
        [[-1], a0, a3, a3, b1, b1, b1]
    ]);
    return { vₓₓₓ, vₓₓᵧ, vₓᵧᵧ, vᵧᵧᵧ, vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v };
}
exports.getImplicitForm3Exact = getImplicitForm3Exact;
//# sourceMappingURL=get-implicit-form3.js.map