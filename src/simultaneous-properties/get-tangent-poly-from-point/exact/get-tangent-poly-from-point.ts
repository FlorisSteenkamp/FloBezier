
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
import { twoProduct, ddAddDd, ddDiffDd, ddMultBy2, ddMultDouble2, ddMultByNeg2, ddMultBy4 } from "double-double";

const tp  = twoProduct;
const qaq = ddAddDd;
const qmd = ddMultDouble2;
const qm2 = ddMultBy2;
const qmn2 = ddMultByNeg2;
const qdifq = ddDiffDd;
const qm4 = ddMultBy4;


/**
 * Returns the polynomial whose roots are all the t values on the given bezier 
 * curve such that the line from the given point to the point on the bezier 
 * evaluated at t is tangent to the bezier at t.
 * * **precondition** coefficients of curve and point bit-aligned bitlength <= 46
 * * the resulting coefficients are guaranteed to have max bitlength 106 (so it
 * can fit in a double-double)
 * @param ps An order 1, 2 or 3 bezier curve given by its control points.
 * @param p 
 */
function getTangentPolyFromPointExact(ps: number[][], p: number[]) {
    if (ps.length === 4) {
        return getPolyForCubicExact(ps, p);
    } else if (ps.length === 3) {
        return getPolyForQuadraticExact(ps, p);
    } else if (ps.length === 2) {
        return getPolyForLineExact(ps, p);
    }
}


/**
 * * **precondition** coefficients of curve and point bit-aligned bitlength <= 46
 * @param ps 
 * @param p 
 */
