import { toPowerBasis_1stDerivative } from "../../../to-power-basis/to-power-basis-1st-derivative/double/to-power-basis-1st-derivative.js";
import { Horner } from 'flo-poly';
function evaluate1stDerivative(ps, t) {
    const [dPsX, dPsY] = toPowerBasis_1stDerivative(ps);
    const f = (t) => [
        Horner(dPsX, t),
        Horner(dPsY, t)
    ];
    return t === undefined ? f : f(t);
}
export { evaluate1stDerivative };
//# sourceMappingURL=evaluate-1st-derivative.js.map