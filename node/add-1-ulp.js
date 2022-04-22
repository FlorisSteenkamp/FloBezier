const eps = Number.EPSILON;
const u = eps / 2;
/** @internal */
function add1Ulp(n) {
    return n + n * (u + eps ** 2);
}
export { add1Ulp };
//# sourceMappingURL=add-1-ulp.js.map