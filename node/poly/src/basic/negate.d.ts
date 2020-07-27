/**
 * Returns the negative of the given polynomial (p -> -p).
 * @param p a polynomial
 * @example
 * negate([0.1, -0.2]); //=> [-0.1, 0.2]
 */
declare function negate(p: number[]): number[];
/**
 * Returns the negative of the given polynomial (p -> -p).
 * @param p a polynomial
 * @example
 * expNegate([[0.1], [-0.2]]); //=> [[-0.1], [0.2]]
 */
declare function expNegate(p: number[][]): number[][];
export { negate, expNegate };
