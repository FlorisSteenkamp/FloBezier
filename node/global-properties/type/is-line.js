import { operators } from "big-float-ts";
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const { orient2d } = operators;
/**
 * Returns true if the given bezier curve is a line or if all control points
 * are collinear.
 *
 * * if you need to know whether a given bezier curve can be converted to an
 * order 1 bezier curve (a line) such that the same `(x,y)` point is returned
 * for the same `t` value then use e.g. [[isQuadReallyLine]] instead.
 * * **exact:** for any bitlength of the given coordinates.
 *
 * @param ps An order 1, 2 or 3 bezier curve.
 *
 * @doc mdx
 */
function isLine(ps) {
    if (ps.length === 4) {
        // Cubic bezier
        return (orient2d(ps[0], ps[1], ps[2]) === 0 &&
            orient2d(ps[1], ps[2], ps[3]) === 0 &&
            // The below check is necessary for if ps[1] === ps[2]
            orient2d(ps[0], ps[2], ps[3]) === 0);
    }
    if (ps.length === 3) {
        // Quadratic bezier
        return orient2d(ps[0], ps[1], ps[2]) === 0;
    }
    if (ps.length === 2 || ps.length === 1) {
        // Line (or point)
        return true;
    }
    throw new Error('The given bezier curve is invalid.');
}
/**
 * Returns true if the given bezier degenerates to a horizontal line (possibly
 * self-overlapping)
 *
 * @param ps An order 1, 2 or 3 bezier curve.
 *
 * @doc
 */
function isHorizontalLine(ps) {
    const y = ps[0][1];
    for (let i = 1; i < ps.length; i++) {
        if (ps[i][1] !== y) {
            return false;
        }
    }
    return true;
}
/**
 * Returns true if the given bezier degenerates to a vertical line (possibly
 * self-overlapping)
 *
 * @param ps An order 1, 2 or 3 bezier curve.
 *
 * @doc
 */
function isVerticalLine(ps) {
    const x = ps[0][0];
    for (let i = 1; i < ps.length; i++) {
        if (ps[i][0] !== x) {
            return false;
        }
    }
    return true;
}
export { isLine, isHorizontalLine, isVerticalLine };
//# sourceMappingURL=is-line.js.map