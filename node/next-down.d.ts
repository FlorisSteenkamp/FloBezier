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
declare function nextDown(n: number): number;
export { nextDown };
