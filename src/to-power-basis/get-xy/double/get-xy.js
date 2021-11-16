"use strict";
exports.__esModule = true;
exports.getXY0 = exports.getXY1 = exports.getXY2 = exports.getXY3 = exports.getXY = void 0;
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
exports.getXY = getXY;
function getXY3(ps) {
    var _a = ps[0], x0 = _a[0], y0 = _a[1], _b = ps[1], x1 = _b[0], y1 = _b[1], _c = ps[2], x2 = _c[0], y2 = _c[1], _d = ps[3], x3 = _d[0], y3 = _d[1];
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
exports.getXY3 = getXY3;
function getXY2(ps) {
    var _a = ps[0], x0 = _a[0], y0 = _a[1], _b = ps[1], x1 = _b[0], y1 = _b[1], _c = ps[2], x2 = _c[0], y2 = _c[1];
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
exports.getXY2 = getXY2;
function getXY1(ps) {
    var _a = ps[0], x0 = _a[0], y0 = _a[1], _b = ps[1], x1 = _b[0], y1 = _b[1];
    return [[
            x1 - x0,
            x0, // t^0 - max bitlength increase 0
        ], [
            y1 - y0,
            y0, // t^0 - max bitlength increase 0
        ]];
}
exports.getXY1 = getXY1;
function getXY0(ps) {
    var _a = ps[0], x0 = _a[0], y0 = _a[1];
    return [[x0], [y0]];
}
exports.getXY0 = getXY0;
