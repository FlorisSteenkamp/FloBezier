
/**
 * Returns the polynomial whose zero is the t value of maximum absolute 
 * curvature for the given *quadratic* bezier curve.
 * 
 * * **precondition:** the given parabola is not degenerate to a line
 * * **non-exact:** there is floating point roundof during calculation
 * * see e.g. [math.stackexchange](https://math.stackexchange.com/a/2971112)'s
 * answer by [KeithWM](https://math.stackexchange.com/a/2971112/130809)
 * 
 * @param ps an order 2 bezier curve given as an array of control points, 
 * e.g. `[[0,0],[1,1],[2,1]]`
 * 
 * @internal
 */
function getCurvatureExtremaQuadraticPoly(
        ps: number[][]): number[] {

    // Find the point of max curvature (of the parabola)

    // calculate t*
    const [[x0,y0],[x1,y1],[x2,y2]] = ps;

    const x10 = x1 - x0;
    const x21 = x2 - x1;
    const wx = x21 - x10;

    const y10 = y1 - y0;
    const y21 = y2 - y1;
    const wy = y21 - y10;

    const n = 
        x0*(wx - x1) - x1*(x21 - x1) + 
        y0*(wy - y1) - y1*(y21 - y1);

    const d = wx*wx + wy*wy;

    return [d, -n];

    // const nd = 
    //     (x0*(x2 - 3*x1 + x0)) - (x1*(x2 - 2*x1)) + 
    //     (y0*(y2 - 3*y1 + y0)) - (y1*(y2 - 2*y1));
    // const nd = (
    //     (x0*x2 - 3*x0*x1 + x0*x0 - x1*x2 + 2*x1*x1) + 
    //     (y0*y2 - 3*y0*y1 + y0*y0 - y1*y2 + 2*y1*y1)) /
    //     ((x2 - 2*x1 + x0)**2 + (y2 - 2*y1 + y0)**2);
}


export { getCurvatureExtremaQuadraticPoly }



