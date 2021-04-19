"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.totalAbsoluteCurvature = exports.totalCurvature = void 0;
const flo_gauss_quadrature_1 = require("flo-gauss-quadrature");
const evaluate_dxy_1 = require("../local-properties-at-t/t-to-dxy/evaluate-dxy");
const evaluate_ddxy_1 = require("../local-properties-at-t/t-to-ddxy/evaluate-ddxy");
function totalAbsoluteCurvature(ps, interval) {
    function f(interval = [0, 1]) {
        // Numerically integrate the absolute curvature
        let result = flo_gauss_quadrature_1.gaussQuadrature(t => Math.abs(κds(ps, t)), interval);
        return result;
    }
    // Curry
    return interval === undefined ? f : f(interval);
}
exports.totalAbsoluteCurvature = totalAbsoluteCurvature;
function totalCurvature(ps, interval) {
    //const tanPs = tangent(ps);
    function f(interval) {
        return flo_gauss_quadrature_1.gaussQuadrature(t => κds(ps, t), interval);
        // TODO
        /*
        let [a,b] = interval;
        let tangentA = tanPs(a);
        let tangentB = tanPs(b);
        let sinθ = Vector.cross(tanA, tanB)
        */
    }
    // Curry
    return interval === undefined ? f : f(interval);
}
exports.totalCurvature = totalCurvature;
/**
 * Helper function.
 *
 * @internal
 */
function κds(ps, t) {
    const [dx, dy] = evaluate_dxy_1.evaluateDxy(ps, t);
    const [ddx, ddy] = evaluate_ddxy_1.evaluateDdxy(ps, t);
    let a = dx * ddy - dy * ddx;
    let b = dx * dx + dy * dy;
    return a / b;
}
//# sourceMappingURL=total-curvature.js.map