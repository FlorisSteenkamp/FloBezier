/**
 * Returns an upper bound on the magnitude (absolute value) of the complex
 * roots of the given polynomial using the near-optimal Fujiwara bound.
 *
 * * the bound includes complex roots.
 * * the bound is quite tight
 *
 * * see [Wikipedia](https://en.wikipedia.org/wiki/Properties_of_polynomial_roots#Other_bounds)
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @example
 * ```typescript
 * rootMagnitudeUpperBound_fujiwara([2,-3,6,5,-130]); //=> 6.753296750770361
 * allRoots([2,-3,6,5,-130]); //=> [-2.397918624065303, 2.8793785310848383]
 * ```
 *
 * @doc
 */
declare function rootMagnitudeUpperBound_fujiwara(p: number[]): number;
export { rootMagnitudeUpperBound_fujiwara };
