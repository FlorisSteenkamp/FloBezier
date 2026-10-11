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
declare function rootIntervalToDistanceSquaredInterval(box: number[][], p: number[]): number[];
export { rootIntervalToDistanceSquaredInterval };
