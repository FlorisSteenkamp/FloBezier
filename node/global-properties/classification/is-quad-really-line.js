import { eDiff, eSign, twoSum } from "big-float-ts";
import { γ1 } from "../../error-analysis/error-analysis.js";
const ts = twoSum;
const { abs } = Math;
/**
 * Returns `true` if the given quadratic bezier curve is really a linear curve
 * (or a point), i.e. if all control points collinear *and* it can be converted
 * to an order 1 bezier curve (a line) such that the
 * same `(x,y)` point is returned for the same `t` value, `false` otherwise.
 *
 * * the required condition is met if: `x0 + x2 = 2*x1` and `y0 + y2 = 2*y1`
 * * **exact**: not susceptible to floating point round-off
 *
 * @param ps a quadratic bezier curve given as an array of its control
 * points, e.g. `[[1,2],[5,6],[7,8]]`
 *
 * @doc mdx
 */
function isQuadReallyLine(ps) {
    const [[x0, y0], [x1, y1], [x2, y2]] = ps;
    //if (x0 + x2 === 2*x1) && (y0 + y2 === 2*y1)
    // Calculate an approximation of the above with error bounds and use it as
    // a fast filter.
    const q = x0 + x2;
    const _q_ = abs(q); // the absolute error bound in q (before multiplication by `γ1`)
    const w = q - 2 * x1;
    const w_ = _q_ + abs(w); // the absolute error bound in w (before multiplication by `γ1`)
    // if w cannot possibly be zero, i.e. if the error is smaller than the value
    if (abs(w) - γ1 * w_ > 0) {
        // fast filter passed
        return false;
    }
    const r = y0 + y2;
    const _r_ = abs(r); // the absolute error bound in r (before multiplication by `γ1`)
    const z = r - 2 * y1;
    const z_ = _r_ + abs(z); // the absolute error bound in z (before multiplication by `γ1`)
    // if the error is smaller than the value
    if (abs(z) - γ1 * z_ > 0) {
        // fast filter passed
        return false;
    }
    // unable to filter - go slow and exact
    return (eSign(eDiff(ts(x0, x2), [2 * x1])) === 0 &&
        eSign(eDiff(ts(y0, y2), [2 * y1])) === 0);
}
export { isQuadReallyLine };
//# sourceMappingURL=is-quad-really-line.js.map