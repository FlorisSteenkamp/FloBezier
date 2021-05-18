
/**
 * Returns the polynomial whose roots are all the t values on the given bezier 
 * curve such that the line from the given point to the point on the bezier 
 * evaluated at t is tangent to the bezier at t.
 * 
 * @param ps An order 1, 2 or 3 bezier curve given by its control points.
 * @param p 
 * 
 * @doc
 */
function getTangentPolyFromPoint(ps: number[][], p: number[]) {
    if (ps.length === 4) {
        return getPolyForCubic(ps, p);
    } else if (ps.length === 3) {
        return getPolyForQuadratic(ps, p);
    } else if (ps.length === 2) {
        return getPolyForLine(ps, p);
    }
}


function getPolyForCubic(ps: number[][], p: number[]) {
    //const [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = ps;
    //const [xp, yp] = p;

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

    const xp = p[0];
    const yp = p[1];

    const xx0 = x0 - xp;
    const xx1 = x1 - xp;
    const xx2 = x2 - xp;
    const xx3 = x3 - xp;
    const yy0 = y0 - yp;
    const yy1 = y1 - yp;
    const yy2 = y2 - yp;
    const yy3 = y3 - yp;

    const x00 =    xx0*xx0;
    const x01 = 6 *xx0*xx1;
    const x02 = 6 *xx0*xx2;
    const x03 = 2 *xx0*xx3;
    const x11 = 9 *xx1*xx1;
    const x12 = 18*xx1*xx2;
    const x13 = 6 *xx1*xx3;
    const x22 = 9 *xx2*xx2;
    const x23 = 6 *xx2*xx3;
    const x33 =    xx3*xx3;

    const y00 =    yy0*yy0;
    const y01 = 6 *yy0*yy1;
    const y02 = 6 *yy0*yy2;
    const y03 = 2 *yy0*yy3;
    const y11 = 9 *yy1*yy1;
    const y12 = 18*yy1*yy2;
    const y13 = 6 *yy1*yy3;
    const y22 = 9 *yy2*yy2;
    const y23 = 6 *yy2*yy3;
    const y33 =    yy3*yy3;

    const q1 = x13 + x22;
    const q2 = x03 + x12;
    const q3 = x02 + x11;
    const r1 = y13 + y22;
    const r2 = y03 + y12;
    const r3 = y02 + y11;

    const t5 = 6*((x33 - x23 + q1 - q2 + q3 - x01 + x00) + 
                (y33 - y23 + r1 - r2 + r3 - y01 + y00));

    const t4 = 5*((x23 - 2*(q1 + 2*q3 + 3*x00) + 3*q2 + 5*x01) +
                (y23 - 2*(r1 + 2*r3 + 3*y00) + 3*r2 + 5*y01));

    const t3 = 4*((q1 - 3*(q2 - 2*q3) - 5*(2*x01 - 3*x00)) +
                (r1 - 3*(r2 - 2*r3) - 5*(2*y01 - 3*y00)));

    const t2 = 3*((q2 - 2*(2*q3 - 5*(x01 - 2*x00))) +
                (r2 - 2*(2*r3 - 5*(y01 - 2*y00))));

    const t1 = 2*((q3 - 5*(x01 - 3*x00)) +
                (r3 - 5*(y01 - 3*y00)));

    const t0 =   ((x01 - 6*x00) +
                (y01 - 6*y00));


    return [t5,t4,t3,t2,t1,t0];
}


function getPolyForQuadratic(ps: number[][], p: number[]) {
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

    const t3 = y22 + 2*q1 - 4*(y12 + y01) + y00 + 
             x22 + 2*r1 - 4*(x12 + x01) + x00;
    const t2 = 3*(y12 - q1 + 3*y01 - y00 + 
                x12 - r1 + 3*x01 - x00);
    const t1 = q1 - 3*(2*y01 - y00) + 
             r1 - 3*(2*x01 - x00);
    const t0 = y01 - y00 + 
             x01 - x00;

    return [t3,t2,t1,t0];
}


function getPolyForLine(ps: number[][], p: number[]) {
    const [[x0, y0], [x1, y1]] = ps;
    const [xp, yp] = p;

    const xx0 = x0 - xp;
    const xx1 = x1 - xp;
    const yy0 = y0 - yp;
    const yy1 = y1 - yp;

    const x00 = xx0*xx0;
    const x01 = xx0*xx1;
    const x11 = xx1*xx1;

    const y00 = yy0*yy0;
    const y01 = yy0*yy1;
    const y11 = yy1*yy1;

    const s1 = x01 + y01;
    const s2 = y00 + x00;

    const t1 = x11 + y11 - 2*s1 + s2;
    const t0 = s1 - s2;

    return [t1,t0];
}


export { getTangentPolyFromPoint }
