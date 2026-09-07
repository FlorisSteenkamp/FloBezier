/**
 * Returns the degree-elevated version of the given bezier curve, i.e. the
 * identical curve represented by one additional control point.
 *
 * * degree elevation is exact in exact arithmetic (the elevated curve is the
 * identical curve); the computed control points, however, are generally subject
 * to floating point rounding - e.g. elevating a quadratic (`n === 2`) divides
 * by 3
 *
 * @param ps an order 0,1,2 or 3 bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 *
 * @doc mdx
 */
function elevateDegree(ps) {
    const n = ps.length - 1; // the degree of the given curve
    const r = [ps[0]];
    for (let i = 1; i <= n; i++) {
        const t = i / (n + 1);
        const [xa, ya] = ps[i - 1];
        const [xb, yb] = ps[i];
        r.push([
            t * xa + (1 - t) * xb,
            t * ya + (1 - t) * yb
        ]);
    }
    r.push(ps[n]);
    return r;
}
export { elevateDegree };
//# sourceMappingURL=elevate-degree.js.map