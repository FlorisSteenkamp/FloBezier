/**
 * Computes the greatest common divisor of two integers a and b, using the
 * Euclidean Algorithm.
 *
 * **precondition** a, b must be integers given as Shewchuk expansions
 *
 * @doc
 */
declare function eGcdInt(a: number[], b: number[]): number[];
/**
 * Naively computes and returns the greatest common divisor of 2 or more
 * integers by taking each integer in turn and calculating the GCD of that
 * integer and the previously calculated GCD (where the first GCD is simply
 * taken as the first number).
 *
 * @param vals the integers (given as Shewchuk expansions) for which the GCD is
 * to be calculated
 */
declare function eGcdInts(vals: number[][]): number[];
export { eGcdInt, eGcdInts };
