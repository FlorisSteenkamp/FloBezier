/**
 * Returns the maximum distance from the point `q` to the control points of the
 * bezier curve `ps`, i.e. an upper bound on the distance from `q` to any point
 * on the curve (since it lies within the convex hull of its control points,
 * within which the distance to a fixed point is maximized at a vertex).
 *
 * @internal
 */
declare function maxDistanceToControlPoints(ps: number[][], q: number[]): number;
export { maxDistanceToControlPoints };
