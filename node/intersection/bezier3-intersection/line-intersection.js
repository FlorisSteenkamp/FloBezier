"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lineIntersection = void 0;
const flo_poly_1 = require("flo-poly");
//import { rotatePs as rotate, translatePs as translate } from 'flo-vector2d';
const flo_vector2d_1 = require("flo-vector2d");
const get_y_1 = require("../../to-power-basis/get-y");
//import { getY } from './get-y';
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
    ps = ps.map(flo_vector2d_1.translate([-x0, -y0]));
    // Rotate the bezier and line together so the line is y=0.
    let len = Math.sqrt(x * x + y * y);
    let sinθ = y / len;
    let cosθ = x / len;
    ps = ps.map(flo_vector2d_1.rotate(-sinθ, cosθ));
    // Find the intersection t values
    return flo_poly_1.allRoots(get_y_1.getY(ps), 0, 1);
}
exports.lineIntersection = lineIntersection;
//# sourceMappingURL=line-intersection.js.map