/**
 * Returns the closest point on the bezier to the given point - returns the point
 * and the t value.
 * * this function also acts as an excellent inversion formula.
 *
 * @param ps
 * @param p
 *
 * @doc
 */
declare function closestPointOnBezierPrecise(ps: number[][], p: number[]): {
    p: number[];
    t: number;
};
declare function closestPointOnBezier(ps: number[][], p: number[]): {
    p: number[];
    t: number;
};
export { closestPointOnBezier, closestPointOnBezierPrecise };
