
import { getCoeffsCubicDd, getCoeffsQuadraticDd, getCoeffsLinearDd } from './double-double/get-coeffs-dd';
import { allRootsCertified, mid } from 'flo-poly';
import { evalDeCasteljau } from '../../local-properties-at-t/t-to-xy/eval-de-casteljau';


/**
 * Returns the intersection between a circle and linear, quadratic or cubic bezier
 * curve.
 * 
 * The algorithm employed is state-of-the-art and uses advanced techniques such 
 * as floating point error bounding, adaptive multi-precision floating 
 * point arithmetic, pre-filtering of easy cases, certified root finding and 
 * algebraic implicitization of the curves in order to find *guaranteed* accurate
 * results (see points below)
 *
 * * the bezier curve's parameter `t` values are retuned
 * * * **precondition:** the coordinates of the given bezier curves must be 
 * 47-bit aligned
 * * this algorithm is mathematically guaranteed accurate to within 
 * `4 * Number.EPSILON` in the t values of the bezier curve (provided
 * the precondition is met).
 * 
 * @param circle 
 * @param ps 
 * 
 * @doc mdx
 */
function circleBezierIntersection(
        circle: { center: number[], radius: number}, 
        ps: number[][]) {

    let poly: number[][];
    if (ps.length === 4) {
        poly = getCoeffsCubicDd(circle, ps);
    } else if (ps.length === 3) {
        poly = getCoeffsQuadraticDd(circle, ps);
    } else if (ps.length === 2) {
        poly = getCoeffsLinearDd(circle, ps);
    }

    let ts = allRootsCertified(poly, 0, 1);

    return ts.map(t => {
        return {
            t: mid(t),
            p: evalDeCasteljau(ps, mid(t))
        }
    });
}


export { circleBezierIntersection }
    