function getPolyForCubicExact(ps: number[][], p: number[]): number[][] {
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

    const xx0 = x0 - x;  // (bitlength <= 52) => exact
    const xx1 = x1 - x;  // (bitlength <= 52) => exact
    const xx2 = x2 - x;  // (bitlength <= 52) => exact
    const xx3 = x3 - x;  // (bitlength <= 52) => exact
    const yy0 = y0 - y;  // (bitlength <= 52) => exact
    const yy1 = y1 - y;  // (bitlength <= 52) => exact
    const yy2 = y2 - y;  // (bitlength <= 52) => exact
    const yy3 = y3 - y;  // (bitlength <= 52) => exact

    // 52 -> 0 bits spare (1 summand)
    // 51 -> 2 bits spare (2-4 summands)
    // 50 -> 4 bits spare (5-16 summands)
    // 49 -> 6 bits spare (17-64 summands)
    // 48 -> 8 bits spare (65-256 summands)
    // 47 -> 10 bits spare (257-1024 summands)
    // 46 -> 12 bits spare (1025-4096 summands)

    const x00 = tp(xx0,xx0);          // (bitlength <= 52) => exact (1  summands)
    const x01 = qmd(6,tp(xx0,xx1));   // (bitlength <= 50) => exact (6  summands)
    const x02 = qmd(6,tp(xx0,xx2));   // (bitlength <= 50) => exact (6  summands)
    const x03 = qm2(tp(xx0,xx3));     // (bitlength <= 52) => exact (2  summands)
    const x11 = qmd(9,tp(xx1,xx1));   // (bitlength <= 50) => exact (9  summands)
    const x12 = qmd(18,tp(xx1,xx2));  // (bitlength <= 49) => exact (18 summands)
    const x13 = qmd(6,tp(xx1,xx3));   // (bitlength <= 50) => exact (6  summands)
    const x22 = qmd(9,tp(xx2,xx2));   // (bitlength <= 50) => exact (9  summands)
    const x23 = qmd(6,tp(xx2,xx3));   // (bitlength <= 50) => exact (6  summands)
    const x33 = tp(xx3,xx3);          // (bitlength <= 52) => exact (1  summands)

    const y00 = tp(yy0,yy0);          // (bitlength <= 52) => exact (1  summands)
    const y01 = qmd(6,tp(yy0,yy1));   // (bitlength <= 50) => exact (6  summands)
    const y02 = qmd(6,tp(yy0,yy2));   // (bitlength <= 50) => exact (6  summands)
    const y03 = qm2(tp(yy0,yy3));     // (bitlength <= 52) => exact (2  summands)
    const y11 = qmd(9,tp(yy1,yy1));   // (bitlength <= 49) => exact (9  summands)
    const y12 = qmd(18,tp(yy1,yy2));  // (bitlength <= 48) => exact (18 summands)
    const y13 = qmd(6,tp(yy1,yy3));   // (bitlength <= 50) => exact (6  summands)
    const y22 = qmd(9,tp(yy2,yy2));   // (bitlength <= 49) => exact (9  summands)
    const y23 = qmd(6,tp(yy2,yy3));   // (bitlength <= 50) => exact (6  summands)
    const y33 = tp(yy3,yy3);          // (bitlength <= 52) => exact (1  summands)

    const q1 = qaq(x13,x22);  // (bitlength <= 50) => exact (15 summands)
    const q2 = qaq(x03,x12);  // (bitlength <= 49) => exact (20 summands)
    const q3 = qaq(x02,x11);  // (bitlength <= 50) => exact (15 summands)
    const r1 = qaq(y13,y22);  // (bitlength <= 50) => exact (15 summands)
    const r2 = qaq(y03,y12);  // (bitlength <= 49) => exact (20 summands)
    const r3 = qaq(y02,y11);  // (bitlength <= 50) => exact (15 summands)

    //const t5 = 6*((x33 - x23 + q1 - q2 + q3 - x01 + x00) + 
    //            (y33 - y23 + r1 - r2 + r3 - y01 + y00));
    const t5a = qdifq(qaq(qaq(x33,x00),qaq(q1,q3)),(qaq(qaq(q2,x23),x01)));  // (bitlength <= 49) => exact (64 summands)
    const t5b = qdifq(qaq(qaq(y33,y00),qaq(r1,r3)),(qaq(qaq(r2,y23),y01)));  // (bitlength <= 49) => exact (64 summands)
    const t5 = qmd(6,qaq(t5a,t5b));  // (bitlength <= 47) => exact (768 summands)

    
    //const t4 = 5*((x23 - 2*(q1 + 2*q3 + 3*x00) + 3*q2 + 5*x01) +
    //            (y23 - 2*(r1 + 2*r3 + 3*y00) + 3*r2 + 5*y01));
    const t4a = qaq(qmn2(qaq(qaq(q1,qm2(q3)),qmd(3,x00))),qaq(qaq(x23,qmd(3,q2)),qmd(5,x01)));  // (bitlength <= 48) => exact (192 summands)
    const t4b = qaq(qmn2(qaq(qaq(r1,qm2(r3)),qmd(3,y00))),qaq(qaq(y23,qmd(3,r2)),qmd(5,y01)));  // (bitlength <= 48) => exact (192 summands)
    const t4 = qmd(5,qaq(t4a,t4b));  // (bitlength <= 46) => exact (1920 summands)

    //const t3 = 4*((q1 - 3*(q2 - 2*q3) - 5*(2*x01 - 3*x00)) +
    //            (r1 - 3*(r2 - 2*r3) - 5*(2*y01 - 3*y00)));
    const t3a = qaq(qaq(q1,qmd(3,(qdifq(qm2(q3),q2)))),qmd(5,(qdifq(qmd(3,x00),qm2(x01)))));  // (bitlength <= 48) => exact (210 summands)
    const t3b = qaq(qaq(r1,qmd(3,(qdifq(qm2(r3),r2)))),qmd(5,(qdifq(qmd(3,y00),qm2(y01)))));  // (bitlength <= 48) => exact (210 summands)
    const t3 = qmd(4,qaq(t3a,t3b));  // (bitlength <= 47) => exact (4*420 summands)

    //const t2 = 3*((q2 - 2*(2*q3 - 5*(x01 - 2*x00))) +
    //            (r2 - 2*(2*r3 - 5*(y01 - 2*y00))));
    const t2a = qdifq(q2,qm2(qdifq(qm2(q3),qmd(5,(qdifq(x01,qm2(x00)))))));  // (bitlength <= 48) => exact (160 summands)
    const t2b = qdifq(r2,qm2(qdifq(qm2(r3),qmd(5,(qdifq(y01,qm2(y00)))))));  // (bitlength <= 48) => exact (160 summands)
    const t2 = qmd(3,qaq(t2a,t2b));  // (bitlength <= 47) => exact (960 summands)

    //const t1 = 2*((q3 - 5*(x01 - 3*x00)) +
    //            (r3 - 5*(y01 - 3*y00)));
    const t1a = qdifq(q3,qmd(5,(qdifq(x01,qmd(3,x00)))));  // (bitlength <= 49) => exact (60 summands)
    const t1b = qdifq(r3,qmd(5,(qdifq(y01,qmd(3,y00)))));  // (bitlength <= 49) => exact (60 summands)
    const t1 = qm2(qaq(t1a,t1b));  // (bitlength <= 48) => exact (240 summands)

    //const t0 = ((x01 - 6*x00) +
    //          (y01 - 6*y00));
    const t0a = qdifq(x01,qmd(6,x00));  // (bitlength <= 50) => exact (12 summands)
    const t0b = qdifq(y01,qmd(6,y00));  // (bitlength <= 50) => exact (12 summands)
    const t0 = qaq(t0a,t0b);  // (bitlength <= 49) => exact (24 summands)


    return [t5,t4,t3,t2,t1,t0];
}


/**
 * * **precondition** coefficients of curve and point bit-aligned bitlength <= 49
 * @param ps 
 * @param p 
 */
