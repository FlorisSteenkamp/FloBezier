import { gaussQuadrature } from "flo-gauss-quadrature";
import { evaluateDxy } from "../local-properties-at-t/t-to-dxy/double/evaluate-dxy.js";
import { evaluateDdxy } from "../local-properties-at-t/t-to-ddxy/double/evaluate-ddxy.js";
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
    return gaussQuadrature(t => Math.abs(κds(ps, t)), interval);
}
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
    return gaussQuadrature(t => κds(ps, t), interval);
    // TODO
    /*
    const [a,b] = interval;
    const tangentA = tanPs(a);
    const tangentB = tanPs(b);
    const sinθ = Vector.cross(tanA, tanB)
    */
}
/**
 * Helper function.
 *
 * @internal
 */
function κds(ps, t) {
    const [dx, dy] = evaluateDxy(ps, t);
    const [ddx, ddy] = evaluateDdxy(ps, t);
    const a = dx * ddy - dy * ddx;
    const b = dx * dx + dy * dy;
    return a / b;
}
export { totalCurvature, totalAbsoluteCurvature };
//# sourceMappingURL=total-curvature.js.map