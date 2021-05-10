"use strict";
exports.__esModule = true;
exports.toGrid = void 0;
var flo_numerical_1 = require("flo-numerical");
function toGrid(a, expMax, significantFigures) {
    var expA = Math.floor(Math.log2(Math.abs(a)));
    var expDif = expMax - expA;
    var newSig = significantFigures - expDif + 1;
    if (newSig <= 0) {
        return 0;
    }
    var res = flo_numerical_1.reduceSignificand(a, newSig);
    return res;
}
exports.toGrid = toGrid;
