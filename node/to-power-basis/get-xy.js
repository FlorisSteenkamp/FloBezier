"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getXY = void 0;
/**
 * Returns the approximate power basis representation of a line, quadratic or
 * cubic bezier.
 *
 * If certain preconditions are met (see below) it returns the exact result.
 *
 * Returns the power basis polynomial from highest power to lowest,
 * e.g. at^3 + bt^2 + ct + d is returned as [a,b,c,d]
 *
 * Bitlength: If the coordinates of the control points are bit-aligned then
 * * max bitlength increase === max shift === 4 (for cubics)
 * (due to 'multiplication' by 9 (3x 6x 3x)
 * * max bitlength increase === max shift === 2 (for quadratics)
 * (due to 'multiplication' by 4 (1x 2x 1x)
 * * max bitlength increase === max shift === 1 (for lines)
 * (due to 'multiplication' by 4 (1x 1x)
 *
 * @param ps An order 1, 2 or 3 bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 */
function getXY(ps) {
    if (ps.length === 4) {
        let [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = ps;
        return [[
                x3 + 3 * (x1 - x2) - x0,
                3 * (x2 - 2 * x1 + x0),
                3 * (x1 - x0),
                x0,
            ], [
                y3 + 3 * (y1 - y2) - y0,
                3 * (y2 - 2 * y1 + y0),
                3 * (y1 - y0),
                y0,
            ]];
    }
    else if (ps.length === 3) {
        let [[x0, y0], [x1, y1], [x2, y2]] = ps;
        return [[
                x2 - 2 * x1 + x0,
                2 * (x1 - x0),
                x0,
            ], [
                y2 - 2 * y1 + y0,
                2 * (y1 - y0),
                y0,
            ]];
    }
    else if (ps.length === 2) {
        let [[x0, y0], [x1, y1]] = ps;
        return [[
                x1 - x0,
                x0,
            ], [
                y1 - y0,
                y0,
            ]];
    }
}
exports.getXY = getXY;
//# sourceMappingURL=get-xy.js.map