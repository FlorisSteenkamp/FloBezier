import { allRootsCertified, mid } from "flo-poly";
import { getIntervalBox } from "../../global-properties/bounds/get-interval-box/get-interval-box.js";
import { getPFromBox } from "../../intersection/bezier-bezier-intersection/x.js";
import { rootIntervalToDistanceSquaredInterval } from './root-interval-to-distance-squared-interval.js';
import { FootAndEndpointInfo } from './foot-and-endpoint-info.js';
import { getFootPointsOnBezierPolysCertified } from "./get-foot-points-polys-on-bezier-certified.js";


const { sqrt } = Math;


/**
 * Returns the closest point(s) (and parameter `t` value(s)) on the given 
 * bezier curve to the given point (with `t ∈ [0,1]`).
 * 
 * * guaranteed accurate to within `4*Number.EPSILON` in the returned `t` 
 * value(s)
 * * in some cases there can be more than one closest point, e.g. on the axis
 * of symmetry of a parabola
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
function closestPointOnBezierCertified(
        ps: number[][], 
        p: number[],
        lb = 0,
        ub = 1): FootAndEndpointInfo[] {

    const { polyDd, polyE, getPolyExact } = getFootPointsOnBezierPolysCertified(ps, p);
    const ris = allRootsCertified(polyDd, lb, ub, polyE, getPolyExact);

    ris.push({ tS: lb, tE: lb, multiplicity: 1 });
    ris.push({ tS: ub, tE: ub, multiplicity: 1 });

    const infos = ris.map((ri): FootAndEndpointInfo => {
        const box = getIntervalBox(ps, [ri.tS, ri.tE]);
        const dSquaredI = rootIntervalToDistanceSquaredInterval(box, p);
        return {
            p: getPFromBox(box),
            t: mid(ri),
            d: (sqrt(dSquaredI[0]) + sqrt(dSquaredI[1]))/2,
            dSquaredI,
            box,
            ri
        }
    });

    /** the minimum max interval value */
    let minMax = Number.POSITIVE_INFINITY;
    for (let i=0; i<infos.length; i++) {
        const diMax = infos[i].dSquaredI[1];
        if (diMax < minMax) {
            minMax = diMax;
        }
    }

    const closestPointInfos: FootAndEndpointInfo[] = [];

    for (let i=0; i<infos.length; i++) {
        const info = infos[i];
        if (info.dSquaredI[0] <= minMax) {
            closestPointInfos.push(info);
        }
    }

    return closestPointInfos;
}


export { closestPointOnBezierCertified }
