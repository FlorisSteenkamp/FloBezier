import { getInterfaceRotation } from '../simultaneous-properties/get-interface-rotation.js';
import { fromTo2InclErrorBound } from "../transformation/split/from-to/from-to-2-incl-error-bound.js";
import { fromTo3InclErrorBound } from "../transformation/split/from-to/from-to-3-incl-error-bound.js";
import { classify } from './classification/classify.js';
const { PI: 𝜋 } = Math;
/**
 * Returns the total curvature of the bezier over the given interval.
 *
 * * the result is given in radians.
 *
 * @param ps a cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param interval the interval of integration (often === [0,1])
 *
 * @doc mdx
 */
function totalCurvature(ps, interval = [0, 1]) {
    if (ps.length <= 2) {
        return 0;
    }
    const [tS, tE] = interval;
    if (tS === tE) {
        return 0;
    }
    if (ps.length === 3) {
        const ps_ = fromTo2InclErrorBound(ps, tS, tE).ps;
        const [[x0, y0], [x1, y1], [x2, y2]] = ps_;
        const tanS = [x1 - x0, y1 - y0];
        const tanE = [x2 - x1, y2 - y1];
        // guaranteed: |θ| <= 𝜋, curvature = θ
        return getInterfaceRotation(tanS, tanE);
    }
    if (ps.length === 4) {
        // guaranteed: curvature <= 2𝜋
        const ps_ = fromTo3InclErrorBound(ps, tS, tE).ps;
        const bezClass = classify(ps_);
        const [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = ps_;
        const tanS = [x1 - x0, y1 - y0];
        const tanM = [x2 - x1, y2 - y1];
        const tanE = [x3 - x2, y3 - y2];
        if ((tanM[0] === 0 && tanM[1] === 0) ||
            bezClass.realOrder <= 2) {
            return getInterfaceRotation(tanS, tanE);
        }
        const cpθ = getInterfaceRotation(tanS, tanM) +
            getInterfaceRotation(tanM, tanE);
        if (bezClass.nodeType === 'acnode' ||
            bezClass.nodeType === 'cusp') {
            return cpθ <= -𝜋
                ? cpθ + 2 * 𝜋
                : cpθ >= +𝜋
                    ? cpθ - 2 * 𝜋
                    : cpθ;
        }
        return cpθ;
    }
    throw new Error('The given bezier curve must be of order <= 3.');
}
export { totalCurvature };
//# sourceMappingURL=total-curvature.js.map