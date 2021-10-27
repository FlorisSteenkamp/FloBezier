/**
 * Returns the Sturm Chain for the given polynomial using pseudo remainders.
 *
 * * see [Sturm's Theorem](https://en.wikipedia.org/wiki/Sturm%27s_theorem)
 * * see [Pseudo-remainder sequences](https://en.wikipedia.org/wiki/Polynomial_greatest_common_divisor#Pseudo-remainder_sequences)
 *
 * @param p a polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[5n,-3n,0n]` represents the
 * polynomial `5x^2 - 3x`
 *
 * @example
 * ```typescript
 * bSturmChain([-3n,4n,2n,-2n]); //=> [[-3n, 4n, 2n, -2n], [-9n, 8n, 2n], [-204n, 138n], [-1692n]]
 * ```
 *
 * @doc
 */
declare function bSturmChain(p: bigint[]): bigint[][];
export { bSturmChain };
