import { mid } from "flo-poly";
import { bezierBezierIntersection } from "../intersection/bezier-bezier-intersection/bezier-bezier-intersection.js";
import { area } from "../global-properties/area.js";
import { fromTo } from "../transformation/split/from-to.js";


/** 
 * Returns the *absolute* area between the two given curves.
 * 
 * * **precondition**: the first and last control points of each curve must be equal
 * * **precondition**: neither curve should have self-intersections else the results
 * are ambiguous
 * * can be used as an excellent error measure of the similarity between the two curves
 * 
 * @doc mdx
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
        
        const tE1 = x === undefined ? 1 : mid(x.ri1);
        const tE2 = x === undefined ? 1 : mid(x.ri2);

        const piece1 = fromTo(ps1, tS1, tE1);
        const piece2 = fromTo(ps2, tS2, tE2);

        tS1 = tE1;
        tS2 = tE2;

        total += Math.abs(area(piece1) - area(piece2));
    }

    return total;
}


export { getAbsAreaBetween }
