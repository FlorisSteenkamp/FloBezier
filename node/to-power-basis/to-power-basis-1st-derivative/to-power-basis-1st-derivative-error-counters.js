// For double precision the error bound === γ * <counter> * `error_`
// For double-double precision the error bound === γγ3 * <counter> * `error_`
const abs = Math.abs;
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
function toPowerBasis_1stDerivativeErrorCounters(ps) {
    if (ps.length === 4) {
        return toPowerBasis3_1stDerivativeErrorCounters(ps);
    }
    if (ps.length === 3) {
        return toPowerBasis2_1stDerivativeErrorCounters(ps);
    }
    if (ps.length === 2) {
        return toPowerBasis1_1stDerivativeErrorCounters(ps);
    }
    if (ps.length === 1) {
        return [[0], [0]];
    }
    throw new Error('The given bezier curve must be of order <= 3.');
}
/** @internal */
function toPowerBasis1_1stDerivativeErrorCounters(ps) {
    const [[x0, y0], [x1, y1]] = ps;
    const _x0 = abs(x0);
    const _x1 = abs(x1);
    const _y0 = abs(y0);
    const _y1 = abs(y1);
    // If intermediate calculations are done in double precision then:
    // `<D> === <1>` else if double-double precision then `<D> === <0>`.
    return [
        [
            // <D> <= <D>(<0>x1 - <0>x0)
            _x1 + _x0, // <D>
        ], [
            _y1 + _y0, // <D>
        ]
    ];
}
/** @internal */
function toPowerBasis2_1stDerivativeErrorCounters(ps) {
    const [[x0, y0], [x1, y1], [x2, y2]] = ps;
    const _x0 = abs(x0);
    const _x1 = abs(x1);
    const _x2 = abs(x2);
    const _y0 = abs(y0);
    const _y1 = abs(y1);
    const _y2 = abs(y2);
    // If intermediate calculations are done in double precision then:
    // `<D> === <1>` else if double-double precision then `<D> === <0>`.
    return [
        [
            2 * ((_x2 + _x0) + 2 * _x1),
            2 * (_x1 + _x0) // <D> <-- 2*<D>(x1 - x0)
        ], [
            2 * ((_y2 + _y0) + 2 * _y1),
            2 * (_y1 + _y0)
        ]
    ];
}
/** @internal */
function toPowerBasis3_1stDerivativeErrorCounters(ps) {
    const [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = ps;
    const _x0 = abs(x0);
    const _x1 = abs(x1);
    const _x2 = abs(x2);
    const _x3 = abs(x3);
    const _y0 = abs(y0);
    const _y1 = abs(y1);
    const _y2 = abs(y2);
    const _y3 = abs(y3);
    // If intermediate calculations are done in double precision then:
    // `<D> === <1>` else if double-double precision then `<D> === <0>`.
    return [
        [
            // <D+3> <-- <D+3>(3*(<D+2>(<D>(x3 - x0) + <D+1>(3*<D>(x1 - x2)))))
            3 * ((_x3 + _x0) + 3 * (_x1 + _x2)),
            // <D+2> <-- <D+2>(6*<D+1>(<D>(x2 + x0) - 2*x1))
            6 * ((_x2 + _x0) + 2 * _x1),
            // <D+1> <-- <D+1>(3*<D>(x1 - x0))
            3 * (_x1 + _x0)
        ], [
            3 * ((_y3 + _y0) + 3 * (_y1 + _y2)),
            6 * ((_y2 + _y0) + 2 * _y1),
            3 * (_y1 + _y0)
        ]
    ];
}
export { toPowerBasis_1stDerivativeErrorCounters };
//# sourceMappingURL=to-power-basis-1st-derivative-error-counters.js.map