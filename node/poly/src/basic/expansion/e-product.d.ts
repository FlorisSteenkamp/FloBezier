/**
 * Returns the exact result (bar underflow / overflow) of the product of 0 or
 * more polynomials.
 *
 * * see [polynomial arithmetic](https://en.wikipedia.org/wiki/Polynomial_arithmetic)
 * * see [polynomial multiplication](https://en.wikipedia.org/wiki/Discrete_Fourier_transform#Polynomial_multiplication)
 * * see [polynomial multiplication](http://web.cs.iastate.edu/~cs577/handouts/polymultiply.pdf)
 *
 * @param ps an array of polynomials each with coefficients given densely as an
 * array of Shewchuk floating point expansions from highest to lowest power,
 * e.g. `[[5],[-3],[0]]` represents the polynomial `5x^2 - 3x`
 *
 * @example
 * ```typescript
 * eProduct([[[1],[2],[3]], [[2],[5],[3],[5]]]); //=> [[2], [9], [19], [26], [19], [15]]
 * ```
 *
 * @doc
 */
declare function eProduct(ps: number[][][]): number[][];
export { eProduct };
