import { closestPointOnBezier } from '../closest-and-furthest-point-on-bezier/closest-point-on-bezier.js';
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
function closestPointOnBeziers(Bs, p) {
    let best = { d: Infinity, q: p, k: 0, t: 0 };
    for (let k = 0; k < Bs.length; k++) {
        const c = closestPointOnBezier(Bs[k], p);
        if (c.d < best.d) {
            best = { d: c.d, q: c.p, k, t: c.t };
        }
    }
    return best;
}
export { closestPointOnBeziers };
//# sourceMappingURL=closest-point-on-beziers.js.map