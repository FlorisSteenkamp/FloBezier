/**
 * Returns the primitive part of the given polynomial.
 *
 * * the sign is chosen such that the leading term coefficient is positive
 *
 * * see e.g. [Factorization of polynomials](https://en.wikipedia.org/wiki/Factorization_of_polynomials)
 *
 * * example: let `p = -10x² + 5x + 5 = (-5)(2x² - x - 1)` so that `-5` is the
 * content of `p` and `2x² - x - 1` is its primitive part.
 *
 * * **precondition** p must have integer coefficients, else use e.g. [[scaleFloatsToInts]]
 *
 * @param p a polynomial with coefficients given densely as an array of
 * double precision floating point numbers from highest to lowest power, e.g.
 * `[5,-3,0]` represents the polynomial `5x^2 - 3x`
 *
 * @doc
 */
declare function primitivePart(p: number[]): number[];
export { primitivePart };
