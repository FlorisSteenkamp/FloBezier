import { allRootsCertified } from "flo-poly";
import { getCoeffsBezBez } from './get-coefficients/get-coeffs-bez-bez.js';
/**
 * Returns the intersection between any of two linear, quadratic or cubic bezier
 * curves without limiting the `t` value in [0,1], i.e. `t ∈ [-∞,+∞]`.
 *
 * * if the two curves have an infinite number of intersections `undefined` is returned
 * * the second bezier curve's parameter `t` values are retuned
 *
 * * **precondition:** TODO underflow / overflow
 * * **precondition:** cubics are really cubics, etc. TODO
 *
 * @param ps1
 * @param ps2
 *
 * @internal
 */
function bezierBezierIntersectionBoundless(ps1, ps2) {
    let _coeffs = getCoeffsBezBez(ps1, ps2);
    if (_coeffs === undefined) {
        // infinite number of intersections
        // TODO
        //console.log('use endpoint Xs')
        return undefined;
    }
    let { coeffs, errBound, getPExact } = _coeffs;
    return allRootsCertified(coeffs, 0, 1, errBound, getPExact, true);
}
export { bezierBezierIntersectionBoundless };
//# sourceMappingURL=bezier-bezier-intersection-boundless.js.map