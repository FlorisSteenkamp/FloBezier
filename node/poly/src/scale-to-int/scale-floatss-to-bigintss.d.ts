/**
 * Returns the result of scaling the given array of array of floats by the
 * *same* power of two such that all floats become bigints.
 *
 * * can be used to scale polynomials (with coefficients given as Shewchuk
 * expansions)
 *
 * @param ass an array of an array of double precision floating point numbers
 *
 * @doc
 */
declare function scaleFloatssToBigintss(ass: number[][]): bigint[][];
export { scaleFloatssToBigintss };
