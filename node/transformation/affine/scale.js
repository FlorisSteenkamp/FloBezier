import { scale as scaleVec } from 'flo-vector2d';
/**
 * Returns the given bezier curve scaled about the origin by the given factor.
 *
 * * to scale about another point, first `translate` the curve, scale, then
 * translate back
 * * uses double precision calculations internally
 *
 * @param ps an order 0,1,2 or 3 bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 * @param s the scale factor
 *
 * @doc mdx
 */
function scale(ps, s) {
    return ps.map(p => scaleVec(p, s));
}
export { scale };
//# sourceMappingURL=scale.js.map