import { allRoots } from "flo-poly";
import { getCoeffsCubic, getCoeffsQuadratic, getCoeffsLine } from "./get-coeffs";
import { evalDeCasteljau } from "../../../../src/local-properties-at-t/t-to-xy/double/eval-de-casteljau";


/**
 * Returns the intersection between a circle and linear, quadratic or cubic bezier
 * curve without taking floating-point round-off into account. For a more precise
 * version use [[circleBezierIntersection]] instead.
 * 
 * * an array of intersections are returned each an object containing the bezier 
 * curve's parameter `t` value as well as the cartesian point `p` at intersection
 * 
 * @param ps linear, quadratic or cubic bezier curve
 * @param circle a circle
 * 
 * @doc mdx
 */
function circleBezierIntersectionD(
        circle: { center: number[], radius: number}, 
        ps: number[][]): { t: number; p: number[] }[] {

    let poly: number[];
    if (ps.length === 4) {
        poly = getCoeffsCubic(circle, ps);
    } else if (ps.length === 3) {
        poly = getCoeffsQuadratic(circle, ps);
    } else if (ps.length === 2) {
        poly = getCoeffsLine(circle, ps);
    }

    let ts = allRoots(poly, 0, 1);
    return ts.map(t => {
        return {
            t,
            p: evalDeCasteljau(ps, t)
        }
    });
}


export { circleBezierIntersectionD }
    