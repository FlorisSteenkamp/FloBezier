/**
 * Returns the primitive pseudo remainder sequence of a/b.
 *
 * * **precondition:** g !== [], i.e. unequal to the zero polynomial.
 *
* * see [Primitive Pseudo-remainder sequences](https://en.wikipedia.org/wiki/Polynomial_greatest_common_divisor#Primitive_pseudo-remainder_sequence)
 *
 * @param f the polynomial a in the formula a = bq + r; the polynomial is given
 * with coefficients as a dense array of Shewchuk expansions from highest to
 * lowest power, e.g. `[[5],[-3],[0]]` represents the  polynomial `5x^2 - 3x`
 * @param g the polynomial b in the formula a = bq + r;
 *
 * @doc
 */
declare function ePremSequencePrimitive(f: number[][], g: number[][]): number[][][];
export { ePremSequencePrimitive };
