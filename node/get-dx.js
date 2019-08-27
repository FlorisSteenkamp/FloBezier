"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Returns the derivative of the power basis representation of a line, quadratic
 * or cubic bezier's x-coordinates. This function is memoized on its points
 * parameter by object reference.
 * @param ps An order 1,2 or 3 bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 */
//let getDx = /*memoize*/((ps: number[][]) => differentiate(getX(ps)));
/**
 * Returns the derivative of the power basis representation of a line, quadratic
 * or cubic bezier's x-coordinates.
 *
 * Bitlength: If the coordinates of the control points are grid-aligned then
 * max bitlength increase === max shift === 5 (for cubics)
 * max bitlength increase === max shift === 3 (for quadratics)
 * max bitlength increase === max shift === 1 (for lines)
 *
 * @param ps An order 1,2 or 3 bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 */
function getDx(ps) {
    if (ps.length === 4) {
        let [[x0,], [x1,], [x2,], [x3,]] = ps;
        return [
            3 * x3 - 9 * x2 + 9 * x1 - 3 * x0,
            6 * x2 - 12 * x1 + 6 * x0,
            3 * x1 - 3 * x0 // t^0 - max bitlength increase 3
        ];
    }
    else if (ps.length === 3) {
        let [[x0,], [x1,], [x2,]] = ps;
        return [
            2 * x2 - 4 * x1 + 2 * x0,
            2 * x1 - 2 * x0,
        ];
    }
    else if (ps.length === 2) {
        let [[x0,], [x1,]] = ps;
        return [
            x1 - x0,
        ];
    }
    return [];
}
exports.getDx = getDx;
//# sourceMappingURL=get-dx.js.map