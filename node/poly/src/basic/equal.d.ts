/**
 * Returns true if two polynomials are exactly equal by comparing coefficients.
 * @param p1 a polynomial
 * @param p2 another polynomial
 * @example
 * equal([1,2,3,4], [1,2,3,4]);   //=> true
 * equal([1,2,3,4], [1,2,3,4,5]); //=> false
 */
declare function equal(p1: number[], p2: number[]): boolean;
/**
 * Returns true if two polynomials are exactly equal by comparing coefficients.
 * @param p1 a polynomial with coefficients given as floatin point expansions
 * @param p2 another polynomial
 * @example
 * equal([[1],[2],[3],[4]], [[1],[2],[3],[4]]);   //=> true
 * equal([[1],[2],[3],[4]], [[1],[2],[3],[4],[5]]); //=> false
 */
declare function expEqual(p1: number[][], p2: number[][]): boolean;
export { equal, expEqual };
