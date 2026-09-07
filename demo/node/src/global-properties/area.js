import { integrate, multiply, subtract } from "flo-poly";
import { toPowerBasis } from '../to-power-basis/to-power-basis/double/to-power-basis.js';
import { toPowerBasis_1stDerivative } from '../to-power-basis/to-power-basis-1st-derivative/double/to-power-basis-1st-derivative.js';
/**
 * Returns the signed area swept out by the radius vector from the origin to
 * the curve as `t` goes from `0` to `1`, i.e. the curve's contribution to the
 * closed-loop Green's-theorem integral `½∮(x·dy − y·dx)`.
 *
 * Note this value is origin-dependent: it equals the signed area enclosed by
 * the curve together with the two straight segments joining the origin to its
 * first and last control points. To obtain the (translation-invariant) area
 * between the curve and the chord joining its endpoints, add the chord's
 * contribution, e.g. `area(ps) + area([ps[ps.length-1], ps[0]])`.
 *
 * @param ps an order 1,2 or 3 bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 */
function area(ps) {
    const [x, y] = toPowerBasis(ps);
    const [dx, dy] = toPowerBasis_1stDerivative(ps);
    const poly = integrate(subtract(multiply(x, dy), multiply(y, dx)), 0);
    // the below is exactly te same as: Horner(poly,1) - Horner(poly,0)
    let total = 0;
    for (let i = 0; i < poly.length; i++) {
        total += poly[i];
    }
    return total / 2;
}
export { area };
//# sourceMappingURL=area.js.map