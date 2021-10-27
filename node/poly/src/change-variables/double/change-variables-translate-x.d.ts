/**
 * Returns the result of performing a change of variables of the
 * form: p(x) <- p(x + b) in double precision.
 *
 * * see [this stackoverflow question](http://stackoverflow.com/questions/141422/how-can-a-transform-a-polynomial-to-another-coordinate-system)
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 * @param b the `b` in `x + b`
 *
 * @example
 * ```typescript
 * changeVariablesTranslateX([1,2,7], 3); //=> [1, 8, 22]
 * ```
 *
 * @doc
 */
declare function changeVariablesTranslateX(p: number[], b: number): number[];
export { changeVariablesTranslateX };
