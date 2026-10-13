import { getPFromBox } from "../bezier-bezier-intersection/x.js";
import { reduceOrderIfPossible } from "../../transformation/reduce-order-if-possible.js";
import { toPowerBasisExact } from "../../to-power-basis/to-power-basis/exact/to-power-basis-exact.js";
import { getTransform1 } from "./get-transform-1.js";
import { getTransform2 } from "./get-transform-2.js";
import { getTransform3 } from "./get-transform-3.js";
import { getEndpointTs } from "./get-endpoint-ts.js";
import { getIntervalBox } from "../../global-properties/bounds/get-interval-box/get-interval-box.js";
import { nextDown } from "../../next-down.js";
import { nextUp } from "../../next-up.js";
import { intersectBoxes } from "../../boxes/intersect-boxes.js";
/** @internal */
const getTransforms = [, , getTransform1, getTransform2, getTransform3];
/**
 * Returns the intersection range (given as 2 intersections (`X`s)) where the
 * endpoints of the two given *algebraically identical* curves
 * overlap (provided they overlap, else an empty array is returned).
 *
 * * **precondition:** the two given curves must be *algebraically identical*
 * (i.e. identical except possibly for endpoints)
 *
 * * **precondition**: not all bezier control points collinear
 *
 * @param psA an order 1,2 or 3 bezier curve
 * @param psB another bezier curve
 * @param orderAlreadyReduced optional; defaults to `false`; set to `true` if the
 * order of both curves has already been reduced as far as possible (e.g. via
 * `reduceOrderIfPossible`) to avoid doing it again
 *
 * @internal but still exported for backwards compatibility
 */
function getEndpointIntersections(psA, psB, orderAlreadyReduced = false) {
    if (!orderAlreadyReduced) {
        psA = reduceOrderIfPossible(psA);
        psB = reduceOrderIfPossible(psB);
    }
    // `psA.length` should equal `psB.length` (due to precondition)
    const getTransform = getTransforms[psA.length];
    const xyA = toPowerBasisExact(psA);
    // the exact parameter value of `A` at the start point of `B`
    const dA_B0 = getTransform(xyA, toPowerBasisExact(psB));
    // the exact parameter value of `A` at the end point of `B` (i.e. at the 
    // start point of the reversed `B`)
    const dA_B1 = getTransform(xyA, toPowerBasisExact(psB.slice().reverse()));
    const [tA_B0, tA_B1, tB_A0, tB_A1] = getEndpointTs(dA_B0, dA_B1);
    //------------------------------------------------
    // Perform a simple unrolled sweep line algorithm
    //------------------------------------------------
    const infos = [
        { tA: tA_B0, tB: 0, bez: 'B', start: true },
        { tA: tA_B1, tB: 1, bez: 'B', start: false },
        { tA: 0, tB: tB_A0, bez: 'A', start: true },
        { tA: 1, tB: tB_A1, bez: 'A', start: false }
    ].sort((a, b) => a.tA - b.tA);
    if (infos[1].tA === infos[2].tA) {
        const info = infos[1];
        const tA = info.tA; // `tA` will be either exactly `0` or exactly `1`
        const tB = info.tB; // `tB` will be either exactly `0` or exactly `1`
        const box = getIntervalBox(psA, [tA, tA]);
        return [{
                p: box[0], kind: 4, box,
                t1: tA, ri1: { t: tA, tS: tA, tE: tA, multiplicity: 1 },
                t2: tB, ri2: { t: tB, tS: tB, tE: tB, multiplicity: 1 }
            }];
    }
    if (infos[0].bez === infos[1].bez) {
        return [];
    }
    const start = infos[1];
    const end = infos[2];
    const [tSAMin, tSAMax] = getMinMaxT(start.tA);
    const [tSBMin, tSBMax] = getMinMaxT(start.tB);
    const [tEAMin, tEAMax] = getMinMaxT(end.tA);
    const [tEBMin, tEBMax] = getMinMaxT(end.tB);
    const boxSA = getIntervalBox(psA, [tSAMin, tSAMax]);
    const boxSB = getIntervalBox(psB, [tSBMin, tSBMax]);
    const boxEA = getIntervalBox(psA, [tEAMin, tEAMax]);
    const boxEB = getIntervalBox(psB, [tEBMin, tEBMax]);
    const boxS = intersectBoxes(boxSA, boxSB);
    const boxE = intersectBoxes(boxEA, boxEB);
    const riSA = { t: tSAMin, tS: tSAMin, tE: tSAMax, multiplicity: 1 };
    const riSB = { t: tSBMin, tS: tSBMin, tE: tSBMax, multiplicity: 1 };
    const riEA = { t: tEAMin, tS: tEAMin, tE: tEAMax, multiplicity: 1 };
    const riEB = { t: tEBMin, tS: tEBMin, tE: tEBMax, multiplicity: 1 };
    return [
        {
            p: getPFromBox(boxS), kind: 5, box: boxS,
            t1: riSA.t, ri1: riSA,
            t2: riSB.t, ri2: riSB
        }, {
            p: getPFromBox(boxE), kind: 5, box: boxE,
            t1: riEA.t, ri1: riEA,
            t2: riEB.t, ri2: riEB
        }
    ];
}
/** @internal */
function sub2Ulp(v) {
    return nextDown(nextDown(v));
}
/** @internal */
function add2Ulp(v) {
    return nextUp(nextUp(v));
}
/** @internal */
function getMinMaxT(t) {
    if (t === 0 || t === 1) {
        return [t, t];
    }
    const tMin = sub2Ulp(t);
    const tMax = add2Ulp(t);
    return [tMin, tMax];
}
export { getEndpointIntersections };
//# sourceMappingURL=get-endpoint-intersections.js.map