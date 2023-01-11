import { gaussQuadrature } from "flo-gauss-quadrature";
import { curvature } from '../local-properties-at-t/curvature.js';
import { classify } from "./classification/classify.js";
import { splitByCurvature } from '../transformation/split/split-by-curvature.js';
import { fromToInclErrorBound } from "../transformation/split/from-to-incl-error-bound.js";
import { evaluate2ndDerivative } from "../local-properties-at-t/evaluate-2nd-derivative/double/evaluate-2nd-derivative.js";
import { tangent } from "../local-properties-at-t/tangent/double/tangent.js";
const { sqrt } = Math;
/**
 * Returns the bending energy of the given bezier curve.
 *
 * @param ps an order 0,1,2 or 3 bezier curve given by an ordered array of its
 * control points, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 *
 * @doc mdx
 */
function getBendingEnergy(ps, maxCurviness = 1.01, gaussOrder = 64) {
    const k = (t) => curvature(ps, t);
    const c = classify(ps);
    if (c.realOrder === 3) {
        if (c.collinear) {
            return 0;
        }
        if (c.nodeType === 'cusp') {
            return Number.POSITIVE_INFINITY;
        }
        // it is a well behaved 'acnode', 'crunode' or 'explicit'
        return getBendingEnergyByGauss(ps, maxCurviness, gaussOrder);
    }
    if (c.realOrder === 2) {
        // TODO
    }
    return 0;
}
/**
 * Returns an estimate of the bending energy of the given bezier curve.
 *
 * @param ps
 * @param maxCurviness maximum curviness (must be > 0) as calculated using the
 * curviness function (which measures the total angle in radians formed by the
 * vectors formed by the ordered control points)
 * @param gaussOrder
 */
function getBendingEnergyByGauss(ps, maxCurviness, gaussOrder) {
    if (ps.length <= 2) {
        return 0;
    }
    const ts = splitByCurvature(ps, maxCurviness);
    let total = 0;
    for (let i = 0; i < ts.length - 1; i++) {
        const tS = ts[i];
        const tE = ts[i + 1];
        const ps_ = fromToInclErrorBound(ps, tS, tE).ps;
        total += gaussQuadrature(κi(ps_), [0, 1], gaussOrder);
    }
    return total;
}
// TODO - not sure if this function is correct. 
// For insight: https://faculty.sites.iastate.edu/jia/files/inline-files/curvature.pdf
function κi(ps) {
    return (t) => {
        const [dx, dy] = tangent(ps, t);
        const [ddx, ddy] = evaluate2ndDerivative(ps, t);
        const a = (dx * ddy - dy * ddx) ** 2;
        const b = sqrt((dx * dx + dy * dy) ** 5);
        return a / b;
    };
}
export { getBendingEnergy };
//# sourceMappingURL=get-bending-energy.js.map