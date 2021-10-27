/**
 * Computes and returns the greatest common divisor of two integers a and b,
 * using the [Euclidean Algorithm](https://en.wikipedia.org/wiki/Euclidean_algorithm).
 *
 * @doc
 */
declare function bGcdInt(a: bigint, b: bigint): bigint;
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
declare function bGcdInts(vals: bigint[]): bigint;
/**
 * * ❗ don't use - too slow - use [[bGcdInts]] instead ❗
 *
 * Computes and returns the greatest common divisor of 2 or more integers by
 * calculating GCDs rescursively using a tree (Divide and Conquer).
 *
 * * It turns out this method is *slower* than the naive method
 */ export { bGcdInt, bGcdInts };
