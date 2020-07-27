/**
 * Returns the trivial pseudo-remainder, i.e. with α === 1.
 *
 * The result could be in-exact in the presence of underflow.
 *
 * Performs Euclidean (i.e. long) division on the two given polynomials, a/b,
 * where a is first multiplied by leadingCoeff(b)^(deg(a)-deg(b)+1) so we can
 * guarantee exact divisions. Returns r in the formula a = bq + r, where
 * degree(r) < degree(b). q is called the quotient and r the remainder.
 *
 * A precondition is that b !== [0], i.e. unequal to the zero polynomial.
 * see https://en.wikipedia.org/wiki/Polynomial_greatest_common_divisor#Pseudo-remainder_sequences
 * @param a the polynomial a in the formula a = bq + r
 * @param b the polynomial b in the formula a = bq + r
 * @param positiveMultiplier if set then the multiplier leadingCoeff(b)^(deg(a)-deg(b)+1)
 * will be modified to abs(leadingCoeff(b)^(deg(a)-deg(b)+1))
 */
declare function prem(a: number[][], b: number[][], positiveMultiplier?: boolean): {
    q: number[][];
    r: number[][];
};
export { prem };
