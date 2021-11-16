"use strict";
exports.__esModule = true;
exports.getTAtLength = void 0;
var to_cubic_js_1 = require("../transformation/degree-or-type/to-cubic.js");
var length_js_1 = require("../global-properties/length/length.js");
var flo_poly_1 = require("flo-poly");
function getTAtLength(ps, s) {
    var ps_ = (0, to_cubic_js_1.toCubic)(ps);
    var lenAtT = function (t) { return (0, length_js_1.length)([0, t], ps_); };
    function f(s) {
        if (s === 0) {
            return 0;
        }
        return (0, flo_poly_1.brent)(function (t) { return (lenAtT(t) - s); }, 0, 1.125);
    }
    // Curry
    return s === undefined ? f : f(s);
}
exports.getTAtLength = getTAtLength;
