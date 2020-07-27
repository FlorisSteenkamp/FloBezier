/**
 * Multiplies a polynomial by a constant.
 * @param c the constant
 * @param p the polynomial
 * @example
 * multiplyByConst(0.25, [3,2,1]); //=> [0.75, 0.5, 0.25]
 */
declare function multiplyByConst(c: number, p: number[]): number[];
/**
 * Multiplies a polynomial by a constant.
 * @param c the constant
 * @param p the polynomial
 * @example
 * multiplyByConst([0.25], [[3],[2],[1]]); //=> [[0.75], [0.5], [0.25]]
 */
declare function expMultiplyByConst(c: number[], p: number[][]): number[][];
export { multiplyByConst, expMultiplyByConst };
