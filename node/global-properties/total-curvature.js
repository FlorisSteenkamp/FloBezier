"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flo_gauss_quadrature_1 = require("flo-gauss-quadrature");
const evaluate_dx_1 = require("../local-properties-at-t/t-to-dxy/evaluate-dx");
const evaluate_dy_1 = require("../local-properties-at-t/t-to-dxy/evaluate-dy");
const evaluate_ddx_1 = require("../local-properties-at-t/t-to-ddxy/evaluate-ddx");
const evaluate_ddy_1 = require("../local-properties-at-t/t-to-ddxy/evaluate-ddy");
function totalAbsoluteCurvature(ps, interval) {
    function f(interval = [0, 1]) {
        // Numerically integrate the absolute curvature
        let result = flo_gauss_quadrature_1.gaussQuadrature(t => Math.abs(κds(ps)(t)), interval);
        return result;
    }
    // Curry
    return interval === undefined ? f : f(interval);
}
exports.totalAbsoluteCurvature = totalAbsoluteCurvature;
function totalCurvature(ps, interval) {
    //const tanPs = tangent(ps);
    function f(interval) {
        return flo_gauss_quadrature_1.gaussQuadrature(κds(ps), interval);
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
function κds(ps, t) {
    const evDx = evaluate_dx_1.evaluateDx(ps);
    const evDy = evaluate_dy_1.evaluateDy(ps);
    const evDdx = evaluate_ddx_1.evaluateDdx(ps);
    const evDdy = evaluate_ddy_1.evaluateDdy(ps);
    function f(t) {
        let dx = evDx(t);
        let dy = evDy(t);
        let ddx = evDdx(t);
        let ddy = evDdy(t);
        let a = dx * ddy - dy * ddx;
        let b = dx * dx + dy * dy;
        return a / b;
    }
    // Curry
    return t === undefined ? f : f(t);
}
//# sourceMappingURL=total-curvature.js.map