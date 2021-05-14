/**
 * Returns the closest point t value on the bezier to the given point - only
 * returns t values in the range [0,1].
 *
 * * **precondition** coefficients of curve and point bit-aligned bitlength <= 46
 * * this function also acts as an inversion formula.
 *
 * @param ps
 * @param p
 *
 * @doc
 */
declare function inversion01Precise(ps: number[][], p: number[]): number;
export { inversion01Precise };
