import { mid } from "flo-poly";
import { bezierBezierIntersection } from "../intersection/bezier-bezier-intersection/bezier-bezier-intersection.js";
import { fromTo } from "../intersection/bezier3-intersection/from-to/from-to.js";
import { area } from "../global-properties/area.js";


/** 
 * Returns the *absolute* area between the two given curves.
 * 
 * * *precondition:* the first and last control points of each curve must equal
 * * can be used as an error measure of the similarity between the two curves
 */
function getAbsAreaBetween(
        ps1: number[][], 
        ps2: number[][]) {

    const ps2Reversed = ps2.slice().reverse();
    const xs = bezierBezierIntersection(ps1, ps2Reversed);//?
    let tSq = 0;
    let tPrevC = undefined;
    let total = 0;
    for (let i=0; i<xs.length+1; i++) {
        const x = xs[i];
        
        const tEq = x === undefined ? 1 : mid(x[0].ri);
        const tSc = x === undefined ? 0 : mid(x[1].ri);

        const tEc = i === 0 ? 1 : tPrevC!;

        const piece1 = fromTo(ps1, tSq, tEq).ps;
        const piece2 = fromTo(ps2Reversed, tSc, tEc).ps;

        tSq = tEq;
        tPrevC = tSc;

        const areaPiece1 = area(piece1);
        const areaPiece2 = area(piece2);

        total += Math.abs(areaPiece1 + areaPiece2);
    }

    return total;
}


export { getAbsAreaBetween }
