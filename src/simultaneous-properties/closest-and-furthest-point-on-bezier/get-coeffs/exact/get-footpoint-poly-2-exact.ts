import { twoDiff, scaleExpansion2, eMultBy2, eAdd, eMult, eDiff } from "big-float-ts";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const td = twoDiff;
const emult = eMult;
const sce = scaleExpansion2;
const em2 = eMultBy2;
const eadd = eAdd;
const ediff = eDiff;


/**
 * Returns the result of multiplying a floating point expansion by 4.
 * * **error free**
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 * 
 * @param e a floating point expansion
 */
 function em4(e: number[]) {
    const e_: number[] = [];
    for (let i=0; i<e.length; i++) {
        e_.push(4*e[i]);
    }

    return e_;
}



/**
 * * **precondition** TODO underflow/overflow
 * @param ps 
 * @param p 
 */
 function getFootpointPoly2Exact(ps: number[][], p: number[]): number[][] {
    const [[x0, y0], [x1, y1], [x2, y2]] = ps;
    const [x, y] = p;

    const xx0 = td(x0,x);
    const xx1 = td(x1,x);
    const xx2 = td(x2,x);
    const yy0 = td(y0,y);
    const yy1 = td(y1,y);
    const yy2 = td(y2,y);

    const x00 = emult(xx0,xx0);
    const x01 = emult(xx0,xx1);
    const x02 = emult(xx0,xx2);
    const x11 = emult(xx1,xx1);
    const x12 = emult(xx1,xx2);
    const x22 = emult(xx2,xx2);

    const y00 = emult(yy0,yy0);
    const y01 = emult(yy0,yy1);
    const y02 = emult(yy0,yy2);
    const y11 = emult(yy1,yy1);
    const y12 = emult(yy1,yy2);
    const y22 = emult(yy2,yy2);

    const q1 = eadd(y02,em2(y11));
    const r1 = eadd(x02,em2(x11));

    //const t3 = y22 + 2*q1 - 4*(y12 + y01) + y00 + 
    //           x22 + 2*r1 - 4*(x12 + x01) + x00;
    const t3a = eadd(ediff(eadd(x22,em2(r1)),em4(eadd(x12,x01))),x00);
    const t3b = eadd(ediff(eadd(y22,em2(q1)),em4(eadd(y12,y01))),y00);
    const t3 = eadd(t3a,t3b);

    //const t2 = 3*(y12 - q1 + 3*y01 - y00 + 
    //              x12 - r1 + 3*x01 - x00);
    const t2a = eadd(ediff(x12,r1),ediff(sce(3,x01),x00));
    const t2b = eadd(ediff(y12,q1),ediff(sce(3,y01),y00));
    const t2 = sce(3,eadd(t2a,t2b));

    //const t1 = q1 - 3*(2*y01 - y00) + 
    //           r1 - 3*(2*x01 - x00);
    const t1a = ediff(q1,sce(3,ediff(em2(y01),y00)));
    const t1b = ediff(r1,sce(3,ediff(em2(x01),x00)));
    const t1 = eadd(t1a,t1b);

    //const t0 = y01 - y00 + 
    //           x01 - x00;
    const t0a = ediff(y01,y00);
    const t0b = ediff(x01,x00);
    const t0 = eadd(t0a,t0b);

    return [t3,t2,t1,t0];
}


export { getFootpointPoly2Exact }