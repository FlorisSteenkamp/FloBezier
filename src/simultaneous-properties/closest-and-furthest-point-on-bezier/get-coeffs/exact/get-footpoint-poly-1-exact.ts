import { twoDiff, eAdd, eMult, eDiff, eMultByNeg2 } from "big-float-ts";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const td = twoDiff;
const emult = eMult;
const emn2 = eMultByNeg2;
const eadd = eAdd;
const ediff = eDiff;


/**
 * * **precondition** TODO underflow/overflow
 * @param ps 
 * @param p 
 */
 function getFootpointPoly1Exact(ps: number[][], p: number[]): number[][] {
    const [[x0, y0], [x1, y1]] = ps;
    const [x, y] = p;

    const xx0 = td(x0,x);
    const xx1 = td(x1,x);
    const yy0 = td(y0,y);
    const yy1 = td(y1,y);

    const x00 = emult(xx0,xx0);
    const x01 = emult(xx0,xx1);
    const x11 = emult(xx1,xx1);

    const y00 = emult(yy0,yy0);
    const y01 = emult(yy0,yy1);
    const y11 = emult(yy1,yy1);

    const s1 = eadd(x01,y01);
    const s2 = eadd(y00,x00);

    //const t1 = x11 + y11 - 2*s1 + s2;
    const t1 = eadd(eadd(x11,y11),eadd(emn2(s1),s2));
    //const t0 = s1 - s2;
    const t0 = ediff(s1,s2);

    return [t1,t0];
}


export { getFootpointPoly1Exact }
