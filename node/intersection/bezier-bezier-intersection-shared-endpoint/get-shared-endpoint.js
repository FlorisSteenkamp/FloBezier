/**
 * Returns which curves need to be reversed so that the given bezier curves
 * start at the same (coinciding) point, i.e. so that `ps1[0]` and `ps2[0]`
 * are *exactly* equal, or `undefined` if no endpoint of `ps1` (exactly)
 * coincides with an endpoint of `ps2`.
 *
 * * if more than one pair of endpoints coincide the shared point that is
 * smallest (by `x` and then by `y` coordinate) is chosen so that the choice
 * is independent of the order of the curves (i.e. swapping `ps1` and `ps2`
 * swaps `reverse1` and `reverse2`)
 *
 * @param ps1 a bezier curve
 * @param ps2 another bezier curve
 *
 * @internal
 */
function getSharedEndpoint(ps1, ps2) {
    const eq = (p, q) => p[0] === q[0] && p[1] === q[1];
    let best = undefined;
    let bestP = undefined;
    for (const reverse1 of [false, true]) {
        const p1 = reverse1 ? ps1[ps1.length - 1] : ps1[0];
        for (const reverse2 of [false, true]) {
            const p2 = reverse2 ? ps2[ps2.length - 1] : ps2[0];
            if (!eq(p1, p2)) {
                continue;
            }
            if (bestP === undefined ||
                p1[0] < bestP[0] || (p1[0] === bestP[0] && p1[1] < bestP[1])) {
                best = { reverse1, reverse2 };
                bestP = p1;
            }
        }
    }
    return best;
}
export { getSharedEndpoint };
//# sourceMappingURL=get-shared-endpoint.js.map