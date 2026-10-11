import { getFootpointPoly3Dd } from "./get-coeffs/double-double/get-footpoint-poly-3-dd.js";
import { getFootpointPoly2Dd } from "./get-coeffs/double-double/get-footpoint-poly-2-dd.js";
import { getFootpointPoly1Dd } from "./get-coeffs/double-double/get-footpoint-poly-1-dd.js";
import { getFootpointPoly3Exact } from "./get-coeffs/exact/get-footpoint-poly-3-exact.js";
import { getFootpointPoly2Exact } from "./get-coeffs/exact/get-footpoint-poly-2-exact.js";
import { getFootpointPoly1Exact } from "./get-coeffs/exact/get-footpoint-poly-1-exact.js";
import { getClosestOnBezier1FromPointErrorCounters } from "./get-coeffs/get-closest-on-bezier-from-point-error-counters.js";
import { getClosestOnBezier2FromPointErrorCounters } from "./get-coeffs/get-closest-on-bezier-from-point-error-counters.js";
import { getClosestOnBezier3FromPointErrorCounters } from "./get-coeffs/get-closest-on-bezier-from-point-error-counters.js";


/**
 * Returns the polynomial (in `t`) whose roots are the parameter `t` values of
 * the foot point(s) on the given bezier curve to the given point, i.e. the
 * points on the curve where the line to the given point is perpendicular to
 * the curve.
 *
 * The result is returned in the form expected by `flo-poly`'s `roots`
 * function, i.e. as an object with the following properties:
 *     * `polyDd`: the polynomial's coefficients in double-double precision
 *     * `polyE`: a coefficient-wise absolute error bound of `polyDd`
 *     * `getPolyExact`: a function returning the polynomial's coefficients
 *       exactly (as Shewchuk expansions) - only called if needed
 *
 * * an order 0 curve (a point) has no foot points so the non-zero constant
 * polynomial `1` is returned
 *
 * @param ps an order 0,1,2 or 3 bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 * @param p a point, e.g. `[1,2]`
 *
 * @doc
 */
function getFootPointsOnBezierPolysCertified(
        ps: number[][],
        p: number[]): {
            polyDd: number[][];
            polyE: number[];
            getPolyExact: () => number[][];
        } {

    const order = ps.length - 1;

    if (order === 3) {
        return {
            polyDd: getFootpointPoly3Dd(ps, p),
            polyE: getClosestOnBezier3FromPointErrorCounters(ps, p).map(e => 10*2*e),
            getPolyExact: () => getFootpointPoly3Exact(ps, p)
        }
    } else if (order === 2) {
        return {
            polyDd: getFootpointPoly2Dd(ps, p),
            polyE: getClosestOnBezier2FromPointErrorCounters(ps, p).map(e => 8*2*e),
            getPolyExact: () => getFootpointPoly2Exact(ps, p)
        }
    } else if (order === 1) {
        return {
            polyDd: getFootpointPoly1Dd(ps, p),
            polyE: getClosestOnBezier1FromPointErrorCounters(ps, p).map(e => 6*2*e),
            getPolyExact: () => getFootpointPoly1Exact(ps, p)
        }
    } else if (order === 0) {
        return {
            polyDd: [[0,1]],
            polyE: [0],
            getPolyExact: () => [[1]]
        }
    } else {
        throw new Error('The given bezier curve must be of order <= 3');
    }
}


export { getFootPointsOnBezierPolysCertified }
