"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Returns the derivative of the power basis representation of a line, quadratic
 * or cubic bezier's x and y-coordinates when evaluated at t === 0.
 *
 * Bitlength: If the coordinates of the control points are grid-aligned then
 * * max bitlength increase === max shift === 3 (for cubics)
 * * max bitlength increase === max shift === 2 (for quadratics)
 * * max bitlength increase === max shift === 1 (for lines)
 *
 * @param ps An order 1,2 or 3 bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 */
function getDxyAt0(ps) {
    if (ps.length === 4) {
        let [[x0, y0], [x1, y1]] = ps;
        return [
            3 * (x1 - x0),
            3 * (y1 - y0)
        ]; // max bitlength increase 3
    }
    else if (ps.length === 3) {
        let [[x0, y0], [x1, y1]] = ps;
        return [
            2 * (x1 - x0),
            2 * (y1 - y0),
        ]; // max bitlength increase 2
    }
    else if (ps.length === 2) {
        let [[x0, y0], [x1, y1]] = ps;
        return [
            x1 - x0,
            y1 - y0,
        ]; // max bitlength increase 1
    }
}
exports.getDxyAt0 = getDxyAt0;
//# sourceMappingURL=get-dxy-at-0.js.map