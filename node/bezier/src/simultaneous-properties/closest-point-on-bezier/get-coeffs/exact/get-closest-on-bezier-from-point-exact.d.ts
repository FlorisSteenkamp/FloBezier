/**
 *  * TODO - not really tangent??, but closest?
 * Returns the polynomial whose roots are all the `t` values on the given bezier
 * curve such that the line from the given point to the point on the bezier
 * evaluated at `t` is tangent to the bezier at `t`.
 * * **precondition** TODO - underflow/overflow (106 bits - see experiments-new)
 * * if the coefficients of the curve and point is bit-aligned bitlength <= 46
 * then the resulting coefficients are guaranteed to have max bitlength 106 (so it
 * can fit in a double-double)
 *
 * @param ps
 * @param p
 */
declare function getClosestOnBezier3FromPointExact(ps: number[][], p: number[]): number[][];
/**
 * * **precondition** TODO underflow/overflow
 * @param ps
 * @param p
 */
declare function getClosestOnBezier2FromPointExact(ps: number[][], p: number[]): number[][];
/**
 * * **precondition** TODO underflow/overflow
 * @param ps
 * @param p
 */
declare function getClosestOnBezier1FromPointExact(ps: number[][], p: number[]): number[][];
export { getClosestOnBezier3FromPointExact, getClosestOnBezier2FromPointExact, getClosestOnBezier1FromPointExact };
