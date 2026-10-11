import type { RootInterval } from "flo-poly";
import { roots } from "flo-poly";
import { getFootPointsOnBezierPolysCertified } from "./get-foot-points-polys-on-bezier-certified.js";


/**
 * Returns root intervals guaranteed to contain the parameter `t` values of the
 * foot point(s) on the given bezier curve to the given point (with
 * `t ∈ [lb,ub]`), i.e. the points on the curve where the line to the given
 * point is perpendicular to the curve.
 *
 * * guaranteed accurate to within `4*Number.EPSILON` in the returned `t`
 * value(s)
 * * an order 0 curve (a point) has no foot points so `[]` is returned
 *
 * @param ps an order 0,1,2 or 3 bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 * @param p a point, e.g. `[1,2]`
 * @param lb optional; defaults to `0`; the lower bound of the `t` interval to
 * search in
 * @param ub optional; defaults to `1`; the upper bound of the `t` interval to
 * search in
 *
 * @doc
 */
function getFootPointsOnBezierCertified(
        ps: number[][],
        p: number[],
        lb = 0,
        ub = 1): RootInterval[] {

    if (ps.length === 1) { return []; }

    const { polyDd, polyE, getPolyExact } = getFootPointsOnBezierPolysCertified(ps, p);

    return roots(polyDd, lb, ub, polyE, getPolyExact) || [];
}


export { getFootPointsOnBezierCertified }
