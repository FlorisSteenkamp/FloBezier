import { ddHorner } from 'flo-poly';
import { toPowerBasis_1stDerivativeDd } from '../../../to-power-basis/to-power-basis-1st-derivative/double-double/to-power-basis-1st-derivative-dd.js';
/**
 * Returns the tangent vector (in double-double precision not necessarily of
 * unit length) of an order 0,1,2 or 3 bezier curve at a specific given
 * parameter value `t`, i.e. returns the `[x,y]` value of the once
 * differentiated (with respect to `t`) bezier curve's power basis when
 * evaluated at `t`.
 *
 * @param ps a linear, quadratic or cubic bezier, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param t the `t` parameter
 *
 * @doc mdx
 */
function ddTangent(ps, t) {
    const [dX, dY] = toPowerBasis_1stDerivativeDd(ps);
    return [
        ddHorner(dX, t),
        ddHorner(dY, t)
    ];
}
export { ddTangent };
//# sourceMappingURL=dd-tangent.js.map