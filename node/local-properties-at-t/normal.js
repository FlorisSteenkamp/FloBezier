import { getDxy } from '../to-power-basis/get-dxy/double/get-dxy.js';
import { Horner as evaluatePoly } from 'flo-poly';
function normal(ps, t) {
    const [dX, dY] = getDxy(ps);
    function f(t) {
        return [
            evaluatePoly(dY, t),
            // TODO (should the below be negative??)
            -evaluatePoly(dX, t)
        ];
    }
    // Curry
    return t === undefined ? f : f(t);
}
export { normal };
//# sourceMappingURL=normal.js.map