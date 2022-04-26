import { allRootsCertifiedSimplified } from 'flo-poly';
import { toPowerBasis_1stDerivative } from '../../to-power-basis/to-power-basis-1st-derivative/double/to-power-basis-1st-derivative.js';
import { getIntervalBox } from './get-interval-box/get-interval-box.js';
/**
 * Returns tight x-coordinate bounds of the given bezier curve.
 *
 * @param ps an order 1, 2 or 3 bezier curve given as an array of control
 * points, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 *
 * @doc mdx
 */
function getXBoundsTight(ps) {
    const pS = ps[0];
    const pE = ps[ps.length - 1];
    let minX;
    let maxX;
    if (pS[0] < pE[0]) {
        minX = { ts: [0, 0], box: [pS, pS] };
        maxX = { ts: [1, 1], box: [pE, pE] };
    }
    else {
        minX = { ts: [1, 1], box: [pE, pE] };
        maxX = { ts: [0, 0], box: [pS, pS] };
    }
    if (ps.length === 2) {
        return { minX, maxX };
    }
    const [dx,] = toPowerBasis_1stDerivative(ps);
    const rootsX = allRootsCertifiedSimplified(dx, 0, 1);
    // Test points
    for (let i = 0; i < rootsX.length; i++) {
        const r = rootsX[i];
        const ts = [r.tS, r.tE];
        const box = getIntervalBox(ps, ts);
        if (box[0][0] < minX.box[0][0]) {
            minX = { ts, box };
        }
        if (box[1][0] > maxX.box[0][0]) {
            maxX = { ts, box };
        }
    }
    return { minX, maxX };
}
export { getXBoundsTight };
//# sourceMappingURL=get-x-bounds-tight.js.map