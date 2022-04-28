import { twoDiff, scaleExpansion2, eAdd, twoSum, growExpansion } from 'big-float-ts';
const td = twoDiff;
const ts = twoSum;
const sce = scaleExpansion2;
const eadd = eAdd;
const ge = growExpansion;
/**
 * Returns the *exact* derivative of the power basis representation of a
 * bezier curve of order cubic or less.
 *
 * * returns the resulting power basis x and y coordinate polynomials from
 * highest power to lowest, e.g. if `x(t) = at^2 + bt + c`
 * and `y(t) = dt^2 + et + f` then  the result is returned
 * as `[[a,b,c],[d,e,f]]`, where the `a,b,c,...` are [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf) floating point
 * expansions
 *
 * @param ps an order 0,1,2 or 3 bezier curve given by an ordered array of its
 * control points, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 *
 * @doc
 */
function toPowerBasis_1stDerivativeExact(ps) {
    if (ps.length === 4) {
        return toPowerBasis3_1stDerivativeExact(ps);
    }
    if (ps.length === 3) {
        return toPowerBasis2_1stDerivativeExact(ps);
    }
    if (ps.length === 2) {
        return toPowerBasis1_1stDerivativeExact(ps);
    }
    if (ps.length === 1) {
        return [[[0]], [[0]]];
    }
    throw new Error('The given bezier curve must be of order <= 3.');
}
/** @internal */
function toPowerBasis3_1stDerivativeExact(ps) {
    const [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = ps;
    return [[
            sce(3, eadd(td(x3, x0), sce(3, td(x1, x2)))),
            sce(6, ge(ts(x2, x0), -2 * x1)),
            sce(3, td(x1, x0))
        ], [
            sce(3, eadd(td(y3, y0), sce(3, td(y1, y2)))),
            sce(6, ge(ts(y2, y0), -2 * y1)),
            sce(3, td(y1, y0))
        ]];
}
/** @internal */
function toPowerBasis2_1stDerivativeExact(ps) {
    const [[x0, y0], [x1, y1], [x2, y2]] = ps;
    return [[
            ge(ts(2 * x2, 2 * x0), -4 * x1),
            td(2 * x1, 2 * x0),
        ], [
            ge(ts(2 * y2, 2 * y0), -4 * y1),
            td(2 * y1, 2 * y0),
        ]];
}
/** @internal */
function toPowerBasis1_1stDerivativeExact(ps) {
    const [[x0, y0], [x1, y1]] = ps;
    return [[
            td(x1, x0),
        ], [
            td(y1, y0),
        ]];
}
export { toPowerBasis_1stDerivativeExact };
//# sourceMappingURL=to-power-basis-1st-derivative-exact.js.map