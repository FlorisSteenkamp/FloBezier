/**
 * Deflates the given polynomial approximately by removing a factor (x - r),
 * where r is a root of the polynomial.
 * @param p a polynomial
 * @param root a root of the polynomial.
 * @example
 * // The polynomial x^3 - 5x^2 + 8x - 4 has a root at 1 and a double root at 2
 * deflate([1, -5, 8, -4], 2); //=> [1, -3, 2]
 * deflate([1, -3, 2], 2);     //=> [1,-1]
 * deflate([1, -1], 1);        //=> [1]
 */
declare function deflate(p: number[], root: number): number[];
declare function deflateQuad(p: number[][], root: number): number[][];
export { deflate, deflateQuad };
