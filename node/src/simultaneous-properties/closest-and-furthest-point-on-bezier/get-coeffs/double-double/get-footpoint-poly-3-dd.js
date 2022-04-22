import { ddAddDd, ddDiffDd, ddMultBy2, ddMultDouble2, ddMultBy4, twoDiff, ddMultDd } from "double-double";
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const td = twoDiff;
const qaq = ddAddDd;
const qmd = ddMultDouble2;
const qmq = ddMultDd;
const qm2 = ddMultBy2;
const qm4 = ddMultBy4;
const qdq = ddDiffDd;
/**
 * @param ps
 * @param p
 *
 * @internal
 */
function getFootpointPoly3Dd(ps, p) {
    //const [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = ps;
    const p0 = ps[0];
    const p1 = ps[1];
    const p2 = ps[2];
    const p3 = ps[3];
    const x0 = p0[0];
    const y0 = p0[1];
    const x1 = p1[0];
    const y1 = p1[1];
    const x2 = p2[0];
    const y2 = p2[1];
    const x3 = p3[0];
    const y3 = p3[1];
    const [x, y] = p;
    const xx0 = td(x0, x); // exact
    const xx1 = td(x1, x); // exact
    const xx2 = td(x2, x); // exact
    const xx3 = td(x3, x); // exact
    const yy0 = td(y0, y); // exact
    const yy1 = td(y1, y); // exact
    const yy2 = td(y2, y); // exact
    const yy3 = td(y3, y); // exact
    const x00 = qmq(xx0, xx0);
    const x01 = qmd(6, qmq(xx0, xx1));
    const x02 = qmd(6, qmq(xx0, xx2));
    const x03 = qm2(qmq(xx0, xx3));
    const x11 = qmd(9, qmq(xx1, xx1));
    const x12 = qmd(18, qmq(xx1, xx2));
    const x13 = qmd(6, qmq(xx1, xx3));
    const x22 = qmd(9, qmq(xx2, xx2));
    const x23 = qmd(6, qmq(xx2, xx3));
    const x33 = qmq(xx3, xx3);
    const y00 = qmq(yy0, yy0);
    const y01 = qmd(6, qmq(yy0, yy1));
    const y02 = qmd(6, qmq(yy0, yy2));
    const y03 = qm2(qmq(yy0, yy3));
    const y11 = qmd(9, qmq(yy1, yy1));
    const y12 = qmd(18, qmq(yy1, yy2));
    const y13 = qmd(6, qmq(yy1, yy3));
    const y22 = qmd(9, qmq(yy2, yy2));
    const y23 = qmd(6, qmq(yy2, yy3));
    const y33 = qmq(yy3, yy3);
    const q1 = qaq(x13, x22);
    const q2 = qaq(x03, x12);
    const q3 = qaq(x02, x11);
    const r1 = qaq(y13, y22);
    const r2 = qaq(y03, y12);
    const r3 = qaq(y02, y11);
    // const t5 = 6*(((((x33 - x23) + (x00 - x01)) + q1) + (q3 - q2)) + 
    //               ((((y33 - y23) + (y00 - y01)) + r1) + (r3 - r2)));
    const t5 = qmd(6, qaq(qaq(qaq(qaq(qdq(x33, x23), qdq(x00, x01)), q1), qdq(q3, q2)), qaq(qaq(qaq(qdq(y33, y23), qdq(y00, y01)), r1), qdq(r3, r2))));
    //const t4 = 5*((((x23 + 5*x01) + 3*q2) - 2*(q1 + 2*q3 + 3*x00)) +
    //              (((y23 + 5*y01) + 3*r2) - 2*(r1 + 2*r3 + 3*y00)));
    const t4 = qmd(5, qaq(qdq(qaq(qaq(x23, qmd(5, x01)), qmd(3, q2)), qm2(qaq(qaq(q1, qm2(q3)), qmd(3, x00)))), qdq(qaq(qaq(y23, qmd(5, y01)), qmd(3, r2)), qm2(qaq(qaq(r1, qm2(r3)), qmd(3, y00))))));
    //const t3 = 4*(((q1 - 3*(q2 - 2*q3)) - 5*(2*x01 - 3*x00)) +
    //              ((r1 - 3*(r2 - 2*r3)) - 5*(2*y01 - 3*y00)));
    const t3 = qm4(qaq(qdq(qdq(q1, qmd(3, (qdq(q2, qm2(q3))))), qmd(5, qdq(qm2(x01), qmd(3, x00)))), qdq(qdq(r1, qmd(3, (qdq(r2, qm2(r3))))), qmd(5, qdq(qm2(y01), qmd(3, y00))))));
    //const t2 = 3*((q2 - 2*(2*q3 - 5*(x01 - 2*x00))) +
    //              (r2 - 2*(2*r3 - 5*(y01 - 2*y00))));
    const t2 = qmd(3, qaq(qdq(q2, qm2(qdq(qm2(q3), qmd(5, qdq(x01, qm2(x00)))))), qdq(r2, qm2(qdq(qm2(r3), qmd(5, qdq(y01, qm2(y00))))))));
    //const t1 = 2*((q3 - 5*(x01 - 3*x00)) +
    //              (r3 - 5*(y01 - 3*y00)));
    const t1 = qm2(qaq(qdq(q3, qmd(5, (qdq(x01, qmd(3, x00))))), qdq(r3, qmd(5, (qdq(y01, qmd(3, y00)))))));
    //const t0 = ((x01 - 6*x00) +
    //            (y01 - 6*y00));
    const t0 = qaq(qdq(x01, qmd(6, x00)), qdq(y01, qmd(6, y00)));
    return [t5, t4, t3, t2, t1, t0];
}
export { getFootpointPoly3Dd };
//# sourceMappingURL=get-footpoint-poly-3-dd.js.map