/**
 * Returns the result of performing a change of variables of the
 * form: p(x) <- p(ax).
 *
 * * see [this stackoverflow question](http://stackoverflow.com/questions/141422/how-can-a-transform-a-polynomial-to-another-coordinate-system)
 *
 * @param p a polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[5n,-3n,0n]` represents the
 * polynomial `5x^2 - 3x`
 * @param a a scaling factor, i.e. the `a` in `p(x) <- p(ax)`
 *
 * @example
 * ```typescript
 * bChangeVariablesScale([1n,2n,7n], 3n); //=> [9n, 6n, 7n]
 * ```
 *
 * @doc
 */
declare function bChangeVariablesScale(p: bigint[], a: bigint): bigint[];
export { bChangeVariablesScale };
