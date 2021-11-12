// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
import { eEstimate, eDiff, scaleExpansion, twoSum } from 'big-float-ts';
const sce = scaleExpansion;
const edif = eDiff;
const estimate = eEstimate;
const ts = twoSum;
/**
 * Returns a quadratic closest to the given cubic bezier by taking the midpoint
 * of the moving line of the hybrid quadratic version of the cubic as the
 * new quadratics middle control point.
 * * the resulting quadratic will be exactly the cubic if the cubic is really
 * a quadratic in disguise and the bit-aligned bitlength of the coordinates of
 * the control points <= 52.
 *
 * @param ps a cubic bezier curve.
 *
 * @doc
 */
function toQuadraticFromCubic(ps) {
    // note: if cubic is really a quad then
    // x3 + 3*(x1 - x2) === x0 && 
    // y3 + 3*(y1 - y2) === y0
    const [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = ps;
    return [
        [x0, y0],
        [
            //[
            //  (3*(x1 + x2) - (x0 + x3)) / 4, 
            //  (3*(y1 + y2) - (y0 + y3)) / 4
            //]
            estimate(edif(sce(ts(x1 / 4, x2 / 4), 3), ts(x0 / 4, x3 / 4))),
            estimate(edif(sce(ts(y1 / 4, y2 / 4), 3), ts(y0 / 4, y3 / 4)))
        ],
        [x3, y3]
    ];
}
export { toQuadraticFromCubic };
//# sourceMappingURL=to-quad-from-cubic.js.map