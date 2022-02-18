import { getFootpointPoly1Dd } from './get-footpoint-poly-1-dd.js';
import { getFootpointPoly2Dd } from './get-footpoint-poly-2-dd.js';
import { getFootpointPoly3Dd } from './get-footpoint-poly-3-dd.js';
function getFootpointPolyDd(ps, p) {
    if (ps.length === 4) {
        return getFootpointPoly3Dd(ps, p);
    }
    if (ps.length === 3) {
        return getFootpointPoly2Dd(ps, p);
    }
    if (ps.length === 2) {
        return getFootpointPoly1Dd(ps, p);
    }
    throw new Error('The given bezier curve must be of order 1,2 or 3');
}
export { getFootpointPolyDd };
//# sourceMappingURL=get-footpoint-poly-dd.js.map