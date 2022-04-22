import { allRootsCertifiedSimplified } from 'flo-poly';
import { getDxy } from '../../to-power-basis/get-dxy/double/get-dxy.js';
import { getIntervalBox } from './get-interval-box/get-interval-box.js';
/**
 * Returns tight y-coordinate bounds of the given bezier curve.
 *
 * @param ps an order 1, 2 or 3 bezier curve given as an array of control
 * points, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 *
 * @doc mdx
 */
function getYBoundsTight(ps) {
    const pS = ps[0];
    const pE = ps[ps.length - 1];
    let minY;
    let maxY;
    if (pS[1] < pE[1]) {
        minY = { ts: [0, 0], box: [pS, pS] };
        maxY = { ts: [1, 1], box: [pE, pE] };
    }
    else {
        minY = { ts: [1, 1], box: [pE, pE] };
        maxY = { ts: [0, 0], box: [pS, pS] };
    }
    if (ps.length === 2) {
        return { minY, maxY };
    }
    const [, dy] = getDxy(ps);
    const rootsY = allRootsCertifiedSimplified(dy, 0, 1);
    // Test points
    for (let i = 0; i < rootsY.length; i++) {
        const r = rootsY[i];
        const ts = [r.tS, r.tE];
        const box = getIntervalBox(ps, ts);
        if (box[0][1] < minY.box[0][1]) {
            minY = { ts, box };
        }
        if (box[1][1] > maxY.box[0][1]) {
            maxY = { ts, box };
        }
    }
    return { minY, maxY };
}
export { getYBoundsTight };
//# sourceMappingURL=get-y-bounds-tight.js.map