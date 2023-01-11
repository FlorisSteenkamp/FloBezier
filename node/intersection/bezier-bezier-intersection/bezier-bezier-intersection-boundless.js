import { allRootsCertified } from "flo-poly";
import { getCoeffsBezBez } from './get-coefficients/get-coeffs-bez-bez.js';
/**
 * Returns the intersection between any of two linear, quadratic or cubic bezier
 * curves without limiting the `t` parameter value of the first given curve
 * in [0,1], i.e. `t ∈ [-∞,+∞]`.
 *
 * * if the two curves have an infinite number of intersections `undefined` is returned
 * * the second bezier curve's parameter `t` values are returned *ordered* by `t` value
 *
 * * **precondition:** the bezier curves must be of lowest possible
 * representable order, i.e. cubics are really cubics, etc. (else
 * use [[reduceOrderIfPossible]] first)
 *
 * @param ps1 an order 1,2 or 3 bezier curve given as an array of its control
 * points, e.g. `[[1,2],[3,4],[5,7],[0,0]]`
 * @param ps2 an order 1,2 or 3 bezier curve given as an array of its control
 * points, e.g. `[[1,2],[3,4],[5,7],[0,0]]`
 *
 * @internal but still exported for backwards compatibility
 */
function bezierBezierIntersectionBoundless(ps1, ps2) {
    const { coeffs, errBound, getPExact } = getCoeffsBezBez(ps1, ps2);
    return allRootsCertified(coeffs, 0, 1, errBound, getPExact, true);
}
export { bezierBezierIntersectionBoundless };
//# sourceMappingURL=bezier-bezier-intersection-boundless.js.map