"use strict";
exports.__esModule = true;
exports.totalAbsoluteCurvature = exports.totalCurvature = void 0;
var flo_gauss_quadrature_1 = require("flo-gauss-quadrature");
var evaluate_dxy_js_1 = require("../local-properties-at-t/t-to-dxy/double/evaluate-dxy.js");
var evaluate_ddxy_js_1 = require("../local-properties-at-t/t-to-ddxy/double/evaluate-ddxy.js");
/**
 * TODO - replace this function with a more sane version where total curvature
 * is tallied by looking for inflection points and adding curvature over those
 * pieces by looking at tangent at beginning and end of the pieces.
 * Returns the total absolute curvature of the bezier over [0,1] using Gaussian
 * Quadrature integration with 16 wieghts and abscissas which is generally very
 * accurate and fast. Returns the result in radians.
 *
 * @param ps a cubic bezier
 * @param interval
 *
 * @doc mdx
 */
function totalAbsoluteCurvature(ps, interval) {
    // Numerically integrate the absolute curvature
    return (0, flo_gauss_quadrature_1.gaussQuadrature)(function (t) { return Math.abs(κds(ps, t)); }, interval);
}
exports.totalAbsoluteCurvature = totalAbsoluteCurvature;
// TODO - replace this function by simply checking tangents at beginning and
// end of curve.
/**
 * Returns the total curvature of the bezier over the given interval using
 * Gaussian Quadrature integration with 16 wieghts and abscissas which is
 * generally very accurate and fast. This function is curried.
 * @param ps - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param interval - The interval of integration (often === [0,1])
 * @returns The total curvature.
 *
 * @doc mdx
 */
function totalCurvature(ps, interval) {
    //const tanPs = tangent(ps);
    return (0, flo_gauss_quadrature_1.gaussQuadrature)(function (t) { return κds(ps, t); }, interval);
    // TODO
    /*
    const [a,b] = interval;
    const tangentA = tanPs(a);
    const tangentB = tanPs(b);
    const sinθ = Vector.cross(tanA, tanB)
    */
}
exports.totalCurvature = totalCurvature;
/**
 * Helper function.
 *
 * @internal
 */
function κds(ps, t) {
    var _a = (0, evaluate_dxy_js_1.evaluateDxy)(ps, t), dx = _a[0], dy = _a[1];
    var _b = (0, evaluate_ddxy_js_1.evaluateDdxy)(ps, t), ddx = _b[0], ddy = _b[1];
    var a = dx * ddy - dy * ddx;
    var b = dx * dx + dy * dy;
    return a / b;
}
