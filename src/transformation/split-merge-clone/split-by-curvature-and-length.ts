import { fromTo } from "./from-to.js";
import { lengthUpperBound } from "../../global-properties/length/length-upper-bound.js";
import { distanceBetween } from "flo-vector2d";


/**
 * Split the order 1, 2 or 3 bezier into pieces (given as an array of parameter 
 * (t) values) such that each piece is flat within a given tolerance given by
 * maxFlatness and maxLength.
 * 
 * @param ps 
 * @param maxFlatness
 * @param maxLength
 * 
 * @doc
 */
function splitByCurvatureAndLength(
        ps: number[][], 
        maxFlatness: number = 1.001,
        maxLength: number = 10) {

    const ts: number[] = [0,1]; // include endpoints
    const tStack: number[][] = [[0,1]];
    const fromTo_ = fromTo(ps);

    while (tStack.length) {
        // Tell TypeScript there *is* something in the stack.
        const ts_ = tStack.pop()!;
        const ps_ = fromTo_(ts_[0], ts_[1]);
        const l1 = lengthUpperBound(ps_);
        const l2 = distanceBetween(ps_[0], ps_[ps_.length-1]);
        const flatness_ = 1 + (l1/l2 - 1)*(l1/maxLength);
        if (flatness_ > maxFlatness) {
            const t = (ts_[0] + ts_[1]) / 2;
            tStack.push([ts_[0], t]);
            tStack.push([t, ts_[1]]);
            ts.push(t);
        }
    }

    ts.sort((a,b) => a-b);

    return ts;
}


export { splitByCurvatureAndLength }
