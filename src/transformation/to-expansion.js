"use strict";
exports.__esModule = true;
exports.toExpansion = void 0;
function toExpansion(ps) {
    return ps.map(function (p) { return p.map(function (c) { return [c]; }); });
}
exports.toExpansion = toExpansion;
