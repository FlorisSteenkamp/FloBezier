"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flo_poly_1 = require("flo-poly");
const get_x_1 = require("./get-x");
/**
 * Returns the bezier t values of the intersection between the given cubic
 * bezier and the given vertical line.
 * @param ps - The bezier curve
 * @param y - The y value of the horizontal line
 */
function tsAtX(ps, x) {
    // Translate ps so that x = 0.
    ps = ps.map(p => [p[0] - x, p[1]]);
    // Find the intersection t values
    return flo_poly_1.default.allRoots(get_x_1.getX(ps), 0, 1);
}
exports.tsAtX = tsAtX;

//# sourceMappingURL=ts-at-x.js.map
