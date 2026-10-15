import type { HausdorffFoot } from './hausdorff-foot.js';
/**
 * Returns a point on piece `k` of the piecewise bezier curve `Bs` close to `p`,
 * found by a few Newton iterations on the squared distance starting from the
 * parameter `t0`, as a `HausdorffFoot`.
 *
 * * the returned distance is an *upper bound* on the distance from `p` to the
 * piecewise curve (any point on the curve gives one); it is not certified to
 * be the minimum
 *
 * @param Bs the pieces of the piecewise bezier curve
 * @param k the index of the piece
 * @param p the point
 * @param t0 the starting parameter
 *
 * @internal
 */
declare function newtonFoot(Bs: number[][][], k: number, p: number[], t0: number): HausdorffFoot;
export { newtonFoot };
