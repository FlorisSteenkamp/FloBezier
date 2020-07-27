/**
 * Returns the result of evaluating a polyniomial at a point x, including a
 * running error bound.
 * * see page 95 (at bottom) of [Higham 2002](http://ftp.demec.ufpr.br/CFD/bibliografia/Higham_2002_Accuracy%20and%20Stability%20of%20Numerical%20Algorithms.pdf)
 *
 * @param p
 * @param x
 */
declare function hornerWithRunningError(p: number[], x: number): number[];
export { hornerWithRunningError };
