/**
 * Returns the approximate result of adding two polynomials.
 * @param p1 a polynomial
 * @param p2 another polynomial
 * @example
 * add([1,2,3],[3,4]); //=> [1,5,7]
 */
declare function add(p1: number[], p2: number[]): number[];
/**
 * Returns the exact result of adding two polynomials.
 * @param p1 a polynomial with floating point expansion coefficients
 * @param p2 another polynomial with floating point expansion coefficients
 * @example
 * add([[1],[2],[3]],[[3],[4]]); //=> [[1],[5],[7]]
 */
declare function addExact(p1: number[][], p2: number[][]): number[][];
export { add, addExact };
