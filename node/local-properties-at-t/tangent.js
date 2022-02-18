import { getDxy } from '../to-power-basis/get-dxy/double/get-dxy.js';
import { Horner } from 'flo-poly';
function tangent(ps, t) {
    const [dX, dY] = getDxy(ps);
    function f(t) {
        return [
            Horner(dX, t),
            Horner(dY, t)
        ];
    }
    // Curry
    return t === undefined ? f : f(t);
}
export { tangent };
//# sourceMappingURL=tangent.js.map