const eps = Number.EPSILON;
const u = eps / 2;
/** @internal */
function sub1Ulp(n) {
    return n - n * (u + eps ** 2);
}
export { sub1Ulp };
//# sourceMappingURL=sub-1-ulp.js.map