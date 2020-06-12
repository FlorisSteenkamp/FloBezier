"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.geoClip = void 0;
const flo_poly_1 = require("flo-poly");
const to_hybrid_quadratic_1 = require("./to-hybrid-quadratic");
/**
 * @param P
 * @param dQ Distance to fat line's zero line
 * @param dMin
 * @param dMax
 */
function geoClip(P, dQ, dMin, dMax) {
    let hq = to_hybrid_quadratic_1.toHybridQuadratic(P);
    let dH0 = dQ(hq[0]);
    let dH2 = dQ(hq[2]);
    let dH10 = dQ(hq[1][0]);
    let dH11 = dQ(hq[1][1]);
    let dHmin = Math.min(dH10, dH11);
    let dHmax = Math.max(dH10, dH11);
    let DyMin = [
        dH0 - 2 * dHmin + dH2,
        -2 * dH0 + 2 * dHmin,
        dH0
    ];
    let DyMax = [
        dH0 - 2 * dHmax + dH2,
        -2 * dH0 + 2 * dHmax,
        dH0
    ];
    let errorBound = 2 * Math.max(flo_poly_1.hornerErrorBound(DyMin, 1), flo_poly_1.hornerErrorBound(DyMax, 1));
    dMin = dMin - errorBound;
    dMax = dMax + errorBound;
    let DyMinMin = DyMin.slice();
    DyMinMin[2] = DyMinMin[2] - dMin;
    let DyMinMax = DyMin.slice();
    DyMinMax[2] = DyMinMax[2] - dMax;
    let DyMaxMin = DyMax.slice();
    DyMaxMin[2] = DyMaxMin[2] - dMin;
    let DyMaxMax = DyMax.slice();
    DyMaxMax[2] = DyMaxMax[2] - dMax;
    let tMin = Number.POSITIVE_INFINITY;
    let tMax = Number.NEGATIVE_INFINITY;
    let rootsMinMin = flo_poly_1.allRoots(DyMinMin, 0, 1);
    let rootsMinMax = flo_poly_1.allRoots(DyMinMax, 0, 1);
    let rootsMaxMin = flo_poly_1.allRoots(DyMaxMin, 0, 1);
    let rootsMaxMax = flo_poly_1.allRoots(DyMaxMax, 0, 1);
    tMin = Math.min(...rootsMinMin, ...rootsMinMax, ...rootsMaxMin, ...rootsMaxMax);
    tMax = Math.max(...rootsMinMin, ...rootsMinMax, ...rootsMaxMin, ...rootsMaxMax);
    if (dH0 >= dMin && dH0 <= dMax) {
        tMin = 0;
    }
    if (dH2 >= dMin && dH2 <= dMax) {
        tMax = 1;
    }
    if (tMin < 0) {
        tMin = 0;
    }
    if (tMax > 1) {
        tMax = 1;
    }
    return { tMin, tMax };
}
exports.geoClip = geoClip;
//# sourceMappingURL=geo-clip.js.map