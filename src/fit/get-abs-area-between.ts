import { mid } from "flo-poly";
import { bezierBezierIntersection } from "../intersection/bezier-bezier-intersection/bezier-bezier-intersection.js";
import { fromTo } from "../transformation/split/from-to.js";
import { area } from "../global-properties/area.js";


/** 
 * Returns the *absolute* area between the two given curves.
 * 
 * * **precondition**: the first and last control points of each curve must equal
 * * can be used as an error measure of the similarity between the two curves
 */
function getAbsAreaBetween(
        ps1: number[][], 
        ps2: number[][]) {

    const xs = bezierBezierIntersection(ps1, ps2);
    let tS1 = 0;
    let tS2 = 0;
    let total = 0;
    for (let i=0; i<xs.length+1; i++) {
        const x = xs[i];
        
        const tE1 = x === undefined ? 1 : mid(x[0].ri);
        const tE2 = x === undefined ? 1 : mid(x[1].ri);

        const piece1 = fromTo(ps1, tS1, tE1).ps;
        const piece2 = fromTo(ps2, tS2, tE2).ps;

        tS1 = tE1;
        tS2 = tE2;

        total += Math.abs(area(piece1) - area(piece2));
    }

    return total;
}


export { getAbsAreaBetween }
