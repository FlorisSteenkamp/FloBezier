import { twoDiff, twoSum, ddMultDouble2, ddAddDd, ddAddDouble } from 'double-double';
// We *have* to do the below to improve performance with bundlers❗ The assignee is a getter❗ The assigned is a pure function❗
const td = twoDiff; // error -> 0
const qmd = ddMultDouble2; // error -> 3*u²
const qaq = ddAddDd;
const qad = ddAddDouble; // error -> 2*u²
const ts = twoSum;
/**
 * Returns the power basis representation of a bezier curve of order cubic or
 * less.
 *
 * * intermediate calculations are done in double-double precision
 * * returns the power basis x and y coordinate polynomials from highest power
 * to lowest, e.g. if `x(t) = at^3 + bt^2 + ct + d`
 * and `y(t) = et^3 + ft^2 + gt + h` then the result is returned
 * as `[[a,b,c,d],[e,f,g,h]]`, where the `a,b,c,...` are in double-double
 * precision
 *
 * @param ps an order 0,1,2 or 3 bezier curve given by an ordered array of its
 * control points, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 *
 * @doc
 */
function toPowerBasisDd(ps) {
    if (ps.length === 4) {
        return toPowerBasis3Dd(ps);
    }
    if (ps.length === 3) {
        return toPowerBasis2Dd(ps);
    }
    if (ps.length === 2) {
        return toPowerBasis1Dd(ps);
    }
    if (ps.length === 1) {
        return toPowerBasis0Dd(ps);
    }
    throw new Error('The given bezier curve must be of order <= cubic.');
}
/** @internal */
function toPowerBasis3Dd(ps) {
    const [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = ps;
    // ----------------------------
    // xx3 = (x3 - x0) + 3*(x1 - x2)
    // ----------------------------
    const xx3 = qaq(td(x3, x0), qmd(3, td(x1, x2)));
    // ----------------------------
    // xx2 = 3*((x2 + x0) - 2*x1)
    // ----------------------------
    const xx2 = qmd(3, qad(ts(x2, x0), -2 * x1));
    // ----------------------------
    // xx1 = 3*(x1 - x0)
    // ----------------------------
    const xx1 = qmd(3, td(x1, x0));
    // ----------------------------
    // yy3 = (y3 - y0) + 3*(y1 - y2)
    // ----------------------------
    const yy3 = qaq(td(y3, y0), qmd(3, td(y1, y2)));
    // ----------------------------
    // yy2 = 3*((y2 + y0) - 2*y1)
    // ----------------------------
    const yy2 = qmd(3, qad(ts(y2, y0), -2 * y1));
    // ----------------------------
    // yy1 = 3*(y1 - y0)
    // ----------------------------
    const yy1 = qmd(3, td(y1, y0));
    return [[xx3, xx2, xx1, [0, x0]], [yy3, yy2, yy1, [0, y0]]];
}
/**
 * Only the quadratic monomial coefficient has an error, the others are exact.
 *
 * @internal
 */
function toPowerBasis2Dd(ps) {
    const [[x0, y0], [x1, y1], [x2, y2]] = ps;
    // ---------------------
    // xx2 = x2 + x0 - 2*x1
    // ---------------------
    const xx2 = qad(ts(x2, x0), -2 * x1);
    // ---------------------
    // xx1 = 2*(x1 - x0)
    // ---------------------
    const xx1 = td(2 * x1, 2 * x0); // error free
    // ---------------------
    // yy2 = y2 + y0 - 2*y1
    // ---------------------
    const yy2 = qad(ts(y2, y0), -2 * y1);
    // ---------------------
    // yy1 = 2*(y1 - y0)
    // ---------------------
    const yy1 = td(2 * y1, 2 * y0); // error free
    return [[xx2, xx1, [0, x0]], [yy2, yy1, [0, y0]]];
}
/**
 * Exact for any bitlength.
 *
 * @internal
 */
function toPowerBasis1Dd(ps) {
    const [[x0, y0], [x1, y1]] = ps;
    return [[
            td(x1, x0),
            [0, x0]
        ], [
            td(y1, y0),
            [0, y0]
        ]];
}
/**
 * Exact for any bitlength.
 *
 * @internal
 */
function toPowerBasis0Dd(ps) {
    const [[x0, y0]] = ps;
    return [[[0, x0]], [[0, y0]]];
}
export { toPowerBasisDd, toPowerBasis0Dd, toPowerBasis1Dd, toPowerBasis2Dd, toPowerBasis3Dd };
//# sourceMappingURL=to-power-basis-dd.js.map