import { toPowerBasis_1stDerivative } from '../to-power-basis/to-power-basis-1st-derivative/double/to-power-basis-1st-derivative.js';
import { Horner } from 'flo-poly';
function tangent(ps, t) {
    const [dX, dY] = toPowerBasis_1stDerivative(ps);
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