import { brent } from "flo-poly";
import { distanceBetween } from "flo-vector2d";
import { ds } from "../local-properties-at-t/ds.js";
import { lengthBez2 } from "../global-properties/length/length-bez2.js";
import { defaultLengthTolerance } from "../global-properties/length/length-bez3.js";
import { getSpeedStationaryPoints } from "../global-properties/length/speed-stationary-points.js";
import { integrateAdaptive } from "../global-properties/length/integrate-adaptive.js";


/**
 * The `t` value at which the result is clipped if the given length exceeds
 * the length of the curve (up to this `t` value).
 *
 * @internal
 */
const tMax = 1.125;


/**
 * Returns the `t` parameter value where the given bezier curve reaches the
 * given length `s` starting from `t = 0`.
 *
 * * typically `0 <= s <= length([0,1], ps)` for which the result is accurate
 * (and `0 <= t <= 1`)
 * * **out-of-range values:** there are no accuracy guarantees for
 * out-of-range values of `s` but the result is still well defined: if `s` is
 * negative `0` is returned and if `s` is larger than the curve length up to
 * `t === 1.125` then `1.125` is returned (i.e. the result is clipped to
 * `[0, 1.125]`)
 * * **order 0:** a point has zero length for all `t` so `0` is returned
 * regardless of the given `s`
 * * the length is calculated in the same way as the `length` function so that
 * `length([0, getTAtLength(ps, s)], ps)` is (very nearly) equal to `s`
 *
 * @param ps an order 0,1,2 or 3 bezier curve given by an ordered array of its
 * control points, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param s the length
 *
 * @doc mdx
 */
function getTAtLength(
        ps: number[][],
        s: number): number {

    if (ps.length === 1) { return 0; }  // a point - any `t` will do

    if (s <= 0) { return 0; }

    if (ps.length === 2) {
        // a line - its length is linear in `t`
        const len = distanceBetween(ps[0], ps[1]);
        if (len === 0) { return tMax; }  // (consistent with the clipping rule)
        const t = s/len;

        return t >= tMax ? tMax : t;
    }

    if (ps.length === 3) {
        // a quadratic - the length has a (cheap) closed form
        const f = (t: number) => lengthBez2([0,t], ps) - s;
        if (f(tMax) <= 0) { return tMax; }

        // `f(0) === -s < 0 < f(tMax)` so the root is bracketed
        return brent(f, 0, tMax);
    }

    // A cubic bezier curve.

    // Split the (extended) curve at the speed stationary points (exactly as
    // the `length` function does) and accumulate the piece lengths until the
    // piece containing the given length is found; only then is a root search
    // performed (within that piece only). This is much faster than naively
    // root-finding on `length([0,t], ps) - s` since the latter repeats all the
    // quadratures on every iteration.
    const ds_ = ds(ps);
    const ts = [0, ...getSpeedStationaryPoints(ps, 0, tMax), tMax];

    // The absolute tolerance is based on an upper bound of the total length
    const tolAbs = defaultLengthTolerance*ds_(0)*tMax +
        defaultLengthTolerance*Math.max(1, s);

    let cum = 0;  // cumulative length at `tS`
    for (let i=0; i<ts.length-1; i++) {
        const tS = ts[i];
        const tE = ts[i+1];

        const cumE = cum + integrateAdaptive(ds_, tS, tE, tolAbs);

        if (s === cumE) { return tE; }

        if (s < cumE) {
            // The length `s` is reached within this piece: find the exact
            // `t` by root-finding. Note that `f(tS) < 0 < f(tE)` so that the
            // root is bracketed as required by `brent`.
            const f = (t: number) => (
                t === tS ? cum - s : cum + integrateAdaptive(ds_, tS, t, tolAbs) - s
            );

            return brent(f, tS, tE);
        }

        cum = cumE;
    }

    return tMax;  // `s` exceeds the curve length up to `tMax` - clip
}


export { getTAtLength }
