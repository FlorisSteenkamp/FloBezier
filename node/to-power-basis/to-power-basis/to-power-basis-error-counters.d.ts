/**
 * Returns a representation of the error (from which an absolute error bound
 * can be calculated) when calculating the power basis representation of a
 * bezier curve of order <= 3 (using e.g. `toPowerBasis` or `toPowerBasisDd`).
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
 * where [[γ]] and [[γγ]] are the usual error functions with `γ(1) === 1.1102230246251568e-16`
 * and `γγ(3) === 3.697785493223493e-32`.
 *
 * ```
 * // for cubic bezier curves
 * return [
 * 	[
 * 		x3,  // <E> === 3
 * 		x2,  // <E> === 3
 * 		x1,  // <E> === 2
 * 		0,
 * 	],
 * 	[
 * 		y3,  // <E> === 3
 * 		y2,  // <E> === 3
 * 		y1,  // <E> === 2
 * 		0,
 * 	]
 * ]
 *
 * // for quadratic bezier curves
 * return [
 * 	[
 * 		x2,  // <E> === 2
 * 		x1,  // <E> === 1
 * 		0,
 * 	],
 * 	[
 * 		y2,  // <E> === 2
 * 		y1,  // <E> === 1
 * 		0,
 * 	]
 * ];
 *
 * // for linear bezier curves (i.e. lines)
 * return [
 * 	[
 * 		x1_,  // <E> === 1
 * 		x0_   // <E> === 0
 * 	],
 * 	[
 * 		y1_,  // <E> === 1
 * 		y0_   // <E> === 0
 * 	]
 * ];
 * ```
 *
 * @param ps an order 0,1,2 or 3 bezier curve given by an ordered array of its
 * control points, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 *
 * @doc mdx
 */
declare function toPowerBasisErrorCounters(ps: number[][]): number[][];
/** @internal */
declare function toPowerBasis1ErrorCounters(ps: number[][]): number[][];
/** @internal */
declare function toPowerBasis2ErrorCounters(ps: number[][]): number[][];
/** @internal */
declare function toPowerBasis3ErrorCounters(ps: number[][]): number[][];
export { toPowerBasisErrorCounters, toPowerBasis1ErrorCounters, toPowerBasis2ErrorCounters, toPowerBasis3ErrorCounters };
