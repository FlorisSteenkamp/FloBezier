import { lengthBez1 } from './length-bez1.js';
import { lengthBez2 } from './length-bez2.js';
import { lengthBez3 } from './length-bez3.js';
/**
 * Returns the curve (a linear, quadratic or cubic bezier curve) length in the
 * specified interval calculated using Gaussian Quadrature *with* adaptive
 * subdivision for improved accuracy.
 *
 * @param ps an order 0,1,2 or 3 bezier curve given as an array of its control
 * points, e.g. `[[1,2],[3,4],[5,6],[7,8]]`
 * @param maxCurviness optional maximum 'curviness' (defined as the total angle
 * change between consecutive line segments between the curve control points)
 * before subdivision occurs; defaults to 0.4 radians
 * @param gaussOrder the optional order of the Gaussian Quadrature performed
 * between curve segments; defaults to 16; can be 4,16 or 64
 *
 * @doc mdx
 */
function totalLength(ps, maxCurviness = 0.4, gaussOrder = 16) {
    if (ps.length === 4) {
        return lengthBez3([0, 1], ps, maxCurviness, gaussOrder);
    }
    if (ps.length === 3) {
        return lengthBez2([0, 1], ps, maxCurviness, gaussOrder);
    }
    if (ps.length === 2) {
        return lengthBez1([0, 1], ps);
    }
    if (ps.length === 1) {
        return 0;
    }
    throw new Error('The given bezier curve must be of order <= 3.');
}
export { totalLength };
//# sourceMappingURL=total-length.js.map