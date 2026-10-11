/**
 * Returns the `t` parameter value where the given bezier curve reaches the
 * given length `s` starting from `t = 0`.
 *
 * * typically `0 <= s <= length([0,1], ps)` for which the result is accurate
 * (and `0 <= t <= 1`)
 * * **out-of-range values:** there are no accuracy guarantees for
 * out-of-range values of `s` but the result is still well defined: if `s` is
 * negative `0` is returned and if `s` is larger than the curve length up to
 * `t === 1.125` then `1.125` is returned (i.e. the result is clipped to
 * `[0, 1.125]`)
 * * **order 0:** a point has zero length for all `t` so `0` is returned
 * regardless of the given `s`
 * * the length is calculated in the same way as the `length` function so that
 * `length([0, getTAtLength(ps, s)], ps)` is (very nearly) equal to `s`
 *
 * @param ps an order 0,1,2 or 3 bezier curve given by an ordered array of its
 * control points, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param s the length
 *
 * @doc mdx
 */
declare function getTAtLength(ps: number[][], s: number): number;
export { getTAtLength };
