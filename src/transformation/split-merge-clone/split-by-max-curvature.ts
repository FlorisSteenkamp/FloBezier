import { fromTo } from "./from-to";
import { flatness } from "../../global-properties/flatness";


/**
 * Split the order 1, 2 or 3 bezier into pieces (given as an array of parameter 
 * (t) values) such that each piece is flat within a given tolerance given by
 * the flatness function.
 * 
 * @param ps 
 * @param tolerance maximum tolerance (must be > 1) for flatness measure.
 * 
 * @doc
 */
function splitByMaxCurvature(
        ps: number[][], 
        tolerance: number = 1.1) {

    let ts: number[] = [0,1]; // include endpoints
    let tStack: number[][] = [[0,1]];
    let fromTo_ = fromTo(ps);

    while (tStack.length) {
        let ts_ = tStack.pop();
        let ps_ = fromTo_(ts_[0], ts_[1]);
        //lengthUpperBound(ps) / distanceBetween(ps[0], ps[ps.length-1])
        if (flatness(ps_) > tolerance) {
            let t = (ts_[0] + ts_[1]) / 2;
            tStack.push([ts_[0], t]);
            tStack.push([t, ts_[1]]);
            ts.push(t);
        }
    }

    ts.sort((a,b) => a-b);

    return ts;
}


export { splitByMaxCurvature }
