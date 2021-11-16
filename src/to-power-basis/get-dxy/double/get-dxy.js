"use strict";
exports.__esModule = true;
exports.getDxy = void 0;
/**
 * Returns the derivative of the power basis representation of a line, quadratic
 * or cubic bezier's.
 *
 * **bitlength**: If the coordinates of the control points are bit-aligned then
 * * max bitlength increase === max shift === 5 (for cubics)
 * * max bitlength increase === max shift === 3 (for quadratics)
 * * max bitlength increase === max shift === 1 (for lines)
 *
 * @param ps An order 1,2 or 3 bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 *
 * @doc
 */
function getDxy(ps) {
    if (ps.length === 4) {
        return getDxy3(ps);
    }
    if (ps.length === 3) {
        return getDxy2(ps);
    }
    if (ps.length === 2) {
        return getDxy1(ps);
    }
    throw new Error('The bezier curve must be of order 1, 2 or 3.');
}
exports.getDxy = getDxy;
function getDxy3(ps) {
    var _a = ps[0], x0 = _a[0], y0 = _a[1], _b = ps[1], x1 = _b[0], y1 = _b[1], _c = ps[2], x2 = _c[0], y2 = _c[1], _d = ps[3], x3 = _d[0], y3 = _d[1];
    return [[
            3 * ((x3 - x0) + 3 * (x1 - x2)),
            6 * ((x2 + x0) - 2 * x1),
            3 * (x1 - x0) // t^0 - max bitlength increase 3
        ], [
            3 * ((y3 - y0) + 3 * (y1 - y2)),
            6 * ((y2 + y0) - 2 * y1),
            3 * (y1 - y0) // t^0 - max bitlength increase 3
        ]];
}
function getDxy2(ps) {
    var _a = ps[0], x0 = _a[0], y0 = _a[1], _b = ps[1], x1 = _b[0], y1 = _b[1], _c = ps[2], x2 = _c[0], y2 = _c[1];
    return [[
            2 * ((x2 + x0) - 2 * x1),
            2 * (x1 - x0), // t^0 - max bitlength increase 2
        ], [
            2 * ((y2 + y0) - 2 * y1),
            2 * (y1 - y0), // t^0 - max bitlength increase 2
        ]];
}
function getDxy1(ps) {
    var _a = ps[0], x0 = _a[0], y0 = _a[1], _b = ps[1], x1 = _b[0], y1 = _b[1];
    return [[
            x1 - x0, // t^0 - max bitlength increase 1
        ], [
            y1 - y0, // t^0 - max bitlength increase 1
        ]];
}
