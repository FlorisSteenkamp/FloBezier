"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEndpointIntersections = void 0;
const inversion_01_1 = require("./inversion-01");
const root_interval_1 = require("flo-poly/node/roots/multi-with-err-bound/root-interval");
/**
 * Returns the t pairs where the endpoints of the two given same-k-family curves
 * overlap.
 * * **precondition**: the two given curves must be in the same k-family.
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
    let ps2S1 = inversion_01_1.inversion01Precise(ps2, p1S);
    let ps2E1 = inversion_01_1.inversion01Precise(ps2, p1E);
    let ps1S2 = inversion_01_1.inversion01Precise(ps1, p2S);
    let ps1E2 = inversion_01_1.inversion01Precise(ps1, p2E);
    let riPairs = [];
    if (ps2S1 && ps2S1.minD < minD) {
        riPairs.push([
            root_interval_1.createRootExact(0),
            root_interval_1.createRootExact(ps2S1.t) // TODO - multiplicity should be +infinity ??
        ]);
    }
    if (ps2E1 && ps2E1.minD < minD) {
        riPairs.push([
            root_interval_1.createRootExact(1),
            root_interval_1.createRootExact(ps2E1.t),
        ]);
    }
    if (ps1S2 && ps1S2.minD < minD) {
        riPairs.push([
            root_interval_1.createRootExact(ps1S2.t),
            root_interval_1.createRootExact(0),
        ]);
    }
    if (ps1E2 && ps1E2.minD < minD) {
        riPairs.push([
            root_interval_1.createRootExact(ps1E2.t),
            root_interval_1.createRootExact(1),
        ]);
    }
    return riPairs;
}
exports.getEndpointIntersections = getEndpointIntersections;
//# sourceMappingURL=get-endpoint-intersections.js.map