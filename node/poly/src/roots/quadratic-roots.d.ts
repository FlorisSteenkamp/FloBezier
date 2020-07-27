/**
 * Floating-point-stably calculates and returns the ordered quadratic
 * roots of the given quadratic polynomial.
 *
 * This function is included only because it might be slightly faster
 * than calling allRoots due to allRoots first checking if the
 * polynomial is quadratic and checking if the roots are within the
 * given range.
 * @param p the quadratic polynomial
 * @example
 * quadraticRoots([1, -3, 2]); //=> [1,2]
 */
declare function quadraticRoots(p: number[]): number[];
export { quadraticRoots };
