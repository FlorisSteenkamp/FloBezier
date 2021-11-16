"use strict";
exports.__esModule = true;
exports.clone = void 0;
/**
 * Returns a clone of the given cubic bezier (with a different reference).
 *
 * @param ps A cubic bezier given by its array of control points
 *
 * @doc
 */
function clone(ps) {
    if (ps.length === 4) {
        var _a = ps[0], x0 = _a[0], y0 = _a[1], _b = ps[1], x1 = _b[0], y1 = _b[1], _c = ps[2], x2 = _c[0], y2 = _c[1], _d = ps[3], x3 = _d[0], y3 = _d[1];
        return [[x0, y0], [x1, y1], [x2, y2], [x3, y3]];
    }
    else if (ps.length === 3) {
        var _e = ps[0], x0 = _e[0], y0 = _e[1], _f = ps[1], x1 = _f[0], y1 = _f[1], _g = ps[2], x2 = _g[0], y2 = _g[1];
        return [[x0, y0], [x1, y1], [x2, y2]];
    }
    else if (ps.length === 2) {
        var _h = ps[0], x0 = _h[0], y0 = _h[1], _j = ps[1], x1 = _j[0], y1 = _j[1];
        return [[x0, y0], [x1, y1]];
    }
}
exports.clone = clone;
