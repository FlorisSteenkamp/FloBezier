"use strict";
exports.__esModule = true;
exports.getHodograph = void 0;
/**
 * Returns an approximation of the hodograph of the given bezier curve.
 * * **bitlength**: If the coordinates of the control points are bit-aligned then
 * * max bitlength increase === 3, max shift === 3 (for cubics)
 * * max bitlength increase === 1, max shift === 2 (for quadratics)
 * * max bitlength increase === 1, max shift === 1 (for lines)
 *
 * @param ps An order 1, 2 or 3 bezier curve.
 *
 * @doc
 */
function getHodograph(ps) {
    if (ps.length === 4) {
        // cubic
        var _a = ps[0], x0 = _a[0], y0 = _a[1], _b = ps[1], x1 = _b[0], y1 = _b[1], _c = ps[2], x2 = _c[0], y2 = _c[1], _d = ps[3], x3 = _d[0], y3 = _d[1];
        return [
            [3 * (x1 - x0), 3 * (y1 - y0)],
            [3 * (x2 - x1), 3 * (y2 - y1)],
            [3 * (x3 - x2), 3 * (y3 - y2)]
        ];
    }
    if (ps.length === 3) {
        // quadratic
        var _e = ps[0], x0 = _e[0], y0 = _e[1], _f = ps[1], x1 = _f[0], y1 = _f[1], _g = ps[2], x2 = _g[0], y2 = _g[1];
        return [
            [2 * (x1 - x0), 2 * (y1 - y0)],
            [2 * (x2 - x1), 2 * (y2 - y1)]
        ];
    }
    if (ps.length === 2) {
        // a line
        var _h = ps[0], x0 = _h[0], y0 = _h[1], _j = ps[1], x1 = _j[0], y1 = _j[1];
        return [
            [x1 - x0, y1 - y0]
        ];
    }
}
exports.getHodograph = getHodograph;
