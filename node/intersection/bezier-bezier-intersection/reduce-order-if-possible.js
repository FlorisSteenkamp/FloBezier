import { isCubicReallyQuad } from '../../global-properties/classification/is-cubic-really-quad.js';
import { toQuadraticFromCubic } from '../../transformation/degree-or-type/to-quadratic-from-cubic.js';
import { isQuadReallyLine } from '../../global-properties/classification/is-quad-really-line.js';
import { isReallyPoint } from '../../global-properties/classification/is-really-point.js';
/**
 * Returns a reduced order version of the given bezier curve if it can be
 * represented as such without loss.
 *
 * Crucially, the reduced order bezier will have exactly the same `t` values
 * at specific `x` and `y` coordinates as the originals.
 *
 * @param ps1
 * @param ps2
 *
 * @internal
 */
function reduceOrderIfPossible(ps) {
    if (ps.length === 4 && isCubicReallyQuad(ps)) {
        ps = toQuadraticFromCubic(ps);
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