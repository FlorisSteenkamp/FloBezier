"use strict";
exports.__esModule = true;
exports.γγ = exports.γ = void 0;
var u = Number.EPSILON / 2;
var uu = u * u;
/** @internal */
function γ(n) {
    var nu = n * u;
    return nu / (1 - nu);
}
exports.γ = γ;
/** @internal */
function γγ(n) {
    var nuu = n * uu;
    return nuu / (1 - nuu);
}
exports.γγ = γγ;
