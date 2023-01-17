import { controlPointLinesLength } from "../../global-properties/length/control-point-lines-length.js";
import { curviness } from '../../global-properties/curviness.js';
import { fromTo } from "./from-to.js";
import { LlNode } from "./linked-list/linked-list-node.js";


/**
 * Split the given bezier curve into pieces (given as an array of parameter 
 * `t` values) such that each piece is flat within a given tolerance (where
 * curvature is measured by the `curviness` function).
 * 
 * @param ps an order 0,1,2 or 3 bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 * @param maxCurviness optional; defaults to `0.4 radians`; maximum curviness 
 * (must be > 0) as calculated using 
 * the `curviness` function (that measures the total angle in radians formed 
 * by the vectors formed by the ordered control points)
 * @param maxLength optional; defaults to `10`; maximum allowed length of any returned piece
 * @param minTSpan optional; defaults to `2**-16`; the minimum `t` span that can
 * be returned for a bezier piece; necessary for cubics otherwise a curve with a
 * cusp would cause an infinite loop
 * 
 * @doc mdx
 */
function splitByCurvatureAndLength(
        ps: number[][], 
        maxCurviness = 0.4,
        maxLength = 10,
        minTSpan = 2**-16) {

    const head: LlNode<number[]> = { r: [0,1] };
    let n = head;
    while (n !== undefined) {
        const ts_ = n.r;
        const ps_ = fromTo(ps,ts_[0], ts_[1]);
        if ((controlPointLinesLength(ps_) <= maxLength &&
            curviness(ps_) <= maxCurviness) || ts_[1] - ts_[0] <= minTSpan) {

            n = n.next!;
            continue;
        }

        const t = (ts_[0] + ts_[1]) / 2;
        const L = [ts_[0], t];
        const R = [t, ts_[1]];

        n.r = L;
        n.next = { r: R, next: n.next };
    }

    n = head;
    const ts: number[] = [];
    while (n !== undefined) {
        ts.push(n.r[0]);
        if (n.next === undefined) {
            ts.push(n.r[1]);
        }
        n = n.next!;
    }

    return ts;
}


export { splitByCurvatureAndLength }
