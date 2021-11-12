import { getCoeffsCubicDd, getCoeffsQuadraticDd, getCoeffsLinearDd } from './double-double/get-coeffs-dd.js';import { getCoeffsCubicDd, getCoeffsQuadraticDd, getCoeffsLinearDd } from './double-double/get-coeffs-dd.js
import { getCoeffsCubicExact, getCoeffsQuadraticExact, getCoeffsLinearExact } from './exact/get-coeffs-exact';
import { allRootsCertified } from 'flo-poly';
//import { mid } from 'flo-poly';
//import { evalDeCasteljau } from '../../local-properties-at-t/t-to-xy/eval-de-casteljau';
import { getCoeffsCubicErrorCounters, getCoeffsLinearErrorCounters, getCoeffsQuadraticErrorCounters } from './get-circle-bezier-intersection-error-counters.js';import { getCoeffsCubicErrorCounters, getCoeffsLinearErrorCounters, getCoeffsQuadraticErrorCounters } from './get-circle-bezier-intersection-error-counters.js
import { γγ } from '../../error-analysis/error-analysis';

const γγ6 = γγ(6);


/**
 * Returns the intersection between a circle and linear, quadratic or cubic bezier
 * curve.
 * 
 * The algorithm employed uses advanced techniques such 
 * as floating point error bounding, adaptive multi-precision floating 
 * point arithmetic, pre-filtering of easy cases, certified root finding and 
 * algebraic implicitization of the curves in order to find *guaranteed* accurate
 * results (see points below)
 *
 * * the bezier curve's parameter `t` values are retuned
 * * * **precondition:** TODO - underflow/overflow conditions
 * * this algorithm is mathematically guaranteed accurate to within 
 * `4 * Number.EPSILON` in the t values of the bezier curve
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
    let _polyE: number[];
    let getCoeffsExact: (circle: { center: number[]; radius: number; }, ps: number[][]) => number[][];
    if (ps.length === 4) {
        poly = getCoeffsCubicDd(circle, ps);
        _polyE = getCoeffsCubicErrorCounters(circle, ps);
        getCoeffsExact = getCoeffsCubicExact;
    } else if (ps.length === 3) {
        poly = getCoeffsQuadraticDd(circle, ps);
        _polyE = getCoeffsQuadraticErrorCounters(circle, ps);
        getCoeffsExact = getCoeffsQuadraticExact;
    } else if (ps.length === 2) {
        poly = getCoeffsLinearDd(circle, ps);
        _polyE = getCoeffsLinearErrorCounters(circle, ps);
        getCoeffsExact = getCoeffsLinearExact;
    } else {
        // TODO - handle case of bezier curve being degenerate to a point
        throw new Error('The given bezier curve is invalid');
    }

    const polyE = _polyE.map(e => γγ6*e);

    const ts = allRootsCertified(poly, 0, 1, polyE, () => getCoeffsExact(circle, ps));

    return ts;

    //return ts.map(t => {
    //    return {
    //        t: mid(t),
    //        p: evalDeCasteljau(ps, mid(t))
    //    }
    //});
}


export { circleBezierIntersection }
    