/**
 * Returns a representation of the error (from which an absolute error bound
 * can be calculated) of evaluating the given bezier curve at the parameter `t`
 * using [De Casteljau's algorithm](https://en.wikipedia.org/wiki/De_Casteljau%27s_algorithm).
 *
 * The returned error representation needs to be multiplied with
 * [Stewart error counters¹](https://www.amazon.ca/Introduction-Matrix-Computations-G-Stewart/dp/0126703507)
 * and an appropriate error function, γ, depending on the precision used (e.g. double
 * or double-double). This is explained in more detail below. See
 * also [Higham 2002](http://ftp.demec.ufpr.br/CFD/bibliografia/Higham_2002_Accuracy%20and%20Stability%20of%20Numerical%20Algorithms.pdf)
 * p. 68 near the bottom.
 *
 * (1) G. W. Stewart. Introduction to Matrix Computations. Academic Press, New York,
*  1973. xiii+441 pp. ISBN 0-12-670350-7
 *
 * * **precondition**: TODO underflow/overflow
 *
 * The absolute erros below can be calculated as follows (where `<E>` are the
 * error counters as indicated in the comments of the return value below):
 *  * double precision: `<E> * (γ(1)) * result_`
 *  * double-double precision: `<E> * (2*γγ(3)) * result_`
 *
 * where [[γ]] and [[γγ]] are the usual error functions.
 * The `T` in the error counter formula is the input error given as an error
 * counter on `t`. For example, if the exact `t` (let's call it `te`) is bounded
 * by `(|t| - 5u) < |te| < (|t| + 5u)` where `u === Number.EPSILON/2` then `T`
 * should be given as `5`. If `t` is exact then `T` should be given as `0`.
 *
 * ```
 * // for cubic bezier curves
 * return [
 * 	x_,  // <E> === 3T + 8
 * 	y_   // <E> === 3T + 8
 * ];
 * // for quadratic bezier curves
 * return [
 * 	x_,  // <E> === 2T + 5
 * 	y_   // <E> === 2T + 5
 * ];
 * // for linear bezier curves (i.e. lines)
 * return [
 * 	x_,  // <E> === T + 2
 * 	y_   // <E> === T + 2
 * ];
 * ```
 *
 * @param ps an order 1, 2 or 3 bezier curve, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param t the parameter value where the bezier should be evaluated (given in
 * double-double precision)
 *
 * @doc mdx
 **/
declare function evalDeCasteljauError(ps: number[][], t: number[]): number[];
export { evalDeCasteljauError };
