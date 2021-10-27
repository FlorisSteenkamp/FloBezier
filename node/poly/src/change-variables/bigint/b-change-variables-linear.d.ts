/**
 * Returns the result of performing a change of variables of the
 * form: p(x) <- p(ax + b).
 *
 * * see [this stackoverflow question](http://stackoverflow.com/questions/141422/how-can-a-transform-a-polynomial-to-another-coordinate-system)
 *
 * @param p a polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[5n,-3n,0n]` represents the
 * polynomial `5x^2 - 3x`
 * @param a the `a` in `ax + b`
 * @param b the `b` in `ax + b`
 *
 * @example
 * ```typescript
 * bChangeVariablesLinear([1n,2n,7n], 3n, 4n); //=> [9n, 30n, 31n]
 * ```
 *
 * @doc
 */
declare function bChangeVariablesLinear(p: bigint[], a: bigint, b: bigint): bigint[];
export { bChangeVariablesLinear };
