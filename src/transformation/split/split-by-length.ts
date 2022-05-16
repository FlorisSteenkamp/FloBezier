import { controlPointLinesLength } from "../../global-properties/length/control-point-lines-length.js";
import { fromToInclErrorBound } from "./from-to-incl-error-bound.js";
import { fromTo } from "./from-to.js";


/**
 * Split the given bezier curve into pieces (given as an array of parameter 
 * `t` values) such that the longest curve length is guaranteed to be lower than
 * the given max length.
 * 
 * @param ps an order 0,1,2 or 3 bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 * @param maxLength 
 * 
 * @doc mdx
 */
function splitByLength(
        ps: number[][], 
        maxLength: number) {

    const ts: number[] = [0,1]; // include endpoints
    const tStack: number[][] = [[0,1]];

    while (tStack.length) {
        const ts_ = tStack.pop()!;
        const ps_ = fromTo(ps, ts_[0], ts_[1]);
        if (controlPointLinesLength(ps_) > maxLength) {
            const t = (ts_[0] + ts_[1]) / 2;
            tStack.push([ts_[0], t]);
            tStack.push([t, ts_[1]]);
            ts.push(t);
        }
    }

    ts.sort((a,b) => a - b);

    return ts;
}


export { splitByLength }
