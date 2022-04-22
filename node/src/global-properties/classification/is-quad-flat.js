import { squaredDistanceBetween } from 'flo-vector2d';
import { isQuadObtuse } from "./is-quad-obtuse.js";
import { evalDeCasteljau } from '../../local-properties-at-t/t-to-xy/double/eval-de-casteljau.js';
const { max, abs } = Math;
/**
 * Returns `true` if the given quadratic bezier curve is acute (see `isQuadObtuse`)
 * and can be approximated with a line segment with maximum Hausdorff distance
 * <= the given tolerance.
 *
 * @param ps a quadratic bezier curve
 * @param tolerance a maximum Hausdorff distance tolerance; defaults to `2**-10`
 * of the maximum coordinate of the given bezier curve
 *
 * @internal
 */
function isQuadFlat(ps, tolerance) {
    if (isQuadObtuse(ps)) {
        return false;
    }
    const [p0, p1, p2] = ps;
    const [x0, y0] = p0;
    const [x2, y2] = p2;
    if (tolerance === undefined) {
        const [x1, y1] = p1;
        const maxCoordinate = max(abs(x0), abs(y0), abs(x1), abs(y1), abs(x2), abs(y2));
        tolerance = maxCoordinate * 2 ** -10;
    }
    if (x0 === x2 && y0 === y2) {
        const d = squaredDistanceBetween(p0, p1) / 4;
        return d <= tolerance ** 2;
    }
    const [x, y] = evalDeCasteljau(ps, 0.5);
    const numerator = ((y2 - y0) * x - (x2 - x0) * y + x2 * y0 - y2 * x0) ** 2;
    const denominator = squaredDistanceBetween(p0, p2);
    const dSquared = numerator / denominator;
    return dSquared <= tolerance ** 2;
}
export { isQuadFlat };
//# sourceMappingURL=is-quad-flat.js.map