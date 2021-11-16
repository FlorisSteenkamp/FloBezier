"use strict";
exports.__esModule = true;
exports.getControlPointBox = void 0;
function getControlPointBox(ps) {
    var minX = Number.POSITIVE_INFINITY;
    var maxX = Number.NEGATIVE_INFINITY;
    var minY = Number.POSITIVE_INFINITY;
    var maxY = Number.NEGATIVE_INFINITY;
    for (var _i = 0, ps_1 = ps; _i < ps_1.length; _i++) {
        var p = ps_1[_i];
        var x = p[0];
        var y = p[1];
        if (x < minX) {
            minX = x;
        }
        if (x > maxX) {
            maxX = x;
        }
        if (y < minY) {
            minY = y;
        }
        if (y > maxY) {
            maxY = y;
        }
    }
    return [[minX, minY], [maxX, maxY]];
}
exports.getControlPointBox = getControlPointBox;
