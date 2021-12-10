import type { RootInterval } from "flo-poly";
import { getIntervalBox, intersectBoxes, X } from "../../../src/index.js";
import { bezierBezierIntersectionBoundless } from "../../../src/intersection/bezier-bezier-intersection/bezier-bezier-intersection-boundless.js";


/**
 * Returns the ordered (first ps1, then ps2) intersection pairs given the two
 * curves that intersect and the t values of the **second** curve. The `t`
 * values of the second curve can be found using bezierBezierIntersection
 * 
 * * If the t values given is undefined, undefined is returned 
 * * if it is an empty array, an empty array is returned. 
 * * If the t values given is not an empty array and it turns out the curves 
 * are in the same k family then undefined is returned.
 * @param ps1 the first bezier
 * @param ps2 the second bezier
 * @param ts2 the t values of the second bezier
 */
 function getOtherTs2(
        ps1: number[][], 
        ps2: number[][],
        ts2: RootInterval[]): X[][] {

    if (ts2 === undefined) { return undefined; } 
    if (ts2.length === 0) { return []; }
    let ts1 = bezierBezierIntersectionBoundless(ps2, ps1);
    if (ts1 === undefined) { return undefined; } 
    if (ts1.length === 0) { return []; }

    let is1 = ts1.map(ri => getIntervalBox(ps1, [ri.tS, ri.tE]));
    let is2 = ts2.map(ri => getIntervalBox(ps2, [ri.tS, ri.tE]));

    let xPairs: X[][] = [];
    for (let i=0; i<ts1.length; i++) {
        let box1 = is1[i];
        for (let j=0; j<ts2.length; j++) {
            let box2 = is2[j];
            let box = intersectBoxes(box1,box2);
            if (box !== undefined) {
                // TODO important - combine boxes to make sense, i.e. combine better
                // e.g. two odd multiplicity boxes should combine to a single even, etc. etc.
                let x1: X = { ri: ts1[i], box, kind: 1 };
                let x2: X = { ri: ts2[j], box, kind: 1 };
                xPairs.push([x1, x2]);
            }
        }
    }

    return xPairs;
}

/*
const dd = 2**50;
// [0.3171301580222361, 0.3171301580329844]
                        0.3171301580329293
// [0.2894548541969393, 0.28945485419694705]
    //0.28945485419694283
    const q = [
    -1.0710337545287276e-34*dd ,
    2.2681540028777008e-19*dd ,
    -0.00012008311033655902*dd ,
    -0.001142131387837363*dd ,
    0.015662870007645515*dd ,
    -0.0001798476560197576*dd ,
    -0.0011283099796060507*dd ,
];

console.log(toCasStr(q));
*/

/*
const dd = 2**50;
const q = [
    -9.639303790758548e-34*dd,
    2.0413386025899307e-18*dd,
    -0.0010807479930290311*dd,
    -0.010279182490536273*dd,
    0.10208626149203272*dd,
    0.010543420623047781*dd,
    -0.013271830520753392*dd
]
console.log(toCasStr(q));
*/

export { getOtherTs2 }