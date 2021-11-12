import { fromTo } from "./from-to.js";
import { flatness } from "../../global-properties/flatness.js";
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
function splitByMaxCurvature(ps, tolerance = 1.1) {
    const ts = [0, 1]; // include endpoints
    const tStack = [[0, 1]];
    const fromTo_ = fromTo(ps);
    while (tStack.length) {
        const ts_ = tStack.pop();
        const ps_ = fromTo_(ts_[0], ts_[1]);
        //lengthUpperBound(ps) / distanceBetween(ps[0], ps[ps.length-1])
        if (flatness(ps_) > tolerance) {
            const t = (ts_[0] + ts_[1]) / 2;
            tStack.push([ts_[0], t]);
            tStack.push([t, ts_[1]]);
            ts.push(t);
        }
    }
    ts.sort((a, b) => a - b);
    return ts;
}
export { splitByMaxCurvature };
//# sourceMappingURL=split-by-max-curvature.js.map