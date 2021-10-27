/**
 * Returns the Sturm chain for the given polynomial using pseudo remainders
 * with the resulting polynomials given with coefficients as Shewchuk
 * expansions.
 *
 * * intermediate calculations use Shewchuk expansions and the final result is
 * given as an array of polynomials with coefficients given densely as an array of
 * Shewchuk expansions from highest to lowest power, e.g. `[[5],[-3],[0]]`
 * represents the polynomial `5x^2 - 3x`
 *
 * * see [Sturm's Theorem](https://en.wikipedia.org/wiki/Sturm%27s_theorem)
 * * see [Pseudo-remainder sequences](https://en.wikipedia.org/wiki/Polynomial_greatest_common_divisor#Pseudo-remainder_sequences)
 *
 * @param p a polynomial with coefficients given densely as an array of
 * double precision floating point numbers from highest to lowest power,
 * e.g. `[5,-3,0]` represents the polynomial `5x^2 - 3x`
 *
 * @example
 * ```typescript
 * sturmChain([-3,4,2,-2]); //=> [[[-3],[4],[2],[-2]],[[-9],[8],[2]],[[-204],[138]],[[-1692]]]
 * ```
 *
 * @doc
 */
declare function sturmChain(p: number[]): number[][][];
export { sturmChain };
