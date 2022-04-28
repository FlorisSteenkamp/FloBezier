import { getFootpointPoly3Dd } from "./get-coeffs/double-double/get-footpoint-poly-3-dd.js";
import { getFootpointPoly2Dd } from "./get-coeffs/double-double/get-footpoint-poly-2-dd.js";
import { getFootpointPoly1Dd } from "./get-coeffs/double-double/get-footpoint-poly-1-dd.js";
import { getFootpointPoly3Exact } from "./get-coeffs/exact/get-footpoint-poly-3-exact.js";
import { getFootpointPoly2Exact } from "./get-coeffs/exact/get-footpoint-poly-2-exact.js";
import { getFootpointPoly1Exact } from "./get-coeffs/exact/get-footpoint-poly-1-exact.js";
import { getClosestOnBezier1FromPointErrorCounters } from "./get-coeffs/get-closest-on-bezier-from-point-error-counters.js";
import { getClosestOnBezier2FromPointErrorCounters } from "./get-coeffs/get-closest-on-bezier-from-point-error-counters.js";
import { getClosestOnBezier3FromPointErrorCounters } from "./get-coeffs/get-closest-on-bezier-from-point-error-counters.js";
import { allRootsCertified, mid } from "flo-poly";
import { getIntervalBox } from "../../global-properties/bounds/get-interval-box/get-interval-box.js";
import { γγ } from '../../error-analysis/error-analysis.js';
import { twoDiff, eEstimate, eMult, eAdd } from 'big-float-ts';
import { getPFromBox } from "../../intersection/bezier-bezier-intersection/x.js";
// We *have* to do the below to improve performance with bundlers❗ The assignee is a getter❗ The assigned is a pure function❗
const estimate = eEstimate;
const td = twoDiff;
const emult = eMult;
const eadd = eAdd;
const eps = Number.EPSILON;
const { sqrt } = Math;
const γγ6 = γγ(6);
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
function closestPointOnBezierCertified(ps, p) {
    const order = ps.length - 1;
    let ris;
    if (order === 3) {
        // keep TypeScript happy; `ris` cannot be `undefined` here
        ris = allRootsCertified(getFootpointPoly3Dd(ps, p), 0, 1, getClosestOnBezier3FromPointErrorCounters(ps, p).map(e => 10 * γγ6 * e), () => getFootpointPoly3Exact(ps, p));
    }
    else if (order === 2) {
        // keep TypeScript happy; `ris` cannot be `undefined` here
        ris = allRootsCertified(getFootpointPoly2Dd(ps, p), 0, 1, getClosestOnBezier2FromPointErrorCounters(ps, p).map(e => 8 * γγ6 * e), () => getFootpointPoly2Exact(ps, p));
    }
    else if (order === 1) {
        // keep TypeScript happy; `ris` cannot be `undefined` here
        ris = allRootsCertified(getFootpointPoly1Dd(ps, p), 0, 1, getClosestOnBezier1FromPointErrorCounters(ps, p).map(e => 6 * γγ6 * e), () => getFootpointPoly1Exact(ps, p));
    }
    else if (order === 0) {
        return [];
    }
    else {
        throw new Error('The given bezier curve must be of order <= 3');
    }
    ris.push({ tS: 0, tE: 0, multiplicity: 1 });
    ris.push({ tS: 1, tE: 1, multiplicity: 1 });
    const infos = ris.map(ri => {
        const box = getIntervalBox(ps, [ri.tS, ri.tE]);
        const dSquaredI = rootIntervalToDistanceSquaredInterval(box, p);
        return {
            p: getPFromBox(box),
            t: mid(ri),
            d: (sqrt(dSquaredI[0]) + sqrt(dSquaredI[1])) / 2,
            dSquaredI,
            box,
            ri
        };
    });
    /** the minimum max interval value */
    let minMax = Number.POSITIVE_INFINITY;
    for (let i = 0; i < infos.length; i++) {
        const diMax = infos[i].dSquaredI[1];
        if (diMax < minMax) {
            minMax = diMax;
        }
    }
    const closestPointInfos = [];
    for (let i = 0; i < infos.length; i++) {
        const info = infos[i];
        if (info.dSquaredI[0] <= minMax) {
            closestPointInfos.push(info);
        }
    }
    return closestPointInfos;
}
/**
 * Returns the distance interval squared given the root interval (currently
 * ignoring multiplicity)
 *
 * @param box
 * @param p
 *
 * @internal
 */
function rootIntervalToDistanceSquaredInterval(box, p) {
    const bl = box[0];
    const tr = box[1];
    const minX = bl[0];
    const minY = bl[1];
    const maxX = tr[0];
    const maxY = tr[1];
    const x = p[0]; // <0>
    const y = p[1]; // <0>
    let minDSquared = Number.POSITIVE_INFINITY;
    let maxDSquared = Number.NEGATIVE_INFINITY;
    // for each corner of the interval box
    for (const [a, b] of [[minX, minY], [minX, maxY], [maxX, minY], [maxX, maxY]]) {
        /*
        // distance to 1st corner of interval box - `distance² = x² + y²`
        const dc1 = (a - x)**2 + (b - y)**2;
        // max absolute roundoff error of `dc1`
        // <4>dc1 <-- <4>(<3>(<1>(a - x)**2) + <3>(<1>((b - y)**2))
        const dc1E = 4*γ1*((a + x)**2 + (b + y)**2);
        const dc1Min = dc1 - dc1E;  // distance minus max error
        const dc1Max = dc1 + dc1E;  // distance plus max error
        */
        /** distance to 1st corner of interval box - `distance² = x² + y²` */
        const ax = td(a, x);
        const by = td(b, y);
        const dc1Exact = eadd(emult(ax, ax), emult(by, by));
        const dc1 = estimate(dc1Exact);
        const dc1Min = dc1 * (1 - eps); // distance minus max error
        const dc1Max = dc1 * (1 + eps); // distance plus max error
        if (dc1Min <= minDSquared) {
            minDSquared = dc1Min;
        }
        if (dc1Max >= maxDSquared) {
            maxDSquared = dc1Max;
        }
    }
    return [minDSquared, maxDSquared];
}
export { closestPointOnBezierCertified };
/**
 * Returns the closest point on the bezier to the given point - returns the point
 * and the t value.
 *
 * * this function also acts as an excellent inversion formula.
 *
 * @param ps an order 1,2 or 3 bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 * @param p a point, e.g. `[1,2]`
 */
/*
 function closestPointOnBezierPrecise(
        ps: number[][],
        p: number[]): {
            p: number[];
            t: number;
        } {

    const polyE = getFootpointPolyExact(ps, p);
    const polyDd = polyE.map(eToDd);
    const polyErr = polyE.map((c,i) => Math.abs(eEstimate(eDiff(c,polyDd[i]))));
    function getPExact() { return polyE; }

    let ts = allRootsCertified(
        polyDd,
        0, 1,
        polyErr,
        getPExact
    ).map(mid);

    ts.push(0);
    ts.push(1);

    let ps_ = ts.map(t => ({ p: evaluateExact(ps, t).map(eEstimate), t }));

    // Get point with minimum distance
    let minD = Number.POSITIVE_INFINITY;
    let minT: { p: number[], t: number } | undefined = undefined;
    ps_.forEach(p_ => {
        let d = squaredDistanceBetween(p_.p, p);
        if (d < minD) {
            minD = d;
            minT = p_;
        }
    });

    return minT!;
}
*/ 
//# sourceMappingURL=closest-point-on-bezier-certified.js.map