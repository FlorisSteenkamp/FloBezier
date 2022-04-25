/**
 * Returns the maximum absolute value of the coordinates of the control points
 * of the given bezier curve.
 *
 * @param ps an order 1,2 or 3 bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 */
function maxAbsCoordinate(ps) {
    let m = Number.NEGATIVE_INFINITY;
    for (let i = 0; i < ps.length; i++) {
        const p = ps[i];
        const absX = Math.abs(p[0]);
        const absY = Math.abs(p[1]);
        if (absX > m) {
            m = absX;
        }
        if (absY > m) {
            m = absY;
        }
    }
    return m;
}
export { maxAbsCoordinate };
//# sourceMappingURL=max-abs-coordinate.js.map