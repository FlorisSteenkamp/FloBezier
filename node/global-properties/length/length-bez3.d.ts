/**
 * The default relative error tolerance used when calculating curve lengths.
 *
 * * note that the error estimate used internally is conservative so that the
 * actual error is typically much smaller than this
 *
 * @internal
 */
declare const defaultLengthTolerance: number;
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
declare function lengthBez3(interval: number[], ps: number[][], tolerance?: number): number;
export { lengthBez3, defaultLengthTolerance };
