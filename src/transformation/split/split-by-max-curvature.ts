import { fromTo } from './from-to.js';
import { flatness } from '../../global-properties/flatness.js';


/**
 * Split the order 0,1,2 or 3 bezier curve into pieces (given as an array of 
 * parameter `t` values) such that each piece is flat within a given tolerance 
 * given by the `flatness` function.
 * 
 * @param ps 
 * @param tolerance maximum tolerance (must be > 1) for the flatness measure;
 * defaults to `1.01`
 * @param minTSpan the minimum `t` span that can be returned for a bezier piece;
 * necessary for cubics otherwise a curve with a cusp would cause an infinite
 * loop; defaults to `2**-20`
 * 
 * @doc
 */
function splitByMaxCurvature(
        ps: number[][], 
        tolerance = 1.01,
        minTSpan = 2**-20): number[] {

    const ts = [0,1]; // include endpoints
    const tStack = [[0,1]];

    while (tStack.length) {
        const ts_ = tStack.pop()!;

        if (ts_[1] - ts_[0] <= minTSpan) { continue; }

        const ps_ = fromTo(ps,ts_[0], ts_[1]).ps;
        const flatness_ = flatness(ps_);
        if (flatness_ > tolerance) {
            const t = (ts_[0] + ts_[1]) / 2;
            tStack.push([ts_[0], t]);
            tStack.push([t, ts_[1]]);
            ts.push(t);
        }
    }

    ts.sort((a,b) => a - b);

    return ts;
}


export { splitByMaxCurvature }
