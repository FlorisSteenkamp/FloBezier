
/**
 * Generates a cubic going through a specific point given control points 0,1
 * and 3.
 */
function cubicThroughPointGiven013(
        ps: number[][],
        p: number[],
        t: number) {

    let [[x0,y0], [x1,y1], [,], [x3,y3]] = ps;
    let [x,y] = p;

    let x2 = (t**3*(-x0 + 3*x1 + x3) + 3*t**2*(x0 - 2*x1) - 3*t*(x0 - x1) - x + x0)/(3*t**2*(t - 1));
    let y2 = (t**3*(-y0 + 3*y1 + y3) + 3*t**2*(y0 - 2*y1) - 3*t*(y0 - y1) - y + y0)/(3*t**2*(t - 1));

    return [[x0,y0], [x1,y1], [x2,y2], [x3,y3]]
}


export { cubicThroughPointGiven013 }
