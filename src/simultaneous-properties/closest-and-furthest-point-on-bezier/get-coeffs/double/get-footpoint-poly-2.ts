
/** @internal */
function getFootpointPoly2(
        ps: number[][], p: number[]) {

    //const [[x0, y0], [x1, y1], [x2, y2]] = ps;
    //const [xp, yp] = p;

    const p0 = ps[0];
    const p1 = ps[1];
    const p2 = ps[2];

    const x0 = p0[0];
    const y0 = p0[1];
    const x1 = p1[0];
    const y1 = p1[1];
    const x2 = p2[0];
    const y2 = p2[1];

    const xp = p[0];
    const yp = p[1];

    const xx0 = x0 - xp;
    const xx1 = x1 - xp;
    const xx2 = x2 - xp;
    const yy0 = y0 - yp;
    const yy1 = y1 - yp;
    const yy2 = y2 - yp;

    const x00 = xx0*xx0;
    const x01 = xx0*xx1;
    const x02 = xx0*xx2;
    const x11 = xx1*xx1;
    const x12 = xx1*xx2;
    const x22 = xx2*xx2;

    const y00 = yy0*yy0;
    const y01 = yy0*yy1;
    const y02 = yy0*yy2;
    const y11 = yy1*yy1;
    const y12 = yy1*yy2;
    const y22 = yy2*yy2;

    const q1 = y02 + 2*y11;
    const r1 = x02 + 2*x11;

    const t3 = ((y22 + y00) + 2*q1 - 4*(y12 + y01)) + 
               ((x22 + x00) + 2*r1 - 4*(x12 + x01));
    const t2 = 3*(((y12 - q1) + (3*y01 - y00)) + 
                  ((x12 - r1) + (3*x01 - x00)));
    const t1 = (q1 - 3*(2*y01 - y00)) + 
               (r1 - 3*(2*x01 - x00));
    const t0 = (y01 - y00) + 
               (x01 - x00);

    return [t3,t2,t1,t0];
}


export { getFootpointPoly2 }
