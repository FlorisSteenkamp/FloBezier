/**
 * Returns the result of evaluating the given polynomial (with double-double
 * precision coefficients) at the given value, where the coefficient-wise error
 * is also given.
 *
 * * **the sign of the returned result is guaranteed to be correct**
 * * the evaluation is done adaptively, i.e. if the evaluation cannot be done
 * accurately enough then an exact precision polynomial is requested
 *
 * @param p a polynomial given as an array with each consecutive element of
 * the array having more accurate coefficients than the previous (by adding
 * consecutive double precision coefficients to prior coefficients)
 * @param pE a coefficientwise error bound
 * @param x the point of evaluation
 * @param psExact an object holding the exact polynomial and all its exact
 * derivatives - this object may be modified!
 * @param getPsExact a function to retrieve the exact polynomial and all its
 * exact derivatives
 * @param diffCount the number of differentiations done up to this point
 *
 * @internal
 */
declare function evalAdaptive(p: number[][], pE: number[], x: number, getPolyExact: () => number[][]): number;
export { evalAdaptive };
