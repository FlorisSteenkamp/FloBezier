/**
 * Returns a representation of the error (from which an absolute error bound
 * can be calculated) when calculating the derivative of the power basis
 * representation of a bezier curve of order <= 3 (using
 * e.g. `toPowerBasis_1stDerivative` or `toPowerBasis_1stDerivativeDd`).
 *
 * The returned error representation needs to be multiplied with
 * [Stewart error counters¹](https://www.amazon.ca/Introduction-Matrix-Computations-G-Stewart/dp/0126703507)
 * and an appropriate error function, `γ`, depending on the precision used (e.g. double
 * or double-double). This is explained in more detail below. See
 * also [Higham 2002](http://ftp.demec.ufpr.br/CFD/bibliografia/Higham_2002_Accuracy%20and%20Stability%20of%20Numerical%20Algorithms.pdf)
 * p. 68 near the bottom.
 *
 * (1) G. W. Stewart. Introduction to Matrix Computations. Academic Press, New York,
 *  1973. xiii+441 pp. ISBN 0-12-670350-7
 *
 * The absolute erros below can be calculated as follows (where `<E>` are the
 * error counters as indicated in the comments of the return value below):
 *  * double precision: `<E> * (γ(1)) * result_`
 *  * double-double precision: `<E> * (γγ(3)) * result_`
 *
 * where [[γ]] and [[γγ]] are the usual error functions.
 *
 * The `D` in the error counter formula is zero for double precision and 1 for
 * double-double precision.
 *
 * ```
 * // for cubic bezier curves
 * return [
 * 	[
 * 		X2,  // <E> === D+3 (D = 0 for double, 1 for double-double precision)
 * 		X1,  // <E> === D+2
 * 		X0   // <E> === D+3
 * 	],
 * 	[
 * 		Y2,  // <E> === D+3
 * 		Y1,  // <E> === D+2
 * 		Y0   // <E> === D+3
 * 	]
 * ]
 *
 * // for quadratic bezier curves
 * return [
 * 	[
 * 		X1,  // <E> === D+1 (D = 0 for double, 1 for double-double precision)
 * 		X0   // <E> === D
 * 	],
 * 	[
 * 		Y1,  // <E> === D+1
 * 		Y0   // <E> === D
 * 	]
 * ];
 *
 * // for linear bezier curves (i.e. lines)
 * return [
 * 	[
 * 		X0_  // <E> === D (D = 0 for double, 1 for double-double precision)
 * 	],
 * 	[
 * 		Y0_  // <E> === D
 * 	]
 * ];
 * ```
 *
 * @param ps an order 0,1,2 or 3 bezier curve given by an ordered array of its
 * control points, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 *
 * @doc mdx
 */
declare function toPowerBasis_1stDerivativeErrorCounters(ps: number[][]): number[][];
export { toPowerBasis_1stDerivativeErrorCounters };
