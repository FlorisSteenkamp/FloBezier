/**
 * Returns the result of scaling the given float by a power of two such that
 * it becomes an integer (overflow not possible) - the smallest such integer is
 * returned.
 *
 * * the result is exact (no round-off can occur)
 *
 * @param a a double precision floating point number
 *
 * @doc
 */
declare function scaleFloatToInt(a: number): number;
export { scaleFloatToInt };
