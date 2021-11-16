"use strict";
exports.__esModule = true;
exports.evaluateDdxy = void 0;
var get_ddxy_js_1 = require("../../../to-power-basis/get-ddxy/double/get-ddxy.js");
var flo_poly_1 = require("flo-poly");
function evaluateDdxy(ps, t) {
    var _a = (0, get_ddxy_js_1.getDdxy)(ps), ddPsX = _a[0], ddPsY = _a[1];
    var f = function (t) { return [(0, flo_poly_1.Horner)(ddPsX, t), (0, flo_poly_1.Horner)(ddPsY, t)]; };
    return t === undefined ? f : f(t); // Curry
}
exports.evaluateDdxy = evaluateDdxy;
