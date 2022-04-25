/**
 * Returns the *exact* polynomial whose roots are all the `t` values on the
 * given bezier curve such that the line from the given point to the point on
 * the bezier evaluated at `t` is tangent to the bezier curve at `t`.
 *
 * * The returned polynomial coefficients are given densely as an array of
 * [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf) floating
 * point expansions from highest to lowest power,
 * e.g. `[[5],[-3],[0]]` represents the polynomial `5x^2 - 3x`.
 *
 * @param ps an order 1 bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1]]`
 * @param p a point, e.g. `[1,2]`
 *
 * @internal
 */
declare function getFootpointPoly1Exact(ps: number[][], p: number[]): number[][];
export { getFootpointPoly1Exact };
