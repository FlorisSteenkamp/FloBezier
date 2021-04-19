/**
 * Generates a cubic bezier curve going through a specific point given control 
 * points 0, 1 and 3.
 * * **non-exact:** the returned bezier does not necessarily go through the
 * point *exactly* (due to floating-point round-off).
 * 
 * @param ps cubic bezier points given as [[x0,y0], [x1,y1], , [x3,y3]],
 * e.g. [[1,2], [3,4], ,[5,6]] (note the 3rd point is not given)
 * @param p a point through which the bezier should go
 * @param t a t parameter value at which the bezier should go through the 
 * point - this is necessary due to a degree of freedom still left
 * 
 * @example
 * ```typescript
 * cubicThroughPointGiven013([[1,2], [3,4], ,[5,6]], [8,8], 0.2); //=> []
 * ```
 * 
 * @doc mdx
 */
 function cubicThroughPointGiven013(
        ps: number[][],
        p: number[],
        t: number): number[][] {

    const [[x0,y0], [x1,y1], ,[x3,y3]] = ps;
    const [x,y] = p;

    const x2 = (t**3*(-x0 + 3*x1 + x3) + 3*t**2*(x0 - 2*x1) - 3*t*(x0 - x1) - x + x0)/(3*t**2*(t - 1));
    const y2 = (t**3*(-y0 + 3*y1 + y3) + 3*t**2*(y0 - 2*y1) - 3*t*(y0 - y1) - y + y0)/(3*t**2*(t - 1));

    return [[x0,y0], [x1,y1], [x2,y2], [x3,y3]];
}


export { cubicThroughPointGiven013 }
