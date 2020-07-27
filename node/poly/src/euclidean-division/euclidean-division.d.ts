/**
 * Returns the Euclidean remainder.
 *
 * Performs Euclidean (i.e. long) division on the two given polynomials, a/b,
 * and returns r in the formula a = bq + r, where degree(r) < degree(b). q is
 * called the quotient and r the remainder.
 *
 * A precondition is that b !== [0], i.e. unequal to the zero polynomial.
 * see https://en.wikipedia.org/wiki/Polynomial_greatest_common_divisor#Pseudo-remainder_sequences
 * @param a the polynomial a in the formula a = bq + r
 * @param b the polynomial b in the formula a = bq + r
 */
declare function rem(a: number[][], b: number[][]): {
    q: number[][];
    r: number[][];
};
export { rem };
