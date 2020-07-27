"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDxExact = exports.getDx = void 0;
const big_float_ts_1 = require("big-float-ts");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure 
// function❗ Otherwise code is too slow❗
const sum = big_float_ts_1.eSum;
const tp = big_float_ts_1.twoProduct;
const td = big_float_ts_1.twoDiff;
const fes = big_float_ts_1.fastExpansionSum;
/**
 * Returns the derivative of the power basis representation of a line, quadratic
 * or cubic bezier's x-coordinates.
 *
 * **bitlength**: If the coordinates of the control points are bit-aligned then
 * * max bitlength increase === max shift === 5 (for cubics - 5,5,3)
 * * max bitlength increase === max shift === 3 (for quadratics - 3,2)
 * * max bitlength increase === max shift === 1 (for lines - 1)
 *
 * @param ps An order 1,2 or 3 bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 */
function getDx(ps) {
    if (ps.length === 4) {
        let [[x0,], [x1,], [x2,], [x3,]] = ps;
        // error counter rules: (see [Higham](http://ftp.demec.ufpr.br/CFD/bibliografia/Higham_2002_Accuracy%20and%20Stability%20of%20Numerical%20Algorithms.pdf))
        //   <k>a + <l>b = <max(k,l) + 1>(a + b)
        //   <k>a<l>b = <k + l + 1>ab
        //   fl(a) === <1>a
        return [
            3 * ((x3 - x0) + 3 * (x1 - x2)),
            // <4>3*<3>(<1>(x3 - x0) + <2>3*<1>(x1 - x2))
            6 * (x2 - 2 * x1 + x0),
            // <3>6*<2>(<1>(x2 - 2*x1) + x0)
            3 * (x1 - x0) // t^0 - max bitlength increase 3
            // <2>3*<1>(x1 - x0)
        ];
        // if x0,x1,x2,x3 <= X (for some X) and t is an element of [0,1], then
        // max(dx)(t) <= 6*X for all t.
        // A tight bound occurs when -x0,x1,-x2,x3 === X and t === 1.
        // e.g. for X === 1,    max(dx)(t) === 6
        //      for x === 1024, max(dx)(t) === 6*1024 === 6144
    }
    if (ps.length === 3) {
        let [[x0,], [x1,], [x2,]] = ps;
        return [
            2 * (x2 - 2 * x1 + x0),
            2 * (x1 - x0),
        ];
        // if x0,x1,x2 <= X (for some X) and t is an element of [0,1], then
        // max(dx)(t) <= 4*X for all t.
    }
    if (ps.length === 2) {
        let [[x0,], [x1,]] = ps;
        return [
            x1 - x0,
        ];
        // if x0,x1 <= X (for some X) and t is an element of [0,1], then
        // max(dx)(t) <= 2*X for all t.
    }
    throw new Error('The bezier curve must be of order 1, 2 or 3.');
}
exports.getDx = getDx;
/**
 * Returns the exact derivative of the power basis representation of a line,
 * quadratic or cubic bezier's x-coordinates.
 * @param ps An order 1,2 or 3 bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 */
function getDxExact(ps) {
    if (ps.length === 4) {
        let [[x0,], [x1,], [x2,], [x3,]] = ps;
        return [
            //3*x3 - 9*x2 + 9*x1 - 3*x0,
            sum([
                tp(3, x3),
                tp(-9, x2),
                tp(9, x1),
                tp(-3, x0)
            ]),
            //6*x2 - 12*x1 + 6*x0,
            sum([
                tp(6, x2),
                tp(-12, x1),
                tp(6, x0)
            ]),
            //3*x1 - 3*x0
            sum([
                tp(3, x1),
                tp(-3, x0)
            ])
        ];
    }
    if (ps.length === 3) {
        let [[x0,], [x1,], [x2,]] = ps;
        return [
            //2*x2 - 4*x1 + 2*x0,
            sum([
                [2 * x2], [-4, x1], [2 * x0]
            ]),
            //2*x1 - 2*x0,
            fes([2 * x1], [-2, x0])
        ];
    }
    if (ps.length === 2) {
        let [[x0,], [x1,]] = ps;
        return [
            //x1 - x0,
            td(x1, x0)
        ];
    }
    throw new Error('The bezier curve must be of order 1, 2 or 3.');
}
exports.getDxExact = getDxExact;
//# sourceMappingURL=get-dx.js.map