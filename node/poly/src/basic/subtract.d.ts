/**
 * Returns an approximate result of subtracting the second polynomial from first (p1 - p2).
 * @param p1 the polynomial from which will be subtracted
 * @param p2 the polynomial that will be subtracted
 * @example
 * subtract([2,3],[4,4]); //=> [-2, -1]
 */
declare function subtract(p1: number[], p2: number[]): number[];
/**
 * Returns the exact result of subtracting the second polynomial from first (p1 - p2).
 * @param p1 the polynomial from which will be subtracted
 * @param p2 the polynomial that will be subtracted
 * @example
 * subtract([[2],[3]],[[4],[4]]); //=> [[-2], [-1]]
 */
declare function subtractExact(p1: number[][], p2: number[][]): number[][];
export { subtract, subtractExact };
