/**
 * Returns the signed area swept out by the radius vector from the origin to
 * the curve as `t` goes from `0` to `1`, i.e. the curve's contribution to the
 * closed-loop Green's-theorem integral `½∮(x·dy − y·dx)`.
 *
 * Note this value is origin-dependent: it equals the signed area enclosed by
 * the curve together with the two straight segments joining the origin to its
 * first and last control points. To obtain the (translation-invariant) area
 * between the curve and the chord joining its endpoints, add the chord's
 * contribution, e.g. `area(ps) + area([ps[ps.length-1], ps[0]])`.
 *
 * @param ps an order 1,2 or 3 bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 */
declare function area(ps: number[][]): number;
export { area };
