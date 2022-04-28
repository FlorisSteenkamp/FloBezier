import { lineToCubic } from "./line-to-cubic.js";
import { quadraticToCubic } from "./quadratic-to-cubic.js";
/**
 * Returns a cubic bezier curve that is equivalent to the given linear or
 * quadratic bezier curve.
 *
 * Cubics are just returned unaltered.
 *
 * This function simply uses `lineToCubic` or `quadraticToCubic` internally.
 *
 * @param ps an order 0,1,2 or 3 bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 *
 * @doc mdx
 */
function toCubic(ps) {
    if (ps.length === 4) { // Cubic
        return ps;
    }
    if (ps.length === 3) { // Quadratic
        return quadraticToCubic(ps);
    }
    if (ps.length === 2) { // Linear
        return lineToCubic(ps);
    }
    if (ps.length === 1) { // Point
        const p = ps[0];
        return [p, p, p, p];
    }
    throw new Error('The given bezier curve must be of order <= 3.');
}
export { toCubic };
//# sourceMappingURL=to-cubic.js.map