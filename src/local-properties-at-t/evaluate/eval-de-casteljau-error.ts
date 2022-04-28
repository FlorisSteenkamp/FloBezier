const abs = Math.abs;


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
function evalDeCasteljauError(
		ps: number[][], 
		t: number[]): number[] {

	if (t[0] === 0 && t[1] === 0) {
		return [0,0];  // No error
	} else if (t[0] === 0 && t[1] === 1) {
		return [0,0];  // No error
	}

	const t_ = abs(t[1]);  // <T>

	// <M> --> the cost of multiplication === <1> except for `qmq` in which
	// case it is <2>. One might as well just double the error in the end for
	// double-double precision calculations (thus losing 1 bit) and take 
	// <M> === 1 always. This simplifies the calculation a bit.

	if (ps.length === 4) {
		const [[x0, y0], [x1,y1], [x2,y2], [x3, y3]] = ps;	
		
		const _x0 = abs(x0);  // <0>
		const _y0 = abs(y0);  // <0>
		const _x1 = abs(x1);  // <0>
		const _y1 = abs(y1);  // <0>
		const _x2 = abs(x2);  // <0>
		const _y2 = abs(y2);  // <0>
		const _x3 = abs(x3);  // <0>
		const _y3 = abs(y3);  // <0>

		// a01<T+3> <-- <T+3>(x0 + <T+2>(<1>(x1 + x0)*<T>t));
		const a01_ = _x0 + (_x1 + _x0)*t_;
		// a11<T+3> <-- <T+3>(x1 + <1>(<0>(x2 + x1)*<T>t));
		const a11_ = _x1 + (_x2 + _x1)*t_;
		// a21<T+3> <-- <T+3>(x2 + <1>(<0>(x3 + x2)*<T>t));
		const a21_ = _x2 + (_x3 + _x2)*t_;
		// a02<2T+6> <-- <2T+6>(<T+3>a01 + <2T+5>(<T+4>(<T+3>a11 + <T+3>a01)*<T>t));
		const a02_ = a01_ + (a11_ + a01_)*t_;
		// a12<2T+6> <-- <2T+6>(<T+3>a11 + <2T+5>(<T+4>(<T+3>a21 + <T+3>a11)*<T>t));
		const a12_ = a11_ + (a21_ + a11_)*t_;
		// x<3T+9> <-- <3T+9>(<2T+6>a02 + <3T+8>(<2T+7>(<2T+6>a12 + <2T+6>a02)*<T>t));
		const x_ = a02_ + (a12_ + a02_)*t_;
		
		const b01_ = _y0 + (_y1 + _y0)*t_;
		const b11_ = _y1 + (_y2 + _y1)*t_;
		const b21_ = _y2 + (_y3 + _y2)*t_;
		const b02_ = b01_ + (b11_ + b01_)*t_;
		const b12_ = b11_ + (b21_ + b11_)*t_;
		const y_ = b02_ + (b12_ + b02_)*t_;

		return [x_,y_];
	} 
	
	if (ps.length === 3) {
		const [[x0,y0], [x1,y1], [x2,y2]] = ps;	

		const _x0 = abs(x0);
		const _y0 = abs(y0);
		const _x1 = abs(x1);
		const _y1 = abs(y1);
		const _x2 = abs(x2);
		const _y2 = abs(y2);

		// <T+3>a01 <-- <T+3>(x0 + <T+2>(<1>(x1 + x0)*<T>t));
		const a01_ = _x0 + (_x1 + _x0)*t_;
		// <T+3>a11 <-- <T+3>(x1 + <T+2>(<1>(x2 + x1)*<T>t));
		const a11_ = _x1 + (_x2 + _x1)*t_;
		// <2T+6>x <-- <2T+6>(<T+3>a01 + <2T+5>(<T+4>(<T+3>a11 + <T+3>a01)*<T>t));
		const x_ = a01_ + (a11_ + a01_)*t_;

		const b01_ = _y0 + (_y1 + _y0)*t_;
		const b11_ = _y1 + (_y2 + _y1)*t_;
		const y_ = b01_ + (b11_ + b01_)*t_;

		return [x_,y_];
	} 
	
	if (ps.length === 2) {
		const [[x0, y0], [x1,y1]] = ps;	

		const _x0 = abs(x0);
		const _y0 = abs(y0);
		const _x1 = abs(x1);
		const _y1 = abs(y1);

		// <T+3>x = <T+3>(x0 + <T+2>(<1>(x1 + x0)*<T>t));
		const x_ = _x0 + (_x1 + _x0)*t_;

		const y_ = _y0 + (_y1 + _y0)*t_;

		return [x_,y_];
	}

	if (ps.length === 1) {
		return [0,0];
	}

	throw new Error('The given bezier curve must be of order <= 3.');
}


export { evalDeCasteljauError }
