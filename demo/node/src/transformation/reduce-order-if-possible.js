import { isCubicReallyQuad } from '../global-properties/classification/is-cubic-really-quad.js';
import { cubicToQuadratic } from './degree-or-type/cubic-to-quadratic.js';
import { isQuadReallyLine } from '../global-properties/classification/is-quad-really-line.js';
import { isReallyPoint } from '../global-properties/classification/is-really-point.js';
/**
 * Returns a reduced order version of the given bezier curve *if* it can be
 * represented as such without loss.
 *
 * Crucially, the reduced order bezier will have exactly the same `t` values
 * at specific `x` and `y` coordinates as the original.
 *
 * @param ps an order 0,1,2 or 3 bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 *
 * @doc mdx
 */
function reduceOrderIfPossible(ps) {
    if (ps.length === 4 && isCubicReallyQuad(ps)) {
        ps = cubicToQuadratic(ps);
    }
    if (ps.length === 3 && isQuadReallyLine(ps)) {
        ps = [ps[0], ps[2]];
    }
    if (ps.length === 2 && isReallyPoint(ps)) {
        ps = [ps[0]];
    }
    return ps;
}
export { reduceOrderIfPossible };
//# sourceMappingURL=reduce-order-if-possible.js.map