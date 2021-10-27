/**
 * ❗ DON'T USE - coefficients grow way too big, making it slow - use
 * [[bPremSequenceSubresultant]] instead. ❗
 *
 * Returns the trivial pseudo remainder sequence of a/b.
 *
 * * **precondition:** g !== [], i.e. unequal to the zero polynomial.
 *
* * see [Trivial Pseudo-remainder sequences](https://en.wikipedia.org/wiki/Polynomial_greatest_common_divisor#Trivial_pseudo-remainder_sequence)
 *
 * @param f the polynomial a in the formula a = bq + r; the polynomial is given
 * with coefficients as a dense array of bigints from highest to lowest
 * power, e.g. `[5n,-3n,0n]` represents the  polynomial `5x^2 - 3x`
 * @param g the polynomial b in the formula a = bq + r;
 *
 * @doc
 */
declare function bPremSequenceTrivial(f: bigint[], g: bigint[]): bigint[][];
export { bPremSequenceTrivial };
