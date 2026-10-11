import { u } from '../../error-analysis/error-analysis.js';

const { abs, max } = Math;

/**
 * The relative widening applied to the computed squared distances: they are
 * computed with 4 roundings (2 for the squared difference, 1 for the square
 * and 1 for the sum), all of non-negative terms, so their relative error is at
 * most `γ4 ≈ 4u`; `8u` covers that *and* the rounding of the multiplication
 * by `(1 ∓ 8u)` itself (assuming no underflow).
 *
 * @internal
 */
const k = 8*u;


/**
 * Returns an interval, `[min,max]`, guaranteed to contain the squared distance
 * between the given point and any point inside the given (axis-aligned) box.
 *
 * * `min` is (a lower bound of) the squared distance to the point of the box
 * nearest to the given point (i.e. the given point clamped to the box), so it
 * is exactly `0` if the point lies inside the box
 * * `max` is (an upper bound of) the squared distance to the corner of the box
 * furthest from the given point
 * * calculated in double precision with an error bound (so `min` and `max` are
 * within about 8 ulps of the exact extremes)
 *
 * @param box an axis-aligned box given as `[[minX,minY],[maxX,maxY]]`
 * @param p a point, e.g. `[1,2]`
 *
 * @internal
 */
function rootIntervalToDistanceSquaredInterval(
        box: number[][],
        p: number[]): number[] {

    const [[minX,minY],[maxX,maxY]] = box;
    const [x,y] = p;

    //---- the minimum: squared distance to `p` clamped to the box
    const dxMin = x < minX ? minX - x : x > maxX ? x - maxX : 0;
    const dyMin = y < minY ? minY - y : y > maxY ? y - maxY : 0;
    const dMin = dxMin*dxMin + dyMin*dyMin;

    //---- the maximum: squared distance to the furthest corner (found
    // coordinate-wise, i.e. the furthest of the two box edges per coordinate)
    const dxMax = max(abs(x - minX), abs(maxX - x));
    const dyMax = max(abs(y - minY), abs(maxY - y));
    const dMax = dxMax*dxMax + dyMax*dyMax;

    return [dMin*(1 - k), dMax*(1 + k)];
}


export { rootIntervalToDistanceSquaredInterval }
