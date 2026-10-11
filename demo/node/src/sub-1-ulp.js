const f64 = new Float64Array(1);
const u64 = new BigUint64Array(f64.buffer);
/**
 * Returns the largest double floating point number strictly less than the
 * given number, i.e. subtracts one unit in the last place (ulp) from the given
 * number.
 *
 * * equivalent to the standard `nextDown` (e.g. Java's `Math.nextDown`) or
 * `nextafter(n, -Infinity)` (C) functions, in particular:
 *   * `0` (and `-0`) returns `-Number.MIN_VALUE` (the largest negative
 * subnormal)
 *   * subnormal numbers are handled correctly
 *   * `-Number.MAX_VALUE` returns `-Infinity`
 *   * `-Infinity` returns `-Infinity`
 *   * `Infinity` returns `Number.MAX_VALUE`
 *   * `NaN` returns `NaN`
 *
 * @param n a double floating point number
 */
function sub1Ulp(n) {
    if (n !== n || n === -Infinity) {
        return n;
    } // NaN or -Infinity
    if (n === 0) {
        return -Number.MIN_VALUE;
    } // also handles -0
    f64[0] = n;
    u64[0] += n > 0 ? -1n : 1n;
    return f64[0];
}
export { sub1Ulp };
//# sourceMappingURL=sub-1-ulp.js.map