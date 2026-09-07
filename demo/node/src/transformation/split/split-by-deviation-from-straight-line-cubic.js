import { isCubicObtuse } from '../../global-properties/classification/is-cubic-obtuse.js';
import { getDistanceToLineFunction } from '../../utils/get-distance-to-line-function.js';
import { fromTo } from './from-to.js';
const { abs, max } = Math;
/**
 * Split the given cubic bezier curve into pieces (given as an array of
 * parameter `t` values) such that each piece is guaranteed to deviate less
 * than `maxD` from a straigh line.
 *
 * * a crude method is employed (for efficiency) by noting that the hausdorff
 * distance between a cubic and the line segment connecting its endpoints is at
 * most 3/4 the distance of the max distance between any control point and the
 * line segment if the control points are on the same side of the line segment
 * and at most 4/9 if they are on opposite sides AND (in both cases) the cubic
 * is not obtuse, i.e. the inner control points are not outside the strip formed
 * by the two lines passing through the endpoint control points normal to the
 * line segment connecting the endpoint control points.
 *
 * @param ps an order 2 bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1]]`
 * @param maxD
 */
function splitByDeviationFromStraighLine_Cubic(ps, maxD) {
    const tsS = [0];
    const tsE = [1];
    while (true) {
        const tS = tsS[tsS.length - 1];
        const tE = tsE[tsE.length - 1];
        const ps_ = fromTo(ps, tS, tE);
        if ((!isCubicObtuse(ps_) && getMaxD(ps_) <= maxD)) {
            tsS.push(tsE.pop());
            if (tE === 1) {
                return tsS;
            }
            continue;
        }
        const t = (tS + tE) / 2;
        tsE.push(t);
    }
}
function getMaxD(ps) {
    const dF = getDistanceToLineFunction(ps[0], ps[3]);
    const d1 = dF(ps[1]);
    const d2 = dF(ps[2]);
    // The hausdorff distance between a cubic and the line segment connecting its
    // endpoints is at most 3/4 the distance of the max distance between any control
    // point and the line segment if the control points are on the same side of the line
    // segment and at most 4/9 if they are on opposite sides AND (in both cases) the cubic
    // is not obtuse, i.e. the inner control points are not outside the strip formed
    // by the two lines passing through the endpoint control points normal to the
    // line segment connecting the endpoint control points.
    const C = d1 * d2 <= 0 ? 4 / 9 : 3 / 4;
    return C * max(abs(d1), abs(d2));
}
export { splitByDeviationFromStraighLine_Cubic };
//# sourceMappingURL=split-by-deviation-from-straight-line-cubic.js.map