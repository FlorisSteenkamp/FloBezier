/**
 * Returns the power basis representation of a linear, quadratic or cubic bezier curve.
 *
 * * **non-exact:** if certain preconditions are met (see below) it returns the
 * exact result, else round-off may have occured during intermediate calculation.
 * * returns the power basis polynomial from highest power to lowest,
 * e.g. `at^3 + bt^2 + ct + d` is returned as `[a,b,c,d]`
 *
 * * **bitlength:** If the coordinates of the control points are bit-aligned then:
 *  * max bitlength increase = 4 (for cubics)
 * (due to 'multiplication' by 9 (3x 6x 3x)
 *  * max bitlength increase = 2 (for quadratics)
 * (due to 'multiplication' by 4 (1x 2x 1x)
 *  * max bitlength increase = 1 (for lines)
 * (due to 'multiplication' by 4 (1x 1x)
 *
 * @param ps an order 1, 2 or 3 bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 *
 * @doc
 */
function getXY(ps) {
    if (ps.length === 4) {
        return getXY3(ps);
    }
    if (ps.length === 3) {
        return getXY2(ps);
    }
    if (ps.length === 2) {
        return getXY1(ps);
    }
    if (ps.length === 1) {
        return getXY0(ps);
    }
    throw new Error('The given bezier curve is invalid.');
}
function getXY3(ps) {
    const [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = ps;
    return [[
            (x3 - x0) + 3 * (x1 - x2),
            3 * ((x2 + x0) - 2 * x1),
            3 * (x1 - x0),
            x0, // t^0 - max bitlength increase 0
        ], [
            (y3 - y0) + 3 * (y1 - y2),
            3 * ((y2 + y0) - 2 * y1),
            3 * (y1 - y0),
            y0, // t^0 - max bitlength increase 0
        ]];
}
function getXY2(ps) {
    const [[x0, y0], [x1, y1], [x2, y2]] = ps;
    return [[
            (x2 + x0) - 2 * x1,
            2 * (x1 - x0),
            x0, // t^0 - max bitlength increase 0
        ], [
            (y2 + y0) - 2 * y1,
            2 * (y1 - y0),
            y0, // t^0 - max bitlength increase 0            
        ]];
}
function getXY1(ps) {
    const [[x0, y0], [x1, y1]] = ps;
    return [[
            x1 - x0,
            x0, // t^0 - max bitlength increase 0
        ], [
            y1 - y0,
            y0, // t^0 - max bitlength increase 0
        ]];
}
function getXY0(ps) {
    const [[x0, y0]] = ps;
    return [[x0], [y0]];
}
export { getXY, getXY3, getXY2, getXY1, getXY0 };
//# sourceMappingURL=get-xy.js.map