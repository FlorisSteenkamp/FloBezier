/**
 * Returns the exact result (bar undeflow / overflow) of performing a change of
 * variables of the form: p(x) <- p(x + b) on the given polynomial (with
 * coefficients given as Shewchuk expansions).
 *
 * * see [this stackoverflow question](http://stackoverflow.com/questions/141422/how-can-a-transform-a-polynomial-to-another-coordinate-system)
 *
 * @param p a polynomial with coefficients given densely as an array of Shewchuk
 * floating point expansions from highest to lowest power, e.g. `[[5],[-3],[0]]`
 * represents the polynomial `5x^2 - 3x`
 * @param b the `b` in `x + b`
 *
 * @doc
 */
declare function eChangeVariablesTranslateX(p: number[][], b: number): number[][];
export { eChangeVariablesTranslateX };
