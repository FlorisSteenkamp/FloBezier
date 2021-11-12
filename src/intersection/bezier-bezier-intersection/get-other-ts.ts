/*
import type { RootInterval } from "flo-poly";
import type { X } from './x';
import { getIntervalBox } from "../../global-properties/bounds/get-interval-box/get-interval-box.js";
import { intersectBoxes } from "../../boxes/intersect-boxes.js";
import { bezierBezierIntersectionBoundless } from './bezier-bezier-intersection-boundless.js';


/**
 * Returns the ordered (first ps1, then ps2) intersection pairs given the two
 * curves that intersect and the t values of the **second** curve. The `t`
 * values of the second curve can be found using bezierBezierIntersection
 * 
 * * if the `t` values given is `undefined`, `undefined` is returned 
 * * if it is an empty array, an empty array is returned. 
 * * if the t values given is not an empty array and it turns out the curves 
 * are in the same k family then undefined is returned.
 * 
 * @param ps1 the first bezier
 * @param ps2 the second bezier
 * @param ts2 the `t` values of the second bezier
 *//*
 function getOtherTs(
        ps1: number[][], 
        ps2: number[][],
        ts2: RootInterval[]): X[][] {

    if (ts2 === undefined) { 
        // infinite number of intersections
        return undefined; 
    }
    if (ts2.length === 0) { return []; }

    let ts1 = bezierBezierIntersectionBoundless(ps2, ps1);
    if (ts1 === undefined) { 
        // infinite number of intersections
        return undefined; 
    } 
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


export { getOtherTs }
*/