/**
 * Returns the exact result (bar underflow / overflow) of performing a change
 * of variables of the form: p(x) <- p(ax + b) on the given polynomial (with
 * coefficients given as Shewchuk expansions).
 *
 * * see [this stackoverflow question](http://stackoverflow.com/questions/141422/how-can-a-transform-a-polynomial-to-another-coordinate-system)
 *
 * @param p a polynomial with coefficients given densely as an array of Shewchuk
 * floating point expansions from highest to lowest power, e.g. `[[5],[-3],[0]]`
 * represents the polynomial `5x^2 - 3x`
 * @param a the `a` in `ax + b`
 * @param b the `b` in `ax + b`
 *
 * @example
 * ```typescript
 * eChangeVariablesLinear([[1],[2],[7]], 3, 4); //=> [[9], [30], [31]]
 * ```
 *
 * @doc
 */
declare function eChangeVariablesLinear(p: number[][], a: number, b: number): number[][];
export { eChangeVariablesLinear };
