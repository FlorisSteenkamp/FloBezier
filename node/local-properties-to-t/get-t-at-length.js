import { brent } from "flo-poly";
import { length } from "../global-properties/length/length.js";
/**
 * Returns the `t` parameter value where the given bezier curve reaches the
 * given length `s` starting from `t = 0` and clipping at `t = 1.125`.
 *
 * @param ps an order 0,1,2 or 3 bezier curve given by an ordered array of its
 * control points, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param s the length
 *
 * @doc mdx
 */
function getTAtLength(ps, s) {
    if (s === 0) {
        return 0;
    }
    const lenAtT = (t) => length([0, t], ps);
    return brent(t => (lenAtT(t) - s), 0, 1.125);
}
export { getTAtLength };
//# sourceMappingURL=get-t-at-length.js.map