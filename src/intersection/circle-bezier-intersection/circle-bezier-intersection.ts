import { getCoeffsCubicDd, getCoeffsQuadraticDd, getCoeffsLinearDd } from './double-double/get-coeffs-dd.js';
import { getCoeffsCubicExact, getCoeffsQuadraticExact, getCoeffsLinearExact } from './exact/get-coeffs-exact.js';
import { roots, RootInterval } from 'flo-poly';
import { getCoeffsCubicErrorCounters, getCoeffsLinearErrorCounters, getCoeffsQuadraticErrorCounters } from './get-circle-bezier-intersection-error-counters.js';
import { getPFromBox } from '../bezier-bezier-intersection/x.js';
import { getIntervalBox } from '../../global-properties/bounds/get-interval-box/get-interval-box.js';


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
    /** the Stewart error counters of the coefficients (see the error counter functions) */
    let counters: number[];
    let getCoeffsExact: (circle: { center: number[]; radius: number; }, ps: number[][]) => number[][];
    if (ps.length === 4) {
        poly = getCoeffsCubicDd(circle, ps);
        _polyE = getCoeffsCubicErrorCounters(circle, ps);
        counters = [8,8,9,9,8,5,5];
        getCoeffsExact = getCoeffsCubicExact;
    } else if (ps.length === 3) {
        poly = getCoeffsQuadraticDd(circle, ps);
        _polyE = getCoeffsQuadraticErrorCounters(circle, ps);
        counters = [6,5,6,4,4];
        getCoeffsExact = getCoeffsQuadraticExact;
    } else if (ps.length === 2) {
        poly = getCoeffsLinearDd(circle, ps);
        _polyE = getCoeffsLinearErrorCounters(circle, ps);
        counters = [4,4,4];
        getCoeffsExact = getCoeffsLinearExact;
    } else {
        throw new Error('The given bezier curve must be of order 1, 2 or 3.');
    }

    // The error bound of each coefficient is `γγ3*<counter>*e` (see the error
    // counter functions) with an additional factor of 2 since double-double 
    // multiplication is about twice as inaccurate as the other double-double
    // operations accounted for by the counters (`roots` multiplies by `γγ3`)
    const polyE = _polyE.map((e,i) => 2*counters[i]*e);

    const ris = roots(poly, 0, 1, polyE, () => getCoeffsExact(circle, ps)) ||
        // `undefined` means the zero polynomial, i.e. infinitely many roots.
        // Use the midpoint only to represent that degenerate case.
        [{ t: 0.5, tS: 0.5, tE: 0.5, multiplicity: 1 }];

    return ris.map(ri => {
        const box = getIntervalBox(ps, [ri.tS, ri.tE]);
        return { p: getPFromBox(box), box, t: ri.t, ri }
    });
}


export { circleBezierIntersection }
