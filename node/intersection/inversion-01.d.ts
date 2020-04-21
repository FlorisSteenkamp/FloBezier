/**
 * Returns the closest point t value on the bezier to the given point - only
 * returns t values in the range [0,1]. Also returns the minimum distance found.
 * **precondition** coefficients of curve and point bit-aligned bitlength <= 46
 * * this function also acts as an inversion formula.
 *
 * @param ps
 * @param p
 */
declare function inversion01Precise(ps: number[][], p: number[]): {
    t: number;
    minD: number;
};
export { inversion01Precise };
