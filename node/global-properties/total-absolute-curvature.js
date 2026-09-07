import { fromTo3InclErrorBound } from "../transformation/split/from-to/from-to-3-incl-error-bound.js";
import { getInflections } from "./get-inflections.js";
import { totalCurvature } from './total-curvature.js';
const { abs } = Math;
/**
 * Returns the total absolute curvature of the given bezier curve over the
 * given interval
 *
 * * the result is given in radians.
 *
 * @param ps an order 0,1,2 or 3 bezier curve given as an array of its control
 * points, e.g. `[[1,2],[3,4],[5,6],[7,8]]`
 * @param interval
 *
 * @doc mdx
 */
function totalAbsoluteCurvature(ps, interval = [0, 1]) {
    if (ps.length <= 3) {
        return abs(totalCurvature(ps, interval));
    }
    if (ps.length === 4) {
        const [tS, tE] = interval;
        if (tS === tE) {
            return 0;
        }
        const ps_ = fromTo3InclErrorBound(ps, tS, tE).ps;
        const ts = [0, ...getInflections(ps_), 1];
        let total = 0;
        for (let i = 0; i < ts.length - 1; i++) {
            total += abs(totalCurvature(ps_, [ts[i], ts[i + 1]]));
        }
        return total;
    }
    throw new Error('The given bezier curve must be of order <= 3.');
}
export { totalAbsoluteCurvature };
//# sourceMappingURL=total-absolute-curvature.js.map