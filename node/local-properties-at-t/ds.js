import { getDxy } from "../to-power-basis/get-dxy/double/get-dxy.js";
import { Horner } from 'flo-poly';
function ds(ps, t) {
    const [dX, dY] = getDxy(ps);
    function f(t) {
        const dx = Horner(dX, t);
        const dy = Horner(dY, t);
        return Math.sqrt(dx * dx + dy * dy);
    }
    // Curry
    return t === undefined ? f : f(t);
}
export { ds };
//# sourceMappingURL=ds.js.map