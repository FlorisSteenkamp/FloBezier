import { twoDiff, ddMultDouble2, ddAddDd, ddAddDouble, twoSum } from 'double-double';
// We *have* to do the below to improve performance with bundlers❗ The assignee is a getter❗ The assigned is a pure function❗
const ts = twoSum; // error -> 0
const td = twoDiff; // error -> 0
const qmd = ddMultDouble2; // error -> 3*u²
const qaq = ddAddDd;
const qad = ddAddDouble; // error -> 2*u²
/**
 * Returns the derivative of the power basis representation of a bezier
 * curve of order cubic or less (with intermediate calculations done in
 * double-double precision).
 *
 * * returns the resulting power basis x and y coordinate polynomials from
 * highest power to lowest, e.g. if `x(t) = at^2 + bt + c`
 * and `y(t) = dt^2 + et + f` then  the result is returned
 * as `[[a,b,c],[d,e,f]]`, where the `a,b,c,...` are in double-double precision
 *
 * @param ps an order 0,1,2 or 3 bezier curve given by an ordered array of its
 * control points, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 *
 * @doc
 */
function toPowerBasis_1stDerivativeDd(ps) {
    if (ps.length === 4) {
        return toPowerBasis3_1stDerivativeDd(ps);
    }
    if (ps.length === 3) {
        return toPowerBasis2_1stDerivativeDd(ps);
    }
    if (ps.length === 2) {
        return toPowerBasis1_1stDerivativeDd(ps);
    }
    if (ps.length === 1) {
        return [[[0, 0]], [[0, 0]]];
    }
    throw new Error('The given bezier curve must be of order <= 3.');
}
/** @internal */
function toPowerBasis3_1stDerivativeDd(ps) {
    const [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = ps;
    return [[
            // 3*((x3 - x0) + 3*(x1 - x2)),
            qmd(3, qaq(td(x3, x0), qmd(3, td(x1, x2)))),
            // 6*((x2 + x0) - 2*x1),
            qmd(6, qad(ts(x2, x0), -2 * x1)),
            // 3*(x1 - x0)
            qmd(3, td(x1, x0))
        ], [
            // 3*((y3 - y0) + 3*(y1 - y2)),
            qmd(3, qaq(td(y3, y0), qmd(3, td(y1, y2)))),
            // 6*((y2 + y0) - 2*y1),
            qmd(6, qad(ts(y2, y0), -2 * y1)),
            // 3*(y1 - y0)
            qmd(3, td(y1, y0))
        ]];
}
/** @internal */
function toPowerBasis2_1stDerivativeDd(ps) {
    const [[x0, y0], [x1, y1], [x2, y2]] = ps;
    return [[
            // 2*((x2 + x0) - 2*x1),
            qad(ts(2 * x2, 2 * x0), -4 * x1),
            // 2*(x1 - x0)
            td(2 * x1, 2 * x0),
        ], [
            // 2*((y2 + y0) - 2*y1),
            qad(ts(2 * y2, 2 * y0), -4 * y1),
            // 2*(y1 - y0)
            td(2 * y1, 2 * y0),
        ]];
}
/** @internal */
function toPowerBasis1_1stDerivativeDd(ps) {
    const [[x0, y0], [x1, y1]] = ps;
    return [[
            td(x1, x0),
        ], [
            td(y1, y0),
        ]];
}
export { toPowerBasis_1stDerivativeDd };
//# sourceMappingURL=to-power-basis-1st-derivative-dd.js.map