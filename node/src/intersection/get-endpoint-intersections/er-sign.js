import { eSign } from "big-float-ts";
/**
 * Returns the sign of the given expansion rational.
 *
 * @param a
 */
function erSign(a) {
    return eSign(a[0]) * eSign(a[1]);
}
export { erSign };
//# sourceMappingURL=er-sign.js.map