"use strict";
exports.__esModule = true;
exports.getDdxyAt1 = void 0;
/**
 * Returns the result (`[x,y]`) of evaluating the 2nd derivative of a linear,
 * quadratic or cubic bezier curve at `t === 1`.
 *
 * Bitlength: If the coordinates of the control points are bit-aligned then the
 * * max bitlength (incl bit shift) increase === 5 (for cubics)
 * * max bitlength (incl bit shift) increase === 3 (for quadratics)
 * * max bitlength (incl bit shift) increase === 0 (for lines)
 *
 * @param ps An order 1,2 or 3 bezier, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 *
 * @doc mdx
 */
function getDdxyAt1(ps) {
    if (ps.length === 4) {
        var _a = ps[1], x1 = _a[0], y1 = _a[1], _b = ps[2], x2 = _b[0], y2 = _b[1], _c = ps[3], x3 = _c[0], y3 = _c[1];
        return [
            6 * ((x3 + x1) - 2 * x2),
            6 * ((y3 + y1) - 2 * y2),
        ]; // max bitlength increase 5
    }
    if (ps.length === 3) {
        var _d = ps[0], x0 = _d[0], y0 = _d[1], _e = ps[1], x1 = _e[0], y1 = _e[1], _f = ps[2], x2 = _f[0], y2 = _f[1];
        return [
            2 * ((x2 + x0) - 2 * x1),
            2 * ((y2 + y0) - 2 * y1), // t^0
        ]; // max bitlength increase 3
    }
    if (ps.length === 2 || ps.length === 1) {
        return [0, 0]; // max bitlength increase 0
    }
    throw new Error('The given bezier curve is invalid.');
}
exports.getDdxyAt1 = getDdxyAt1;
