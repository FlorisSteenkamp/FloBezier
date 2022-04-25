import { toPowerBasis_1stDerivative } from '../to-power-basis/to-power-basis-1st-derivative/double/to-power-basis-1st-derivative.js';
import { Horner } from 'flo-poly';
function normal(ps, t) {
    const [dX, dY] = toPowerBasis_1stDerivative(ps);
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