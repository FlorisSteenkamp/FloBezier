/**
 * Returns a representation of the error (from which an absolute error bound
 * can be calculated) when evaluating the given bezier curve at the parameter `t`
 * using [De Casteljau's algorithm](https://en.wikipedia.org/wiki/De_Casteljau%27s_algorithm).
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
 *  * double-double precision: `<E> * (2*γγ(3)) * result_`
 *
 * where [[γ]] and [[γγ]] are the usual error functions with `γ(1) === 1.1102230246251568e-16`
 * and `γγ(3) === 3.697785493223493e-32`.
 * The `T` in the error counter formula is the input error given as an error
 * counter on `t`. For example, if the exact `t` (let's call it `te`) is bounded
 * by `(|t| - 5u) < |te| < (|t| + 5u)` where `u === Number.EPSILON/2` then `T`
 * should be given as `5`. If `t` is exact then `T` is zero.
 *
 * ```
 * // for cubic bezier curves
 * return [
 * 	x_,  // <E> === 3T + 9
 * 	y_   // <E> === 3T + 9
 * ];
 * // for quadratic bezier curves
 * return [
 * 	x_,  // <E> === 2T + 6
 * 	y_   // <E> === 2T + 6
 * ];
 * // for linear bezier curves (i.e. lines)
 * return [
 * 	x_,  // <E> === T + 3
 * 	y_   // <E> === T + 3
 * ];
 * ```
 *
 * @param ps an order 0,1,2 or 3 bezier curve given by an ordered array of its
 * control points, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param t the parameter value where the bezier should be evaluated (given in
 * double-double precision)
 *
 * @example
 * ```typescript
 * const ps = [[1.1,1.1],[2.3,2.3],[0.7,2.1],[3.11,-1.27]];  // some cubic bezier curve
 * const t = [0,0.1];  // some `t` in double-double precision, i.e. `t` equals `0.1`
 * const r = evalDeCasteljau(ps, t[1]) //=> [1.3828099999999999, 1.41623]
 * let error = evalDeCasteljauError(ps,t); //=> [2.32521, 2.3695700000000004]
 * const γ1 = 1*(Number.EPSILON)/(1-1*(Number.EPSILON));  // this is the error constant for double precision
 * error = error.map(c => γ1*c); //=> [5.163003358177322e-16, 5.261502344922066e-16]
 * // so, for instance, the *real* x coordinate of the point, i.e. `r[0]`, is somewhere between
 * // `1.3828099999999999 - 5.163003358177322e-16` and `1.3828099999999999 + 5.163003358177322e-16`, i.e.
 * // `1.3828099999999994 < r[0] < 1.3828100000000003`
 * ```
 *
 * @internal
 **/
declare function evalDeCasteljauError(ps: number[][], t: number[]): number[];
export { evalDeCasteljauError };
