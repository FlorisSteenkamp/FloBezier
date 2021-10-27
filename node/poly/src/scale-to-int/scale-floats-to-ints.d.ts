/**
 * Returns the result of scaling the given floats by the *same* power of two
 * such that all floats become integers (bar overflow).
 *
 * * the result is exact (no round-off can occur, but overflow can)
 * * can be used to scale polynomials or Shewchuk expansions
 *
 * @param as an array of double precision floating point numbers
 *
 * @doc
 */
declare function scaleFloatsToInts(as: number[]): number[];
export { scaleFloatsToInts };
