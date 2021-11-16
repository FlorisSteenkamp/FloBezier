"use strict";
exports.__esModule = true;
exports.intersectBoxes = void 0;
var min = Math.min;
var max = Math.max;
/**
 * Returns the intersection of 2 given axis-aligned rectangular boxes (or
 * `undefined` if they don't intersect).
 *
 * * **exact** - not susceptible to floating point round-off
 * * **closed** - interpret boxes as being closed (i.e. they contain their border).
 *
 * @param a an axis-aligned rectangular box (given by an array of two [[Point]]s,
 * e.g. `[[1,2], [3,4]]` )
 * @param b another box
 *
 * @doc mdx
 */
function intersectBoxes(a, b) {
    var _a, _b, _c, _d;
    var _e = a[0], ax0 = _e[0], ay0 = _e[1], _f = a[1], ax1 = _f[0], ay1 = _f[1];
    var _g = b[0], bx0 = _g[0], by0 = _g[1], _h = b[1], bx1 = _h[0], by1 = _h[1];
    // Swap so smaller coordinate comes first
    if (ax0 > ax1) {
        _a = [ax1, ax0], ax0 = _a[0], ax1 = _a[1];
    }
    ;
    if (bx0 > bx1) {
        _b = [bx1, bx0], bx0 = _b[0], bx1 = _b[1];
    }
    ;
    if (ay0 > ay1) {
        _c = [ay1, ay0], ay0 = _c[0], ay1 = _c[1];
    }
    ;
    if (by0 > by1) {
        _d = [by1, by0], by0 = _d[0], by1 = _d[1];
    }
    ;
    if (!(ax0 <= bx1 && ax1 >= bx0 &&
        by0 <= ay1 && by1 >= ay0)) {
        // they don't intersect
        return undefined;
    }
    return [
        [max(ax0, bx0), max(ay0, by0)],
        [min(ax1, bx1), min(ay1, by1)]
    ];
}
exports.intersectBoxes = intersectBoxes;
