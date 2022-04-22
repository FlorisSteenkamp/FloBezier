import { getFootpointPoly1Exact } from './get-footpoint-poly-1-exact.js';
import { getFootpointPoly2Exact } from './get-footpoint-poly-2-exact.js';
import { getFootpointPoly3Exact } from './get-footpoint-poly-3-exact.js';
function getFootpointPolyExact(ps, p) {
    if (ps.length === 4) {
        return getFootpointPoly3Exact(ps, p);
    }
    if (ps.length === 3) {
        return getFootpointPoly2Exact(ps, p);
    }
    if (ps.length === 2) {
        return getFootpointPoly1Exact(ps, p);
    }
    throw new Error('The given bezier curve must be of order 1,2 or 3');
}
export { getFootpointPolyExact };
//# sourceMappingURL=get-footpoint-poly-exact.js.map