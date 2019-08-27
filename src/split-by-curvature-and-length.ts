
import { fromTo } from "./from-to";
import { flatness } from "./flatness";
import { lengthUpperBound } from "./length-upper-bound";
import { distanceBetween } from "flo-vector2d";


/**
 * Split the order 1, 2 or 3 bezier into pieces (given as an array of parameter 
 * (t) values) such that each piece is flat within a given tolerance given by
 * maxFlatness and maxLength.
 * @param ps 
 * @param maxFlatness
 * @param maxLength
 */
function splitByCurvatureAndLength(
        ps: number[][], 
        maxFlatness: number = 1.01,
        maxLength: number = 100) {

    let ts: number[] = [0,1]; // include endpoints
    let tStack: number[][] = [[0,1]];
    let fromTo_ = fromTo(ps);

    while (tStack.length) {
        let ts_ = tStack.pop();
        let ps_ = fromTo_(ts_[0], ts_[1]);
        let l1 = lengthUpperBound(ps_);
        let l2 = distanceBetween(ps_[0], ps_[ps_.length-1]);
        //let flatness_ = ((l1 / l2)**1280) * l1;
        let flatness_ = 1 + (l1/l2 - 1)*(l1/maxLength);
        if (flatness_ > maxFlatness) {
            let t = (ts_[0] + ts_[1]) / 2;
            tStack.push([ts_[0], t]);
            tStack.push([t, ts_[1]]);
            ts.push(t);
        }
    }

    ts.sort((a,b) => a-b);

    return ts;
}


export { splitByCurvatureAndLength }
