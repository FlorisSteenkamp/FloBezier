import { getFootpointPoly3Dd } from "./get-coeffs/double-double/get-footpoint-poly-3-dd.js";
import { getFootpointPoly2Dd } from "./get-coeffs/double-double/get-footpoint-poly-2-dd.js";
import { getFootpointPoly1Dd } from "./get-coeffs/double-double/get-footpoint-poly-1-dd.js";
import { getFootpointPoly3Exact } from "./get-coeffs/exact/get-footpoint-poly-3-exact.js";
import { getFootpointPoly2Exact } from "./get-coeffs/exact/get-footpoint-poly-2-exact.js";
import { getFootpointPoly1Exact } from "./get-coeffs/exact/get-footpoint-poly-1-exact.js";
import { getClosestOnBezier1FromPointErrorCounters } from "./get-coeffs/get-closest-on-bezier-from-point-error-counters.js";
import { getClosestOnBezier2FromPointErrorCounters } from "./get-coeffs/get-closest-on-bezier-from-point-error-counters.js";
import { getClosestOnBezier3FromPointErrorCounters } from "./get-coeffs/get-closest-on-bezier-from-point-error-counters.js";
import { γγ } from '../../error-analysis/error-analysis.js';
const γγ6 = γγ(6);
/**
 * Returns the footpoint(s) (and parameter `t` value(s)) on the
 * given bezier curve to the given point (with `t ∈ [0,1]`).
 *
 * * guaranteed accurate to within `4*Number.EPSILON` in the returned `t`
 * value(s)
 * * the returned point(s) are objects with the following properties:
 *     * `p`: the best estimate point on the bezier curve (calculated from the root interval `ri`)
 *     * `t`: the best estimate `t` parameter value (calculated from the root interval `ri`)
 *     * `d`: the best estimate closest distance from the point to the bezier curve (calculated from the root interval `ri`)
 *     * `ri`: a root interval guaranteed to contain the actual `t` value
 *     * `box`: a small box guaranteed to contain the relevant point on the bezier curve
 *     * `dSquaredI`: a small squared distance interval guaranteed to contain the actual distance squared
 *        between the point and the bezier curve
 *
 * @param ps an order 0,1,2 or 3 bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 * @param p a point, e.g. `[1,2]`
 *
 * @doc
 */
function getFootPointsOnBezierPolysCertified(ps, p) {
    const order = ps.length - 1;
    if (order === 3) {
        return {
            polyDd: getFootpointPoly3Dd(ps, p),
            polyE: getClosestOnBezier3FromPointErrorCounters(ps, p).map(e => 10 * γγ6 * e),
            getPolyExact: () => getFootpointPoly3Exact(ps, p)
        };
    }
    else if (order === 2) {
        return {
            polyDd: getFootpointPoly2Dd(ps, p),
            polyE: getClosestOnBezier2FromPointErrorCounters(ps, p).map(e => 8 * γγ6 * e),
            getPolyExact: () => getFootpointPoly2Exact(ps, p)
        };
    }
    else if (order === 1) {
        return {
            polyDd: getFootpointPoly1Dd(ps, p),
            polyE: getClosestOnBezier1FromPointErrorCounters(ps, p).map(e => 6 * γγ6 * e),
            getPolyExact: () => getFootpointPoly1Exact(ps, p)
        };
    }
    else if (order === 0) {
        return {
            polyDd: [[0, 1]],
            polyE: [0],
            getPolyExact: () => [[1]]
        };
    }
    else {
        throw new Error('The given bezier curve must be of order <= 3');
    }
}
export { getFootPointsOnBezierPolysCertified };
//# sourceMappingURL=get-foot-points-polys-on-bezier-certified.js.map