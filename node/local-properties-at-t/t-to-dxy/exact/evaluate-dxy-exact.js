import { eHorner } from 'flo-poly';
import { toPowerBasis_1stDerivativeExact } from '../../../to-power-basis/to-power-basis-1st-derivative/exact/to-power-basis-1st-derivative-exact.js';
/**
 * Returns the `[x,y]` value of the once differentiated (with respect to `t`)
 * bezier curve when evaluated at `t`. This function is curried.
 *
 * * uses double precision calculations internally
 *
 * @param ps a linear, quadratic or cubic bezier, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param t the t parameter
 *
 * @doc mdx
 */
function evaluateDxyExact(ps, t) {
    const [dX, dY] = toPowerBasis_1stDerivativeExact(ps);
    return [eHorner(dX, t), eHorner(dY, t)];
}
export { evaluateDxyExact };
//# sourceMappingURL=evaluate-dxy-exact.js.map