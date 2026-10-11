/**
 * Numerically integrates the given (non-negative) function over the given
 * interval to within (roughly) the given absolute error tolerance using
 * adaptive bisection with the 15-point Gauss-Kronrod rule (falling back to
 * tanh-sinh quadrature on sub-intervals that fail to converge, e.g. near a
 * cusp).
 *
 * * the error estimate used is conservative so the actual error is typically
 * much smaller than the given tolerance
 * * the tolerance should not be below about `50*eps` times the integral (the
 * floor of the Gauss-Kronrod error estimate) since it could otherwise never
 * be met (resulting in a very slow calculation for no gain in accuracy)
 *
 * @param f the function to integrate
 * @param a the lower integration limit
 * @param b the upper integration limit (must be larger than `a`)
 * @param tolerance the absolute error tolerance
 *
 * @internal
 */
declare function integrateAdaptive(f: (t: number) => number, a: number, b: number, tolerance: number): number;
/**
 * Returns the integral of the given (non-negative) function (typically the
 * speed of a bezier curve) over the interval given by the first and last of
 * the given (ascending) breakpoints to within (roughly) the given *relative*
 * error tolerance by integrating adaptively between consecutive breakpoints.
 *
 * * the breakpoints should include the points where the function is hard to
 * integrate (e.g. the speed minima of a bezier curve)
 *
 * @param f the function to integrate
 * @param ts the breakpoints in ascending order (at least two)
 * @param tolerance the relative error tolerance (should not be below about
 * `50*eps`, see [[integrateAdaptive]])
 *
 * @internal
 */
declare function integrateBetweenBreakpoints(f: (t: number) => number, ts: number[], tolerance: number): number;
export { integrateAdaptive, integrateBetweenBreakpoints };
