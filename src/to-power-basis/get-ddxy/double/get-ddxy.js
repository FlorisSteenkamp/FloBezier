"use strict";
exports.__esModule = true;
exports.getDdxy = void 0;
/**
 * Returns the 2nd derivative of the power basis representation of a line,
 * quadratic or cubic bezier's x-coordinates.
 *
 * Bitlength: If the coordinates of the control points are grid-aligned then
 * * max bitlength increase === max shift === 6 (for cubics)
 * * max bitlength increase === max shift === 3 (for quadratics)
 * * max bitlength increase === max shift === 0 (for lines)
 *
 * @param ps An order 1,2 or 3 bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 *
 * @doc
 */
function getDdxy(ps) {
    if (ps.length === 4) {
        var _a = ps[0], x0 = _a[0], y0 = _a[1], _b = ps[1], x1 = _b[0], y1 = _b[1], _c = ps[2], x2 = _c[0], y2 = _c[1], _d = ps[3], x3 = _d[0], y3 = _d[1];
        return [[
                6 * (x3 + 3 * (x1 - x2) - x0),
                6 * (x2 - 2 * x1 + x0) // t^0 - max bitlength increase 5
            ], [
                6 * (y3 + 3 * (y1 - y2) - y0),
                6 * (y2 - 2 * y1 + y0) // t^0 - max bitlength increase 5
            ]];
    }
    if (ps.length === 3) {
        var _e = ps[0], x0 = _e[0], y0 = _e[1], _f = ps[1], x1 = _f[0], y1 = _f[1], _g = ps[2], x2 = _g[0], y2 = _g[1];
        return [[
                2 * (x2 - 2 * x1 + x0) // t^0 - max bitlength increase 3
            ], [
                2 * (y2 - 2 * y1 + y0) // t^0 - max bitlength increase 3
            ]];
    }
    if (ps.length === 2) {
        return [[0], [0]];
    }
    // TODO - add case of degenerate point
    throw new Error('The given bezier curve is invalid.');
}
exports.getDdxy = getDdxy;
