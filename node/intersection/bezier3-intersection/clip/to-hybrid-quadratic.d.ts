/**
 * Returns a hybrid quadratic bezier curve with error bounds (with the first
 * and last control points omitted).
 *
 * * **the returned error bounds have counters of <8> and <12> respectively for
 * the 1st and 2nd control points (i.e. for the hybrid control points)**
 * * specifically modified for use in the geometric interval bezier-bezier
 * intersection algorithm, e.g. for efficiency the first and last points are
 * not returned
 * * **precondition:** coordinate-wise error bound 'Wilson counters' on the
 * cubic bezier control points of
 * `[[<6>,<6>], [<6>,<6>], [<10>,<10>], [<11>,<11>]]` are assumed (due to other
 * parts of the algorithm)
 *
 * @param G a cubic bezier curve - coordinate error bounds are assumed to have
 * counters of `[[<6>,<6>], [<6>,<6>], [<10>,<10>], [<11>,<11>]]`
 *
 * @internal
 */
declare function toHybridQuadratic(G: {
    ps: number[][];
    _ps: number[][];
}): {
    hq: number[][];
    _hq: number[][];
};
export { toHybridQuadratic };
