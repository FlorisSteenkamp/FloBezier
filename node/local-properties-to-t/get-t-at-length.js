import { toCubic } from "../transformation/degree-or-type/to-cubic.js";
import { length } from "../global-properties/length/length.js";
import { brent } from "flo-poly";
function getTAtLength(ps, s) {
    let ps_ = toCubic(ps);
    const lenAtT = (t) => length([0, t], ps_);
    function f(s) {
        if (s === 0) {
            return 0;
        }
        return brent(t => (lenAtT(t) - s), 0, 1.125);
    }
    // Curry
    return s === undefined ? f : f(s);
}
export { getTAtLength };
//# sourceMappingURL=get-t-at-length.js.map