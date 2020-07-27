/**
 * Returns the approximate number of *distinct* real roots in the interval (a,b) of the
 * given polynomial.
 * @param p a polynomial
 * @param a a lower bound
 * @param b an upper bound
 * @example
 * let p = [1, 1, -64, 236, -240];
 * numRootsInRange(p,-20,-11); //=> 0
 * numRootsInRange(p,-11,-9);  //=> 1
 * numRootsInRange(p,-11,3.5); //=> 3
 * numRootsInRange(p,-11,5);   //=> 4
 */
declare function numRootsInRange(p: number[], a: number, b: number): number;
/**
 * Returns the exact number of *distinct* real roots in the interval (a,b) of the
 * given polynomial.
 * * From Wikipedia: In the case of a non-square-free polynomial, if neither a nor b is a multiple root of p, then V(a) − V(b) is the number of distinct real roots of P.
 * @param p a polynomial
 * @param a a lower bound
 * @param b an upper bound
 * @example
 * let p = [[1], [1], [-64], [236], [-240]];
 * numRootsInRangeExact(p,-20,-11); //=> 0
 * numRootsInRangeExact(p,-11,-9);  //=> 1
 * numRootsInRangeExact(p,-11,3.5); //=> 3
 * numRootsInRangeExact(p,-11,5);   //=> 4
 */
declare function numRootsInRangeExact(p: number[][], a: number[], b: number[]): number;
/**
 * Returns the exact number of *distinct* real roots in the interval (-∞,+∞) of the
 * given polynomial.
 * * From Wikipedia: In the case of a non-square-free polynomial, if neither a nor b is a multiple root of p, then V(a) − V(b) is the number of distinct real roots of P.
 * @param p a polynomial
 * @param a a lower bound
 * @param b an upper bound
 * @example
 * let p = [[1], [1], [-64], [236], [-240]];
 * numRootsExact(p); //=> 4
 */
declare function numRootsExact(p: number[][]): number;
/**
 * Returns the exact number of *distinct* real roots in the interval (0,1) of the
 * given polynomial.
 * @param p a polynomial
 * @param a a lower bound
 * @param b an upper bound
 */
declare function numRootsIn01Exact(p: number[][]): number;
export { numRootsInRange, numRootsInRangeExact, numRootsExact, numRootsIn01Exact };
