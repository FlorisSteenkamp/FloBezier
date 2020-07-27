/**
 * Constructs a polynomial from the given roots by multiplying out the
 * factors (x - root1)(x - root2)... Note that the resulting polynomial
 * will not have any complex roots.
 *
 * Mostly provided for testing purposes. Note that the real roots of the
 * constructed polynomial may not be exactly the same as the roots that
 * the polynomial has been constructed from due to floating-point
 * round-off.
 *
 * @param roots - The roots
 * @example
 * fromRoots([1,2,3,3]); //=> [1, -9, 29, -39, 18]
 * allRoots([1, -9, 29, -39, 18]); //=> [1.0000000000000007, 2.000000000000004]
 * // In the above note the rounding error. Also note the multiple root of 3 that has been missed.
 * allRoots([1, -9, 29, -39, 17.99999999999999]); //=> [0.9999999999999973, 2.00000000000002, 2.9999999999999982]
 * allRoots([1, -9, 29, -39, 17.9999999999999]); //=> [0.999999999999975, 2.0000000000000986, 2.9999997898930832, 3.0000002095475775]
 */
declare function fromRoots(roots: number[]): number[];
/**
 * Constructs a polynomial from the given roots by multiplying out the
 * factors (x - root1)(x - root2)... Note that the resulting polynomial
 * will not have any complex roots.
 *
 * Mostly provided for testing purposes.
 *
 * @param roots the roots
 */
declare function fromRootsExact(roots: number[]): number[][];
export { fromRoots, fromRootsExact };
