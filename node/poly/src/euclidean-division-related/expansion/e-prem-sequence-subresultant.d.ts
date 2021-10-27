/**
 * Returns the subresultant pseudo remainder sequence of a/b.
 *
 * * **precondition:** g !== [], i.e. unequal to the zero polynomial.
 *
 * * **precondition:** the coefficients must be integer Shewchuk floating point
 * expansions; if they are not they can easily be scaled from
 * floating point numbers to Shewchuk expansions by calling [[scaleFloatsToInts]]
 * or similar before calling this function (recall that all floating point
 * numbers are rational).
 *
 * * Intermediate calculations (and the input coefficients) are done in
 * infinite precision up to overlow (meaning integers can be represented
 * *exactly* up to `2^1024 === 1797...(300 more digits)...37216`) and may
 * thus not be applicable to very high degree polynomials (in which case it is
 * better to use [[bPremSequenceSubresultant]])
 *
 * * see [*The subresultant polynomial remainder sequence algorithm* by Ruiyuan (Ronnie) Chen, p.10](https://pdfs.semanticscholar.org/2e6b/95ba84e2160748ba8fc310cdc408fc9bbade.pdf)
 *
 * @param f the polynomial a in the formula a = bq + r; the polynomial is given
 * with coefficients as a dense array of integer Shewchuk expansions from
 * highest to lowest power, e.g. `[[5],[-3],[0]]` represents the
 * polynomial `5x^2 - 3x`
 * @param g the polynomial b in the formula a = bq + r
 * @param sturm if set to true then calculate a Sturm sequence instead
 *
 * @doc
 */
declare function ePremSequenceSubresultant(f: number[][], g: number[][], sturm?: boolean): number[][][];
export { ePremSequenceSubresultant };
