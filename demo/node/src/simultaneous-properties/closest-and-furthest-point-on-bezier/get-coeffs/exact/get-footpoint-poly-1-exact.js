import { twoDiff, eAdd, eMult, eDiff, eMultByNeg2, eCompress } from "big-float-ts";
const td = twoDiff;
const emn2 = eMultByNeg2;
/**
 * Returns the *exact* polynomial whose roots are all the `t` values on the
 * given bezier curve such that the line from the given point to the point on
 * the bezier evaluated at `t` is tangent to the bezier curve at `t`.
 *
 * * The returned polynomial coefficients are given densely as an array of
 * [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf) floating
 * point expansions from highest to lowest power,
 * e.g. `[[5],[-3],[0]]` represents the polynomial `5x^2 - 3x`.
 *
 * @param ps an order 1 bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1]]`
 * @param p a point, e.g. `[1,2]`
 *
 * @internal
 */
function getFootpointPoly1Exact(ps, p) {
    const [[x0, y0], [x1, y1]] = ps;
    const [x, y] = p;
    const xx0 = td(x0, x);
    const xx1 = td(x1, x);
    const yy0 = td(y0, y);
    const yy1 = td(y1, y);
    const x00 = eMult(xx0, xx0);
    const x01 = eMult(xx0, xx1);
    const x11 = eMult(xx1, xx1);
    const y00 = eMult(yy0, yy0);
    const y01 = eMult(yy0, yy1);
    const y11 = eMult(yy1, yy1);
    const s1 = eAdd(x01, y01);
    const s2 = eAdd(y00, x00);
    //const t1 = x11 + y11 - 2*s1 + s2;
    const t1 = eAdd(eAdd(x11, y11), eAdd(emn2(s1), s2));
    //const t0 = s1 - s2;
    const t0 = eDiff(s1, s2);
    return [t1, t0].map(eCompress);
}
export { getFootpointPoly1Exact };
//# sourceMappingURL=get-footpoint-poly-1-exact.js.map