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
declare function getSharedEndpoint(ps1: number[][], ps2: number[][]): {
    reverse1: boolean;
    reverse2: boolean;
} | undefined;
export { getSharedEndpoint };
