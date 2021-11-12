const abs = Math.abs;
// TODO - docs - we're not really returning error counters...
// TODO - add an example
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
function evalDeCasteljauError(ps, t) {
    if (t[0] === 0 && t[1] === 0) {
        return [0, 0]; // No error
    }
    else if (t[0] === 0 && t[1] === 1) {
        return [0, 0]; // No error
    }
    const t_ = abs(t[1]); // <T>
    // <M> --> the cost of multiplication === <1> except for `qmq` in which
    // case it is <2>. One might as well just double the error in the end for
    // double-double precision calculations (thus losing 1 bit) and take 
    // <M> === 1 always. This simplifies the calculation a bit.
    if (ps.length === 4) {
        const [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = ps;
        const _x0 = abs(x0); // <0>
        const _y0 = abs(y0); // <0>
        const _x1 = abs(x1); // <0>
        const _y1 = abs(y1); // <0>
        const _x2 = abs(x2); // <0>
        const _y2 = abs(y2); // <0>
        const _x3 = abs(x3); // <0>
        const _y3 = abs(y3); // <0>
        // a01<T+2> <-- <T+2>(x0 + <T+1>(<0>(x1 + x0)*t<T>));
        const a01_ = _x0 + (_x1 + _x0) * t_;
        // a11<T+2> <-- <T+2>(x1 + <1>(<0>(x2 + x1)*t<T>));
        const a11_ = _x1 + (_x2 + _x1) * t_;
        // a21<T+2> <-- <T+2>(x2 + <1>(<0>(x3 + x2)*t<T>));
        const a21_ = _x2 + (_x3 + _x2) * t_;
        // a02<2T+5> <-- <2T+5>(<T+2>a01 + <2T+4>(<T+3>(<T+2>a11 + <T+2>a01)*t<T>));
        const a02_ = a01_ + (a11_ + a01_) * t_;
        // a12<2T+5> <-- <2T+5>(<T+2>a11 + <2T+4>(<T+3>(<T+2>a21 + <T+2>a11)*t<T>));
        const a12_ = a11_ + (a21_ + a11_) * t_;
        // x<3T+8> <-- <3T+8>(<2T+5>a02 + <3T+7>(<2T+6>(<2T+5>a12 + <2T+5>a02)*t<T>));
        const x_ = a02_ + (a12_ + a02_) * t_;
        const b01_ = _y0 + (_y1 + _y0) * t_;
        const b11_ = _y1 + (_y2 + _y1) * t_;
        const b21_ = _y2 + (_y3 + _y2) * t_;
        const b02_ = b01_ + (b11_ + b01_) * t_;
        const b12_ = b11_ + (b21_ + b11_) * t_;
        const y_ = b02_ + (b12_ + b02_) * t_;
        return [x_, y_];
    }
    if (ps.length === 3) {
        const [[x0, y0], [x1, y1], [x2, y2]] = ps;
        const _x0 = abs(x0);
        const _y0 = abs(y0);
        const _x1 = abs(x1);
        const _y1 = abs(y1);
        const _x2 = abs(x2);
        const _y2 = abs(y2);
        // <T+2>a01 <-- <T+2>(x0 + <T+1>((x1 + x0)*<T>t));
        const a01_ = _x0 + (_x1 + _x0) * t_;
        // <T+2>a11 <-- <T+2>(x1 + <T+1>((x2 + x1)*<T>t));
        const a11_ = _x1 + (_x2 + _x1) * t_;
        // <2T+5>x <-- <2T+5>(<T+2>a01 + <2T+4>(<T+3>(<T+2>a11 + <T+2>a01)*<T>t));
        const x_ = a01_ + (a11_ + a01_) * t_;
        const b01_ = _y0 + (_y1 + _y0) * t_;
        const b11_ = _y1 + (_y2 + _y1) * t_;
        const y_ = b01_ + (b11_ + b01_) * t_;
        return [x_, y_];
    }
    if (ps.length === 2) {
        const [[x0, y0], [x1, y1]] = ps;
        const _x0 = abs(x0);
        const _y0 = abs(y0);
        const _x1 = abs(x1);
        const _y1 = abs(y1);
        // <T+2>x = <T+2>(x0 + <T+1>((x1 + x0)*<T>t));
        const x_ = _x0 + (_x1 + _x0) * t_;
        const y_ = _y0 + (_y1 + _y0) * t_;
        return [x_, y_];
    }
    if (ps.length === 1) {
        return [0, 0];
    }
    throw new Error('The given bezier curve is invalid.');
}
export { evalDeCasteljauError };
//# sourceMappingURL=eval-de-casteljau-error.js.map