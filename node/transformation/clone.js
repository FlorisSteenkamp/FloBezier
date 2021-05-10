"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        let [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = ps;
        return [[x0, y0], [x1, y1], [x2, y2], [x3, y3]];
    }
    else if (ps.length === 3) {
        let [[x0, y0], [x1, y1], [x2, y2]] = ps;
        return [[x0, y0], [x1, y1], [x2, y2]];
    }
    else if (ps.length === 2) {
        let [[x0, y0], [x1, y1]] = ps;
        return [[x0, y0], [x1, y1]];
    }
}
exports.clone = clone;
//# sourceMappingURL=clone.js.map