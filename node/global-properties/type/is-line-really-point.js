/**
 * Returns true if the given linear bezier curve is really a point.
 *
 * * the required condition is met if: `x0 === x1` and `y0 === y1`
 * * **exact:** for any input
 *
 * @param ps a linear bezier curve
 *
 * @doc mdx
 */
function isLineReallyPoint(ps) {
    const [[x0, y0], [x1, y1]] = ps;
    //if (x0 === x1) && (y0 === y1)
    return (x0 === x1 && y0 === y1);
}
export { isLineReallyPoint };
//# sourceMappingURL=is-line-really-point.js.map