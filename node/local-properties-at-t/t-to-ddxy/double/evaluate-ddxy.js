import { getDdxy } from "../../../to-power-basis/get-ddxy/double/get-ddxy.js";
import { Horner } from 'flo-poly';
function evaluateDdxy(ps, t) {
    const [ddPsX, ddPsY] = getDdxy(ps);
    const f = (t) => [Horner(ddPsX, t), Horner(ddPsY, t)];
    return t === undefined ? f : f(t); // Curry
}
export { evaluateDdxy };
//# sourceMappingURL=evaluate-ddxy.js.map