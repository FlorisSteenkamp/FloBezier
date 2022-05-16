import { toPowerBasis_2ndDerivativeExact } from "../../../to-power-basis/to-power-basis-2nd-derivative/exact/to-power-basis-2nd-derivative-exact.js";
import { eHorner } from 'flo-poly';
/**
 * Returns the *exact* result, `[x,y]`, of evaluating the 2nd derivative of a
 * linear, quadratic or cubic bezier curve's power basis at `t`.
 *
 * @param ps a cubic bezier, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param t the t parameter
 *
 * @doc mdx
 */
function evaluate2ndDerivativeExact(ps, t) {
    const [ddPsX, ddPsY] = toPowerBasis_2ndDerivativeExact(ps);
    return [eHorner(ddPsX, t), eHorner(ddPsY, t)];
}
export { evaluate2ndDerivativeExact };
//# sourceMappingURL=evaluate-2nd-derivative-exact.js.map