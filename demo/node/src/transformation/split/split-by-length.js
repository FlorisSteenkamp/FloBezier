import { controlPointLinesLength } from "../../global-properties/length/control-point-lines-length.js";
import { fromTo } from "./from-to.js";
/**
 * Split the given bezier curve into pieces (given as an array of parameter
 * `t` values) such that the longest curve length is guaranteed to be lower than
 * the given max length.
 *
 * @param ps an order 0,1,2 or 3 bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 * @param maxLength
 *
 * @doc mdx
 */
function splitByLength(ps, maxLength) {
    const tsS = [0];
    const tsE = [1];
    while (true) {
        const tS = tsS[tsS.length - 1];
        const tE = tsE[tsE.length - 1];
        const ps_ = fromTo(ps, tS, tE);
        const l = controlPointLinesLength(ps_);
        if (l <= maxLength) {
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
export { splitByLength };
//# sourceMappingURL=split-by-length.js.map