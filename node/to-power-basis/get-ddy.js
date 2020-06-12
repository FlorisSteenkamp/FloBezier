"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDdy = void 0;
/**
 * Returns the 2nd derivative of the power basis representation of a line,
 * quadratic or cubic bezier's y-coordinates.
 *
 * This function is memoized on its points parameter by object reference.
 *
 * Bitlength: If the coordinates of the control points are grid-aligned then
 * max bitlength increase === max shift === 6 (for cubics)
 * max bitlength increase === max shift === 3 (for quadratics)
 * max bitlength increase === max shift === 0 (for lines)
 *
 * @param ps An order 1,2 or 3 bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 */
function getDdy(ps) {
    if (ps.length === 4) {
        let [[, y0], [, y1], [, y2], [, y3]] = ps;
        return [
            6 * (y3 + 3 * (y1 - y2) - y0),
            6 * (y2 - 2 * y1 + y0) // t^0 - max bitlength increase 5
        ];
    }
    else if (ps.length === 3) {
        let [[, y0], [, y1], [, y2]] = ps;
        return [
            2 * (y2 - 2 * y1 + y0) // t^0 - max bitlength increase 3
        ];
    }
    else if (ps.length === 2) {
        return [0];
    }
}
exports.getDdy = getDdy;
//# sourceMappingURL=get-ddy.js.map