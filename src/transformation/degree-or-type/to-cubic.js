"use strict";
exports.__esModule = true;
exports.toCubic = void 0;
var linear_to_cubic_js_1 = require("./linear-to-cubic.js");
var quadratic_to_cubic_js_1 = require("./quadratic-to-cubic.js");
/**
 * Returns a cubic bezier curve that is equivalent to the given linear or
 * quadratic bezier curve. Cubics are just returned unaltered.
 *
 * @param ps An order 1, 2 or 3 bezier curve
 *
 * @doc mdx
 */
function toCubic(ps) {
    if (ps.length === 4) { // Cubic
        return ps;
    }
    if (ps.length === 3) { // Quadratic
        return (0, quadratic_to_cubic_js_1.quadraticToCubic)(ps);
    }
    if (ps.length === 2) { // Linear
        return (0, linear_to_cubic_js_1.linearToCubic)(ps);
    }
    if (ps.length === 1) { // Point
        var p = ps[0];
        return [p, p, p, p];
    }
    throw new Error('The given bezier curve is invalid.');
}
exports.toCubic = toCubic;
