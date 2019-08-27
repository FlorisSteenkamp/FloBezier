"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_x_1 = require("../get-x");
const get_y_1 = require("../get-y");
/**
 * PRECONDITION: Control points have max 13-bit significand aligned to grid
 * accuracy.
 *
 * @param ps1
 * @param ps2
 */
function sameKFamilyCubic(ps1, ps2) {
    // The c_2x here can use an extra 4 bits due to the 6* part in getX / getY
    // to go from 13 to 17 bits so we can multiply 3 times to go to 3*17 or
    // 51 < 53 bits.
    let [c_3x, c_2x, c_1x, c_0x] = get_x_1.getX(ps1);
    let [c_3y, c_2y, c_1y, c_0y] = get_y_1.getY(ps1);
    let [d_3x, d_2x, d_1x, d_0x] = get_x_1.getX(ps2);
    let [d_3y, d_2y, d_1y, d_0y] = get_y_1.getY(ps2);
}
exports.sameKFamilyCubic = sameKFamilyCubic;
/**
 * PRECONDITION: Control points have max 13-bit significand aligned to grid
 * accuracy.
 *
 * @param ps1
 * @param ps2
 */
function sameKFamilyQuadratic(ps1, ps2) {
    // The c_2x here can use an extra 4 bits due to the 6* part in getX / getY
    // to go from 13 to 17 bits so we can multiply 3 times to go to 3*17 or
    // 51 < 53 bits.
    let [c_2x, c_1x, c_0x] = get_x_1.getX(ps1);
    let [c_2y, c_1y, c_0y] = get_y_1.getY(ps1);
    let [d_2x, d_1x, d_0x] = get_x_1.getX(ps2);
    let [d_2y, d_1y, d_0y] = get_y_1.getY(ps2);
}
/**
 * PRECONDITION: Control points have max 13-bit significand aligned to grid
 * accuracy.
 *
 * @param ps1
 * @param ps2
 */
function sameKFamilyLinear(ps1, ps2) {
    // The c_2x here can use an extra 4 bits due to the 6* part in getX / getY
    // to go from 13 to 17 bits so we can multiply 3 times to go to 3*17 or
    // 51 < 53 bits.
    let [c_1x, c_0x] = get_x_1.getX(ps1);
    let [c_1y, c_0y] = get_y_1.getY(ps1);
    let [d_1x, d_0x] = get_x_1.getX(ps2);
    let [d_1y, d_0y] = get_y_1.getY(ps2);
}
//# sourceMappingURL=same-k-family.js.map