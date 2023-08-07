import { ddAddDd, ddDiffDd, ddMultDd } from 'double-double';
import { ddHorner } from 'flo-poly';
import { toPowerBasis_1stDerivativeDd } from '../to-power-basis/to-power-basis-1st-derivative/double-double/to-power-basis-1st-derivative-dd.js';
import { toPowerBasis_2ndDerivativeDd } from '../to-power-basis/to-power-basis-2nd-derivative/double-double/to-power-basis-2nd-derivative-dd.js';
const qmq = ddMultDd;
const qaq = ddAddDd;
const qdq = ddDiffDd;
/**
 * Returns the curvature `κ` of the given linear, quadratic or cubic bezier
 * curve at a specific given parameter value `t`.
 *
 * * returns `Number.NaN` at a cusp - this can be tested for with `Number.isNaN`
 *
 * @param ps an order 1,2 or 3 bezier curve, e.g. `[[[0],[0]],[[1],[1]],[[2],[1]],[[2],[0]]]`
 * @param t the parameter value where the curvature should be evaluated
 */
function ddCurvature(ps, t) {
    const [dX, dY] = toPowerBasis_1stDerivativeDd(ps);
    const [ddX, ddY] = toPowerBasis_2ndDerivativeDd(ps);
    const dx = ddHorner(dX, t);
    const dy = ddHorner(dY, t);
    const ddx = ddHorner(ddX, t);
    const ddy = ddHorner(ddY, t);
    const a = qdq(qmq(dx, ddy), qmq(dy, ddx));
    const _b = qaq(qmq(dx, dx), qmq(dy, dy));
    const __b = qmq(_b, qmq(_b, _b));
    const b = Math.sqrt(__b[1]);
    const a_ = a[1];
    return a_ / b;
}
export { ddCurvature };
//# sourceMappingURL=dd-curvature.js.map