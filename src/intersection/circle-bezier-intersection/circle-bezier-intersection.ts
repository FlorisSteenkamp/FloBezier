import { getCoeffsCubicDd, getCoeffsQuadraticDd, getCoeffsLinearDd } from './double-double/get-coeffs-dd.js';
import { getCoeffsCubicExact, getCoeffsQuadraticExact, getCoeffsLinearExact } from './exact/get-coeffs-exact.js';
import { allRootsCertified, mid, type RootInterval } from 'flo-poly';
import { getCoeffsCubicErrorCounters, getCoeffsLinearErrorCounters, getCoeffsQuadraticErrorCounters } from './get-circle-bezier-intersection-error-counters.js';
import { γγ } from '../../error-analysis/error-analysis.js';
import { getPFromBox } from '../bezier-bezier-intersection/x.js';
import { getIntervalBox } from '../../global-properties/bounds/get-interval-box/get-interval-box.js';

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
 * * the bezier curve's parameter `t` values are retuned in objects very 
 * similar to the type [[X]]
 * * this algorithm is mathematically guaranteed accurate to within 
 * `4 * Number.EPSILON` in the `t` parameter values of the bezier curve
 * 
 * @param circle a circle given as the object `{ center: number[], radius: number }`
 * @param ps an order 1,2 or 3 bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 * 
 * @doc mdx
 */
function circleBezierIntersection(
        circle: { center: number[], radius: number},
        ps: number[][]): {
            p: number[];
            t: number;
            box: number[][];
            ri: RootInterval;
        }[] {

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
        throw new Error('The given bezier curve must be of order 1, 2 or 3.');
    }

    const polyE = _polyE.map(e => γγ6*e);

    const ris = (
        allRootsCertified(poly, 0, 1, polyE, () => getCoeffsExact(circle, ps), true) ||
        [{ tS: 0.5, tE: 0.5, multiplicity: 1 }]
    );

    return ris.map(ri => {
        const box = getIntervalBox(ps, [ri.tS, ri.tE]);
        return { p: getPFromBox(box), box, t: mid(ri), ri }
    });
}


export { circleBezierIntersection }
