import type { HausdorffFoot } from './hausdorff-foot.js';
/**
 * Returns the closest point on the piecewise bezier curve given by `Bs` to the
 * point `p` (as a `HausdorffFoot`), i.e. the minimum over the pieces of
 * `closestPointOnBezier`.
 *
 * @param Bs the pieces of the piecewise bezier curve
 * @param p the point
 *
 * @internal
 */
declare function closestPointOnBeziers(Bs: number[][][], p: number[]): HausdorffFoot;
export { closestPointOnBeziers };
