import { toPowerBasis_2ndDerivativeExact } from "../../../to-power-basis/to-power-basis-2nd-derivative/exact/to-power-basis-2nd-derivative-exact.js";
import { eHorner } from 'flo-poly';
/**
 * Returns the `[x,y]` value of the twice differentiated (with respect to `t`)
 * bezier curve when evaluated at `t`.
 *
 * @param ps a cubic bezier, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param t the t parameter
 *
 * @doc mdx
 */
function evaluateDdxyExact(ps, t) {
    const [ddPsX, ddPsY] = toPowerBasis_2ndDerivativeExact(ps);
    return [eHorner(ddPsX, t), eHorner(ddPsY, t)];
}
export { evaluateDdxyExact };
//# sourceMappingURL=evaluate-ddxy-exact.js.map