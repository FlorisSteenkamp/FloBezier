/**
 * Returns the result of performing a change of variables of the
 * form: p(x) <- p(ax + b) in double precision.
 *
 * * see [this stackoverflow question](http://stackoverflow.com/questions/141422/how-can-a-transform-a-polynomial-to-another-coordinate-system)
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 * @param a the `a` in `ax + b`
 * @param b the `b` in `ax + b`
 *
 * @example
 * ```typescript
 * changeVariablesLinear([1,2,7], 3, 4); //=> [9, 30, 31]
 * ```
 *
 * @doc
 */
declare function changeVariablesLinear(p: number[], a: number, b: number): number[];
export { changeVariablesLinear };
