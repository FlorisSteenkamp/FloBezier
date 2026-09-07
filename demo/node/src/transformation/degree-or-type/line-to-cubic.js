/**
 * Returns a cubic bezier from the given line with evenly spaced control points.
 *
 * @param ps a 2d line represented by two points
 *
 * @doc mdx
 */
function lineToCubic(ps) {
    const [[x0, y0], [x1, y1]] = ps;
    const xInterval = (x1 - x0) / 3;
    const yInterval = (y1 - y0) / 3;
    return [
        [x0, y0],
        [x0 + xInterval, y0 + yInterval],
        [x0 + xInterval * 2, y0 + yInterval * 2],
        [x1, y1]
    ];
}
export { lineToCubic };
//# sourceMappingURL=line-to-cubic.js.map