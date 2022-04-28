/**
 * Returns a bezier curve (`ps`) that starts and ends at the given `t` parameters
 * including an error bound (`_ps`, that needs to be multiplied by `3u`, `5u` or `8u`
 * (for lines, quadratic or cubic bezier curves respectively) before use,
 * where `u === Number.EPSILON/2`).
 *
 * @param ps an order 0,1,2 or 3 bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 * @param tS the `t` parameter where the resultant bezier should start
 * @param tE the `t` parameter where the resultant bezier should end
 *
 * @doc
 */
declare function fromToInclErrorBound(ps: number[][], tS: number, tE: number): {
    ps: number[][];
    _ps: number[][];
};
export { fromToInclErrorBound };
