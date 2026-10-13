/**
 * Returns the polynomials whose zeros are the `t` values of the local
 * minima / maxima of the absolute curvature for the given bezier curve.
 *
 * The polynomials are in the form `p1*p2` where the zeros
 * of `p1` are the inflection points and the zeros of `p2` are the other minima /
 * maxima.
 *
 * * **precondition:** must be a `true` cubic bezier (not degenerate to line or
 * quadratic)
 * * see [MvG](https://math.stackexchange.com/a/1956264/130809)
 * * **non-exact:** due to floating point roundof during calculation
 *
 * @param ps an order 1,2 or 3 bezier curve given as an array of its control
 * points, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 *
 * @internal
 */
declare function getAbsCurvatureExtremaPolys(ps: number[][]): {
    inflectionPoly: number[];
    otherExtremaPoly: number[];
};
export { getAbsCurvatureExtremaPolys };
