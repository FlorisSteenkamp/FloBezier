/**
 * Computes the greatest common divisor of two integers a and b, using the
 * Euclidean Algorithm.
 *
 * **precondition** a, b must be integers
 *
 * @doc
 */
declare function gcdInt(a: number, b: number): number;
/**
 * Computes the greatest common divisor of two integers a and b, using the
 * binary GCD algorithm - probably slower than just using gcdInt that uses
 * the Euclidean Algorithm.
 */
declare function gcdIntBinary(a: number, b: number): number;
/**
 * Naively computes and returns the greatest common divisor of 2 or more
 * integers by taking each integer in turn and calculating the GCD of that
 * integer and the previously calculated GCD (where the first GCD is simply
 * taken as the first number).
 *
 * @param vals the integers for which the GCD is to be calculated
 *
 * @doc
 */
declare function gcdInts(vals: number[]): number;
/**
 * :::tip Heads up!
 * don't use - too slow - use [[gcdInts]] instead
 * :::
 *
 * Computes and returns the greatest common divisor of 2 or more integers by
 * calculating GCDs rescursively using a tree (Divide and Conquer).
 *
 * * It turns out this method is *slower* than the naive method
 *
 * @param vals the integers for which the GCD is to be calculated
 *
 * @internal
 */
declare function gcdIntsTree(vals: number[]): number;
export { gcdInt, gcdInts, gcdIntsTree, gcdIntBinary };
