import { twoDiff, scaleExpansion2, growExpansion, twoSum, eAdd as _eAdd } from 'big-float-ts';
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const td = twoDiff;
const ts = twoSum;
const sce = scaleExpansion2;
const ge = growExpansion;
const eAdd = _eAdd;
/**
 * Returns the exact power basis representation of a line, quadratic or
 * cubic bezier.
 *
 * * returns the power basis polynomial from highest power to lowest,
 * e.g. `at^3 + bt^2 + ct + d` is returned as `[a,b,c,d]`
 * * the precision of the returned coefficients can be high, e.g. for a cubic
 * the precision can require 6 doubles for the t^3 term.
 *
 * @param ps An order 1, 2 or 3 bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 *
 * @doc
 */
function getXYExact(ps) {
    if (ps.length === 4) {
        return getXY3Exact(ps);
    }
    if (ps.length === 3) {
        return getXY2Exact(ps);
    }
    return getXY1Exact(ps);
}
/**
 * Returns the exact power basis representation of a line, quadratic or
 * cubic bezier.
 *
 * * returns the power basis polynomial from highest power to lowest,
 * e.g. `at^3 + bt^2 + ct + d` is returned as `[a,b,c,d]`
 *
 * @param ps A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 *
 * @doc
 */
function getXY3Exact(ps) {
    const [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = ps;
    return [[
            // (x3 - x0) + 3*(x1 - x2)
            eAdd(td(x3, x0), sce(3, td(x1, x2)))
            // OR
            // (x3 - x0) - (2*x2 + x2) + (2*x1 + x1)
            //eAdd(eAdd(td(x3,x0), ts(-2*x2, -x2)), ts(2*x1, x1))
            ,
            // 3*((x2 + x0) - 2*x1)
            sce(3, ge(ts(x2, x0), -2 * x1)),
            // 3*(x1 - x0)
            sce(3, td(x1, x0)),
            // x0
            x0
        ], [
            //ge(ge(sce(3, td(y1, y2)), y3), -y0),
            eAdd(td(y3, y0), sce(3, td(y1, y2))),
            //sce(3, ge(td(y2, 2*y1), y0)),
            sce(3, ge(ts(y2, y0), -2 * y1)),
            sce(3, td(y1, y0)),
            y0
        ]];
}
/**
 * Returns the exact power basis representation of a line, quadratic or
 * cubic bezier.
 *
 * * returns the power basis polynomial from highest power to lowest,
 * e.g. `at^3 + bt^2 + ct + d` is returned as `[a,b,c,d]`
 *
 * @param ps A quadratic bezier curve, e.g. [[0,0],[1,1],[2,0]]
 *
 * @doc
 */
function getXY2Exact(ps) {
    const [[x0, y0], [x1, y1], [x2, y2]] = ps;
    return [[
            // x2 - 2*x1 + x0
            ge(ts(x2, x0), -2 * x1),
            // 2*(x1 - x0)
            td(2 * x1, 2 * x0),
            //x0
            x0
        ], [
            ge(ts(y2, y0), -2 * y1),
            td(2 * y1, 2 * y0),
            y0
        ]];
}
/**
 * Returns the exact power basis representation of a line, quadratic or
 * cubic bezier.
 *
 * * returns the power basis polynomial from highest power to lowest,
 * e.g. `at^3 + bt^2 + ct + d` is returned as `[a,b,c,d]`
 *
 * @param ps An order 1 bezier curve (a line), e.g. [[0,0],[1,1],[2,1],[2,0]]
 *
 * @doc
 */
function getXY1Exact(ps) {
    const [[x0, y0], [x1, y1]] = ps;
    return [[
            //x1 - x0,
            td(x1, x0),
            //x0
            x0
        ], [
            td(y1, y0),
            y0
        ]];
}
export { getXY1Exact, getXY2Exact, getXY3Exact, getXYExact };
//# sourceMappingURL=get-xy-exact.js.map