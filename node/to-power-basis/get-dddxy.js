"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDddxy = void 0;
/**
 * Returns the 3rd derivative of the power basis representation of a line,
 * quadratic or cubic bezier's x and y-coordinates.
 *
 * Note: this is a constant value and the same for all t-values and, in
 * particular, zero for a line or quadratic.
 *
 * @param ps An order 1,2 or 3 bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 *
 * Bitlength: If the coordinates of the control points are bit-aligned then
 * * max bitlength increase === max shift === 6 (for cubics)
 * * max bitlength increase === max shift === 0 (for quadratics)
 * * max bitlength increase === max shift === 0 (for lines)
 *
 * @param ps An order 1,2 or 3 bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 */
function getDddxy(ps) {
    if (ps.length === 4) {
        let [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = ps;
        return [
            6 * (x3 + 3 * (x1 - x2) - x0),
            6 * (y3 + 3 * (y1 - y2) - y0)
        ]; // max bitlength increase 6
    }
    else if (ps.length === 3 || ps.length === 2) {
        return [0, 0];
    }
    // if x0,x1,x2,x3 <= X (for some X) and t is an element of [0,1], then
    // max(dddx)(t) <= 48*X for all t.
}
exports.getDddxy = getDddxy;
//# sourceMappingURL=get-dddxy.js.map