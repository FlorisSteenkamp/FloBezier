"use strict";
exports.__esModule = true;
exports.getDxyAt0 = void 0;
/**
 * Returns the result (`[x,y]`) of evaluating the derivative of a linear,
 * quadratic or cubic bezier curve at `t === 0`.
 *
 * Bitlength: If the coordinates of the control points are grid-aligned then
 * * max bitlength (incl bit shift) increase === 3 (for cubics)
 * * max bitlength (incl bit shift) increase === 2 (for quadratics)
 * * max bitlength (incl bit shift) increase === 1 (for lines)
 *
 * @param ps An order 1,2 or 3 bezier, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 *
 * @doc mdx
 */
function getDxyAt0(ps) {
    if (ps.length === 4) {
        var _a = ps[0], x0 = _a[0], y0 = _a[1], _b = ps[1], x1 = _b[0], y1 = _b[1];
        return [
            3 * (x1 - x0),
            3 * (y1 - y0)
        ]; // max bitlength increase 3
    }
    if (ps.length === 3) {
        var _c = ps[0], x0 = _c[0], y0 = _c[1], _d = ps[1], x1 = _d[0], y1 = _d[1];
        return [
            2 * (x1 - x0),
            2 * (y1 - y0),
        ]; // max bitlength increase 2
    }
    if (ps.length === 2) {
        var _e = ps[0], x0 = _e[0], y0 = _e[1], _f = ps[1], x1 = _f[0], y1 = _f[1];
        return [
            x1 - x0,
            y1 - y0,
        ]; // max bitlength increase 1
    }
    if (ps.length === 1) {
        return [0, 0];
    }
    throw new Error('The given bezier curve is invalid.');
}
exports.getDxyAt0 = getDxyAt0;
