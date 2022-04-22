import { fromTo } from './from-to.js';
import { curviness } from '../../global-properties/curviness.js';
/**
 * Split the order 0,1,2 or 3 bezier curve into pieces (given as an array of
 * parameter `t` values) such that each piece is flat within a given tolerance
 * given by the `curviness` function.
 *
 * @param ps
 * @param maxCurviness maximum curviness (must be > 0) as calculated using
 * the `curviness` function (which measures the total angle in radians formed
 * by the vectors formed by the ordered control points); defaults to `0.4 radians`
 * @param minTSpan the minimum `t` span that can be returned for a bezier piece;
 * necessary for cubics otherwise a curve with a cusp would cause an infinite
 * loop; defaults to `2**-16`
 *
 * @doc
 */
function splitByCurvature(ps, maxCurviness = 0.4, minTSpan = 2 ** -16) {
    const ts = [0, 1]; // include endpoints
    const tStack = [[0, 1]];
    while (tStack.length) {
        const ts_ = tStack.pop();
        if (ts_[1] - ts_[0] <= minTSpan) {
            continue;
        }
        const ps_ = fromTo(ps, ts_[0], ts_[1]).ps;
        const curviness_ = curviness(ps_);
        if (curviness_ > maxCurviness) {
            const t = (ts_[0] + ts_[1]) / 2;
            tStack.push([ts_[0], t]);
            tStack.push([t, ts_[1]]);
            ts.push(t);
        }
    }
    ts.sort((a, b) => a - b);
    return ts;
}
export { splitByCurvature };
//# sourceMappingURL=split-by-curvature.js.map