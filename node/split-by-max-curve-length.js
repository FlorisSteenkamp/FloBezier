"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const length_upper_bound_1 = require("./length-upper-bound");
const from_to_1 = require("./from-to");
/**
 * Split the order 1, 2 or 3 bezier into pieces (given as an array of parameter
 * (t) values) such that the longest curve length is guaranteed to be lower than
 * the given max length.
 * @param ps
 * @param maxLength
 */
function splitByMaxCurveLength(ps, maxLength) {
    let ts = [0, 1]; // include endpoints
    let tStack = [[0, 1]];
    let fromTo_ = from_to_1.fromTo(ps);
    while (tStack.length) {
        let ts_ = tStack.pop();
        let ps_ = fromTo_(ts_[0], ts_[1]);
        if (length_upper_bound_1.lengthUpperBound(ps_) > maxLength) {
            let t = (ts_[0] + ts_[1]) / 2;
            tStack.push([ts_[0], t]);
            tStack.push([t, ts_[1]]);
            ts.push(t);
        }
    }
    ts.sort((a, b) => a - b);
    return ts;
}
exports.splitByMaxCurveLength = splitByMaxCurveLength;
//# sourceMappingURL=split-by-max-curve-length.js.map