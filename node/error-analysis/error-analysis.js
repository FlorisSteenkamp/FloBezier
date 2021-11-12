const u = Number.EPSILON / 2;
const uu = u * u;
/** @internal */
function γ(n) {
    const nu = n * u;
    return nu / (1 - nu);
}
/** @internal */
function γγ(n) {
    const nuu = n * uu;
    return nuu / (1 - nuu);
}
export { γ, γγ };
//# sourceMappingURL=error-analysis.js.map