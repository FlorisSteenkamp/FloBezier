import { ddAddDd, ddDiffDd, ddMultBy2, ddMultDouble2, ddMultBy4, twoDiff, ddMultDd } from "double-double";
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const td = twoDiff;
const qaq = ddAddDd;
const qmd = ddMultDouble2;
const qmq = ddMultDd;
const qm2 = ddMultBy2;
const qdifq = ddDiffDd;
const qm4 = ddMultBy4;
/**
 * @param ps
 * @param p
 *
 * @internal
 */
function getFootpointPoly2Dd(ps, p) {
    const [[x0, y0], [x1, y1], [x2, y2]] = ps;
    const [x, y] = p;
    const xx0 = td(x0, x);
    const xx1 = td(x1, x);
    const xx2 = td(x2, x);
    const yy0 = td(y0, y);
    const yy1 = td(y1, y);
    const yy2 = td(y2, y);
    const x00 = qmq(xx0, xx0);
    const x01 = qmq(xx0, xx1);
    const x02 = qmq(xx0, xx2);
    const x11 = qmq(xx1, xx1);
    const x12 = qmq(xx1, xx2);
    const x22 = qmq(xx2, xx2);
    const y00 = qmq(yy0, yy0);
    const y01 = qmq(yy0, yy1);
    const y02 = qmq(yy0, yy2);
    const y11 = qmq(yy1, yy1);
    const y12 = qmq(yy1, yy2);
    const y22 = qmq(yy2, yy2);
    const q1 = qaq(y02, qm2(y11));
    const r1 = qaq(x02, qm2(x11));
    //const t3 = ((y22 + y00) + 2*q1 - 4*(y12 + y01)) + 
    //           ((x22 + x00) + 2*r1 - 4*(x12 + x01));
    const t3 = qaq(qdifq(qaq(qaq(y22, y00), qm2(q1)), qm4(qaq(y12, y01))), qdifq(qaq(qaq(x22, x00), qm2(r1)), qm4(qaq(x12, x01))));
    //const t2 = 3*(((y12 - q1) + (3*y01 - y00)) + 
    //              ((x12 - r1) + (3*x01 - x00)));
    const t2 = qmd(3, qaq(qaq(qdifq(y12, q1), qdifq(qmd(3, y01), y00)), qaq(qdifq(x12, r1), qdifq(qmd(3, x01), x00))));
    //const t1 = (q1 - 3*(2*y01 - y00)) + 
    //           (r1 - 3*(2*x01 - x00));
    const t1 = qaq(qdifq(q1, qmd(3, qdifq(qm2(y01), y00))), qdifq(r1, qmd(3, qdifq(qm2(x01), x00))));
    //const t0 = (y01 - y00) + 
    //           (x01 - x00);
    const t0 = qaq(qdifq(y01, y00), qdifq(x01, x00));
    return [t3, t2, t1, t0];
}
export { getFootpointPoly2Dd };
//# sourceMappingURL=get-footpoint-poly-2-dd.js.map