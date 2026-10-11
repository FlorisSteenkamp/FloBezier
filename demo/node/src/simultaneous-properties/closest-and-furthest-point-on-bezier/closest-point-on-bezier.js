import { roots } from "flo-poly";
import { getFootpointPoly3 } from "./get-coeffs/double/get-footpoint-poly-3.js";
import { getFootpointPoly2 } from "./get-coeffs/double/get-footpoint-poly-2.js";
import { getFootpointPoly1 } from "./get-coeffs/double/get-footpoint-poly-1.js";
import { distanceBetween, squaredDistanceBetween } from "flo-vector2d";
import { evalDeCasteljau } from "../../local-properties-at-t/evaluate/double/eval-de-casteljau.js";
const { sqrt } = Math;
function closestPointOnBezier(ps, p, inclEndpoints = true) {
    let poly;
    if (ps.length === 4) {
        poly = getFootpointPoly3(ps, p);
    }
    else if (ps.length === 3) {
        poly = getFootpointPoly2(ps, p);
    }
    else if (ps.length === 2) {
        poly = getFootpointPoly1(ps, p);
    }
    else if (ps.length === 1) {
        return { p: ps[0], t: 0, d: distanceBetween(ps[0], p) };
    }
    else {
        throw new Error('The given bezier curve must be of order <= 3.');
    }
    const ts = roots(poly, 0, 1)?.map(r => r.t) || [];
    if (inclEndpoints) {
        ts.push(0);
        ts.push(1);
    }
    // Get point with minimum distance
    let minDSquared = Infinity;
    let minP = undefined;
    for (const t of ts) {
        const p_ = evalDeCasteljau(ps, t);
        const dSquared = squaredDistanceBetween(p_, p);
        if (dSquared < minDSquared) {
            minDSquared = dSquared;
            minP = { p: p_, t, d: sqrt(dSquared) };
        }
    }
    // `minP` can only be `undefined` if `inclEndpoints === false` and there is
    // no interior foot point (as documented)
    return minP;
}
export { closestPointOnBezier };
//# sourceMappingURL=closest-point-on-bezier.js.map