/**
 * Returns `true` if the given bezier curve has all control points coincident,
 * `false` otherwise.
 *
 * @param ps an order 0,1,2 or 3 bezier curve given as an array of its control
 * points, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 */
function isReallyPoint(ps) {
    const x = ps[0][0];
    const y = ps[0][1];
    for (let i = 1; i < ps.length; i++) {
        if (x !== ps[i][0] || y !== ps[i][1]) {
            return false;
        }
    }
    return true;
}
export { isReallyPoint };
//# sourceMappingURL=is-really-point.js.map