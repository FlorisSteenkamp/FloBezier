import { gaussKronrod15 } from "./gauss-kronrod-15.js";
import { tanhSinh } from "./tanh-sinh.js";

const { abs } = Math;


/**
 * The maximum bisection depth of the adaptive Gauss-Kronrod integration before
 * falling back to tanh-sinh quadrature (which is better suited to (near)
 * endpoint singularities).
 *
 * @internal
 */
const maxDepth = 8;


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
function integrateAdaptive(
        f: (t: number) => number,
        a: number,
        b: number,
        tolerance: number): number {

    return refine(f, a, b, gaussKronrod15(f, a, b), tolerance, 0);
}


/** @internal */
function refine(
        f: (t: number) => number,
        a: number,
        b: number,
        r: { value: number; error: number },
        tolerance: number,
        depth: number): number {

    if (r.error <= tolerance) { return r.value; }

    if (depth >= maxDepth) {
        // Bisection is converging too slowly (e.g. due to a (near) cusp at
        // one of the endpoints) - use tanh-sinh quadrature instead.
        return tanhSinh(f, a, b, tolerance).value;
    }

    const m = (a + b)/2;
    const rL = gaussKronrod15(f, a, m);
    const rR = gaussKronrod15(f, m, b);

    // Distribute the error budget proportional to the integral over each half
    // (and not simply half-half) so that the Gauss-Kronrod error estimate
    // floor (which is proportional to the integral of `|f|`) remains
    // attainable on each half.
    const vL = abs(rL.value);
    const vR = abs(rR.value);
    const sum = vL + vR;
    const tolL = sum === 0 ? tolerance/2 : tolerance*vL/sum;
    const tolR = tolerance - tolL;

    return (
        refine(f, a, m, rL, tolL, depth + 1) +
        refine(f, m, b, rR, tolR, depth + 1)
    );
}


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
function integrateBetweenBreakpoints(
        f: (t: number) => number,
        ts: number[],
        tolerance: number): number {

    // Initial estimates (to get the scale for the absolute tolerance)
    const rs: { value: number; error: number }[] = [];
    let total = 0;
    for (let i=0; i<ts.length-1; i++) {
        const r = gaussKronrod15(f, ts[i], ts[i+1]);
        rs.push(r);
        total += r.value;
    }

    if (total === 0) { return 0; }

    const tolAbs = tolerance*total;

    let result = 0;
    for (let i=0; i<ts.length-1; i++) {
        // Distribute the absolute tolerance proportional to the integral over
        // each interval (see `refine`)
        result += refine(f, ts[i], ts[i+1], rs[i], tolAbs*abs(rs[i].value)/total, 0);
    }

    return result;
}


export { integrateAdaptive, integrateBetweenBreakpoints }
