// For double precision the error bound === γ * <counter> * `error_`
// For double-double precision the error bound === γγ3 * <counter> * `error_`
const abs = Math.abs;
// TODO - fix docs - uses Wilkinson error counters
/**
 * TODO
 * Returns the derivative of the power basis representation of a line, quadratic or cubic bezier.
 *
 * * returns the derivative of the tpower basis polynomial from highest power to lowest,
 * e.g. `at^3 + bt^2 + ct + d` is returned as `[a,b,c,d]`
 *
 * TODO
 * ```
 * errorBound: [[
 *		dx0,  // <D>
 * ], [
 *		dy0,  // <D>
 * ]]
 * ```
 * @param ps an order 1, 2 or 3 bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 *
 * @doc
 */
function getDxy1ErrorCounters(ps) {
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
// TODO - fix docs
/**
 *
 * TODO
 * ```
 * errorBound: [[
 *		dx1,  // <D+1>
 *		dx0,  // <D>
 * ],[
 *		dy1,  // <D+1>
 *		dy0,  // <D>
 * ]]
 * ```
 *
 * @param ps
 */
function getDxy2ErrorCounters(ps) {
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
            // <D+1> <-- <D+1>(<D>(x2 + x0) - 2*x1)
            2 * ((_x2 + _x0) + 2 * _x1),
            // <D> <-- 2*<D>(x1 - x0)
            2 * (_x1 + _x0)
        ], [
            2 * ((_y2 + _y0) + 2 * _y1),
            2 * (_y1 + _y0)
        ]
    ];
}
// TODO - fix docs
/**
 *
 * TODO
 * ```
 * errorBound: [[
 *		dx2,  // <D+3>
 *		dx1,  // <D+2>
 *		dx0,  // <D+1>
 * ],[
 *		dy2,  // <D+3>
 *		dy1,  // <D+2>
 *		dy0,  // <D+1>
 * ]]
 * ```
 *
 * @param ps
 */
function getDxy3ErrorCounters(ps) {
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
export { getDxy1ErrorCounters, getDxy2ErrorCounters, getDxy3ErrorCounters };
//# sourceMappingURL=get-dxy-error-counters.js.map