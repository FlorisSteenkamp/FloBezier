import { getFootpointPoly1Dd } from './get-footpoint-poly-1-dd.js';
import { getFootpointPoly2Dd } from './get-footpoint-poly-2-dd.js';
import { getFootpointPoly3Dd } from './get-footpoint-poly-3-dd.js';
/**
 * Returns the polynomial whose roots are all the `t` parameter values on the
 * given bezier curve such that the line from the given point to the point on
 * the bezier curve evaluated at `t` is tangent to the bezier curve at `t`.
 *
 * * intermediate calculations are done (and the final result returned in)
 * double-double precision
 *
 * @param ps an order 1,2 or 3 bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 * @param p a point, e.g. `[1,2]`
 */
function getFootpointPolyDd(ps, p) {
    if (ps.length === 4) {
        return getFootpointPoly3Dd(ps, p);
    }
    if (ps.length === 3) {
        return getFootpointPoly2Dd(ps, p);
    }
    if (ps.length === 2) {
        return getFootpointPoly1Dd(ps, p);
    }
    throw new Error('The given bezier curve must be of order 1,2 or 3');
}
export { getFootpointPolyDd };
//# sourceMappingURL=get-footpoint-poly-dd.js.map