declare const noIntersection: undefined;
/**
 * Performs geometric clipping of the given bezier curve and returns the new
 * minimum and maximum `t` parameter values.
 *
 * * helper function to the geometric interval bezier-bezier intersection
 * algorithm
 * * the returned min and max `t` values has the following guarantees:
 *   * `Number.EPSILON | t`
 *   * `0 <= t <= 1`
 *
 * @param G the bezier curve to be geo clipped - coordinate error bounds are
 * assumed to have counters of `[[<6>,<6>], [<6>,<6>], [<10>,<10>], [<11>,<11>]]`
 * @param dF function to calculate a min and max distance to the fat line's 'baseline'
 * @param dMin fat line min signed distance
 * @param dMax fat line max signed distance
 *
 * @internal
 */
declare function geoClip(G: {
    ps: number[][];
    _ps: number[][];
}, dF: (p: number[], _p: number[]) => {
    dMin: number;
    dMax: number;
}, dMin: number, dMax: number): number[] | typeof noIntersection;
export { geoClip };
