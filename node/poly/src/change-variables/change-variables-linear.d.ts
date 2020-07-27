/**
 * Returns the approximate result of performing a change of variables of the form: p(x) <- p(ax + b).
 * See this stackoverflow question http://stackoverflow.com/questions/141422/how-can-a-transform-a-polynomial-to-another-coordinate-system
 * @param p a polynomial
 * @param a
 * @param b
 * @example
 * changeVariables([1,2,7], 3, 4); //=> [9, 30, 31]
 */
declare function changeVariablesLinear(p: number[], a: number, b: number): number[];
/**
 * Returns the exact result of performing a change of variables of the form: p(x) <- p(ax + b).
 * See this stackoverflow question http://stackoverflow.com/questions/141422/how-can-a-transform-a-polynomial-to-another-coordinate-system
 * @param p a polynomial
 * @param a
 * @param b
 * @example
 * changeVariables([[1],[2],[7]], [3], [4]); //=> [[9], [30], [31]]
 */
declare function changeVariablesLinearExactExp(p: number[][], a: number[], b: number[]): number[][];
/**
 * Returns the exact result of performing a change of variables of the form: p(x) <- p(ax + b).
 * See this stackoverflow question http://stackoverflow.com/questions/141422/how-can-a-transform-a-polynomial-to-another-coordinate-system
 * @param p a polynomial
 * @param a
 * @param b
 * @example
 * changeVariables([[1],[2],[7]], 3, 4); //=> [[9], [30], [31]]
 */
declare function changeVariablesLinearExact(p: number[][], a: number, b: number): number[][];
export { changeVariablesLinear, changeVariablesLinearExactExp, changeVariablesLinearExact };
