"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const de_casteljau_1 = require("./de-casteljau");
/**
 * Returns a cubic bezier curve that starts at the given t parameter and
 * ends at t=1. Uses de Casteljau's algorithm.
 *
 * A loose bound on the accuracy of the resultant points is given by:
 * |δP| = 2n*max_k(|b_k|)η, where n = 3 (cubic), b_k are the control points
 * abd η is Number.EPSILON.
 * @param ps - A cubic bezier curve
 * @param t - The t parameter where the resultant bezier should start
 */
/*
function fromTTo1(ps: number[][], t: number): number[][] {
    let [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = ps;
    
    let s  = 1  - t;
    let t2 = t  * t;
    let t3 = t2 * t;
    let s2 = s  * s;
    let s3 = s2 * s;

    return [
        [t3*x3 + 3*s*t2*x2 + 3*s2*t*x1 + s3*x0,
         t3*y3 + 3*s*t2*y2 + 3*s2*t*y1 + s3*y0],
        [t2*x3 + 2*t*s*x2 + s2*x1, t2*y3 + 2*t*s*y2 + s2*y1],
        [t*x3 + s*x2, t*y3 + s*y2],
        [x3, y3]
    ];
}
*/
function fromTTo1(ps, t) {
    let [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = ps;
    let xs = [x0, x1, x2, x3];
    let ys = [y0, y1, y2, y3];
    let [x0_, x1_, x2_, x3_] = de_casteljau_1.deCasteljau(xs, t)[1];
    let [y0_, y1_, y2_, y3_] = de_casteljau_1.deCasteljau(ys, t)[1];
    return [[x0_, y0_], [x1_, y1_], [x2_, y2_], [x3_, y3_]];
}
exports.fromTTo1 = fromTTo1;

//# sourceMappingURL=from-T-to-1.js.map
