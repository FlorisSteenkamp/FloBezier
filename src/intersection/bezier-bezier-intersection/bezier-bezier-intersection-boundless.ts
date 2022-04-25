import { allRootsCertified, RootInterval } from "flo-poly";
import { getCoeffsBezBez }  from './get-coefficients/get-coeffs-bez-bez.js';


/**
 * Returns the intersection between any of two linear, quadratic or cubic bezier 
 * curves without limiting the `t` value of the first given curve in [0,1], 
 * i.e. `t ∈ [-∞,+∞]`.
 * 
 * * if the two curves have an infinite number of intersections `undefined` is returned
 * * the second bezier curve's parameter `t` values are retuned *ordered* by `t` value
 *
 * * **precondition:** the bezier curves must be of lowest possible 
 * representable order, i.e. cubics are really cubics, etc.
 * 
 * @param ps1 
 * @param ps2 
 * 
 * @internal but still exported for backwards compatibility
 */
function bezierBezierIntersectionBoundless(
        ps1: number[][], 
        ps2: number[][]): RootInterval[] | undefined {
   
    const { coeffs, errBound, getPExact } = getCoeffsBezBez(ps1,ps2);;

    return allRootsCertified(coeffs, 0, 1, errBound, getPExact, true);
}


export { bezierBezierIntersectionBoundless }
