"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flo_numerical_1 = require("flo-numerical");
/**
 * Returns the approximate power basis representation of a line, quadratic or
 * cubic bezier's x-coordinates.
 *
 * If certain preconditions are met (see below) it returns the exact result.
 *
 * Returns the power basis polynomial from highest power to lowest,
 * e.g. at^3 + bt^2 + ct + d is returned as [a,b,c,d]
 *
 * Bitlength: If the coordinates of the control points are bit-aligned then
 * max bitlength increase === max shift === 4 (for cubics)
 * (due to 'multiplication' by 12 (3x 6x 3x) -> ceil(log2(12)) === 4
 * max bitlength increase === max shift === 2 (for quadratics)
 * (due to 'multiplication' by 4 (1x 2x 1x)  -> ceil(log2(4)) === 2
 * max bitlength increase === max shift === 1 (for lines)
 * (due to 'multiplication' by 4 (1x 1x) -> ceil(log2(2)) === 1
 *
 * @param ps An order 1, 2 or 3 bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 */
function getX(ps) {
    if (ps.length === 4) {
        let [[x0,], [x1,], [x2,], [x3,]] = ps;
        return [
            x3 + 3 * (x1 - x2) - x0,
            3 * (x2 - 2 * x1 + x0),
            3 * (x1 - x0),
            x0,
        ];
    }
    else if (ps.length === 3) {
        let [[x0,], [x1,], [x2,]] = ps;
        return [
            x2 - 2 * x1 + x0,
            2 * (x1 - x0),
            x0,
        ];
    }
    else if (ps.length === 2) {
        let [[x0,], [x1,]] = ps;
        return [
            x1 - x0,
            x0,
        ];
    }
}
exports.getX = getX;
function getXExact(ps) {
    if (ps.length === 4) {
        let [[x0,], [x1,], [x2,], [x3,]] = ps;
        return [
            //x3 - 3*x2 + 3*x1 - x0,
            flo_numerical_1.calculateSum([
                [x3],
                flo_numerical_1.twoSum(-2 * x2, -x2),
                flo_numerical_1.twoSum(2 * x1, x1),
                [-x0]
            ]),
            //3*x2 - 6*x1 + 3*x0,
            flo_numerical_1.calculateSum([
                flo_numerical_1.twoSum(2 * x2, x2),
                flo_numerical_1.twoSum(-4 * x1, -2 * x1),
                flo_numerical_1.twoSum(2 * x0, x0),
            ]),
            //3*x1 - 3*x0,
            flo_numerical_1.calculateSum([
                flo_numerical_1.twoSum(2 * x1, x1),
                flo_numerical_1.twoSum(-2 * x0, -x0),
            ]),
            //x0
            [x0]
        ];
    }
    else if (ps.length === 3) {
        let [[x0,], [x1,], [x2,]] = ps;
        return [
            //x2 - 2*x1 + x0,
            flo_numerical_1.calculateSum([[x2], [-2 * x1], [x0]]),
            //2*x1 - 2*x0,
            flo_numerical_1.twoDiff(2 * x1, 2 * x0),
            //x0
            [x0]
        ];
    }
    else if (ps.length === 2) {
        let [[x0,], [x1,]] = ps;
        return [
            //x1 - x0,
            flo_numerical_1.twoDiff(x1, x0),
            //x0
            [x0]
        ];
    }
}
exports.getXExact = getXExact;
//# sourceMappingURL=get-x.js.map