/**
 * Returns the polynomial (in `t`) whose roots are the parameter `t` values of
 * the foot point(s) on the given bezier curve to the given point, i.e. the
 * points on the curve where the line to the given point is perpendicular to
 * the curve.
 *
 * The result is returned in the form expected by `flo-poly`'s `roots`
 * function, i.e. as an object with the following properties:
 *     * `polyDd`: the polynomial's coefficients in double-double precision
 *     * `polyE`: a coefficient-wise absolute error bound of `polyDd`
 *     * `getPolyExact`: a function returning the polynomial's coefficients
 *       exactly (as Shewchuk expansions) - only called if needed
 *
 * * an order 0 curve (a point) has no foot points so the non-zero constant
 * polynomial `1` is returned
 *
 * @param ps an order 0,1,2 or 3 bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 * @param p a point, e.g. `[1,2]`
 *
 * @doc
 */
declare function getFootPointsOnBezierPolysCertified(ps: number[][], p: number[]): {
    polyDd: number[][];
    polyE: number[];
    getPolyExact: () => number[][];
};
export { getFootPointsOnBezierPolysCertified };
