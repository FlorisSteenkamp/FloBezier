/**
 * Returns the approximate result of evaluating the given polynomial at 1 - it
 * is much faster than at an arbitrary point.
 * @param p a polynomial
 */
declare function evaluateAt1(p: number[]): number;
/**
 * Returns the exact result of evaluating the given polynomial at 1 - it
 * is much faster than at an arbitrary point.
 * @param p a polynomial
 */
declare function expEvaluateAt1(p: number[][]): number[];
export { evaluateAt1, expEvaluateAt1 };
