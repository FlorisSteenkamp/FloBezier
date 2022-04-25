import { gaussQuadrature } from "flo-gauss-quadrature";
import { ds } from "../../local-properties-at-t/ds.js";
import { splitByCurvature } from "../../transformation/split/split-by-curvature.js";
import { fromTo3InclErrorBound } from "../../transformation/split/from-to/from-to-3-incl-error-bound.js";
/**
 * Returns the curve length in the specified interval.
 *
 * @param ps a cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param interval the paramter interval over which the length is to be
 * calculated (often === [0,1]).
 *
 * @internal
 */
function lengthBez3(interval, ps, maxCurviness = 0.4, gaussOrder = 16) {
    const tS = interval[0];
    const tE = interval[1];
    if (tS === tE) {
        return 0;
    }
    const [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = ps;
    // Keep line below to ensure zero length curve returns zero!
    if (x0 === x1 && x1 === x2 && x2 === x3 &&
        y0 === y1 && y1 === y2 && y2 === y3) {
        return 0;
    }
    const ps_ = fromTo3InclErrorBound(ps, tS, tE).ps;
    const ts = splitByCurvature(ps_, maxCurviness);
    let total = 0;
    for (let i = 0; i < ts.length - 1; i++) {
        const tS = ts[i];
        const tE = ts[i + 1];
        total += gaussQuadrature(ds(ps_), [tS, tE], gaussOrder);
    }
    return total;
}
export { lengthBez3 };
//# sourceMappingURL=length-bez3.js.map