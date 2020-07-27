/**
 * Computes the greatest common divisor of two integers a and b, using the
 * Euclidean Algorithm.
 * **precondition** a, b must be integers
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
 * * It is probably better to use gcdIntsNaive only for 3 or less numbers, else
 * use gcdInts instead.
 */
declare function gcdInts(vals: number[]): number;
/**
 * Computes and returns the greatest common divisor of 2 or more integers by
 * calculating GCDs rescursively using a tree (Divide and Conquer).
 * * **don't use!!**
 * * It turns out this method is *slower* than the naive method
 */
declare function gcdIntsTree(vals: number[]): number;
export { gcdInt, gcdIntBinary, gcdInts, gcdIntsTree };
