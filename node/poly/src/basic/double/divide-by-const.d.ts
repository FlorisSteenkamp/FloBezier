/**
 * Divides a polynomial by a constant in double precision.
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 * @param c a constant
 *
 * @doc
 */
declare function divideByConst(p: number[], c: number): number[];
export { divideByConst };
