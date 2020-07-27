/**
 * Returns the approximate result of performing a change of variables of the form: p(x) <- p(x + b).
 * See this stackoverflow question http://stackoverflow.com/questions/141422/how-can-a-transform-a-polynomial-to-another-coordinate-system
 * @param p a polynomial
 * @param b
 * @example
 * changeVariablesTranslateX([1,2,7], 3); //=> [1, 8, 22]
 */
declare function changeVariablesTranslateX(p: number[], b: number): number[];
/**
 * Returns the exact result of performing a change of variables of the form: p(x) <- p(x + b).
 * See this stackoverflow question http://stackoverflow.com/questions/141422/how-can-a-transform-a-polynomial-to-another-coordinate-system
 * @param p a polynomial
 * @param b
 */
declare function changeVariablesTranslateXExact(p: number[][], b: number): number[][];
/**
 * Returns the exact result of performing a change of variables of the form: p(x) <- p(x + b).
 * See this stackoverflow question http://stackoverflow.com/questions/141422/how-can-a-transform-a-polynomial-to-another-coordinate-system
 * @param p a polynomial
 * @param b
 */
declare function changeVariablesTranslateXExactExp(p: number[][], b: number[]): number[][];
export { changeVariablesTranslateX, changeVariablesTranslateXExact, changeVariablesTranslateXExactExp };
