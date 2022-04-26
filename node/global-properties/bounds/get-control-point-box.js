/**
 * Returns a tight axis-aligned bounding box of the given bezier curve's control
 * points. (Note that the box is not a tight bound of the bezier curve itself.)
 *
 * @param ps an order 1,2 or 3 bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 *
 * @doc mdx
 */
function getControlPointBox(ps) {
    let minX = Number.POSITIVE_INFINITY;
    let maxX = Number.NEGATIVE_INFINITY;
    let minY = Number.POSITIVE_INFINITY;
    let maxY = Number.NEGATIVE_INFINITY;
    for (const p of ps) {
        const x = p[0];
        const y = p[1];
        if (x < minX) {
            minX = x;
        }
        if (x > maxX) {
            maxX = x;
        }
        if (y < minY) {
            minY = y;
        }
        if (y > maxY) {
            maxY = y;
        }
    }
    return [[minX, minY], [maxX, maxY]];
}
export { getControlPointBox };
//# sourceMappingURL=get-control-point-box.js.map