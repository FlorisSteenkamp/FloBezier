/**
 * Returns the approximate result of evaluating a univariate polynomial using
 * Horner's method.
 *
 * This function is curried (see examples below).
 *
 * See https://en.wikipedia.org/wiki/Horner%27s_method
 * @param p a polynomial
 * @param a the value at which to evaluate the polynomial.
 * @example
 * let ev = evaluate([3,2,1]);
 * ev(1); // => 6
 * ev(2); // => 17
 *
 * evaluate([3,2,1], 1); // => 6
 * evaluate([3,2,1], 2); // => 17
 *
 * evaluate([3,2,1])(1); // => 6
 * evaluate([3,2,1])(2); // => 17
 */
declare function evaluate(p: number[], a: number): number;
declare function evaluate(p: number[]): (a: number) => number;
export { evaluate };
