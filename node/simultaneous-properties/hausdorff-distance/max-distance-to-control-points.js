const { sqrt } = Math;
/**
 * Returns the maximum distance from the point `q` to the control points of the
 * bezier curve `ps`, i.e. an upper bound on the distance from `q` to any point
 * on the curve (since it lies within the convex hull of its control points,
 * within which the distance to a fixed point is maximized at a vertex).
 *
 * @internal
 */
function maxDistanceToControlPoints(ps, q) {
    let m = 0;
    for (let i = 0; i < ps.length; i++) {
        const c = ps[i];
        const dd = (c[0] - q[0]) ** 2 + (c[1] - q[1]) ** 2;
        if (dd > m) {
            m = dd;
        }
    }
    return sqrt(m);
}
export { maxDistanceToControlPoints };
//# sourceMappingURL=max-distance-to-control-points.js.map