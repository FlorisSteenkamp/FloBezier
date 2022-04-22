import { eDiv, eEstimate } from "big-float-ts";
/**
 * Estimates the result of the given expansion rational.
 *
 * * the sign of the returned result is guaranteed to be correct
 * * the result is guaranteed accurate to within 2 ulps
 *
 * @param a
 *
 * @internal
 */
function erEstimate(a) {
    return eEstimate(eDiv(a[0], a[1], 2));
}
export { erEstimate };
//# sourceMappingURL=er-estimate.js.map