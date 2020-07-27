/**
 * Generates a cubic bezier curve going through a specific point given control
 * points 0, 1 and 3.
 * @param ps cubic bezier points given as [[x0,y0], [x1,y1], [,], [x3,y3]],
 * e.g. [[1,2], [3,4], ,[5,6]] (note the 3rd point is not given)
 * @param p a point through which the bezier should go
 * @param t a t parameter value at which the bezier should go through the
 * point - this is necessary due to a degree of freedom still left
 *
 * * **non-exact:** the returned bezier does not necessarily go through the
 * point *exactly*.
 */
declare function cubicThroughPointGiven013(ps: number[][], p: number[], t: number): number[][];
export { cubicThroughPointGiven013 };
