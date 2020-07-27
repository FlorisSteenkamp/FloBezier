"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEndpointIntersections = void 0;
const inversion_01_1 = require("./inversion-01");
const root_interval_1 = require("flo-poly/node/roots/multi-with-err-bound/root-interval");
const flo_vector2d_1 = require("flo-vector2d");
const big_float_ts_1 = require("big-float-ts");
const evaluate_1 = require("../local-properties-at-t/t-to-xy/evaluate");
/**
 * Returns the t pairs where the endpoints of the two given same-k-family curves
 * overlap.
 *
 * * **precondition**: the two given curves must be in the same k-family.
 *
 * @param ps1 an order 1,2 or 3 bezier curve
 * @param ps2 another order 1,2 or 3 bezier curve
 * @param minD an error bound given as a distance
 */
function getEndpointIntersections(ps1, ps2, minD) {
    let p1S = ps1[0];
    let p1E = ps1[ps1.length - 1];
    let p2S = ps2[0];
    let p2E = ps2[ps2.length - 1];
    /** closest point on ps2 from p1S */
    let t2S1 = inversion_01_1.inversion01Precise(ps2, p1S);
    let t2E1 = inversion_01_1.inversion01Precise(ps2, p1E);
    let t1S2 = inversion_01_1.inversion01Precise(ps1, p2S);
    let t1E2 = inversion_01_1.inversion01Precise(ps1, p2E);
    let riPairs = [];
    let minD2S1 = flo_vector2d_1.squaredDistanceBetween(evaluate_1.evaluateExact(ps2, t2S1).map(big_float_ts_1.eEstimate), p1S);
    if (t2S1 && minD2S1 < minD) {
        riPairs.push([
            root_interval_1.createRootExact(0),
            root_interval_1.createRootExact(t2S1) // TODO - multiplicity should be +infinity ??
        ]);
    }
    let minD2E1 = flo_vector2d_1.squaredDistanceBetween(evaluate_1.evaluateExact(ps2, t2E1).map(big_float_ts_1.eEstimate), p1E);
    if (t2E1 && minD2E1 < minD) {
        riPairs.push([
            root_interval_1.createRootExact(1),
            root_interval_1.createRootExact(t2E1),
        ]);
    }
    let minD1S2 = flo_vector2d_1.squaredDistanceBetween(evaluate_1.evaluateExact(ps1, t1S2).map(big_float_ts_1.eEstimate), p2S);
    if (t1S2 && minD1S2 < minD) {
        riPairs.push([
            root_interval_1.createRootExact(t1S2),
            root_interval_1.createRootExact(0),
        ]);
    }
    let minD1E2 = flo_vector2d_1.squaredDistanceBetween(evaluate_1.evaluateExact(ps1, t1E2).map(big_float_ts_1.eEstimate), p2E);
    if (t1E2 && minD1E2 < minD) {
        riPairs.push([
            root_interval_1.createRootExact(t1E2),
            root_interval_1.createRootExact(1),
        ]);
    }
    return riPairs;
}
exports.getEndpointIntersections = getEndpointIntersections;
//# sourceMappingURL=get-endpoint-intersections.js.map