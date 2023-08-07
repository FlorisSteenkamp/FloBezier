import { eAdd, eCompress, eDiff, eMult } from 'big-float-ts';
import { eHorner } from 'flo-poly';
import { toPowerBasis_1stDerivativeDd } from '../to-power-basis/to-power-basis-1st-derivative/double-double/to-power-basis-1st-derivative-dd.js';
import { toPowerBasis_2ndDerivativeDd } from '../to-power-basis/to-power-basis-2nd-derivative/double-double/to-power-basis-2nd-derivative-dd.js';
/**
 * Returns the curvature `κ` of the given linear, quadratic or cubic bezier
 * curve at a specific given parameter value `t`.
 *
 * * returns `Number.NaN` at a cusp - this can be tested for with `Number.isNaN`
 *
 * @param ps an order 1,2 or 3 bezier curve, e.g. `[[[0],[0]],[[1],[1]],[[2],[1]],[[2],[0]]]`
 * @param t the parameter value where the curvature should be evaluated
 */
function eCurvature(ps, t) {
    const [dX, dY] = toPowerBasis_1stDerivativeDd(ps);
    const [ddX, ddY] = toPowerBasis_2ndDerivativeDd(ps);
    const dx = eHorner(dX, t);
    const dy = eHorner(dY, t);
    const ddx = eHorner(ddX, t);
    const ddy = eHorner(ddY, t);
    const a = eCompress(eDiff(eMult(dx, ddy), eMult(dy, ddx)));
    const _b = eCompress(eAdd(eMult(dx, dx), eMult(dy, dy)));
    const __b = eMult(_b, eMult(_b, _b));
    const b = Math.sqrt(__b[__b.length - 1]);
    const a_ = a[a.length - 1];
    return a_ / b;
}
export { eCurvature };
//# sourceMappingURL=e-curvature.js.map