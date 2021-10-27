/**
 * Returns the exact result (bar underflow / overflow) of performing a change
 * of variables of the form: p(x) <- p(ax).
 *
 * * see [this stackoverflow question](http://stackoverflow.com/questions/141422/how-can-a-transform-a-polynomial-to-another-coordinate-system)
 *
 * @param p a polynomial with coefficients given densely as an array of Shewchuk
 * floating point expansions from highest to lowest power, e.g. `[[5],[-3],[0]]`
 * represents the polynomial `5x^2 - 3x`
 * @param a a scaling factor, i.e. the `a` in `p(x) <- p(ax)`
 *
 * @example
 * ```typescript
 * eChangeVariablesScale([[1],[2],[7]], 3); //=> [[9], [6], [7]]
 * ```
 *
 * @doc
 */
declare function eChangeVariablesScale(p: number[][], a: number): number[][];
export { eChangeVariablesScale };
