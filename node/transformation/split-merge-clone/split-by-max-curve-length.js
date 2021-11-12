import { lengthUpperBound } from "../../global-properties/length/length-upper-bound.js";
import { fromTo } from "./from-to.js";
/**
 * Split the order 1, 2 or 3 bezier into pieces (given as an array of parameter
 * (t) values) such that the longest curve length is guaranteed to be lower than
 * the given max length.
 *
 * @param ps
 * @param maxLength
 *
 * @doc
 */
function splitByMaxCurveLength(ps, maxLength) {
    const ts = [0, 1]; // include endpoints
    const tStack = [[0, 1]];
    const fromTo_ = fromTo(ps);
    while (tStack.length) {
        const ts_ = tStack.pop();
        const ps_ = fromTo_(ts_[0], ts_[1]);
        if (lengthUpperBound(ps_) > maxLength) {
            const t = (ts_[0] + ts_[1]) / 2;
            tStack.push([ts_[0], t]);
            tStack.push([t, ts_[1]]);
            ts.push(t);
        }
    }
    ts.sort((a, b) => a - b);
    return ts;
}
export { splitByMaxCurveLength };
//# sourceMappingURL=split-by-max-curve-length.js.map