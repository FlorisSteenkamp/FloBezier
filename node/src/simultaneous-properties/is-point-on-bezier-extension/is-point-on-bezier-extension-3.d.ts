/**
 * Returns `true` if the given point is on the given cubic bezier curve where
 * the parameter, `t`, is allowed to extend to `±∞`, i.e. if `t ∈ (-∞, +∞)`,
 * `false` otherwise.
 *
 * @param ps a cubic bezier curve
 * @param p a point with coordinates given as Shewchuk expansions. If only
 * double precision coordinates need to be provided then wrap them in a one
 * element array, e.g. for a point with x and y coordinates given as 1 and 2 set
 * `p === [[1],[2]]`.
 *
 * @internal
 */
declare function isPointOnBezierExtension3(ps: number[][], p: number[][]): boolean;
export { isPointOnBezierExtension3 };
