"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.linearToCubic = void 0;
/**
 * Returns a cubic bezier from the given line with evenly spaced control points.
 * @param l a 2d line represented by two points
 */
function linearToCubic(ps) {
    let [[x0, y0], [x1, y1]] = ps;
    let xInterval = (x1 - x0) / 3;
    let yInterval = (y1 - y0) / 3;
    return [
        [x0, y0],
        [x0 + xInterval, y0 + yInterval],
        [x0 + xInterval * 2, y0 + yInterval * 2],
        [x1, y1]
    ];
}
exports.linearToCubic = linearToCubic;
//# sourceMappingURL=linear-to-cubic.js.map