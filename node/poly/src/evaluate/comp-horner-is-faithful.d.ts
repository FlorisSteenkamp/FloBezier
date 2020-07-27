/**
 * Returns the result of evaluating a univariate polynomial using once compensated
 * Horner's method, including a dynamic check for faithfull rounding and a
 * certified running error bound.
 *
 * @param p a polynomial
 * @param x the value at which to evaluate the polynomial
 */
declare function compHornerIsFaithful(p: number[], x: number): {
    isFaithful: boolean;
    errBound: number;
    r̄: number;
};
export { compHornerIsFaithful };
