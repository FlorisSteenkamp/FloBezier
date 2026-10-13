import { roots, RootInterval } from "flo-poly";
import { getCoeffsBezBez }  from './get-coefficients/get-coeffs-bez-bez.js';
import { rootsWithSharedEndpoint } from '../bezier-bezier-intersection-shared-endpoint/roots-with-shared-endpoint.js';


/**
 * Returns the intersection between any of two linear, quadratic or cubic bezier 
 * curves without limiting the `t` parameter value of the first given curve
 * in [0,1], i.e. `t ∈ [-∞,+∞]`.
 * 
 * * if the two curves have an infinite number of intersections `undefined` is returned
 * 
 * * the **second** bezier curve's parameter `t` values are returned *ordered* by `t` value
 * * if the curves share an endpoint (exactly) the known intersection at the
 * shared point is divided out of the intersection polynomial and returned 
 * *exactly* (which is much faster, especially if the curves are also tangent
 * at the shared point), see [[rootsWithSharedEndpoint]]
 *
 * * **precondition:** the bezier curves must be of lowest possible 
 * representable order, i.e. cubics are really cubics, etc. (else 
 * use [[reduceOrderIfPossible]] first)
 * 
 * @param ps1 an order 1,2 or 3 bezier curve given as an array of its control
 * points, e.g. `[[1,2],[3,4],[5,7],[0,0]]`
 * @param ps2 another bezier curve
 * 
 * @internal but still exported for backwards compatibility
 */
function bezierBezierIntersectionBoundless(
        ps1: number[][], 
        ps2: number[][]): RootInterval[] | undefined {
   
    const ris = rootsWithSharedEndpoint(ps1, ps2, 0, 1);
    if (ris !== null) { return ris; }

    const { coeffs, errBound, getPExact } = getCoeffsBezBez(ps1,ps2);

    return roots(coeffs, 0, 1, errBound, getPExact);
}


export { bezierBezierIntersectionBoundless }
