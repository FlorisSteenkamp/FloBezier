/**
 * Returns the unique self-intersection parameter `t` values of the given
 * bezier curve if they exist, else return `[]` (see also the `inRange`
 * parameter below).
 *
 * * only cubic (or higher order) bezier curves can have unique self-intersections
 * * this algorithm is mathematically guaranteed accurate to within an absolute
 * error of `4 * Number.EPSILON` for the returned `t` values satisfying `|t| <= 1`
 * or a relative error of the same `4 * Number.EPSILON` otherwise.
 * * **special case:** a cusp is considered a degenerate self-intersection and
 * the (duplicate) `t` values will be returned
 *
 * @param ps a bezier curve given as an array of its control points
 * @param inRange if `inRange === true` (the default) then return the two `t`
 * parameter values only if both are in [0,1] else return `[]`.
 * If `inRange === false` then return the (0,1 or 2) `t` values in `[0,1]` even
 * if only one is in that range.
 *
 * @doc mdx
 */
declare function bezierSelfIntersection(ps: number[][], inRange?: boolean): number[];
export { bezierSelfIntersection };
