/**
 * Returns the result of scaling the given array of array of floats by the
 * *same* power of two such that all floats become integers (bar overflow).
 *
 * * the result is exact (no round-off can occur, but overflow can)
 * * can be used to scale polynomials (with coefficients given as Shewchuk
 * expansions)
 *
 * @param ass an array of an array of double precision floating point numbers
 *
 * @doc
 */
declare function scaleFloatssToIntss(ass: number[][]): number[][];
export { scaleFloatssToIntss };
