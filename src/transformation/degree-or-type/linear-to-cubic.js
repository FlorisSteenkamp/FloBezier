"use strict";
exports.__esModule = true;
exports.linearToCubic = void 0;
/**
 * Returns a cubic bezier from the given line with evenly spaced control points.
 *
 * @param l a 2d line represented by two points
 *
 * @internal
 */
function linearToCubic(ps) {
    var _a = ps[0], x0 = _a[0], y0 = _a[1], _b = ps[1], x1 = _b[0], y1 = _b[1];
    var xInterval = (x1 - x0) / 3;
    var yInterval = (y1 - y0) / 3;
    return [
        [x0, y0],
        [x0 + xInterval, y0 + yInterval],
        [x0 + xInterval * 2, y0 + yInterval * 2],
        [x1, y1]
    ];
}
exports.linearToCubic = linearToCubic;
