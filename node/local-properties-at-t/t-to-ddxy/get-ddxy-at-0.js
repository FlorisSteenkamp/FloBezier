"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDdxyAt0 = void 0;
/**
 * Returns the 2nd derivative of the power basis representation of a line,
 * quadratic or cubic bezier's x and y-coordinates when evaluated at t === 0.
 *
 * Bitlength: If the coordinates of the control points are bit-aligned then
 * * max bitlength increase === max shift === 5 (for cubics)
 * * max bitlength increase === max shift === 3 (for quadratics)
 * * max bitlength increase === max shift === 0 (for lines)
 *
 * @param ps An order 1,2 or 3 bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 */
function getDdxyAt0(ps) {
    if (ps.length === 4) {
        let [[x0, y0], [x1, y1], [x2, y2]] = ps;
        return [
            6 * x2 - 12 * x1 + 6 * x0,
            6 * y2 - 12 * y1 + 6 * y0
        ]; // max bitlength increase 5
    }
    else if (ps.length === 3) {
        let [[x0, y0], [x1, y1], [x2, y2]] = ps;
        return [
            2 * x2 - 4 * x1 + 2 * x0,
            2 * y2 - 4 * y1 + 2 * y0
        ]; // max bitlength increase 3
    }
    else if (ps.length === 2) {
        return [0, 0];
    }
}
exports.getDdxyAt0 = getDdxyAt0;
//# sourceMappingURL=get-ddxy-at-0.js.map