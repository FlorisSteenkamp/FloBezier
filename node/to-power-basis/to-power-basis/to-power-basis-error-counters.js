// Note: 
// Error counters of double-double will actually be slightly less but
// we can use this for both double and double-double precision.
// For double precision the error bound === γ * <counter> * `error_`
// For double-double precision the error bound === γγ3 * <counter> * `error_`
const abs = Math.abs;
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
 * where [[γ]] and [[γγ]] are the usual error functions.
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
function toPowerBasisErrorCounters(ps) {
    if (ps.length === 4) {
        return toPowerBasis3ErrorCounters(ps);
    }
    if (ps.length === 3) {
        return toPowerBasis2ErrorCounters(ps);
    }
    if (ps.length === 2) {
        return toPowerBasis1ErrorCounters(ps);
    }
    if (ps.length === 1) {
        return [[0], [0]];
    }
    throw new Error('The given bezier curve must be of order <= 3.');
}
/** @internal */
function toPowerBasis1ErrorCounters(ps) {
    const [[x0, y0], [x1, y1]] = ps;
    const _x0 = abs(x0);
    const _x1 = abs(x1);
    const _y0 = abs(y0);
    const _y1 = abs(y1);
    return [
        [
            _x1 + _x0,
            0,
        ], [
            _y1 + _y0,
            0,
        ]
    ];
}
/** @internal */
function toPowerBasis2ErrorCounters(ps) {
    const [[x0, y0], [x1, y1], [x2, y2]] = ps;
    const _x0 = abs(x0);
    const _x1 = abs(x1);
    const _x2 = abs(x2);
    const _y0 = abs(y0);
    const _y1 = abs(y1);
    const _y2 = abs(y2);
    return [
        [
            _x2 + _x0 + 2 * _x1,
            2 * (_x1 + _x0),
            0,
        ], [
            _y2 + _y0 + 2 * _y1,
            2 * (_y1 + _y0),
            0,
        ]
    ];
}
/** @internal */
function toPowerBasis3ErrorCounters(ps) {
    const [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = ps;
    const _x0 = abs(x0);
    const _x1 = abs(x1);
    const _x2 = abs(x2);
    const _x3 = abs(x3);
    const _y0 = abs(y0);
    const _y1 = abs(y1);
    const _y2 = abs(y2);
    const _y3 = abs(y3);
    return [
        [
            _x3 + _x0 + 3 * (_x1 + _x2),
            3 * (_x2 + _x0 + 2 * _x1),
            3 * (_x1 + _x0),
            0,
        ], [
            _y3 + _y0 + 3 * (_y1 + _y2),
            3 * (_y2 + _y0 + 2 * _y1),
            3 * (_y1 + _y0),
            0,
        ]
    ];
}
export { toPowerBasisErrorCounters, toPowerBasis1ErrorCounters, toPowerBasis2ErrorCounters, toPowerBasis3ErrorCounters };
//# sourceMappingURL=to-power-basis-error-counters.js.map