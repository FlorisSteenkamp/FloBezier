/**
 * Returns the result of scaling the given float by a power of two such that
 * it becomes a bigint - the smallest such integer is returned.
 *
 * @param a a double precision floating point number
 *
 * @doc
 */
declare function scaleFloatToBigint(a: number): bigint;
export { scaleFloatToBigint };
