"use strict";
exports.__esModule = true;
exports.evaluateDxy = void 0;
var flo_poly_1 = require("flo-poly");
var get_dxy_js_1 = require("../../../to-power-basis/get-dxy/double/get-dxy.js");
function evaluateDxy(ps, t) {
    var _a = (0, get_dxy_js_1.getDxy)(ps), dX = _a[0], dY = _a[1];
    var f = function (t) { return [(0, flo_poly_1.Horner)(dX, t), (0, flo_poly_1.Horner)(dY, t)]; };
    return t === undefined ? f : f(t); // Curry
}
exports.evaluateDxy = evaluateDxy;
