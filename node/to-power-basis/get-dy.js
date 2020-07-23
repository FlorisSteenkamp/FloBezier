"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDyExact = exports.getDy = void 0;
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const double_double_1 = require("double-double");
const big_float_ts_1 = require("big-float-ts");
const tp = double_double_1.twoProduct;
const fes = big_float_ts_1.fastExpansionSum;
const sum = big_float_ts_1.eSum;
const td = big_float_ts_1.twoDiff;
/**
 * Returns the derivative of the power basis representation of a line, quadratic
 * or cubic bezier's y-coordinates.
 *
 * **bitlength**: If the coordinates of the control points are bit-aligned then
 * max bitlength increase === max shift === 5 (for cubics)
 * max bitlength increase === max shift === 3 (for quadratics)
 * max bitlength increase === max shift === 1 (for lines)
 *
 * @param ps An order 1,2 or 3 bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 */
function getDy(ps) {
    if (ps.length === 4) {
        let [[, y0], [, y1], [, y2], [, y3]] = ps;
        return [
            3 * (y3 + 3 * (y1 - y2) - y0),
            6 * (y2 - 2 * y1 + y0),
            3 * (y1 - y0) // t^0 - max bitlength increase 3
        ];
    }
    if (ps.length === 3) {
        let [[, y0], [, y1], [, y2]] = ps;
        return [
            2 * (y2 - 2 * y1 + y0),
            2 * (y1 - y0),
        ];
    }
    if (ps.length === 2) {
        let [[, y0], [, y1]] = ps;
        return [
            y1 - y0,
        ];
    }
    throw new Error('The bezier curve must be of order 1, 2 or 3.');
}
exports.getDy = getDy;
/**
 * Returns the derivative of the power basis representation of a line, quadratic
 * or cubic bezier's y-coordinates.
 *
 * Bitlength: If the coordinates of the control points are grid-aligned then
 * max bitlength increase === max shift === 5 (for cubics)
 * max bitlength increase === max shift === 3 (for quadratics)
 * max bitlength increase === max shift === 1 (for lines)
 *
 * @param ps An order 1,2 or 3 bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 */
function getDyExact(ps) {
    if (ps.length === 4) {
        let [[, y0], [, y1], [, y2], [, y3]] = ps;
        return [
            //3*y3 - 9*y2 + 9*y1 - 3*y0,
            sum([
                tp(3, y3),
                tp(-9, y2),
                tp(9, y1),
                tp(-3, y0)
            ]),
            //6*y2 - 12*y1 + 6*y0,
            sum([
                tp(6, y2),
                tp(-12, y1),
                tp(6, y0)
            ]),
            //3*y1 - 3*y0
            sum([
                tp(3, y1),
                tp(-3, y0)
            ])
        ];
    }
    if (ps.length === 3) {
        let [[, y0], [, y1], [, y2]] = ps;
        return [
            //2*y2 - 4*y1 + 2*y0,
            sum([
                [2 * y2], [-4, y1], [2 * y0]
            ]),
            //2*y1 - 2*y0,
            fes([2 * y1], [-2, y0])
        ];
    }
    if (ps.length === 2) {
        let [[, y0], [, y1]] = ps;
        return [
            //y1 - y0,
            td(y1, y0)
        ];
    }
    throw new Error('The bezier curve must be of order 1, 2 or 3.');
}
exports.getDyExact = getDyExact;
//# sourceMappingURL=get-dy.js.map