import { toPowerBasis_1stDerivative } from '../../to-power-basis/to-power-basis-1st-derivative/double/to-power-basis-1st-derivative.js';
import { Horner } from 'flo-poly';
/**
 * Returns a normal vector (not necessarily of unit length) of a bezier curve
 * at a specific given parameter value `t` by simply taking the `tangent` at
 * that point and rotating it by 90 degrees (it is *not* the derivative of the
 * tangent - for that use e.g. [[evaluate2ndDerivative]])
 *
 * @param ps a linear, quadratic or cubic bezier curve given by its control points, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param t the parameter value where the normal should be evaluated
 *
 * @doc mdx
 */
function normal(ps, t) {
    const [dX, dY] = toPowerBasis_1stDerivative(ps);
    return [
        -Horner(dY, t),
        Horner(dX, t)
    ];
}
export { normal };
//# sourceMappingURL=normal.js.map