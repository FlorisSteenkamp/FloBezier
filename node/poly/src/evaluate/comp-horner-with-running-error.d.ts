/**
 * Returns the result of evaluating a univariate polynomial using once compensated
 * Horner's method, including a certified running error bound.
 *
 * * Exactly the same as compHornerIsFaithful, except that it does not include
 * a faithfully rounded check.
 *
 * @param p a polynomial
 * @param x the value at which to evaluate the polynomial
 */
declare function compHornerWithRunningError(p: number[], x: number): number[];
export { compHornerWithRunningError };
