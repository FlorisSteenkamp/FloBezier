import { twoDiff, scaleExpansion2, eMultBy2, eAdd, eMult, eDiff, eMultByNeg2 } from "big-float-ts";

// We *have* to do the below to improve performance with bundlers❗ The assignee is a getter❗ The assigned is a pure function❗
const td = twoDiff;
const emult = eMult;
const sce = scaleExpansion2;
const em2 = eMultBy2;
const emn2 = eMultByNeg2;
const eadd = eAdd;
const ediff = eDiff;


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
 * @param ps an order 3 bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 * @param p a point, e.g. `[1,2]`
 */
function getFootpointPoly3Exact(
        ps: number[][], p: number[]): number[][] {

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

    const [x,y] = p;

    const xx0 = td(x0,x);
    const xx1 = td(x1,x);
    const xx2 = td(x2,x);
    const xx3 = td(x3,x);
    const yy0 = td(y0,y);
    const yy1 = td(y1,y);
    const yy2 = td(y2,y);
    const yy3 = td(y3,y);

    const x00 = emult(xx0,xx0); 
    const x01 = sce(6,emult(xx0,xx1));
    const x02 = sce(6,emult(xx0,xx2));
    const x03 = em2(emult(xx0,xx3));
    const x11 = sce(9,emult(xx1,xx1));
    const x12 = sce(18,emult(xx1,xx2));
    const x13 = sce(6,emult(xx1,xx3));
    const x22 = sce(9,emult(xx2,xx2));
    const x23 = sce(6,emult(xx2,xx3));
    const x33 = emult(xx3,xx3); 

    const y00 = emult(yy0,yy0); 
    const y01 = sce(6,emult(yy0,yy1));
    const y02 = sce(6,emult(yy0,yy2));
    const y03 = em2(emult(yy0,yy3));
    const y11 = sce(9,emult(yy1,yy1));
    const y12 = sce(18,emult(yy1,yy2));
    const y13 = sce(6,emult(yy1,yy3));
    const y22 = sce(9,emult(yy2,yy2));
    const y23 = sce(6,emult(yy2,yy3));
    const y33 = emult(yy3,yy3); 

    const q1 = eadd(x13,x22); 
    const q2 = eadd(x03,x12); 
    const q3 = eadd(x02,x11); 
    const r1 = eadd(y13,y22); 
    const r2 = eadd(y03,y12); 
    const r3 = eadd(y02,y11); 

    //const t5 = 6*((x33 - x23 + q1 - q2 + q3 - x01 + x00) + 
    //              (y33 - y23 + r1 - r2 + r3 - y01 + y00));
    const t5a = ediff(eadd(eadd(x33,x00),eadd(q1,q3)),(eadd(eadd(q2,x23),x01)));
    const t5b = ediff(eadd(eadd(y33,y00),eadd(r1,r3)),(eadd(eadd(r2,y23),y01)));
    const t5 = sce(6,eadd(t5a,t5b));

    
    //const t4 = 5*((x23 - 2*(q1 + 2*q3 + 3*x00) + 3*q2 + 5*x01) +
    //              (y23 - 2*(r1 + 2*r3 + 3*y00) + 3*r2 + 5*y01));
    const t4a = eadd(emn2(eadd(eadd(q1,em2(q3)),sce(3,x00))),eadd(eadd(x23,sce(3,q2)),sce(5,x01)));
    const t4b = eadd(emn2(eadd(eadd(r1,em2(r3)),sce(3,y00))),eadd(eadd(y23,sce(3,r2)),sce(5,y01)));
    const t4 = sce(5,eadd(t4a,t4b));

    //const t3 = 4*((q1 - 3*(q2 - 2*q3) - 5*(2*x01 - 3*x00)) +
    //              (r1 - 3*(r2 - 2*r3) - 5*(2*y01 - 3*y00)));
    const t3a = eadd(eadd(q1,sce(3,(ediff(em2(q3),q2)))),sce(5,(ediff(sce(3,x00),em2(x01)))));
    const t3b = eadd(eadd(r1,sce(3,(ediff(em2(r3),r2)))),sce(5,(ediff(sce(3,y00),em2(y01)))));
    const t3 = sce(4,eadd(t3a,t3b));

    //const t2 = 3*((q2 - 2*(2*q3 - 5*(x01 - 2*x00))) +
    //              (r2 - 2*(2*r3 - 5*(y01 - 2*y00))));
    const t2a = ediff(q2,em2(ediff(em2(q3),sce(5,(ediff(x01,em2(x00)))))));
    const t2b = ediff(r2,em2(ediff(em2(r3),sce(5,(ediff(y01,em2(y00)))))));
    const t2 = sce(3,eadd(t2a,t2b));

    //const t1 = 2*((q3 - 5*(x01 - 3*x00)) +
    //              (r3 - 5*(y01 - 3*y00)));
    const t1a = ediff(q3,sce(5,(ediff(x01,sce(3,x00)))));
    const t1b = ediff(r3,sce(5,(ediff(y01,sce(3,y00)))));
    const t1 = em2(eadd(t1a,t1b));

    //const t0 = ((x01 - 6*x00) +
    //            (y01 - 6*y00));
    const t0a = ediff(x01,sce(6,x00));
    const t0b = ediff(y01,sce(6,y00));
    const t0 = eadd(t0a,t0b);


    return [t5,t4,t3,t2,t1,t0];
}


export { getFootpointPoly3Exact }
