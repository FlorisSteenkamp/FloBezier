import { eHorner } from 'flo-poly';
import { toPowerBasis_1stDerivativeExact } from '../../../to-power-basis/to-power-basis-1st-derivative/exact/to-power-basis-1st-derivative-exact.js';
/**
 * Returns the `[x,y]` value of the once differentiated (with respect to `t`)
 * bezier curve's power basis when evaluated at `t`.
 *
 * * uses double precision calculations internally
 *
 * @param ps a linear, quadratic or cubic bezier, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param t the t parameter
 *
 * @doc
 */
function evaluatePowerBasis_1stDerivativeExact(ps, t) {
    const [dX, dY] = toPowerBasis_1stDerivativeExact(ps);
    return [eHorner(dX, t), eHorner(dY, t)];
}
export { evaluatePowerBasis_1stDerivativeExact };
//# sourceMappingURL=evaluate-power-basis-1st-derivative-exact.js.map