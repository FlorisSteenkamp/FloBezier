import { getClosestOnBezier3FromPointDd } from "./get-coeffs/double-double/get-closest-on-bezier3-from-point-dd.js";
import { getClosestOnBezier2FromPointDd } from "./get-coeffs/double-double/get-closest-on-bezier2-from-point-dd.js";
import { getClosestOnBezier1FromPointDd } from "./get-coeffs/double-double/get-closest-on-bezier1-from-point-dd.js";
import { getClosestOnBezier3FromPointExact } from "./get-coeffs/exact/get-closest-on-bezier-from-point-exact.js";
import { getClosestOnBezier2FromPointExact } from "./get-coeffs/exact/get-closest-on-bezier-from-point-exact.js";
import { getClosestOnBezier1FromPointExact } from "./get-coeffs/exact/get-closest-on-bezier-from-point-exact.js";
import { getClosestOnBezier1FromPointErrorCounters } from "./get-coeffs/get-closest-on-bezier-from-point-error-counters.js";
import { getClosestOnBezier2FromPointErrorCounters } from "./get-coeffs/get-closest-on-bezier-from-point-error-counters.js";
import { getClosestOnBezier3FromPointErrorCounters } from "./get-coeffs/get-closest-on-bezier-from-point-error-counters.js";
import { allRootsCertified, RootInterval } from "flo-poly";
import { getIntervalBox } from "../../global-properties/bounds/get-interval-box/get-interval-box.js";
import { γ, γγ } from '../../error-analysis/error-analysis';
import { twoDiff, eEstimate, eMult, eAdd } from 'big-float-ts';


// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const estimate = eEstimate;
const td = twoDiff;
const emult = eMult;
const eadd = eAdd;

const eps = Number.EPSILON;

const γγ6 = γγ(6);


/**
 * Returns the closest point(s) (and parameter `t` value(s)) on the given 
 * bezier curve to the given point.
 * 
 * * guaranteed accurate to 4 ulps in `t` value
 * 
 * @param ps 
 * @param p 
 * 
 * @doc
 */
function closestPointOnBezierCertified(
        ps: number[][], 
        p: number[]): {
            intervalBox: number[][];
            ri: RootInterval;
            di: number[];
        }[] {

    const order = ps.length - 1;

    let ris: RootInterval[];

    if (order === 3) {
        // keep TypeScript happy; `ris` cannot be `undefined` here
        ris = allRootsCertified(
            getClosestOnBezier3FromPointDd(ps, p), 
            0, 1, 
            getClosestOnBezier3FromPointErrorCounters(ps, p).map(e => 10*γγ6*e), 
            () => getClosestOnBezier3FromPointExact(ps, p)
        )!;
    } else if (order === 2) {
        // keep TypeScript happy; `ris` cannot be `undefined` here
        ris = allRootsCertified(
            getClosestOnBezier2FromPointDd(ps, p), 
            0, 1, 
            getClosestOnBezier2FromPointErrorCounters(ps, p).map(e => 8*γγ6*e), 
            () => getClosestOnBezier2FromPointExact(ps, p)
        )!;
    } else if (order === 1) {
        // keep TypeScript happy; `ris` cannot be `undefined` here
        ris = allRootsCertified(
            getClosestOnBezier1FromPointDd(ps, p), 
            0, 1, 
            getClosestOnBezier1FromPointErrorCounters(ps, p).map(e => 6*γγ6*e), 
            () => getClosestOnBezier1FromPointExact(ps, p)
        )!;        
    } else if (order === 0) {
        ris = [];
    } else {
        throw new Error('The given bezier curve is invalid.');
    }

    ris.push({ tS: 0, tE: 0, multiplicity: 1 });
    ris.push({ tS: 1, tE: 1, multiplicity: 1 });

    const infos = ris.map(ri => {
        const intervalBox = getIntervalBox(ps, [ri.tS, ri.tE])
        return {
            di: rootIntervalToDistanceInterval(intervalBox, p),
            intervalBox,
            ri
        }
    });

    /** the minimum max interval value */
    let minMax = Number.POSITIVE_INFINITY;
    for (let i=0; i<infos.length; i++) {
        const diMax = infos[i].di[1];
        if (diMax < minMax) {
            minMax = diMax;
        }
    }

    const closestPointInfos: {
        intervalBox: number[][];
        ri: RootInterval;
        di: number[]
    }[] = [];

    for (let i=0; i<infos.length; i++) {
        const info = infos[i];
        if (info.di[0] <= minMax) {
            closestPointInfos.push(info);
        }
    }

    return closestPointInfos;
}


/**
 * Returns the distance interval from the given root interval (currently
 * ignoring multiplicity)
 * 
 * @param ps1 the first bezier
 * @param ps2 the second bezier
 * @param ts2 the `t` values of the second bezier
 */
 function rootIntervalToDistanceInterval(
        intervalBox: number[][], 
        p: number[]) {

    const bl = intervalBox[0];
    const tr = intervalBox[1];
    const minX = bl[0];
    const minY = bl[1];
    const maxX = tr[0];
    const maxY = tr[1];

    const x = p[0];  // <0>
    const y = p[1];  // <0>
    
    let minD = Number.POSITIVE_INFINITY;
    let maxD = Number.NEGATIVE_INFINITY;

    // for each corner of the interval box
    for (const [a,b] of [[minX,minY],[minX,maxY],[maxX,minY],[maxX,maxY]]) {
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
        const ax = td(a,x);
        const by = td(b,y);
        const dc1Exact = eadd(emult(ax,ax),emult(by,by));
        const dc1 = estimate(dc1Exact);

        const dc1Min = dc1*(1 - eps);  // distance minus max error
        const dc1Max = dc1*(1 + eps);  // distance plus max error
        
        if (dc1Min <= minD) {
            minD = dc1Min;
        }

        if (dc1Max >= maxD) {
            maxD = dc1Max;
        }
    }

    return [minD,maxD];
}


export { closestPointOnBezierCertified }
