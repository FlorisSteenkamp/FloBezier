"use strict";
exports.__esModule = true;
exports.fromPowerBasis = void 0;
/**
 * Returns the Bernstein basis representation (i.e. control points) of a line,
 * quadratic or cubic bezier given its power bases.
 * * **non-exact** - due to floating-point round-off (see implementation to
 * understand under what conditions the result would be exact)
 *
 * @param cs An order 1, 2 or 3 parametric curve in power bases with the
 * x-coordinate coefficients given first (as an array representing the
 * polynomial from highest to lowest power coefficient), e.g. `[[1,2,3,4],
 * [5,6,7,8]]` represents a cubic parametric curve given by
 * `x(t) = t^3 + 2t^2 + 3t^3 + 4t^4, y(t) = 5t^3 + 6t^2 + 7t + 8`.
 *
 * @doc
 */
function fromPowerBasis(cs) {
    var len = cs[0].length;
    if (len === 4) {
        var _a = cs[0], a3 = _a[0], a2 = _a[1], a1 = _a[2], a0 = _a[3], _b = cs[1], b3 = _b[0], b2 = _b[1], b1 = _b[2], b0 = _b[3];
        return [
            [a0,
                b0],
            [a0 + a1 / 3,
                b0 + b1 / 3],
            [a0 + 2 * a1 / 3 + a2 / 3,
                b0 + 2 * b1 / 3 + b2 / 3],
            [a0 + a1 + a2 + a3,
                b0 + b1 + b2 + b3]
        ];
    }
    if (len === 3) {
        var _c = cs[0], a2 = _c[0], a1 = _c[1], a0 = _c[2], _d = cs[1], b2 = _d[0], b1 = _d[1], b0 = _d[2];
        return [
            [a0,
                b0],
            [a0 + a1 / 2,
                b0 + b1 / 2],
            [a0 + a1 + a2,
                b0 + b1 + b2]
        ];
    }
    if (len === 2) {
        var _e = cs[0], a1 = _e[0], a0 = _e[1], _f = cs[1], b1 = _f[0], b0 = _f[1];
        return [
            [a0,
                b0],
            [a0 + a1,
                b0 + b1]
        ];
    }
    if (len === 1) {
        var a0 = cs[0][0], b0 = cs[1][0];
        return [
            [a0,
                b0]
        ];
    }
    throw new Error('The given bezier curve is invalid.');
}
exports.fromPowerBasis = fromPowerBasis;
