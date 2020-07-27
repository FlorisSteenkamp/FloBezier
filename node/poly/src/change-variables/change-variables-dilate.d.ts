/**
 * Returns the approximate result of performing a change of variables of the form: p(x) <- p(ax).
 * See this stackoverflow question http://stackoverflow.com/questions/141422/how-can-a-transform-a-polynomial-to-another-coordinate-system
 * @param p a polynomial
 * @param a
 * @example
 * changeVariablesDilate([1,2,7], 3); //=> [9, 6, 7]
 */
declare function changeVariablesDilate(p: number[], a: number): number[];
/**
 * Returns the exact result of performing a change of variables of the form: p(x) <- p(ax).
 * See this stackoverflow question http://stackoverflow.com/questions/141422/how-can-a-transform-a-polynomial-to-another-coordinate-system
 * @param p a polynomial
 * @param a
 * @example
 * changeVariables([[1],[2],[7]], [3]); //=> [[9], [6], [7]]
 */
declare function changeVariablesDilateExactExp(p: number[][], a: number[]): number[][];
/**
 * Returns the exact result of performing a change of variables of the form: p(x) <- p(ax).
 * See this stackoverflow question http://stackoverflow.com/questions/141422/how-can-a-transform-a-polynomial-to-another-coordinate-system
 * @param p a polynomial
 * @param a
 * @example
 * changeVariables([[1],[2],[7]], 3); //=> [[9], [6], [7]]
 */
declare function changeVariablesDilateExact(p: number[][], a: number): number[][];
export { changeVariablesDilate, changeVariablesDilateExactExp, changeVariablesDilateExact };
