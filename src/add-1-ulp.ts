const f64 = new Float64Array(1);
const u64 = new BigUint64Array(f64.buffer);


/**
 * Returns the smallest double floating point number strictly greater than the
 * given number, i.e. adds one unit in the last place (ulp) to the given
 * number.
 *
 * * equivalent to the standard `nextUp` (e.g. Java's `Math.nextUp`) or
 * `nextafter(n, +Infinity)` (C) functions, in particular:
 *   * `0` (and `-0`) returns `Number.MIN_VALUE` (the smallest positive
 * subnormal)
 *   * subnormal numbers are handled correctly
 *   * `Number.MAX_VALUE` returns `Infinity`
 *   * `Infinity` returns `Infinity`
 *   * `-Infinity` returns `-Number.MAX_VALUE`
 *   * `NaN` returns `NaN`
 *
 * @param n a double floating point number
 */
function add1Ulp(n: number): number {
    if (n !== n || n === Infinity) { return n; }  // NaN or Infinity
    if (n === 0) { return Number.MIN_VALUE; }  // also handles -0

    f64[0] = n;
    u64[0] += n > 0 ? 1n : -1n;

    return f64[0];
}


export { add1Ulp }
