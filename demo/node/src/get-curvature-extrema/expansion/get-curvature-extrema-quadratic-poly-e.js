import { twoDiff, eMult, eAdd, eDiff } from "big-float-ts";
const eme = eMult;
const eae = eAdd;
const ede = eDiff;
const td = twoDiff;
/**
 * Returns the polynomial whose zero is the t value of maximum absolute
 * curvature for the given *quadratic* bezier curve.
 *
 * * **precondition:** the given parabola is not degenerate to a line
 * * **non-exact:** there is floating point roundof during calculation
 * * see e.g. [math.stackexchange](https://math.stackexchange.com/a/2971112)'s
 * answer by [KeithWM](https://math.stackexchange.com/a/2971112/130809)
 *
 * @param ps an order 2 bezier curve given as an array of control points,
 * e.g. `[[0,0],[1,1],[2,1]]`
 *
 * @internal
 */
function getCurvatureExtremaQuadraticPolyE(ps) {
    // Find the point of max curvature (of the parabola)
    // calculate t*
    const [[x0, y0], [x1, y1], [x2, y2]] = ps;
    const x10 = td(x1, x0);
    const x21 = td(x2, x1);
    const wx = ede(x21, x10);
    const y10 = td(y1, y0);
    const y21 = td(y2, y1);
    const wy = ede(y21, y10);
    // The maximum curvature of the parabola is at its vertex, i.e. where 
    // `B′(t)·B″(t) = 0` with `B′(t) = 2(p10 + t*w)` and `B″(t) = 2w` (where
    // `p10 = p1 - p0` and `w = p0 - 2p1 + p2`), i.e. at 
    // `t = -(x10*wx + y10*wy)/(wx² + wy²)`; this is calculated from coordinate
    // differences only so that it is independent of the position of the curve
    // and avoids the cancellation of large terms (e.g. for nearly straight 
    // curves or curves far from the origin)
    const n = eae(eme(x10, wx), eme(y10, wy));
    const d = eae(eme(wx, wx), eme(wy, wy));
    // the polynomial `d*t + n` (with zero `t = -n/d`)
    return [d, n];
}
export { getCurvatureExtremaQuadraticPolyE };
//# sourceMappingURL=get-curvature-extrema-quadratic-poly-e.js.map