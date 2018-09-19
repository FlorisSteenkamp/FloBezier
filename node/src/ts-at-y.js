"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flo_poly_1 = require("flo-poly");
const get_y_1 = require("./get-y");
/**
 * Returns the bezier t values of the intersection between the given cubic
 * bezier and the given horizontal line.
 * @param ps - The bezier curve
 * @param y - The y value of the horizontal line
 */
function tsAtY(ps, y) {
    // Translate ps so that y = 0.
    ps = ps.map(p => [p[0], p[1] - y]);
    // Find the intersection t values
    return flo_poly_1.default.allRoots(get_y_1.getY(ps), 0, 1);
}
exports.tsAtY = tsAtY;

//# sourceMappingURL=ts-at-y.js.map
