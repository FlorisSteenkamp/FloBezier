import { getDxy } from '../to-power-basis/get-dxy/double/get-dxy.js';
import { Horner as evaluatePoly } from 'flo-poly';
function tangent(ps, t) {
    const [dX, dY] = getDxy(ps);
    function f(t) {
        return [
            evaluatePoly(dX, t),
            evaluatePoly(dY, t)
        ];
    }
    // Curry
    return t === undefined ? f : f(t);
}
export { tangent };
//# sourceMappingURL=tangent.js.map