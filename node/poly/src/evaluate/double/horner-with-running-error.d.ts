/**
 * Returns the result of evaluating a polyniomial at a point x, including a
 * running error bound as an array in the form `[r,e]` where `r` is the result
 * of the evaluation and `e` is the error.
 *
 * * see e.g. page 95 (at bottom) of [Higham 2002](http://ftp.demec.ufpr.br/CFD/bibliografia/Higham_2002_Accuracy%20and%20Stability%20of%20Numerical%20Algorithms.pdf)
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 * @param x the value at which to evaluate the polynomial
 *
 * @doc
 */
declare function hornerWithRunningError(p: number[], x: number): number[];
export { hornerWithRunningError };
