import { getDxy } from '../to-power-basis/get-dxy/double/get-dxy.js';
import { Horner } from 'flo-poly';
function normal(ps, t) {
    const [dX, dY] = getDxy(ps);
    function f(t) {
        return [
            -Horner(dY, t),
            Horner(dX, t)
        ];
    }
    // Curry
    return t === undefined ? f : f(t);
}
export { normal };
//# sourceMappingURL=normal.js.map