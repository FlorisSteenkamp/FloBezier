/**
 * Returns a quadratic bezier from the given line with evenly spaced control points.
 *
 * @param ps a 2d line represented by two points, e.g. `[[1,2],[3,4]]`
 *
 * @doc mdx
 */
function lineToQuadratic(ps) {
    const [[x0, y0], [x1, y1]] = ps;
    return [
        [x0, y0],
        [(x0 + x1) / 2, (y0 + y1) / 2],
        [x1, y1]
    ];
}
export { lineToQuadratic };
//# sourceMappingURL=line-to-quadratic.js.map