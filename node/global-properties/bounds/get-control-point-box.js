/**
 *
 * @param ps
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