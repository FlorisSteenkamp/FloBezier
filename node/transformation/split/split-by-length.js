import { controlPointLinesLength } from "../../global-properties/length/control-point-lines-length.js";
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
function splitByLength(ps, maxLength) {
    const head = { r: [0, 1] };
    let n = head;
    while (n !== undefined) {
        const ts_ = n.r;
        const ps_ = fromTo(ps, ts_[0], ts_[1]);
        if (controlPointLinesLength(ps_) <= maxLength) {
            n = n.next;
            continue;
        }
        const t = (ts_[0] + ts_[1]) / 2;
        const L = [ts_[0], t];
        const R = [t, ts_[1]];
        n.r = L;
        n.next = { r: R, next: n.next };
    }
    n = head;
    const ts = [];
    while (n !== undefined) {
        ts.push(n.r[0]);
        if (n.next === undefined) {
            ts.push(n.r[1]);
        }
        n = n.next;
    }
    return ts;
}
export { splitByLength };
//# sourceMappingURL=split-by-length.js.map