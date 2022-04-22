const eps = Number.EPSILON;
const u = eps / 2;
/**
 * @param t
 * @param min1Sign
 *
 * @internal
 */
function ensureRange(t, min1Sign) {
    return (min1Sign < 0
        ? (t < 1 ? t : 1 - u)
        : min1Sign === 0
            ? 1
            : (t > 1 ? t : 1 + eps));
}
export { ensureRange };
//# sourceMappingURL=ensure-range.js.map