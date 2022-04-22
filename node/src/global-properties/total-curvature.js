import { getInterfaceRotation } from '../simultaneous-properties/get-interface-rotation.js';
import { fromTo2 } from "../transformation/split/from-to/from-to-2.js";
import { fromTo3 } from "../transformation/split/from-to/from-to-3.js";
import { classify } from '../global-properties/classification/classify.js';
import { getInflections } from "./get-inflections.js";
const 𝜋 = Math.PI;
const abs = Math.abs;
/**
 * Returns the total absolute curvature of the given bezier curve over the
 * given interval
 *
 * * the result is given in radians.
 *
 * @param ps a cubic bezier
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
        const ps_ = fromTo3(ps, tS, tE).ps;
        const ts = [0, ...getInflections(ps_), 1];
        let total = 0;
        for (let i = 0; i < ts.length - 1; i++) {
            total += abs(totalCurvature(ps_, [ts[i], ts[i + 1]]));
        }
        return total;
    }
    throw new Error('The given bezier curve must be of order <= 3.');
}
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
        const ps_ = fromTo2(ps, tS, tE).ps;
        const [[x0, y0], [x1, y1], [x2, y2]] = ps_;
        const tanS = [x1 - x0, y1 - y0];
        const tanE = [x2 - x1, y2 - y1];
        // guaranteed: |θ| <= 𝜋, curvature = θ
        return getInterfaceRotation(tanS, tanE);
    }
    if (ps.length === 4) {
        // guaranteed: curvature <= 2𝜋
        const ps_ = fromTo3(ps, tS, tE).ps;
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
export { totalCurvature, totalAbsoluteCurvature };
//# sourceMappingURL=total-curvature.js.map