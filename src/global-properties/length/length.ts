import { lengthBez1 } from './length-bez1.js';
import { lengthBez2 } from './length-bez2.js';
import { lengthBez3, defaultLengthTolerance } from './length-bez3.js';


/**
 * Returns the curve length (for a linear, quadratic or cubic bezier curve) in
 * the specified interval.
 *
 * * lines and quadratic bezier curves are calculated using (numerically
 * stable) closed form expressions
 * * cubic bezier curves are calculated using adaptive Gauss-Kronrod quadrature
 * (with tanh-sinh quadrature as a fallback near cusps) after first splitting
 * the interval at the points where the speed is stationary (so that (near)
 * cusps always lie at sub-interval endpoints where the quadrature can handle
 * them)
 * * **accuracy:** typically within a few ulps (relative) of the true length;
 * one exception is a tiny interval straddling a (near) cusp of a cubic in 
 * which case the *relative* error is limited by the cancellation in 
 * evaluating the derivative in double precision near the cusp (the *absolute*
 * error is still tiny relative to the total curve length though)
 *
 * @param interval the paramter interval over which the length is
 * to be calculated (typically `[0,1]`)
 * @param ps an order 0,1,2 or 3 bezier curve given as an array of its control
 * points, e.g. `[[1,2],[3,4],[5,6],[7,8]]`
 * @param tolerance optional; defaults to `2**-44`; the (approximate) relative
 * error tolerance (only relevant for cubic bezier curves); note that the error
 * estimate used internally is conservative so that the actual error is
 * typically much smaller; values below `2**-45` are clamped to `2**-45`
 *
 * @doc mdx
 */
function length(
        interval: number[],
        ps: number[][],
        tolerance = defaultLengthTolerance): number {

    if (ps.length === 4) {
        return lengthBez3(interval, ps, tolerance);
    }

    if (ps.length === 3) {
        return lengthBez2(interval, ps);
    }

    if (ps.length === 2) {
        return lengthBez1(interval, ps);
    }

    if (ps.length === 1) {
        return 0;
    }

    throw new Error('The given bezier curve must be of order <= 3.');
}


export { length }
