import { getFootpointPoly1 } from './get-footpoint-poly-1.js';
import { getFootpointPoly2 } from './get-footpoint-poly-2.js';
import { getFootpointPoly3 } from './get-footpoint-poly-3.js';
function getFootpointPoly(ps, p) {
    if (ps.length === 4) {
        return getFootpointPoly3(ps, p);
    }
    if (ps.length === 3) {
        return getFootpointPoly2(ps, p);
    }
    if (ps.length === 2) {
        return getFootpointPoly1(ps, p);
    }
    throw new Error('The given bezier curve must be of order 1,2 or 3');
}
export { getFootpointPoly };
//# sourceMappingURL=get-footpoint-poly.js.map