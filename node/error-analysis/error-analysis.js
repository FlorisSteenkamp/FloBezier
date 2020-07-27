"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.γγ = exports.γ = void 0;
const u = Number.EPSILON / 2;
const uu = u * u;
/** @internal */
function γ(n) {
    let nu = n * u;
    return nu / (1 - nu);
}
exports.γ = γ;
/** @internal */
function γγ(n) {
    let nuu = n * uu;
    return nuu / (1 - nuu);
}
exports.γγ = γγ;
//# sourceMappingURL=error-analysis.js.map