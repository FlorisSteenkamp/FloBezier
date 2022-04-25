import { twoProduct, ddAddDd, ddDiffDd, ddMultByNeg2 } from "double-double";
// We *have* to do the below to improve performance with bundlers❗ The assignee is a getter❗ The assigned is a pure function❗
const tp = twoProduct;
const qaq = ddAddDd;
const qmn2 = ddMultByNeg2;
const qdifq = ddDiffDd;
/**
 * Returns the polynomial whose roots are all the `t` values on the given bezier
 * curve such that the line from the given point to the point on the bezier
 * evaluated at `t` is tangent to the bezier curve at `t`.
 *
 * * intermediate calculations are done (and the final result returned in)
 * double-double precision
 *
 * @param ps an order 1 bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1]]`
 * @param p a point, e.g. `[1,2]`
 *
 * @internal
 */
function getFootpointPoly1Dd(ps, p) {
    const [[x0, y0], [x1, y1]] = ps;
    const [x, y] = p;
    const xx0 = x0 - x;
    const xx1 = x1 - x;
    const yy0 = y0 - y;
    const yy1 = y1 - y;
    const x00 = tp(xx0, xx0);
    const x01 = tp(xx0, xx1);
    const x11 = tp(xx1, xx1);
    const y00 = tp(yy0, yy0);
    const y01 = tp(yy0, yy1);
    const y11 = tp(yy1, yy1);
    const s1 = qaq(x01, y01);
    const s2 = qaq(y00, x00);
    //const t1 = (x11 + y11) + (s2 - 2*s1)
    const t1 = qaq(qaq(x11, y11), qaq(s2, qmn2(s1)));
    //const t0 = s1 - s2;
    const t0 = qdifq(s1, s2);
    return [t1, t0];
}
export { getFootpointPoly1Dd };
//# sourceMappingURL=get-footpoint-poly-1-dd.js.map