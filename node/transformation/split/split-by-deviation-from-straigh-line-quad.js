import { fromTo } from "./from-to.js";
import { isQuadObtuse } from '../../global-properties/classification/is-quad-obtuse.js';
import { evalDeCasteljau } from '../../local-properties-at-t/evaluate/double/eval-de-casteljau.js';
import { getDistanceToLineFunction } from '../../utils/get-distance-to-line-function.js';
const { abs } = Math;
/**
 * Split the given quadratic bezier curve into pieces (given as an array of
 * parameter `t` values) such that each piece is guaranteed to deviate less
 * than `maxD` from a straigh line.
 *
 * @param ps an order 2 bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1]]`
 * @param maxD
 */
function splitByDeviationFromStraighLine_Quad(ps, maxD) {
    const tsS = [0];
    const tsE = [1];
    while (true) {
        const tS = tsS[tsS.length - 1];
        const tE = tsE[tsE.length - 1];
        const ps_ = fromTo(ps, tS, tE);
        if ((!isQuadObtuse(ps_) && getMaxD(ps_) <= maxD)) {
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
    if (ps[0][0] === ps[1][0] && ps[0][1] === ps[1][1]) {
        return 0;
    }
    const p = evalDeCasteljau(ps, 0.5); // peak is reached at t = 0.5
    const dF = getDistanceToLineFunction(ps[0], ps[2]);
    return abs(dF(p));
}
export { splitByDeviationFromStraighLine_Quad };
//# sourceMappingURL=split-by-deviation-from-straigh-line-quad.js.map