function getPolyForQuadraticExact(ps: number[][], p: number[]): number[][] {
    const [[x0, y0], [x1, y1], [x2, y2]] = ps;
    const [x, y] = p;

    const xx0 = x0 - x;  // (bitlength <= 52) => exact
    const xx1 = x1 - x;  // (bitlength <= 52) => exact
    const xx2 = x2 - x;  // (bitlength <= 52) => exact
    const yy0 = y0 - y;  // (bitlength <= 52) => exact
    const yy1 = y1 - y;  // (bitlength <= 52) => exact
    const yy2 = y2 - y;  // (bitlength <= 52) => exact

    const x00 = tp(xx0,xx0);  // (bitlength <= 52) => exact (1  summand)
    const x01 = tp(xx0,xx1);  // (bitlength <= 52) => exact (1  summand)
    const x02 = tp(xx0,xx2);  // (bitlength <= 52) => exact (1  summand)
    const x11 = tp(xx1,xx1);  // (bitlength <= 52) => exact (1  summand)
    const x12 = tp(xx1,xx2);  // (bitlength <= 52) => exact (1  summand)
    const x22 = tp(xx2,xx2);  // (bitlength <= 52) => exact (1  summand)

    const y00 = tp(yy0,yy0);
    const y01 = tp(yy0,yy1);
    const y02 = tp(yy0,yy2);
    const y11 = tp(yy1,yy1);
    const y12 = tp(yy1,yy2);
    const y22 = tp(yy2,yy2);

    const q1 = qaq(y02,qm2(y11));  // (bitlength <= 51) => exact (3  summand)
    const r1 = qaq(x02,qm2(x11));  // (bitlength <= 51) => exact (3  summand)

    //const t3 = y22 + 2*q1 - 4*(y12 + y01) + y00 + 
    //         x22 + 2*r1 - 4*(x12 + x01) + x00;
    const t3a = qaq(qdifq(qaq(x22,qm2(r1)),qm4(qaq(x12,x01))),x00);  // (bitlength <= 50) => exact (13  summand)
    const t3b = qaq(qdifq(qaq(y22,qm2(q1)),qm4(qaq(y12,y01))),y00);  // (bitlength <= 50) => exact (13  summand)
    const t3 = qaq(t3a,t3b);  // (bitlength <= 49) => exact (26  summand)

    //const t2 = 3*(y12 - q1 + 3*y01 - y00 + 
    //            x12 - r1 + 3*x01 - x00);
    const t2a = qaq(qdifq(x12,r1),qdifq(qmd(3,x01),x00));  // (bitlength <= 49) => exact (24  summand)
    const t2b = qaq(qdifq(y12,q1),qdifq(qmd(3,y01),y00));  // (bitlength <= 49) => exact (24  summand)
    const t2 = qmd(3,qaq(t2a,t2b));  // (bitlength <= 48) => exact (144  summand)

    //const t1 = q1 - 3*(2*y01 - y00) + 
    //         r1 - 3*(2*x01 - x00);
    const t1a = qdifq(q1,qmd(3,qdifq(qm2(y01),y00)));  // (bitlength <= 50) => exact (12  summand)
    const t1b = qdifq(r1,qmd(3,qdifq(qm2(x01),x00)));  // (bitlength <= 50) => exact (12  summand)
    const t1 = qaq(t1a,t1b);  // (bitlength <= 49) => exact (24  summand)

    //const t0 = y01 - y00 + 
    //         x01 - x00;
    const t0a = qdifq(y01,y00);  // (bitlength <= 51) => exact (2  summand)
    const t0b = qdifq(x01,x00);  // (bitlength <= 51) => exact (2  summand)
    const t0 = qaq(t0a,t0b);  // (bitlength <= 51) => exact (4  summand)

    return [t3,t2,t1,t0];
}


/**
 * * **precondition** coefficients of curve and point bit-aligned bitlength <= 49
 * @param ps 
 * @param p 
 */
function getPolyForLineExact(ps: number[][], p: number[]): number[][] {
    const [[x0, y0], [x1, y1]] = ps;
    const [x, y] = p;

    const xx0 = x0 - x;  // (bitlength <= 52) => exact
    const xx1 = x1 - x;  // (bitlength <= 52) => exact
    const yy0 = y0 - y;  // (bitlength <= 52) => exact
    const yy1 = y1 - y;  // (bitlength <= 52) => exact

    const x00 = tp(xx0,xx0);
    const x01 = tp(xx0,xx1);
    const x11 = tp(xx1,xx1);

    const y00 = tp(yy0,yy0);
    const y01 = tp(yy0,yy1);
    const y11 = tp(yy1,yy1);

    const s1 = qaq(x01,y01);  // (bitlength <= 51) => exact
    const s2 = qaq(y00,x00);  // (bitlength <= 51) => exact

    //const t1 = x11 + y11 - 2*s1 + s2;
    const t1 = qaq(qaq(x11,y11),qaq(qmn2(s1),s2));  // (bitlength <= 49) => exact
    //const t0 = s1 - s2;
    const t0 = qdifq(s1,s2);  // (bitlength <= 50) => exact

    return [t1,t0];
}


export { getTangentPolyFromPointExact }
