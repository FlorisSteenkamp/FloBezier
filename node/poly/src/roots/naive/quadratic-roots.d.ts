/**
 * Floating-point-stably calculates and returns the ordered quadratic roots of
 * the given quadratic polynomial.
 *
 * * **precondition:** the input polynomial must be quadratic (given as an array
 * of exactly 3 values with the first value *unequal* to zero)
 * * **non-exact:** it is important to note that even though the roots are
 * calculated in a stable way they are still subject to round-off
 * * might be slightly faster than calling [[allRoots]].
 *
 * @param p a quadratic polynomial with coefficients given as an array
 * of double floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the quadratic `5x^2 - 3x`
 *
 * @example
 * ```typescript
 * quadraticRoots([1, -3, 2]); //=> [1,2]
 * ```
 *
 * @doc
 */
declare function quadraticRoots(p: number[]): number[];
export { quadraticRoots };
