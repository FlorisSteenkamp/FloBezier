import { allRoots } from "flo-poly";
/**
 * Returns the given order 1, 2 or 3 bezier curve's inflection point `t`
 * parameter values in ascending order.
 *
 * * see [Caffeine Owl](http://www.caffeineowl.com/graphics/2d/vectorial/cubic-inflexion.html)
 *
 * @param ps an order 1, 2 or 3 bezier curve
 *
 * @doc mdx
 */
function getInflections(ps) {
    if (ps.length < 4) {
        // Neither lines, nor parabolas have inflection points
        return [];
    }
    const [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = ps;
    // From http://www.caffeineowl.com/graphics/2d/vectorial/cubic-inflexion.html eq. 4
    const ax = x1 - x0;
    const ay = y1 - y0;
    const bx = x2 - x1 - ax;
    const by = y2 - y1 - ay;
    const cx = x3 - x2 - ax - (2 * bx);
    const cy = y3 - y2 - ay - (2 * by);
    // From http://www.caffeineowl.com/graphics/2d/vectorial/cubic-inflexion.html eq. 6:
    //   infl(t) := ax*by - ay*bx + t*(ax*cy - ay*cx) + t^2*(bx*cy - by*cx);
    // We find the roots of the quadratic - a,b,c are the quadratic coefficients
    const a = bx * cy - by * cx;
    const b = ax * cy - ay * cx;
    const c = ax * by - ay * bx;
    return allRoots([a, b, c], 0, 1);
}
export { getInflections };
//# sourceMappingURL=get-inflections.js.map