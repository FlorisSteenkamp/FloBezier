"use strict";
exports.__esModule = true;
exports.isPointOnBezierExtension = void 0;
var big_float_ts_1 = require("big-float-ts");
var is_point_on_bezier_extension_1_js_1 = require("./is-point-on-bezier-extension-1.js");
var is_point_on_bezier_extension_2_js_1 = require("./is-point-on-bezier-extension-2.js");
var is_point_on_bezier_extension_3_js_1 = require("./is-point-on-bezier-extension-3.js");
/**
 * Returns `true` if the given point is on the given bezier curve where the
 * parameter `t` is allowed to extend to ±∞, i.e. `t` is an element of
 * `(-∞, +∞)`, `false` otherwise.
 *
 * * **precondition**: TODO - underflow/overflow
 *
 * @param ps a bezier curve
 * @param p A point with coordinates given as Shewchuk expansions. If only
 * double precision coordinates need to be provided then wrap it in an array,
 * e.g. for a point with x and y coordinates given as `1` and `2` set
 * `p === [[1],[2]]`. TODO - link to Schewchuk
 */
function isPointOnBezierExtension(ps, p) {
    if (ps.length === 4) {
        return (0, is_point_on_bezier_extension_3_js_1.isPointOnBezierExtension3)(ps, p);
    }
    if (ps.length === 3) {
        return (0, is_point_on_bezier_extension_2_js_1.isPointOnBezierExtension2)(ps, p);
    }
    if (ps.length === 2) {
        return (0, is_point_on_bezier_extension_1_js_1.isPointOnBezierExtension1)(ps, p);
    }
    if (ps.length === 1) {
        var x = (0, big_float_ts_1.eCompress)(p[0]);
        var y = (0, big_float_ts_1.eCompress)(p[1]);
        return (x.length === 1 && y.length === 1 &&
            x[0] === ps[0][0] && y[0] === ps[0][1]);
    }
    throw new Error('The given bezier curve is invalid.');
}
exports.isPointOnBezierExtension = isPointOnBezierExtension;
