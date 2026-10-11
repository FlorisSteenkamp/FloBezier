import { ds } from "../../local-properties-at-t/ds.js";
import { getSpeedStationaryPoints } from "./speed-stationary-points.js";
import { integrateBetweenBreakpoints } from "./integrate-adaptive.js";
/**
 * The default relative error tolerance used when calculating curve lengths.
 *
 * * note that the error estimate used internally is conservative so that the
 * actual error is typically much smaller than this
 *
 * @internal
 */
const defaultLengthTolerance = 2 ** -44;
/**
 * The minimum relative error tolerance for calculating curve lengths - lower
 * tolerances are clamped to this value since the Gauss-Kronrod error estimate
 * has a floor of `50*eps` (relative) and lower tolerances would thus never be
 * met (resulting in extremely slow calculations for no gain in accuracy).
 *
 * @internal
 */
const minLengthTolerance = 2 ** -45;
/**
 * Returns the curve length of the given cubic bezier curve within the
 * specified parameter interval.
 *
 * * the speed (i.e. `|B'(t)|`) is integrated using adaptive Gauss-Kronrod
 * quadrature (with tanh-sinh quadrature as a fallback near cusps) after first
 * splitting the interval at the points where the speed is stationary (so that
 * (near) cusps always lie at sub-interval endpoints where the quadrature can
 * handle them)
 *
 * @param interval the paramter interval over which the length is
 * to be calculated (often `[0,1]`)
 * @param ps a cubic bezier curve given by an ordered array of its control
 * points, e.g. `[[0,0],[1,1],[2,1],[3,3]]`
 * @param tolerance optional; defaults to `2**-44`; the (approximate) relative
 * error tolerance (the actual error is typically much smaller); values below
 * `2**-45` are clamped to `2**-45`
 *
 * @internal
 */
function lengthBez3(interval, ps, tolerance = defaultLengthTolerance) {
    let tS = interval[0];
    let tE = interval[1];
    if (tS === tE) {
        return 0;
    }
    if (tS > tE) {
        [tS, tE] = [tE, tS];
    }
    const [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = ps;
    // Keep line below to ensure zero length curve returns zero!
    if (x0 === x1 && x1 === x2 && x2 === x3 &&
        y0 === y1 && y1 === y2 && y2 === y3) {
        return 0;
    }
    const ts = [tS, ...getSpeedStationaryPoints(ps, tS, tE), tE];
    if (tolerance < minLengthTolerance) {
        tolerance = minLengthTolerance;
    }
    return integrateBetweenBreakpoints(ds(ps), ts, tolerance);
}
export { lengthBez3, defaultLengthTolerance };
//# sourceMappingURL=length-bez3.js.map