import { reduceOrderIfPossible } from "../../transformation/reduce-order-if-possible.js";
import { getAB1 } from "./get-ab1.js";
import { getAB2 } from "./get-ab2.js";
import { getAB3 } from "./get-ab3.js";
import { getIntervalBox } from "../../global-properties/bounds/get-interval-box/get-interval-box.js";
import { sub1Ulp } from "../../sub-1-ulp.js";
import { add1Ulp } from "../../add-1-ulp.js";
import { intersectBoxes } from "../../boxes/intersect-boxes.js";
// TODO - test with boolean op
/**
 * Returns the intersection range (given as 2 pairs of intersections (`X`s) with
 * the intersection of `ps1` always the first entry of each pair) where the
 * endpoints of the two given *algebraically identical* curves
 * overlap (provided they overlap).
 *
 * * **precondition:** the two given curves must be *algebraically identical*
 * (i.e. identical except possibly for endpoints). This can be checked for by
 * calling [[areBeziersInSameKFamily]]. TODO
 *
 * * **precondition**: not all bezier control points collinear
 *
 * @param psA an order 1,2 or 3 bezier curve
 * @param psB another bezier curve
 *
 * @internal
 */
function getEndpointIntersections(psA, psB, orderAlreadyReduced = false) {
    if (!orderAlreadyReduced) {
        psA = reduceOrderIfPossible(psA);
        psB = reduceOrderIfPossible(psB);
    }
    // `psB.length` should equal `psB.length` (due to precondition)
    const getABs = [, , getAB1, getAB2, getAB3];
    const [tA_B0, tA_B1] = getABs[psA.length](psA, psB);
    const [tB_A0, tB_A1] = getABs[psA.length](psB, psA);
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
        return [[
                { ri: { tS: tA, tE: tA, multiplicity: 1 }, kind: 4, box },
                { ri: { tS: tB, tE: tB, multiplicity: 1 }, kind: 4, box }
            ]];
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
    return [
        [
            { ri: { tS: tSAMin, tE: tSAMax, multiplicity: 1 }, kind: 5, box: boxS },
            { ri: { tS: tSBMin, tE: tSBMax, multiplicity: 1 }, kind: 5, box: boxS }
        ], [
            { ri: { tS: tEAMin, tE: tEAMax, multiplicity: 1 }, kind: 5, box: boxE },
            { ri: { tS: tEBMin, tE: tEBMax, multiplicity: 1 }, kind: 5, box: boxE }
        ]
    ];
}
/** @internal */
function sub2Ulp(v) {
    return sub1Ulp(sub1Ulp(v));
}
/** @internal */
function add2Ulp(v) {
    return add1Ulp(add1Ulp(v));
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