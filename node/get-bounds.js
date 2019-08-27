"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flo_memoize_1 = require("flo-memoize");
const get_dx_1 = require("./get-dx");
const get_dy_1 = require("./get-dy");
const flo_poly_1 = require("flo-poly");
const evaluate_x_1 = require("./evaluate-x/evaluate-x");
const evaluate_y_1 = require("./evaluate-y/evaluate-y");
/**
 * Calculates and returns general bezier bounds.
 * @returns The axis-aligned bounding box together with the t values
 * where the bounds on the bezier are reached.
 */
let getBounds = flo_memoize_1.memoize(function (ps) {
    // TODO - handle special cases of line / quadratic
    // Roots of derivative
    let roots = [get_dx_1.getDx(ps), get_dy_1.getDy(ps)]
        .map(poly => flo_poly_1.allRoots(poly, 0, 1));
    // Endpoints
    roots[0].push(0, 1);
    roots[1].push(0, 1);
    let minX = Number.POSITIVE_INFINITY;
    let maxX = Number.NEGATIVE_INFINITY;
    let minY = Number.POSITIVE_INFINITY;
    let maxY = Number.NEGATIVE_INFINITY;
    let tMinX = undefined;
    let tMinY = undefined;
    let tMaxX = undefined;
    let tMaxY = undefined;
    // Test points
    for (let i = 0; i < roots[0].length; i++) {
        let t = roots[0][i];
        let x = evaluate_x_1.evaluateX(ps, t);
        if (x < minX) {
            minX = x;
            tMinX = t;
        }
        if (x > maxX) {
            maxX = x;
            tMaxX = t;
        }
    }
    for (let i = 0; i < roots[1].length; i++) {
        let t = roots[1][i];
        let y = evaluate_y_1.evaluateY(ps, t);
        if (y < minY) {
            minY = y;
            tMinY = t;
        }
        if (y > maxY) {
            maxY = y;
            tMaxY = t;
        }
    }
    let ts = [[tMinX, tMinY], [tMaxX, tMaxY]];
    let box = [[minX, minY], [maxX, maxY]];
    return { ts, box };
});
exports.getBounds = getBounds;
//# sourceMappingURL=get-bounds.js.map