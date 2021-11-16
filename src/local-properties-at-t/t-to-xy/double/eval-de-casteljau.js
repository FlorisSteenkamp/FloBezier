"use strict";
exports.__esModule = true;
exports.evalDeCasteljau = void 0;
/**
 * Returns the result of evaluating the given bezier curve at the parameter `t`
 * using [De Casteljau's algorithm](https://en.wikipedia.org/wiki/De_Casteljau%27s_algorithm)
 * in double precision floating point arithmetic.
 *
 * The resulting point `p` is returned as the pair `[x,y]`, where `x` and `y` are
 * double precision floating point numbers.
 *
 * * max bit-aligned bitlength increase: ??? bits TODO
 *
 * @param ps an order 1, 2 or 3 bezier curve, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param t the parameter value where the bezier should be evaluated
 *
 * @doc mdx
 **/
function evalDeCasteljau(ps, t) {
    if (t === 0) {
        return ps[0];
    }
    else if (t === 1) {
        return ps[ps.length - 1];
    }
    if (ps.length === 4) {
        var _a = ps[0], x0 = _a[0], y0 = _a[1], _b = ps[1], x1 = _b[0], y1 = _b[1], _c = ps[2], x2 = _c[0], y2 = _c[1], _d = ps[3], x3 = _d[0], y3 = _d[1];
        var a01 = x0 + (x1 - x0) * t;
        var a11 = x1 + (x2 - x1) * t;
        var a21 = x2 + (x3 - x2) * t;
        var a02 = a01 + (a11 - a01) * t;
        var a12 = a11 + (a21 - a11) * t;
        var x = a02 + (a12 - a02) * t;
        var b01 = y0 + (y1 - y0) * t;
        var b11 = y1 + (y2 - y1) * t;
        var b21 = y2 + (y3 - y2) * t;
        var b02 = b01 + (b11 - b01) * t;
        var b12 = b11 + (b21 - b11) * t;
        var y = b02 + (b12 - b02) * t;
        return [x, y];
    }
    if (ps.length === 3) {
        var _e = ps[0], x0 = _e[0], y0 = _e[1], _f = ps[1], x1 = _f[0], y1 = _f[1], _g = ps[2], x2 = _g[0], y2 = _g[1];
        var a01 = x0 + (x1 - x0) * t;
        var a11 = x1 + (x2 - x1) * t;
        var x = a01 + (a11 - a01) * t;
        var b01 = y0 + (y1 - y0) * t;
        var b11 = y1 + (y2 - y1) * t;
        var y = b01 + (b11 - b01) * t;
        return [x, y];
    }
    if (ps.length === 2) {
        var _h = ps[0], x0 = _h[0], y0 = _h[1], _j = ps[1], x1 = _j[0], y1 = _j[1];
        var x = x0 + (x1 - x0) * t;
        var y = y0 + (y1 - y0) * t;
        return [x, y];
    }
    if (ps.length === 1) {
        return ps[0];
    }
    throw new Error('The given bezier curve is invalid.');
}
exports.evalDeCasteljau = evalDeCasteljau;
