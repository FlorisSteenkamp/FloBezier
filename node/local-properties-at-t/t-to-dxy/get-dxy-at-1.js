"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDxyAt1 = void 0;
/**
 * Returns the derivative of the power basis representation of a line, quadratic
 * or cubic bezier's x and y-coordinates when evaluated at 1.
 *
 * This is a seperate function because it allows us to make stronger bitlength
 * guarantees.
 *
 * Bitlength: If the coordinates of the control points are grid-aligned then
 * * max bitlength increase === max shift === 3 (for cubics)
 * * max bitlength increase === max shift === 2 (for quadratics)
 * * max bitlength increase === max shift === 1 (for lines)
 *
 * @param ps An order 1,2 or 3 bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 */
function getDxyAt1(ps) {
    if (ps.length === 4) {
        let [, , [x2, y2], [x3, y3]] = ps;
        return [
            3 * (x3 - x2),
            3 * (y3 - y2),
        ]; // max bitlength increase 3
    }
    else if (ps.length === 3) {
        let [, [x1, y1], [x2, y2]] = ps;
        return [
            2 * (x2 - x1),
            2 * (y2 - y1),
        ]; // max bitlength increase 2
    }
    else if (ps.length === 2) {
        let [[x0, y0], [x1, y1]] = ps;
        return [
            x1 - x0,
            y1 - y0
        ]; // max bitlength increase 1
    }
}
exports.getDxyAt1 = getDxyAt1;
//# sourceMappingURL=get-dxy-at-1.js.map