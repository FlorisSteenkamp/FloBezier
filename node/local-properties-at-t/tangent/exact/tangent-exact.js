import { eHorner } from 'flo-poly';
import { toPowerBasis_1stDerivativeExact } from '../../../to-power-basis/to-power-basis-1st-derivative/exact/to-power-basis-1st-derivative-exact.js';
/**
 * Returns the *exact* tangent vector (not necessarily of unit length) of an
 * order 0,1,2 or 3 bezier curve at a specific parameter `t`, i.e.
 * returns the `[x,y]` value of the once differentiated (with respect to `t`)
 * bezier curve's power basis when evaluated at `t`.
 *
 * * Alias: `tangentExact`
 *
 * @param ps a linear, quadratic or cubic bezier, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param t the t parameter
 *
 * @doc
 */
const eTangent = tangentExact;
/**
 * Returns the *exact* tangent vector (not necessarily of unit length) of an
 * order 0,1,2 or 3 bezier curve at a specific parameter `t`, i.e.
 * returns the `[x,y]` value of the once differentiated (with respect to `t`)
 * bezier curve's power basis when evaluated at `t`.
 *
 * * Alias: `eTangent`
 *
 * @param ps a linear, quadratic or cubic bezier, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param t the t parameter
 *
 * @doc
 */
function tangentExact(ps, t) {
    const [dX, dY] = toPowerBasis_1stDerivativeExact(ps);
    return [eHorner(dX, t), eHorner(dY, t)];
}
export { tangentExact, eTangent };
//# sourceMappingURL=tangent-exact.js.map