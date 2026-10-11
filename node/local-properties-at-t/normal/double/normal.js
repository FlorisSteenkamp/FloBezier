import { toPowerBasis_1stDerivative } from '../../../to-power-basis/to-power-basis-1st-derivative/double/to-power-basis-1st-derivative.js';
import { Horner } from 'flo-poly';
function normal(ps, t) {
    const [dX, dY] = toPowerBasis_1stDerivative(ps);
    const f = (t) => [
        -Horner(dY, t),
        Horner(dX, t)
    ];
    return t === undefined ? f : f(t);
}
export { normal };
//# sourceMappingURL=normal.js.map