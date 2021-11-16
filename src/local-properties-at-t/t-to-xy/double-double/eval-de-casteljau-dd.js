"use strict";
exports.__esModule = true;
exports.evalDeCasteljauDd = void 0;
var double_double_1 = require("double-double");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
var qmq = double_double_1.ddMultDd;
var qaq = double_double_1.ddAddDd;
var qdq = double_double_1.ddDiffDd;
var td = double_double_1.twoDiff;
var qad = double_double_1.ddAddDouble;
/**
 * Returns the result of evaluating the given bezier curve at the parameter `t`
 * (given as a double-double precision floating point number)
 * using [De Casteljau's algorithm](https://en.wikipedia.org/wiki/De_Casteljau%27s_algorithm)
 * with intermediate calculations done in double-double precision floating point
 * arithmetic.
 *
 * * **precondition**: TODO underflow/overflow
 * * to get an absolute error bound on the result call [[evalDeCasteljauErrorCounters]]
 *
 * @param ps an order 1, 2 or 3 bezier curve, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param t the parameter value where the bezier should be evaluated (given in
 * double-double precision)
 *
 * @doc mdx
 **/
function evalDeCasteljauDd(ps, t) {
    if (t[0] === 0 && t[1] === 0) {
        return ps[0].map(function (c) { return [c]; });
    }
    else if (t[0] === 0 && t[1] === 1) {
        return ps[ps.length - 1].map(function (c) { return [c]; });
    }
    if (ps.length === 4) {
        var _a = ps[0], x0 = _a[0], y0 = _a[1], _b = ps[1], x1 = _b[0], y1 = _b[1], _c = ps[2], x2 = _c[0], y2 = _c[1], _d = ps[3], x3 = _d[0], y3 = _d[1];
        var a01 = qad(qmq(td(x1, x0), t), x0);
        var a11 = qad(qmq(td(x2, x1), t), x1);
        var a21 = qad(qmq(td(x3, x2), t), x2);
        var a02 = qaq(a01, qmq(qdq(a11, a01), t));
        var a12 = qaq(a11, qmq(qdq(a21, a11), t));
        var x = qaq(a02, qmq(qdq(a12, a02), t));
        var b01 = qad(qmq(td(y1, y0), t), y0);
        var b11 = qad(qmq(td(y2, y1), t), y1);
        var b21 = qad(qmq(td(y3, y2), t), y2);
        var b02 = qaq(b01, qmq(qdq(b11, b01), t));
        var b12 = qaq(b11, qmq(qdq(b21, b11), t));
        var y = qaq(b02, qmq(qdq(b12, b02), t));
        return [x, y];
    }
    else if (ps.length === 3) {
        var _e = ps[0], x0 = _e[0], y0 = _e[1], _f = ps[1], x1 = _f[0], y1 = _f[1], _g = ps[2], x2 = _g[0], y2 = _g[1];
        var a01 = qaq([0, x0], qmq(td(x1, x0), t));
        var a11 = qaq([0, x1], qmq(td(x2, x1), t));
        var x = qaq(a01, qmq(qdq(a11, a01), t));
        var b01 = qaq([0, y0], qmq(td(y1, y0), t));
        var b11 = qaq([0, y1], qmq(td(y2, y1), t));
        var y = qaq(b01, qmq(qdq(b11, b01), t));
        return [x, y];
    }
    else if (ps.length === 2) {
        var _h = ps[0], x0 = _h[0], y0 = _h[1], _j = ps[1], x1 = _j[0], y1 = _j[1];
        var x = qad(qmq(td(x1, x0), t), x0);
        var y = qad(qmq(td(y1, y0), t), y0);
        return [x, y];
    }
    else {
        // TODO - add case of degenerate point
        throw new Error('The given bezier curve is invalid.');
    }
}
exports.evalDeCasteljauDd = evalDeCasteljauDd;
