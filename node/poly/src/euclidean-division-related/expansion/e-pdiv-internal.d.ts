/**
 * Returns the `quotient` and `remainder` of the pseudo division of `a/b` (a, b
 * both being polynomials) naively, i.e. in such a way that all intermediate
 * calculations and the final result are **not** guaranteed to be in ℤ, i.e.
 * performs Euclidean (i.e. long) division on the two given polynomials, a/b,
 * and returns `q` and `r` in the formula `a = bq + r`,
 * where `degree(r) < degree(b)`. `q` is called the quotient and `r` the
 * remainder.
 *
 * * **precondition:** the coefficients must be integers; if they are not they
 * can easily be scaled from floating point numbers to integers by calling
 * [[scaleFloatsToBigints]] or similar before calling this function (recall that
 * all floating point numbers are rational).
 *
 * * **precondition:** b !== [], i.e. unequal to the zero polynomial.
 *
 * * see [Polynomial long division](https://en.wikipedia.org/wiki/Polynomial_long_division)
 *
 * @param a the polynomial a in the formula a = bq + r
 * @param b the polynomial b in the formula a = bq + r
 *
 * @internal
 */
declare function ePdivInternal(a: number[][], b: number[][]): {
    q: number[][];
    r: number[][];
};
export { ePdivInternal };
