import { Horner } from 'flo-poly';
import { getDxy } from '../../../to-power-basis/get-dxy/double/get-dxy.js';
function evaluateDxy(ps, t) {
    const [dX, dY] = getDxy(ps);
    const f = (t) => [Horner(dX, t), Horner(dY, t)];
    return t === undefined ? f : f(t); // Curry
}
export { evaluateDxy };
//# sourceMappingURL=evaluate-dxy.js.map