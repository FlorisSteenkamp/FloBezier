"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flo_poly_1 = require("flo-poly");
const flo_vector2d_1 = require("flo-vector2d");
const get_y_1 = require("./get-y");
/**
 * Returns the bezier t values of the intersection between the given cubic
 * bezier and the given line.
 * @param ps - The bezier curve
 * @param l - The line given as a start and end point
 */
function lineIntersection(ps, l) {
    let [[x0, y0], [x1, y1]] = l;
    let [x, y] = [x1 - x0, y1 - y0];
    if (x === 0 && y === 0) {
        return [];
    } // It is not a line, it's a point. 
    // Move the line and the bezier together so the line's first point is on the
    // origin.
    ps = flo_vector2d_1.translatePs([-x0, -y0], ps);
    // Rotate the bezier and line together so the line is y=0.
    let len = Math.sqrt(x * x + y * y);
    let sinθ = y / len;
    let cosθ = x / len;
    ps = flo_vector2d_1.rotatePs(-sinθ, cosθ, ps);
    // Find the intersection t values
    return flo_poly_1.default.allRoots(get_y_1.getY(ps), 0, 1);
}
exports.lineIntersection = lineIntersection;

//# sourceMappingURL=line-intersection.js.map
