/**
 * Returns the exact result of evaluating the given polynomial at 0 - it
 * is much faster than at an arbitrary point.
 * @param p a polynomial
 * @example
 * evaluateAt0([3,2,99]); //=> 99
 * evaluateAt0([[3],[2],[99]]); //=> [99]
 */
declare function evaluateAt0(p: number[]): number;
/**
 * Returns the exact result of evaluating the given polynomial at 0 - it
 * is much faster than at an arbitrary point.
 * @param p a polynomial
 * @example
 * evaluateAt0([3,2,99]); //=> 99
 * evaluateAt0([[3],[2],[99]]); //=> [99]
 */
declare function expEvaluateAt0(p: number[][]): number[];
export { evaluateAt0, expEvaluateAt0 };
