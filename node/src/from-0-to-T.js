"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Returns a cubic bezier curve that starts at the given curve's t=0 and ends
 * at the given t parameter. Uses de Casteljau's algorithm.
 *
 * A loose bound on the accuracy of the resultant points is given by:
 * |δP| = 2n*max_k(|b_k|)η, where n = 3 (cubic), b_k are the control points
 * abd η is Number.EPSILON.
 * @param ps - A cubic bezier curve
 * @param t - The t parameter where the resultant bezier should end
 */
function from0ToT(ps, t) {
    let [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = ps;
    let s = 1 - t;
    let t2 = t * t;
    let t3 = t2 * t;
    let s2 = s * s;
    let s3 = s2 * s;
    return [
        [x0, y0],
        [t * x1 + s * x0, t * y1 + s * y0],
        [t2 * x2 + 2 * s * t * x1 + s2 * x0, t2 * y2 + 2 * s * t * y1 + s2 * y0],
        [t3 * x3 + 3 * s * t2 * x2 + 3 * s2 * t * x1 + s3 * x0,
            t3 * y3 + 3 * s * t2 * y2 + 3 * s2 * t * y1 + s3 * y0]
    ];
}
exports.from0ToT = from0ToT;
//# sourceMappingURL=from-0-to-T.js.map