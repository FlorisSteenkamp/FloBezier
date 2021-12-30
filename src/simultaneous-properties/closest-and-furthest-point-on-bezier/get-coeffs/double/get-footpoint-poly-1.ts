
function getFootpointPoly1(ps: number[][], p: number[]) {
    const [[x0, y0], [x1, y1]] = ps;
    const [xp, yp] = p;

    const xx0 = x0 - xp;
    const xx1 = x1 - xp;
    const yy0 = y0 - yp;
    const yy1 = y1 - yp;

    const x01 = xx0*xx1;
    const y01 = yy0*yy1;

    const s1 = x01 + y01;
    const s2 = yy0*yy0 + xx0*xx0;

    const t1 = (xx1*xx1 + yy1*yy1) + (s2 - 2*s1);
    const t0 = s1 - s2;

    return [t1,t0];
}


export { getFootpointPoly1 }
