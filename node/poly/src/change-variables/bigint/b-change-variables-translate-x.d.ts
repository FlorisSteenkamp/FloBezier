/**
 * Returns the result of performing a change of variables of the
 * form: p(x) <- p(x + b).
 *
 * * see [this stackoverflow question](http://stackoverflow.com/questions/141422/how-can-a-transform-a-polynomial-to-another-coordinate-system)
 *
 * @param p a polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[5n,-3n,0n]` represents the
 * polynomial `5x^2 - 3x`
 * @param b the `b` in `x + b`
 *
 * @example
 * ```typescript
 * bChangeVariablesTranslateX([1n,2n,7n], 3n); //=> [1n, 8n, 22n]
 * ```
 *
 * @doc
 */
declare function bChangeVariablesTranslateX(p: bigint[], b: bigint): bigint[];
export { bChangeVariablesTranslateX };
