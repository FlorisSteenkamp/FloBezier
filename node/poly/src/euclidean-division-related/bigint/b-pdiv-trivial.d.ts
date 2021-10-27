/**
 * Performs a **trivial pseudo-division** and returns the `quotient` and `remainder`
 * of the pseudo division of `a/b` (a, b both being polynomials) in such a way
 * that all intermediate calculations and the final result are done in ℤ, i.e.
 * performs Euclidean (i.e. long) division on the two given polynomials, a/b,
 * and returns a scaled `r` and `q` in the formula `a = bq + r`, where
 * `degree(r) < degree(b)`. `q` is called the quotient and `r` the remainder.
 *
 * * **precondition:** the coefficients must be bigints; if they are not they
 * can easily be scaled from floating point numbers to bigints by calling
 * [[scaleFloatsToBigints]] or similar before calling this function (recall that
 * all floating point numbers are rational).
 *
 * * **precondition:** b !== [0], i.e. unequal to the zero polynomial.
 *
 * * see [trivial pseudo-remainder sequence](https://en.wikipedia.org/wiki/Polynomial_greatest_common_divisor#Trivial_pseudo-remainder_sequence)
 * * see also [Polynomial long division](https://en.wikipedia.org/wiki/Polynomial_long_division)
 *
 * @param a the polynomial a in the formula a = bq + r; the polynomial is given
 * with coefficients as a dense array of bigints from highest to lowest
 * power, e.g. `[5n,-3n,0n]` represents the  polynomial `5x^2 - 3x`
 * @param b the polynomial b in the formula a = bq + r
 * @param positiveMultiplier defaults to false - if set to true then the
 * multiplier (of the coefficients of the dividend)
 * `leadingCoeff(b)^(deg(a)-deg(b)+1)` will be
 * modified to `abs(leadingCoeff(b)^(deg(a)-deg(b)+1))`
 *
 * @doc
 */
declare function bPdivTrivial(a: bigint[], b: bigint[], positiveMultiplier?: boolean): {
    q: bigint[];
    r: bigint[];
};
export { bPdivTrivial };
