"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flo_vector2d_1 = require("flo-vector2d");
const evaluate_1 = require("../evaluate");
const ts_at_x_1 = require("../ts-at-x");
const ts_at_y_1 = require("../ts-at-y");
/**
 * Calculates the t-value of the closest point on Q to P(t).
 * @param δ
 * @param t
 * @param P
 * @param Q
 */
function calcOtherT(t, P, Q) {
    // Get some length measure on P and Q
    let max = Math.max(P[0][0], P[0][1], P[1][0], P[1][1], P[2][0], P[2][1], P[3][0], P[3][1], Q[0][0], Q[0][1], Q[1][0], Q[1][1], Q[2][0], Q[2][1], Q[3][0], Q[3][1]);
    let pp = evaluate_1.evaluate(P)(t);
    let [x, y] = pp;
    let tqsh = ts_at_y_1.tsAtY(Q, y);
    let tqsv = ts_at_x_1.tsAtX(Q, x);
    if (!tqsh.length && !tqsv.length) {
        return undefined;
    }
    let tqs = [...tqsh, ...tqsv];
    let bestT = undefined;
    let bestD = Number.POSITIVE_INFINITY;
    for (let tq of tqs) {
        let pq = evaluate_1.evaluate(Q)(tq);
        let d = flo_vector2d_1.squaredDistanceBetween(pp, pq);
        if (d < bestD) {
            bestD = d;
            bestT = tq;
        }
    }
    // If the best distance > the max allowed tolerance then no intersection
    // occured - this happens only in special cases where clipping occured at
    // the endpoint of a curve.
    let maxTolerance = 256 * 24 * Number.EPSILON * max;
    if (bestD > maxTolerance * maxTolerance) {
        return undefined;
    }
    return bestT;
}
exports.calcOtherT = calcOtherT;

//# sourceMappingURL=calc-other-t.js.map
