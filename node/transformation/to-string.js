/**
 * Returns a human readable string representation of the given bezier curve.
 *
 * @param ps an order 0,1,2 or 3 bezier curve given as an array of control points
 */
function toString(ps) {
    if (ps.length === 4) {
        const [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = ps;
        return `[[${x0},${y0}],[${x1},${y1}],[${x2},${y2}],[${x3},${y3}]]`;
    }
    if (ps.length === 3) {
        const [[x0, y0], [x1, y1], [x2, y2]] = ps;
        return `[[${x0},${y0}],[${x1},${y1}],[${x2},${y2}]]`;
    }
    if (ps.length === 2) {
        const [[x0, y0], [x1, y1]] = ps;
        return `[[${x0},${y0}],[${x1},${y1}]]`;
    }
    if (ps.length === 1) {
        const [[x0, y0]] = ps;
        return `[[${x0},${y0}]]`;
    }
}
export { toString };
//# sourceMappingURL=to-string.js.map