"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHodograph = void 0;
/**
 * Returns an approximation of the hodograph of the given bezier curve.
 * * **bitlength**: If the coordinates of the control points are bit-aligned then
 * * max bitlength increase === 3, max shift === 3 (for cubics)
 * * max bitlength increase === 1, max shift === 2 (for quadratics)
 * * max bitlength increase === 1, max shift === 1 (for lines)
 * @param ps An order 1, 2 or 3 bezier curve.
 */
function getHodograph(ps) {
    if (ps.length === 4) {
        // cubic
        let [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = ps;
        return [
            [3 * (x1 - x0), 3 * (y1 - y0)],
            [3 * (x2 - x1), 3 * (y2 - y1)],
            [3 * (x3 - x2), 3 * (y3 - y2)]
        ];
    }
    if (ps.length === 3) {
        // quadratic
        let [[x0, y0], [x1, y1], [x2, y2]] = ps;
        return [
            [2 * (x1 - x0), 2 * (y1 - y0)],
            [2 * (x2 - x1), 2 * (y2 - y1)]
        ];
    }
    if (ps.length === 2) {
        // a line
        let [[x0, y0], [x1, y1]] = ps;
        return [
            [x1 - x0, y1 - y0]
        ];
    }
}
exports.getHodograph = getHodograph;
//# sourceMappingURL=get-hodograph.js.map