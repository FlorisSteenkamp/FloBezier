import { toPowerBasis_2ndDerivative } from "../../../to-power-basis/to-power-basis-2nd-derivative/double/to-power-basis-2nd-derivative.js";
import { Horner } from 'flo-poly';
function evaluate2ndDerivative(ps, t) {
    const [ddPsX, ddPsY] = toPowerBasis_2ndDerivative(ps);
    const f = (t) => [
        Horner(ddPsX, t),
        Horner(ddPsY, t)
    ];
    return t === undefined ? f : f(t);
}
export { evaluate2ndDerivative };
//# sourceMappingURL=evaluate-2nd-derivative.js.map