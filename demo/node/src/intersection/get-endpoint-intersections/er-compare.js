import { eCompare, eMult, eSign } from "big-float-ts";
/**
 * Compares two expansion rationals.
 *
 * @internal
 */
function erCompare(a, b) {
    return (eCompare(eMult(a[0], b[1]), eMult(a[1], b[0])) *
        eSign(a[1]) *
        eSign(b[1]));
}
export { erCompare };
//# sourceMappingURL=er-compare.js.map