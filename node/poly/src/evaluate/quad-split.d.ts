/**
 * Returns two new polynomials by splitting the given polynomial into two where
 * the first polynomial's coefficients are the high order bits and the second's
 * coefficients are the low order bits.
 * @param p a polynomial with quad coefficients - if higher order coefficients
 * are given, the bitlength is truncated.
 */
declare function quadSplit(p: number[][]): number[][];
export { quadSplit };
